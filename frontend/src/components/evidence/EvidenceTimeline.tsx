import { GitCommit } from "lucide-react";
import { useEvidence } from "@/firestore/evidence";
import { GrafanaEvidenceResult, PrometheusEvidenceResult } from "@/types/evidence";
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

export function EvidenceTimeline({ incidentId }: { incidentId: string }) {
  const { evidence, loading, error } = useEvidence(incidentId);

  if (loading) return <p className="text-sm text-slate-500">Loading evidence…</p>;
  if (error) return <p className="text-sm text-severity-critical">Failed to load evidence: {error}</p>;
  if (evidence.length === 0) return <p className="text-sm text-slate-500">No evidence collected yet.</p>;

  const prometheusDoc = evidence.find((e) => e.source === "prometheus" && isPrometheusResult(e.result));
  const grafanaDoc = evidence.find((e) => e.source === "grafana" && isGrafanaResult(e.result));

  const metrics =
    prometheusDoc && isPrometheusResult(prometheusDoc.result) ? prometheusDoc.result.metrics : [];
  const grafanaResult = grafanaDoc && isGrafanaResult(grafanaDoc.result) ? grafanaDoc.result : null;

  return (
    <div className="space-y-4">
      {metrics.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {metrics.map((metric) => (
            <MetricEvidenceCard key={metric.metricName} metric={metric} />
          ))}
        </div>
      )}

      {grafanaResult && grafanaResult.annotations.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Annotations</h3>
          <ul className="space-y-1.5">
            {grafanaResult.annotations.map((a) => (
              <li key={a.id} className="flex items-center gap-2 text-xs text-slate-400">
                <GitCommit className="h-3.5 w-3.5 text-accent-cyan" />
                <span>{a.text}</span>
                <span className="mono text-slate-600">{formatTime(a.time)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {grafanaResult && grafanaResult.panels.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Dashboard Panels
          </h3>
          <ul className="space-y-1.5">
            {grafanaResult.panels.map((panel) => (
              <li
                key={panel.panelTitle}
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
