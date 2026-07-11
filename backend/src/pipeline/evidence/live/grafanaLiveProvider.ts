import { EvidenceQuery, GrafanaAnnotation, GrafanaEvidenceProvider, GrafanaPanelSnapshot } from "../types.js";

interface GrafanaAnnotationApiItem {
  id: number;
  time: number;
  text: string;
  tags?: string[];
}

interface GrafanaSearchResult {
  uid: string;
  title: string;
  type: string;
}

interface GrafanaDashboardResponse {
  dashboard: {
    title: string;
    panels?: Array<{ id: number; title: string; type: string }>;
  };
  meta: { url: string };
}

export class LiveGrafanaProvider implements GrafanaEvidenceProvider {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
  ) {}

  private assertConfigured() {
    if (!this.baseUrl) {
      throw new Error("GRAFANA_BASE_URL is not set; required when GRAFANA_ADAPTER=live.");
    }
  }

  private headers(): Record<string, string> {
    return this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {};
  }

  async getAnnotations(query: EvidenceQuery): Promise<GrafanaAnnotation[]> {
    this.assertConfigured();

    const url = new URL("/api/annotations", this.baseUrl);
    url.searchParams.set("from", String(query.startTime));
    url.searchParams.set("to", String(query.endTime));
    url.searchParams.set("tags", query.service);

    const response = await fetch(url, { headers: this.headers() });
    if (!response.ok) {
      throw new Error(`Grafana annotations query failed (HTTP ${response.status})`);
    }

    const items = (await response.json()) as GrafanaAnnotationApiItem[];
    return items.map((item) => ({
      id: String(item.id),
      time: item.time,
      text: item.text,
      tags: item.tags ?? [],
    }));
  }

  async getRelevantPanels(query: EvidenceQuery): Promise<GrafanaPanelSnapshot[]> {
    this.assertConfigured();

    const searchUrl = new URL("/api/search", this.baseUrl);
    searchUrl.searchParams.set("query", query.service);
    searchUrl.searchParams.set("type", "dash-db");

    const searchResponse = await fetch(searchUrl, { headers: this.headers() });
    if (!searchResponse.ok) {
      throw new Error(`Grafana dashboard search failed (HTTP ${searchResponse.status})`);
    }

    const dashboards = (await searchResponse.json()) as GrafanaSearchResult[];
    const match = dashboards[0];
    if (!match) return [];

    const dashboardUrl = new URL(`/api/dashboards/uid/${match.uid}`, this.baseUrl);
    const dashboardResponse = await fetch(dashboardUrl, { headers: this.headers() });
    if (!dashboardResponse.ok) {
      throw new Error(`Grafana dashboard fetch failed (HTTP ${dashboardResponse.status}) for uid ${match.uid}`);
    }

    const body = (await dashboardResponse.json()) as GrafanaDashboardResponse;
    const panels = (body.dashboard.panels ?? []).filter((panel) => panel.type !== "row").slice(0, 4);

    return panels.map((panel) => ({
      panelTitle: panel.title,
      dashboardTitle: body.dashboard.title,
      dashboardUrl: new URL(`${body.meta.url}?viewPanel=${panel.id}`, this.baseUrl).toString(),
      description: `Panel from the ${body.dashboard.title} dashboard.`,
    }));
  }
}
