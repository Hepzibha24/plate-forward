export interface RCAResult {
  id: string;
  incidentId: string;
  rootCauseHypothesis: string;
  confidence: number;
  reasoning: string;
  recommendation: string[];
  modelUsed: string;
  generatedAt: number;
}
