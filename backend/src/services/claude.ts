import Anthropic from "@anthropic-ai/sdk";

export const CLAUDE_MODEL = "claude-sonnet-5";

const apiKey = process.env.ANTHROPIC_API_KEY;

export const claude = apiKey ? new Anthropic({ apiKey }) : null;
export const isClaudeConfigured = Boolean(claude);

if (!isClaudeConfigured) {
  console.warn(
    "[claude] ANTHROPIC_API_KEY not set — LLM-dependent pipeline stages will fall back to best-effort heuristics.",
  );
}
