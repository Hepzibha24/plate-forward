import { randomUUID } from "crypto";
import { adminDb } from "../services/firebaseAdmin.js";
import { logStage } from "../services/logger.js";
import { findSubType } from "../config/categories.js";
import { Incident, Severity } from "../types/incident.js";
import { Evidence } from "../types/evidence.js";
import { Correlation } from "../types/correlation.js";
import { Alert, AlertmanagerAlert, AlertSourceType } from "./ingestion/types.js";
import { normalizeAlertmanagerAlert } from "./ingestion/normalizeAlertmanager.js";
import { classifyAlert } from "./categorization/classify.js";
import { collectEvidence } from "./evidence/collectEvidence.js";
import { decideCorrelation } from "./correlation/decideCorrelation.js";
import { fetchRecentIncidents } from "./correlation/fetchRecentIncidents.js";
import { CorrelationDecision } from "./correlation/types.js";

function newIncidentId(): string {
  return `INC-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`;
}

const SEVERITY_RANK: Record<Severity, number> = { critical: 3, warning: 2, info: 1, healthy: 0 };
function maxSeverity(a: Severity, b: Severity): Severity {
  return SEVERITY_RANK[a] >= SEVERITY_RANK[b] ? a : b;
}

export async function ingestAlert(raw: AlertmanagerAlert, source: AlertSourceType): Promise<Incident> {
  const alert = normalizeAlertmanagerAlert(raw, source);
  logStage("ingestion", "alert received", {
    alertId: alert.id,
    source,
    alertName: alert.alertName,
    service: alert.service,
  });

  await adminDb.collection("alerts").doc(alert.id).set(alert);

  const recentIncidents = await fetchRecentIncidents();
  const decision = decideCorrelation(alert, recentIncidents);
  logStage("correlation", `decision: ${decision.action}`, {
    alertId: alert.id,
    incidentId: decision.incidentId,
    reason: decision.reason,
  });

  if (decision.action === "duplicate" && decision.incidentId) {
    await foldAlertIntoIncident(decision.incidentId, alert, false);
    await recordCorrelation(decision.incidentId, alert.id, decision);
    return getIncident(decision.incidentId);
  }

  if (decision.action === "correlate" && decision.incidentId) {
    await foldAlertIntoIncident(decision.incidentId, alert, true);
    await recordCorrelation(decision.incidentId, alert.id, decision);
    const incident = await getIncident(decision.incidentId);
    await gatherAndPersistEvidence(incident, alert);
    return incident;
  }

  return createIncident(alert, decision);
}

async function createIncident(alert: Alert, decision: CorrelationDecision): Promise<Incident> {
  const classification = await classifyAlert(alert);
  const subTypeLabel = findSubType(classification.subTypeId)?.subType.label ?? classification.subTypeId;

  const now = Date.now();
  const incident: Incident = {
    id: newIncidentId(),
    category: classification.categoryId,
    subType: classification.subTypeId,
    title: `${subTypeLabel} — ${alert.service}`,
    summary: alert.summary || alert.description,
    severity: alert.severity,
    status: "investigating",
    service: alert.service,
    alertIds: [alert.id],
    alertNames: [alert.alertName],
    classification: {
      method: classification.method,
      confidence: classification.confidence,
      reasoning: classification.reasoning,
    },
    createdAt: now,
    updatedAt: now,
  };

  await adminDb.collection("incidents").doc(incident.id).set(incident);
  logStage("ingestion", "incident created", {
    incidentId: incident.id,
    alertId: alert.id,
    category: incident.category,
    subType: incident.subType,
    classificationMethod: incident.classification.method,
  });

  await recordCorrelation(incident.id, alert.id, decision);
  await gatherAndPersistEvidence(incident, alert);

  return incident;
}

async function foldAlertIntoIncident(incidentId: string, alert: Alert, escalate: boolean) {
  const ref = adminDb.collection("incidents").doc(incidentId);
  await adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) throw new Error(`Incident ${incidentId} not found while folding in alert ${alert.id}`);
    const incident = snap.data() as Incident;
    const severity = escalate ? maxSeverity(incident.severity, alert.severity) : incident.severity;
    tx.update(ref, {
      alertIds: [...incident.alertIds, alert.id],
      alertNames: [...(incident.alertNames ?? []), alert.alertName],
      severity,
      updatedAt: Date.now(),
    });
  });
  logStage("correlation", "alert folded into incident", { incidentId, alertId: alert.id, escalate });
}

async function recordCorrelation(incidentId: string, alertId: string, decision: CorrelationDecision) {
  const ref = adminDb.collection("correlations").doc(incidentId);
  const isNoise = decision.action === "duplicate";

  await adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) {
      const correlation: Correlation = {
        incidentId,
        alertIds: [alertId],
        noiseFilteredCount: isNoise ? 1 : 0,
        rationale: [decision.reason],
        updatedAt: Date.now(),
      };
      tx.set(ref, correlation);
      return;
    }
    const data = snap.data() as Correlation;
    tx.update(ref, {
      alertIds: [...data.alertIds, alertId],
      noiseFilteredCount: data.noiseFilteredCount + (isNoise ? 1 : 0),
      rationale: [...data.rationale, decision.reason],
      updatedAt: Date.now(),
    });
  });
}

async function getIncident(incidentId: string): Promise<Incident> {
  const snap = await adminDb.collection("incidents").doc(incidentId).get();
  if (!snap.exists) throw new Error(`Incident ${incidentId} not found`);
  return { id: snap.id, ...snap.data() } as Incident;
}

async function gatherAndPersistEvidence(incident: Incident, alert: Alert) {
  try {
    const collected = await collectEvidence(alert, incident.category);

    const evidenceDocs: Evidence[] = [
      {
        id: randomUUID(),
        incidentId: incident.id,
        source: "prometheus",
        query: collected.metrics.map((m) => m.query).join("; "),
        timeWindow: collected.timeWindow,
        result: { metrics: collected.metrics },
        collectedAt: Date.now(),
      },
      {
        id: randomUUID(),
        incidentId: incident.id,
        source: "grafana",
        query: `annotations + panels for service="${alert.service}"`,
        timeWindow: collected.timeWindow,
        result: { annotations: collected.annotations, panels: collected.panels },
        collectedAt: Date.now(),
      },
    ];

    await Promise.all(evidenceDocs.map((doc) => adminDb.collection("evidence").doc(doc.id).set(doc)));
    logStage("evidence", "evidence persisted", { incidentId: incident.id, count: evidenceDocs.length });
  } catch (err) {
    console.error("[evidence] collection failed, incident will show no evidence", { incidentId: incident.id, err });
  }
}
