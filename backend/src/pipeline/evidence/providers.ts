import { GrafanaEvidenceProvider, PrometheusEvidenceProvider } from "./types.js";
import { MockPrometheusProvider } from "./mock/mockPrometheusProvider.js";
import { MockGrafanaProvider } from "./mock/mockGrafanaProvider.js";
import { LivePrometheusProvider } from "./live/prometheusLiveProvider.js";
import { LiveGrafanaProvider } from "./live/grafanaLiveProvider.js";

export function getPrometheusProvider(): PrometheusEvidenceProvider {
  if ((process.env.PROMETHEUS_ADAPTER ?? "mock") === "live") {
    return new LivePrometheusProvider(process.env.PROMETHEUS_BASE_URL ?? "");
  }
  return new MockPrometheusProvider();
}

export function getGrafanaProvider(): GrafanaEvidenceProvider {
  if ((process.env.GRAFANA_ADAPTER ?? "mock") === "live") {
    return new LiveGrafanaProvider(process.env.GRAFANA_BASE_URL ?? "", process.env.GRAFANA_API_KEY ?? "");
  }
  return new MockGrafanaProvider();
}
