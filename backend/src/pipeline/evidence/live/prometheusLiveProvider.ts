import { EvidenceQuery, MetricResult, PrometheusEvidenceProvider } from "../types.js";

/**
 * Swap-in point for a real Prometheus instance. Implement queryRange() against
 * the HTTP API (GET /api/v1/query_range) using `baseUrl`, mapping the response
 * into MetricResult[] with the same shape the mock provider produces.
 */
export class LivePrometheusProvider implements PrometheusEvidenceProvider {
  constructor(private readonly baseUrl: string) {}

  async queryRange(_query: EvidenceQuery): Promise<MetricResult[]> {
    throw new Error(
      `Live Prometheus provider not implemented yet (PROMETHEUS_BASE_URL=${this.baseUrl || "<unset>"}). ` +
        "Set PROMETHEUS_ADAPTER=mock or implement queryRange() against the Prometheus HTTP API.",
    );
  }
}
