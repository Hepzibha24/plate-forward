export type CorrelationAction = "duplicate" | "correlate" | "new_incident";

export interface CorrelationDecision {
  action: CorrelationAction;
  incidentId?: string;
  reason: string;
}
