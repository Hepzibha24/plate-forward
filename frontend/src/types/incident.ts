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

export interface Incident {
  id: string;
  category: CategoryId;
  subType: string;
  title: string;
  summary: string;
  severity: Severity;
  status: IncidentStatus;
  alertIds: string[];
  createdAt: number;
  updatedAt: number;
}
