import { IncidentClassification } from "@/types/incident";

const METHOD_LABELS: Record<IncidentClassification["method"], string> = {
  rule: "Rule-classified",
  llm: "LLM-classified",
  "rule-fallback": "Best-effort",
};

export function ClassificationChip({ classification }: { classification: IncidentClassification }) {
  return (
    <span className="mono inline-flex items-center gap-1.5 rounded border border-panel-border bg-base-800 px-2 py-0.5 text-[11px] text-slate-400">
      {METHOD_LABELS[classification.method]} · {Math.round(classification.confidence * 100)}%
    </span>
  );
}
