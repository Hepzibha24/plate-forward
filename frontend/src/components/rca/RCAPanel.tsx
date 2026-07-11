import { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { useRCA } from "@/firestore/rca";
import { useAuth } from "@/lib/authContext";
import { rerunRCA } from "@/lib/api";

function confidenceTone(confidence: number): string {
  if (confidence >= 0.7) return "text-severity-healthy border-severity-healthy/30 bg-severity-healthy/10";
  if (confidence >= 0.4) return "text-severity-warning border-severity-warning/30 bg-severity-warning/10";
  return "text-slate-400 border-panel-border bg-base-800";
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function RCAPanel({ incidentId }: { incidentId: string }) {
  const { rca, loading, error } = useRCA(incidentId);
  const { role } = useAuth();
  const [rerunning, setRerunning] = useState(false);
  const [rerunError, setRerunError] = useState<string | null>(null);

  async function handleRerun() {
    setRerunning(true);
    setRerunError(null);
    try {
      await rerunRCA(incidentId);
    } catch (err) {
      setRerunError(err instanceof Error ? err.message : "Failed to re-run analysis");
    } finally {
      setRerunning(false);
    }
  }

  const canRerun = role === "responder" || role === "admin";
  const unavailable = rca && (rca.modelUsed === "unavailable" || rca.modelUsed === "error");

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {rca ? `Generated ${formatTime(rca.generatedAt)} · ${rca.modelUsed}` : "No analysis yet"}
        </span>
        {canRerun && (
          <button
            onClick={handleRerun}
            disabled={rerunning}
            className="flex items-center gap-1.5 rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-2.5 py-1 text-xs font-medium text-accent-cyan hover:bg-accent-cyan/20 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${rerunning ? "animate-spin" : ""}`} />
            {rerunning ? "Analyzing…" : "Re-run Analysis"}
          </button>
        )}
      </div>

      {loading && <p className="text-sm text-slate-500">Loading analysis…</p>}
      {error && <p className="text-sm text-severity-critical">Failed to load analysis: {error}</p>}
      {rerunError && <p className="mb-2 text-sm text-severity-critical">{rerunError}</p>}

      {!loading && !error && !rca && (
        <p className="text-sm text-slate-500">No root cause analysis has run for this incident yet.</p>
      )}

      {rca && unavailable && (
        <div className="rounded-md border border-panel-border bg-base-800/40 p-3 text-sm text-slate-400">
          {rca.rootCauseHypothesis}
        </div>
      )}

      {rca && !unavailable && (
        <div className="space-y-4">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-200">
                <Sparkles className="h-4 w-4 text-accent-cyan" />
                Root Cause Hypothesis
              </div>
              <span className={`mono shrink-0 rounded border px-1.5 py-0.5 text-[10px] ${confidenceTone(rca.confidence)}`}>
                {Math.round(rca.confidence * 100)}% confidence
              </span>
            </div>
            <p className="mt-1.5 text-sm text-slate-300">{rca.rootCauseHypothesis}</p>
          </div>

          {rca.reasoning && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reasoning</h4>
              <p className="mt-1 text-xs text-slate-400">{rca.reasoning}</p>
            </div>
          )}

          {rca.recommendation.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recommendation</h4>
              <ol className="mt-1.5 space-y-1.5">
                {rca.recommendation.map((step, i) => (
                  <li key={i} className="flex gap-2 text-xs text-slate-300">
                    <span className="mono text-accent-cyan">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
