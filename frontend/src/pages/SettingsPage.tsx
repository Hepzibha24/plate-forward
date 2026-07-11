import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/lib/authContext";
import { UserManagementPanel } from "@/components/admin/UserManagementPanel";

export function SettingsPage() {
  const { role } = useAuth();

  return (
    <AppShell title="Settings">
      <div className="space-y-4">
        <div className="panel max-w-xl p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Evidence Source Connections
          </h2>
          <p className="text-sm text-slate-500">
            Prometheus and Grafana connection settings will live here once live providers are
            wired in. Currently running against the mock evidence provider
            (<span className="mono">PROMETHEUS_ADAPTER=mock</span>, <span className="mono">GRAFANA_ADAPTER=mock</span>).
          </p>
        </div>

        {role === "admin" && (
          <div className="panel max-w-2xl p-6">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
              User Management
            </h2>
            <p className="mb-3 text-xs text-slate-500">
              New sign-ins start as viewers. Promote responders/admins here.
            </p>
            <UserManagementPanel />
          </div>
        )}
      </div>
    </AppShell>
  );
}
