import { Incident } from "../../types/incident.js";
import { Correlation } from "../../types/correlation.js";
import { MetricResult, GrafanaAnnotation } from "../evidence/types.js";

export interface RCAContext {
  incident: Incident;
  correlation: Correlation | null;
  metrics: MetricResult[];
  annotations: GrafanaAnnotation[];
}

export function buildRCAPrompt(context: RCAContext): string {
  const { incident, correlation, metrics, annotations } = context;
  const lines: string[] = [];

  lines.push(`Incident: ${incident.title}`);
  lines.push(`Category: ${incident.category} / ${incident.subType}`);
  lines.push(`Severity: ${incident.severity} — Status: ${incident.status}`);
  lines.push(`Primary service: ${incident.service}`);
  lines.push(`Summary: ${incident.summary}`);
  lines.push("");

  if (correlation) {
    lines.push(
      `Correlated signals: ${correlation.alertIds.length} raw alert(s) compressed, ${correlation.noiseFilteredCount} filtered out as duplicate noise.`,
    );
    lines.push("Correlation rationale:");
    for (const reason of correlation.rationale) lines.push(`- ${reason}`);
    lines.push("");
  }

  if (metrics.length > 0) {
    lines.push("Evidence — metrics:");
    for (const metric of metrics) {
      const latest = metric.series[metric.series.length - 1];
      lines.push(
        `- ${metric.metricName}: latest=${latest?.value ?? "n/a"}${metric.unit}, baseline=${metric.baseline}${metric.unit}, status=${metric.status}`,
      );
    }
    lines.push("");
  }

  if (annotations.length > 0) {
    lines.push("Evidence — dashboard annotations:");
    for (const annotation of annotations) {
      lines.push(`- ${annotation.text} at ${new Date(annotation.time).toISOString()}`);
    }
    lines.push("");
  }

  if (incident.historicalMatches && incident.historicalMatches.length > 0) {
    lines.push("Similar historical incidents (most similar first):");
    for (const match of incident.historicalMatches) {
      lines.push(
        `- (${Math.round(match.similarity * 100)}% similar) "${match.title}" — resolution: ${match.resolutionSummary} Outcome: ${match.outcome}`,
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}
