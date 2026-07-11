import { CategoryId } from "../../config/categories.js";

export type ClassificationMethod = "rule" | "llm" | "rule-fallback";

export interface ClassificationResult {
  categoryId: CategoryId;
  subTypeId: string;
  confidence: number;
  method: ClassificationMethod;
  reasoning?: string;
}
