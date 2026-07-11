import { GitCommit } from "lucide-react";
import { useEvidence } from "@/firestore/evidence";
import {
  GrafanaAnnotation,
  GrafanaEvidenceResult,
  GrafanaPanelSnapshot,
  MetricResult,
  PrometheusEvidenceResult,
} from "@/types/evidence";
import { MetricEvidenceCard } from "./MetricEvidenceCard";

function isPrometheusResult(result: unknown): result is PrometheusEvidenceResult {
  return typeof result === "object" && result !== null && "metrics" in result;
}

function isGrafanaResult(result: unknown): result is GrafanaEvidenceResult {
  return typeof result === "object" && result !== null && "annotations" in result;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Dedupe by key, keeping the last (freshest) occurrence — evidence arrives sorted oldest-first. */
function dedupeBy<T>(items: T[], keyOf: (item: T) => string): T[] {
  const map = new Map<string, T>();
  for (const item of items) map.set(keyOf(item), item);
  return [...map.values()];
}

export function EvidenceTimeline({ incidentId }: { incidentId: string }) {
  const { evidence, loading, error } = useEvidence(incidentId);

  if (loading) return <p className="text-sm text-slate-500">Loading evidence…</p>;
  if (error) return <p className="text-sm text-severity-critical">Failed to load evidence: {error}</p>;
  if (evidence.length === 0) return <p className="text-sm text-slate-500">No evidence collected yet.</p>;

  // A correlated incident can accumulate evidence from more than one alert/service —
  // aggregate across every evidence doc rather than showing only the first.
  const metrics: MetricResult[] = dedupeBy(
    evidence.filter((e) => e.source === "prometheus" && isPrometheusResult(e.result)).flatMap((e) => (e.result as PrometheusEvidenceResult).metrics),
    (m) => m.metricName,
  );

  const grafanaDocs = evidence.filter((e) => e.source === "grafana" && isGrafanaResult(e.result));
  const annotations: GrafanaAnnotation[] = dedupeBy(
    grafanaDocs.flatMap((e) => (e.result as GrafanaEvidenceResult).annotations),
    (a) => a.id,
  );
  const panels: GrafanaPanelSnapshot[] = dedupeBy(
    grafanaDocs.flatMap((e) => (e.result as GrafanaEvidenceResult).panels),
    (p) => `${p.dashboardTitle}::${p.panelTitle}`,
  );

  return (
    <div className="space-y-4">
      {metrics.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {metrics.map((metric) => (
            <MetricEvidenceCard key={metric.metricName} metric={metric} />
          ))}
        </div>
      )}

      {annotations.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Annotations</h3>
          <ul className="space-y-1.5">
            {annotations.map((a) => (
              <li key={a.id} className="flex items-center gap-2 text-xs text-slate-400">
                <GitCommit className="h-3.5 w-3.5 text-accent-cyan" />
                <span>{a.text}</span>
                <span className="mono text-slate-600">{formatTime(a.time)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {panels.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Dashboard Panels
          </h3>
          <ul className="space-y-1.5">
            {panels.map((panel) => (
              <li
                key={`${panel.dashboardTitle}::${panel.panelTitle}`}
                className="rounded border border-panel-border bg-base-800/40 px-3 py-2"
              >
                <p className="text-xs text-slate-300">{panel.panelTitle}</p>
                <p className="text-[11px] text-slate-500">{panel.dashboardTitle}</p>
                <p className="mono mt-1 text-[10px] text-slate-600">{panel.dashboardUrl} (mock)</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
