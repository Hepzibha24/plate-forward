import { claude, CLAUDE_MODEL } from "../../services/claude.js";
import { Alert } from "../ingestion/types.js";
import { CATEGORIES, CategoryId, findSubType } from "../../config/categories.js";
import { ClassificationResult } from "./types.js";
import { classifyBestEffort } from "./ruleClassifier.js";

const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

const TAXONOMY_DESCRIPTION = CATEGORIES.map(
  (c) => `- ${c.id} (${c.label}): ${c.subTypes.map((s) => s.id).join(", ")}`,
).join("\n");

const CLASSIFY_TOOL = {
  name: "classify_alert",
  description: "Classify a payments monitoring alert into the fixed incident taxonomy.",
  input_schema: {
    type: "object" as const,
    properties: {
      categoryId: { type: "string", enum: CATEGORY_IDS, description: "Best-matching category id" },
      subTypeId: { type: "string", description: "Best-matching subtype id, must belong to categoryId" },
      confidence: { type: "number", minimum: 0, maximum: 1 },
      reasoning: { type: "string", description: "One or two sentence rationale" },
    },
    required: ["categoryId", "subTypeId", "confidence", "reasoning"],
  },
};

function buildAlertPrompt(alert: Alert): string {
  return [
    `Alert name: ${alert.alertName}`,
    `Service: ${alert.service}`,
    `Severity: ${alert.severity}`,
    `Summary: ${alert.summary}`,
    `Description: ${alert.description}`,
    `Labels: ${JSON.stringify(alert.labels)}`,
  ].join("\n");
}

export async function classifyWithLLM(alert: Alert): Promise<ClassificationResult> {
  if (!claude) {
    return classifyBestEffort(alert);
  }

  try {
    const response = await claude.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 500,
      system: `You are an expert payments-systems SRE classifying monitoring alerts into a fixed taxonomy.\n\nTaxonomy:\n${TAXONOMY_DESCRIPTION}\n\nChoose the single best category and subtype id for the alert. If the alert is genuinely ambiguous, still pick your best guess but report a lower confidence.`,
      tools: [CLASSIFY_TOOL],
      tool_choice: { type: "tool", name: "classify_alert" },
      messages: [{ role: "user", content: buildAlertPrompt(alert) }],
    });

    const toolUse = response.content.find((block) => block.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      console.warn("[llm-classifier] Claude response had no tool_use block, using best-effort fallback");
      return classifyBestEffort(alert);
    }

    const input = toolUse.input as {
      categoryId: string;
      subTypeId: string;
      confidence: number;
      reasoning: string;
    };

    const resolved = findSubType(input.subTypeId);
    if (!resolved || resolved.category.id !== input.categoryId) {
      console.warn("[llm-classifier] Claude returned an invalid category/subtype pair, using best-effort fallback", input);
      return classifyBestEffort(alert);
    }

    return {
      categoryId: input.categoryId as CategoryId,
      subTypeId: input.subTypeId,
      confidence: Math.max(0, Math.min(1, input.confidence)),
      method: "llm",
      reasoning: input.reasoning,
    };
  } catch (err) {
    console.error("[llm-classifier] Claude call failed, using best-effort fallback", err);
    return classifyBestEffort(alert);
  }
}
