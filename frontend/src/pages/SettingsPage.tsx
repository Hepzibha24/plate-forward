import { AppShell } from "@/components/layout/AppShell";

export function SettingsPage() {
  return (
    <AppShell title="Settings">
      <div className="panel max-w-xl p-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Evidence Source Connections
        </h2>
        <p className="text-sm text-slate-500">
          Prometheus and Grafana connection settings will live here once live providers are
          wired in (post Phase 3). Currently running against the mock evidence provider.
        </p>
      </div>
    </AppShell>
  );
}
