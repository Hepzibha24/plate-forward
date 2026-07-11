import { CATEGORY_LABELS, HistoricalMatch } from "@/types/incident";

function similarityTone(similarity: number): string {
  if (similarity >= 0.5) return "text-severity-healthy border-severity-healthy/30 bg-severity-healthy/10";
  if (similarity >= 0.3) return "text-severity-info border-severity-info/30 bg-severity-info/10";
  return "text-slate-400 border-panel-border bg-base-800";
}

export function HistoricalMatchCard({ match }: { match: HistoricalMatch }) {
  return (
    <div className="rounded-md border border-panel-border bg-base-800/40 p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-slate-200">{match.title}</p>
        <span className={`mono shrink-0 rounded border px-1.5 py-0.5 text-[10px] ${similarityTone(match.similarity)}`}>
          {Math.round(match.similarity * 100)}% similar
        </span>
      </div>
      <p className="mt-1 text-[11px] text-slate-500">{CATEGORY_LABELS[match.category]}</p>
      <p className="mt-2 text-xs text-slate-400">{match.resolutionSummary}</p>
      <p className="mt-1.5 text-[11px] text-slate-500">
        <span className="text-slate-400">Outcome:</span> {match.outcome}
      </p>
    </div>
  );
}
