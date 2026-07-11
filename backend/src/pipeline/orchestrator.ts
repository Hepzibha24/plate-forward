import { randomUUID } from "crypto";
import { adminDb } from "../services/firebaseAdmin.js";
import { logStage } from "../services/logger.js";
import { findSubType } from "../config/categories.js";
import { Incident } from "../types/incident.js";
import { AlertmanagerAlert, AlertSourceType } from "./ingestion/types.js";
import { normalizeAlertmanagerAlert } from "./ingestion/normalizeAlertmanager.js";
import { classifyAlert } from "./categorization/classify.js";

function newIncidentId(): string {
  return `INC-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`;
}

/** Phase 2: one alert produces one incident. Correlation/grouping arrives in Phase 4. */
export async function ingestAlert(raw: AlertmanagerAlert, source: AlertSourceType): Promise<Incident> {
  const alert = normalizeAlertmanagerAlert(raw, source);
  logStage("ingestion", "alert received", { alertId: alert.id, source, alertName: alert.alertName, service: alert.service });

  await adminDb.collection("alerts").doc(alert.id).set(alert);

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
    alertIds: [alert.id],
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

  return incident;
}
