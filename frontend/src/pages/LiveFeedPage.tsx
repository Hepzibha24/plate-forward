import { useState } from "react";
import { Zap } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { IncidentCard } from "@/components/ui/IncidentCard";
import { useIncidents } from "@/firestore/incidents";
import { useAuth } from "@/lib/authContext";
import { generateMockAlerts } from "@/lib/api";

export function LiveFeedPage() {
  const { incidents, loading, error } = useIncidents();
  const { role } = useAuth();
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  async function handleGenerate() {
    setGenerating(true);
    setGenerateError(null);
    try {
      await generateMockAlerts(1);
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : "Failed to generate mock alert");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <AppShell title="Live Incident Feed">
      {(role === "responder" || role === "admin") && (
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-1.5 rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-3 py-1.5 text-sm font-medium text-accent-cyan hover:bg-accent-cyan/20 disabled:opacity-50"
          >
            <Zap className="h-4 w-4" />
            {generating ? "Generating…" : "Generate Mock Alert"}
          </button>
          {generateError && <span className="text-sm text-severity-critical">{generateError}</span>}
        </div>
      )}

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
