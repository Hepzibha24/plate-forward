export type EvidenceSource = "prometheus" | "grafana";

export interface Evidence {
  id: string;
  incidentId: string;
  source: EvidenceSource;
  query: string;
  timeWindow: { start: number; end: number };
  result: unknown;
  collectedAt: number;
}
