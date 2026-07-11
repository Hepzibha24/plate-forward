export interface EvidenceQuery {
  service: string;
  category: string;
  severity: "critical" | "warning" | "info";
  startTime: number;
  endTime: number;
}

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

export interface PrometheusEvidenceProvider {
  queryRange(query: EvidenceQuery): Promise<MetricResult[]>;
}

export interface GrafanaEvidenceProvider {
  getAnnotations(query: EvidenceQuery): Promise<GrafanaAnnotation[]>;
  getRelevantPanels(query: EvidenceQuery): Promise<GrafanaPanelSnapshot[]>;
}
