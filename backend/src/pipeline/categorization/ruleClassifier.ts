import { Alert } from "../ingestion/types.js";
import { CATEGORIES, Category, SubType } from "../../config/categories.js";
import { ClassificationResult } from "./types.js";

/** Below this we don't trust the rule match and defer to the LLM fallback. */
const CONFIDENCE_THRESHOLD = 0.6;

function alertText(alert: Alert): string {
  return [alert.alertName, alert.summary, alert.description, ...Object.values(alert.labels)]
    .join(" ")
    .toLowerCase();
}

function bestMatch(alert: Alert): { category: Category; subType: SubType; score: number } | null {
  const haystack = alertText(alert);
  let best: { category: Category; subType: SubType; score: number } | null = null;

  for (const category of CATEGORIES) {
    for (const subType of category.subTypes) {
      const score = subType.keywords.reduce(
        (count, keyword) => (haystack.includes(keyword.toLowerCase()) ? count + 1 : count),
        0,
      );
      if (score > 0 && (!best || score > best.score)) {
        best = { category, subType, score };
      }
    }
  }
  return best;
}

/** Confident, deterministic classification. Returns null when no keyword match clears the confidence bar. */
export function classifyByRules(alert: Alert): ClassificationResult | null {
  const match = bestMatch(alert);
  if (!match) return null;

  const confidence = Math.min(0.95, 0.6 + match.score * 0.15);
  if (confidence < CONFIDENCE_THRESHOLD) return null;

  return {
    categoryId: match.category.id,
    subTypeId: match.subType.id,
    confidence,
    method: "rule",
    reasoning: `Matched ${match.score} keyword(s) for "${match.subType.label}"`,
  };
}

/** Last-resort classification used only when the LLM fallback is unavailable or fails.
 * Never returns null — every alert must land in exactly one category. */
export function classifyBestEffort(alert: Alert): ClassificationResult {
  const match = bestMatch(alert);
  if (match) {
    return {
      categoryId: match.category.id,
      subTypeId: match.subType.id,
      confidence: Math.min(0.55, 0.3 + match.score * 0.15),
      method: "rule-fallback",
      reasoning: `Low-confidence keyword match (${match.score}) for "${match.subType.label}"; LLM fallback unavailable`,
    };
  }

  const defaultCategory = CATEGORIES[0]!;
  const defaultSubType = defaultCategory.subTypes[0]!;
  return {
    categoryId: defaultCategory.id,
    subTypeId: defaultSubType.id,
    confidence: 0.1,
    method: "rule-fallback",
    reasoning: "No keyword match and LLM fallback unavailable; defaulted to lowest-confidence bucket",
  };
}
