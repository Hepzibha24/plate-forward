import { Alert } from "../ingestion/types.js";
import { GrafanaAnnotation, GrafanaPanelSnapshot, MetricResult } from "./types.js";
import { getGrafanaProvider, getPrometheusProvider } from "./providers.js";
import { logStage } from "../../services/logger.js";

export interface CollectedEvidence {
  metrics: MetricResult[];
  annotations: GrafanaAnnotation[];
  panels: GrafanaPanelSnapshot[];
  timeWindow: { start: number; end: number };
}

const WINDOW_BEFORE_MS = 20 * 60 * 1000;
const WINDOW_AFTER_MS = 5 * 60 * 1000;

export async function collectEvidence(alert: Alert, category: string): Promise<CollectedEvidence> {
  const startTime = alert.startsAt - WINDOW_BEFORE_MS;
  const endTime = alert.startsAt + WINDOW_AFTER_MS;
  const query = { service: alert.service, category, severity: alert.severity, startTime, endTime };

  const prometheus = getPrometheusProvider();
  const grafana = getGrafanaProvider();

  const [metrics, annotations, panels] = await Promise.all([
    prometheus.queryRange(query),
    grafana.getAnnotations(query),
    grafana.getRelevantPanels(query),
  ]);

  logStage("evidence", "evidence collected", {
    alertId: alert.id,
    metricCount: metrics.length,
    annotationCount: annotations.length,
    panelCount: panels.length,
  });

  return { metrics, annotations, panels, timeWindow: { start: startTime, end: endTime } };
}
