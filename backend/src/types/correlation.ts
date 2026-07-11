export interface Correlation {
  incidentId: string;
  alertIds: string[];
  noiseFilteredCount: number;
  rationale: string[];
  updatedAt: number;
}
