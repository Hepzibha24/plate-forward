import { MetricSeriesPoint, MetricStatus } from "../types.js";
import { MetricProfile } from "../metricProfiles.js";

export type { MetricProfile } from "../metricProfiles.js";
export { METRIC_PROFILES_BY_CATEGORY } from "../metricProfiles.js";

const SEVERITY_MAGNITUDE: Record<"critical" | "warning" | "info", number> = {
  critical: 0.55,
  warning: 0.22,
  info: 0.08,
};

const SEVERITY_STATUS: Record<"critical" | "warning" | "info", MetricStatus> = {
  critical: "critical",
  warning: "warning",
  info: "healthy",
};

function round(value: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function generateSeries(
  profile: MetricProfile,
  severity: "critical" | "warning" | "info",
  startTime: number,
  endTime: number,
): { series: MetricSeriesPoint[]; status: MetricStatus } {
  const POINTS = 20;
  const rampStart = startTime + (endTime - startTime) * 0.7;
  const magnitude = SEVERITY_MAGNITUDE[severity];
  const target =
    profile.direction === "up" ? profile.baseline * (1 + magnitude) : profile.baseline * (1 - magnitude);

  const series: MetricSeriesPoint[] = [];
  for (let i = 0; i < POINTS; i++) {
    const timestamp = startTime + ((endTime - startTime) * i) / (POINTS - 1);
    const noise = profile.baseline * 0.03 * (Math.random() - 0.5);
    let value: number;
    if (timestamp < rampStart) {
      value = profile.baseline + noise;
    } else {
      const rampProgress = (timestamp - rampStart) / (endTime - rampStart || 1);
      value = profile.baseline + (target - profile.baseline) * Math.min(1, rampProgress) + noise;
    }
    series.push({ timestamp: Math.round(timestamp), value: round(Math.max(0, value)) });
  }

  return { series, status: SEVERITY_STATUS[severity] };
}
