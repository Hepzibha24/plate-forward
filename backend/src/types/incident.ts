import { CategoryId } from "../config/categories.js";
import { ClassificationMethod } from "../pipeline/categorization/types.js";

export type Severity = "critical" | "warning" | "info" | "healthy";
export type IncidentStatus = "investigating" | "identified" | "monitoring" | "resolved";

export interface IncidentClassification {
  method: ClassificationMethod;
  confidence: number;
  reasoning?: string;
}

export interface Incident {
  id: string;
  category: CategoryId;
  subType: string;
  title: string;
  summary: string;
  severity: Severity;
  status: IncidentStatus;
  service: string;
  alertIds: string[];
  alertNames: string[];
  classification: IncidentClassification;
  createdAt: number;
  updatedAt: number;
}
