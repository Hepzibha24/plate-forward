import { MetricResult } from "@/types/evidence";
import { MetricSparkline } from "./MetricSparkline";
import { StatusDot } from "@/components/ui/SeverityBadge";

export function MetricEvidenceCard({ metric }: { metric: MetricResult }) {
  const latest = metric.series[metric.series.length - 1];

  return (
    <div className="rounded-md border border-panel-border bg-base-800/40 p-3">
      <div className="flex items-center justify-between">
        <span className="mono text-xs text-slate-400">{metric.metricName}</span>
        <StatusDot severity={metric.status} />
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-lg font-semibold text-slate-100">
          {latest?.value ?? "—"}
          <span className="ml-0.5 text-xs font-normal text-slate-500">{metric.unit}</span>
        </span>
        <span className="text-xs text-slate-500">
          baseline {metric.baseline}
          {metric.unit}
        </span>
      </div>
      <MetricSparkline metric={metric} />
    </div>
  );
}
