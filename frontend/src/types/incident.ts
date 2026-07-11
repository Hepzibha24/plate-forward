export type CategoryId =
  | "transaction_health"
  | "performance"
  | "infrastructure"
  | "microservice_health"
  | "database"
  | "messaging_systems"
  | "external_payment_partners"
  | "merchant_issues";

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  transaction_health: "Transaction Health",
  performance: "Performance",
  infrastructure: "Infrastructure",
  microservice_health: "Microservice Health",
  database: "Database",
  messaging_systems: "Messaging Systems",
  external_payment_partners: "External Payment Partners",
  merchant_issues: "Merchant Issues",
};

export type Severity = "critical" | "warning" | "info" | "healthy";

export type IncidentStatus = "investigating" | "identified" | "monitoring" | "resolved";

export type ClassificationMethod = "rule" | "llm" | "rule-fallback";

export interface IncidentClassification {
  method: ClassificationMethod;
  confidence: number;
  reasoning?: string;
}

export interface HistoricalMatch {
  historicalId: string;
  title: string;
  category: CategoryId;
  resolutionSummary: string;
  outcome: string;
  similarity: number;
}

export interface Incident {
  id: string;
  category: CategoryId;
  subType: string;
  title: string;
  summary: string;
  severity: Severity;
  status: IncidentStatus;
  service?: string;
  alertIds: string[];
  alertNames?: string[];
  classification?: IncidentClassification;
  historicalMatches?: HistoricalMatch[];
  createdAt: number;
  updatedAt: number;
}

/** Formats a taxonomy subtype id like "payment_success_rate_drop" as "Payment success rate drop". */
export function formatSubType(subTypeId: string): string {
  const words = subTypeId.split("_").join(" ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}
