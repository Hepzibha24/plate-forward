import { Alert } from "../ingestion/types.js";
import { ClassificationResult } from "./types.js";
import { classifyByRules } from "./ruleClassifier.js";
import { classifyWithLLM } from "./llmClassifier.js";
import { logStage } from "../../services/logger.js";

export async function classifyAlert(alert: Alert): Promise<ClassificationResult> {
  const ruleResult = classifyByRules(alert);
  if (ruleResult) {
    logStage("categorization", "classified via rules", {
      alertId: alert.id,
      categoryId: ruleResult.categoryId,
      subTypeId: ruleResult.subTypeId,
      confidence: ruleResult.confidence,
    });
    return ruleResult;
  }

  logStage("categorization", "no confident rule match, falling back to LLM", { alertId: alert.id });
  const llmResult = await classifyWithLLM(alert);
  logStage("categorization", `classified via ${llmResult.method}`, {
    alertId: alert.id,
    categoryId: llmResult.categoryId,
    subTypeId: llmResult.subTypeId,
    confidence: llmResult.confidence,
  });
  return llmResult;
}
