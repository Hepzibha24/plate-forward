import { useParams } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { useIncident } from "@/firestore/incidents";
import { SeverityBadge } from "@/components/ui/SeverityBadge";
import { ClassificationChip } from "@/components/ui/ClassificationChip";
import { CATEGORY_LABELS, formatSubType } from "@/types/incident";
import { EvidenceTimeline } from "@/components/evidence/EvidenceTimeline";
import { CorrelationPanel } from "@/components/correlation/CorrelationPanel";
import { HistoricalMatchCard } from "@/components/historical/HistoricalMatchCard";

export function IncidentDetailPage() {
  const { id } = useParams();
  const { incident, loading, error } = useIncident(id);

  return (
    <AppShell title={`Incident ${id}`}>
      {loading && <p className="text-sm text-slate-500">Loading incident…</p>}
      {error && <p className="text-sm text-severity-critical">Failed to load incident: {error}</p>}
      {!loading && !error && !incident && (
        <div className="panel p-8 text-center text-sm text-slate-500">Incident not found.</div>
      )}

      {incident && (
        <div className="panel mb-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mono text-xs text-slate-500">{incident.id}</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-100">{incident.title}</h2>
            </div>
            <SeverityBadge severity={incident.severity} />
          </div>
          <p className="mt-2 text-sm text-slate-400">{incident.summary}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="rounded bg-base-800 px-2 py-0.5 font-mono">
              {CATEGORY_LABELS[incident.category]} · {formatSubType(incident.subType)}
            </span>
            <span className="capitalize">{incident.status}</span>
            <span>{incident.alertIds.length} linked alert(s)</span>
            {incident.classification && <ClassificationChip classification={incident.classification} />}
          </div>
          {incident.classification?.reasoning && (
            <p className="mt-3 text-xs text-slate-500">
              <span className="text-slate-400">Classification rationale:</span> {incident.classification.reasoning}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="panel p-6 lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Evidence Timeline
          </h2>
          {incident ? (
            <EvidenceTimeline incidentId={incident.id} />
          ) : (
            <p className="text-sm text-slate-500">Waiting on incident data…</p>
          )}
        </div>
        <div className="panel p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Correlation
          </h2>
          {incident ? (
            <CorrelationPanel incidentId={incident.id} />
          ) : (
            <p className="text-sm text-slate-500">Waiting on incident data…</p>
          )}
        </div>
        <div className="panel p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Similar Historical Incidents
          </h2>
          {incident && incident.historicalMatches && incident.historicalMatches.length > 0 ? (
            <div className="space-y-3">
              {incident.historicalMatches.map((match) => (
                <HistoricalMatchCard key={match.historicalId} match={match} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              {incident ? "No similar historical incidents found." : "Waiting on incident data…"}
            </p>
          )}
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
