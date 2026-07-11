import { EvidenceQuery, MetricResult, PrometheusEvidenceProvider } from "../types.js";
import { generateSeries, METRIC_PROFILES_BY_CATEGORY } from "./metricProfiles.js";

export class MockPrometheusProvider implements PrometheusEvidenceProvider {
  async queryRange(query: EvidenceQuery): Promise<MetricResult[]> {
    const profiles = METRIC_PROFILES_BY_CATEGORY[query.category] ?? [];

    return profiles.map((profile) => {
      const { series, status } = generateSeries(profile, query.severity, query.startTime, query.endTime);
      return {
        metricName: profile.metricName,
        query: profile.promQlTemplate(query.service),
        unit: profile.unit,
        baseline: profile.baseline,
        status,
        series,
      };
    });
  }
}
