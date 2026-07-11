import { EvidenceQuery, MetricResult, MetricStatus, PrometheusEvidenceProvider } from "../types.js";
import { METRIC_PROFILES_BY_CATEGORY, MetricProfile } from "../metricProfiles.js";

interface PrometheusRangeResponse {
  status: "success" | "error";
  data?: {
    resultType: string;
    result: Array<{ metric: Record<string, string>; values: [number, string][] }>;
  };
  error?: string;
}

/** Flags a metric based on how far its latest value has drifted from baseline,
 * in the direction that matters for this metric (e.g. success rate dropping,
 * error rate rising). Mirrors the mock provider's severity bands. */
function deriveStatus(latest: number, baseline: number, direction: MetricProfile["direction"]): MetricStatus {
  if (baseline === 0) return "healthy";
  const deviation = direction === "up" ? (latest - baseline) / baseline : (baseline - latest) / baseline;
  if (deviation >= 0.4) return "critical";
  if (deviation >= 0.15) return "warning";
  return "healthy";
}

export class LivePrometheusProvider implements PrometheusEvidenceProvider {
  constructor(private readonly baseUrl: string) {}

  async queryRange(query: EvidenceQuery): Promise<MetricResult[]> {
    if (!this.baseUrl) {
      throw new Error("PROMETHEUS_BASE_URL is not set; required when PROMETHEUS_ADAPTER=live.");
    }

    const profiles = METRIC_PROFILES_BY_CATEGORY[query.category] ?? [];
    const windowSeconds = Math.max(1, Math.floor((query.endTime - query.startTime) / 1000));
    const step = Math.max(15, Math.floor(windowSeconds / 40));

    return Promise.all(profiles.map((profile) => this.queryOne(profile, query, step)));
  }

  private async queryOne(profile: MetricProfile, query: EvidenceQuery, step: number): Promise<MetricResult> {
    const promQl = profile.promQlTemplate(query.service);
    const url = new URL("/api/v1/query_range", this.baseUrl);
    url.searchParams.set("query", promQl);
    url.searchParams.set("start", String(Math.floor(query.startTime / 1000)));
    url.searchParams.set("end", String(Math.floor(query.endTime / 1000)));
    url.searchParams.set("step", String(step));

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Prometheus query_range failed (HTTP ${response.status}) for "${promQl}"`);
    }

    const body = (await response.json()) as PrometheusRangeResponse;
    if (body.status !== "success" || !body.data) {
      throw new Error(`Prometheus query_range returned an error for "${promQl}": ${body.error ?? "unknown error"}`);
    }

    const values = body.data.result[0]?.values ?? [];
    const series = values.map(([timestamp, value]) => ({
      timestamp: timestamp * 1000,
      value: Number(value),
    }));
    const latest = series[series.length - 1]?.value ?? profile.baseline;

    return {
      metricName: profile.metricName,
      query: promQl,
      unit: profile.unit,
      baseline: profile.baseline,
      status: deriveStatus(latest, profile.baseline, profile.direction),
      series,
    };
  }
}
