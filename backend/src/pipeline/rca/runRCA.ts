import { adminDb } from "../../services/firebaseAdmin.js";
import { logStage } from "../../services/logger.js";
import { Incident } from "../../types/incident.js";
import { Correlation } from "../../types/correlation.js";
import { Evidence } from "../../types/evidence.js";
import { GrafanaAnnotation, MetricResult } from "../evidence/types.js";
import { RCAResult } from "../../types/rca.js";
import { buildRCAPrompt } from "./buildPrompt.js";
import { generateRCA } from "./generateRCA.js";

interface PrometheusResultShape {
  metrics: MetricResult[];
}

interface GrafanaResultShape {
  annotations: GrafanaAnnotation[];
}

export async function runRCA(incidentId: string): Promise<RCAResult> {
  const incidentSnap = await adminDb.collection("incidents").doc(incidentId).get();
  if (!incidentSnap.exists) throw new Error(`Incident ${incidentId} not found`);
  const incident = { id: incidentSnap.id, ...incidentSnap.data() } as Incident;

  const correlationSnap = await adminDb.collection("correlations").doc(incidentId).get();
  const correlation = correlationSnap.exists ? (correlationSnap.data() as Correlation) : null;

  const evidenceSnap = await adminDb.collection("evidence").where("incidentId", "==", incidentId).get();
  const evidenceDocs = evidenceSnap.docs.map((doc) => doc.data() as Evidence);
  const metrics = evidenceDocs
    .filter((doc) => doc.source === "prometheus")
    .flatMap((doc) => (doc.result as PrometheusResultShape).metrics ?? []);
  const annotations = evidenceDocs
    .filter((doc) => doc.source === "grafana")
    .flatMap((doc) => (doc.result as GrafanaResultShape).annotations ?? []);

  const promptText = buildRCAPrompt({ incident, correlation, metrics, annotations });
  const generated = await generateRCA(promptText);

  const result: RCAResult = {
    id: incidentId,
    incidentId,
    ...generated,
    generatedAt: Date.now(),
  };

  await adminDb.collection("rca_results").doc(incidentId).set(result);
  logStage("rca", "RCA generated", {
    incidentId,
    modelUsed: result.modelUsed,
    confidence: result.confidence,
  });

  return result;
}
