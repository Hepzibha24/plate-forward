import { AppShell } from "@/components/layout/AppShell";
import { CATEGORY_LABELS } from "@/types/incident";

export function CategoryOverviewPage() {
  return (
    <AppShell title="Category Breakdown">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(CATEGORY_LABELS).map(([id, label]) => (
          <div key={id} className="panel p-5">
            <p className="mono text-xs text-slate-500">{id}</p>
            <h3 className="mt-1 text-sm font-semibold text-slate-100">{label}</h3>
            <p className="mt-3 text-2xl font-semibold text-slate-600">—</p>
            <p className="text-xs text-slate-500">counts arrive in Phase 2</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
