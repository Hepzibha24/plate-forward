import { useParams } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";

export function IncidentDetailPage() {
  const { id } = useParams();

  return (
    <AppShell title={`Incident ${id}`}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="panel p-6 lg:col-span-2">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Evidence Timeline
          </h2>
          <p className="text-sm text-slate-500">
            Coming in Phase 3 — Prometheus/Grafana evidence will render here.
          </p>
        </div>
        <div className="panel p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Correlation
          </h2>
          <p className="text-sm text-slate-500">Coming in Phase 4.</p>
        </div>
        <div className="panel p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Similar Historical Incidents
          </h2>
          <p className="text-sm text-slate-500">Coming in Phase 5.</p>
        </div>
        <div className="panel p-6 lg:col-span-2">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Root Cause &amp; Recommendation
          </h2>
          <p className="text-sm text-slate-500">Coming in Phase 6.</p>
        </div>
      </div>
    </AppShell>
  );
}
