import { randomUUID } from "crypto";
import { EvidenceQuery, GrafanaAnnotation, GrafanaEvidenceProvider, GrafanaPanelSnapshot } from "../types.js";

const DEPLOY_VERSIONS = ["v1.42.0", "v1.42.1", "v1.42.3", "v2.0.0-rc1"];

function toTitle(service: string): string {
  return service
    .split("-")
    .map((word) => (word[0] ?? "").toUpperCase() + word.slice(1))
    .join(" ");
}

function slug(service: string): string {
  return service.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export class MockGrafanaProvider implements GrafanaEvidenceProvider {
  async getAnnotations(query: EvidenceQuery): Promise<GrafanaAnnotation[]> {
    const annotations: GrafanaAnnotation[] = [];

    // ~40% chance a deploy happened shortly before the anomaly ramp — a plausible RCA lead for later phases.
    if (Math.random() < 0.4) {
      const deployTime = query.startTime + (query.endTime - query.startTime) * 0.65;
      const version = DEPLOY_VERSIONS[Math.floor(Math.random() * DEPLOY_VERSIONS.length)];
      annotations.push({
        id: randomUUID(),
        time: Math.round(deployTime),
        text: `Deploy: ${query.service} ${version}`,
        tags: ["deploy", query.service],
      });
    }

    return annotations;
  }

  async getRelevantPanels(query: EvidenceQuery): Promise<GrafanaPanelSnapshot[]> {
    const dashboardTitle = `${toTitle(query.service)} Overview`;
    const base = `https://grafana.mock/d/${slug(query.service)}/overview`;

    return [
      {
        panelTitle: "Success Rate & Latency",
        dashboardTitle,
        dashboardUrl: `${base}?viewPanel=1`,
        description: `Primary health panel for ${query.service} covering the incident window.`,
      },
      {
        panelTitle: "Error Rate by Endpoint",
        dashboardTitle,
        dashboardUrl: `${base}?viewPanel=2`,
        description: `Breakdown of error rates by endpoint for ${query.service}.`,
      },
    ];
  }
}
