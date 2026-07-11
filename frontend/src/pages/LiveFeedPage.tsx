import { AppShell } from "@/components/layout/AppShell";
import { IncidentCard } from "@/components/ui/IncidentCard";
import { useIncidents } from "@/firestore/incidents";

export function LiveFeedPage() {
  const { incidents, loading, error } = useIncidents();

  return (
    <AppShell title="Live Incident Feed">
      {loading && <p className="text-sm text-slate-500">Loading incidents…</p>}
      {error && <p className="text-sm text-severity-critical">Failed to load incidents: {error}</p>}
      {!loading && !error && incidents.length === 0 && (
        <div className="panel p-8 text-center text-sm text-slate-500">
          No incidents yet. Seed mock incidents to populate the feed.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </AppShell>
  );
}
