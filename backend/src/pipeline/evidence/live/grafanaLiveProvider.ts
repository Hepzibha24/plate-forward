import { EvidenceQuery, GrafanaAnnotation, GrafanaEvidenceProvider, GrafanaPanelSnapshot } from "../types.js";

/**
 * Swap-in point for a real Grafana instance. Implement getAnnotations() and
 * getRelevantPanels() against the Grafana HTTP API (/api/annotations,
 * /api/search + /api/dashboards) using `baseUrl` and `apiKey`.
 */
export class LiveGrafanaProvider implements GrafanaEvidenceProvider {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
  ) {}

  async getAnnotations(_query: EvidenceQuery): Promise<GrafanaAnnotation[]> {
    throw new Error(
      `Live Grafana provider not implemented yet (GRAFANA_BASE_URL=${this.baseUrl || "<unset>"}). ` +
        "Set GRAFANA_ADAPTER=mock or implement getAnnotations() against the Grafana HTTP API.",
    );
  }

  async getRelevantPanels(_query: EvidenceQuery): Promise<GrafanaPanelSnapshot[]> {
    throw new Error(
      `Live Grafana provider not implemented yet (GRAFANA_BASE_URL=${this.baseUrl || "<unset>"}, key ${
        this.apiKey ? "set" : "unset"
      }). Set GRAFANA_ADAPTER=mock or implement getRelevantPanels() against the Grafana HTTP API.`,
    );
  }
}
