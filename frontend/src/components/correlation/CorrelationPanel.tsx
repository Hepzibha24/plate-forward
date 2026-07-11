import { useCorrelation } from "@/firestore/correlations";

export function CorrelationPanel({ incidentId }: { incidentId: string }) {
  const { correlation, loading, error } = useCorrelation(incidentId);

  if (loading) return <p className="text-sm text-slate-500">Loading correlation…</p>;
  if (error) return <p className="text-sm text-severity-critical">Failed to load correlation: {error}</p>;
  if (!correlation) return <p className="text-sm text-slate-500">No correlation data yet.</p>;

  const signalCount = correlation.alertIds.length - correlation.noiseFilteredCount;

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-slate-100">{correlation.alertIds.length}</span>
        <span className="text-xs text-slate-500">raw alert(s) → {signalCount} signal(s)</span>
      </div>
      {correlation.noiseFilteredCount > 0 && (
        <p className="mt-1 text-xs text-slate-500">
          {correlation.noiseFilteredCount} filtered out as duplicate noise
        </p>
      )}
      <ul className="mt-3 space-y-2">
        {correlation.rationale.map((reason, i) => (
          <li key={i} className="flex gap-1.5 text-xs text-slate-400">
            <span className="text-slate-600">·</span>
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
