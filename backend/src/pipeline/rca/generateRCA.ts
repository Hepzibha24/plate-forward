import { claude, CLAUDE_MODEL } from "../../services/claude.js";

export interface GeneratedRCA {
  rootCauseHypothesis: string;
  confidence: number;
  reasoning: string;
  recommendation: string[];
  modelUsed: string;
}

const RCA_TOOL = {
  name: "generate_rca",
  description: "Produce a root cause hypothesis and remediation recommendation for a payments incident.",
  input_schema: {
    type: "object" as const,
    properties: {
      rootCauseHypothesis: {
        type: "string",
        description: "A concise (1-2 sentence) root cause hypothesis grounded in the evidence provided",
      },
      confidence: { type: "number", minimum: 0, maximum: 1 },
      reasoning: {
        type: "string",
        description: "2-4 sentences explaining how the evidence and correlated signals support this hypothesis",
      },
      recommendation: {
        type: "array",
        items: { type: "string" },
        description:
          "3-5 concrete, actionable next steps, informed by what worked in similar historical incidents when available",
      },
    },
    required: ["rootCauseHypothesis", "confidence", "reasoning", "recommendation"],
  },
};

const UNAVAILABLE_RESULT: GeneratedRCA = {
  rootCauseHypothesis: "LLM unavailable — configure ANTHROPIC_API_KEY to enable automated root cause analysis.",
  confidence: 0,
  reasoning: "",
  recommendation: [],
  modelUsed: "unavailable",
};

export async function generateRCA(promptText: string): Promise<GeneratedRCA> {
  if (!claude) {
    return UNAVAILABLE_RESULT;
  }

  try {
    const response = await claude.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 800,
      system:
        "You are an expert payments-systems SRE performing root cause analysis on a production incident. " +
        "Reason only from the evidence, correlated signals, and historical matches provided — do not invent " +
        "metrics or events that weren't given to you. If the evidence is thin, say so and report lower confidence.",
      tools: [RCA_TOOL],
      tool_choice: { type: "tool", name: "generate_rca" },
      messages: [{ role: "user", content: promptText }],
    });

    const toolUse = response.content.find((block) => block.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      throw new Error("Claude response had no tool_use block");
    }

    const input = toolUse.input as {
      rootCauseHypothesis: string;
      confidence: number;
      reasoning: string;
      recommendation: string[];
    };

    return {
      rootCauseHypothesis: input.rootCauseHypothesis,
      confidence: Math.max(0, Math.min(1, input.confidence)),
      reasoning: input.reasoning,
      recommendation: input.recommendation,
      modelUsed: CLAUDE_MODEL,
    };
  } catch (err) {
    console.error("[rca] Claude call failed", err);
    return {
      rootCauseHypothesis: "RCA generation failed — see server logs for details.",
      confidence: 0,
      reasoning: err instanceof Error ? err.message : "Unknown error",
      recommendation: [],
      modelUsed: "error",
    };
  }
}
