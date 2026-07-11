export type EvidenceSource = "prometheus" | "grafana";
export type MetricStatus = "critical" | "warning" | "healthy";

export interface MetricSeriesPoint {
  timestamp: number;
  value: number;
}

export interface MetricResult {
  metricName: string;
  query: string;
  unit: string;
  baseline: number;
  status: MetricStatus;
  series: MetricSeriesPoint[];
}

export interface GrafanaAnnotation {
  id: string;
  time: number;
  text: string;
  tags: string[];
}

export interface GrafanaPanelSnapshot {
  panelTitle: string;
  dashboardTitle: string;
  dashboardUrl: string;
  description: string;
}

export interface PrometheusEvidenceResult {
  metrics: MetricResult[];
}

export interface GrafanaEvidenceResult {
  annotations: GrafanaAnnotation[];
  panels: GrafanaPanelSnapshot[];
}

export interface Evidence {
  id: string;
  incidentId: string;
  source: EvidenceSource;
  query: string;
  timeWindow: { start: number; end: number };
  result: PrometheusEvidenceResult | GrafanaEvidenceResult;
  collectedAt: number;
}
