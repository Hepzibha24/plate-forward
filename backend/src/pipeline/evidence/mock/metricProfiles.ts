import { MetricSeriesPoint, MetricStatus } from "../types.js";

export interface MetricProfile {
  metricName: string;
  unit: string;
  baseline: number;
  direction: "up" | "down";
  promQlTemplate: (service: string) => string;
}

export const METRIC_PROFILES_BY_CATEGORY: Record<string, MetricProfile[]> = {
  transaction_health: [
    {
      metricName: "payment_success_rate",
      unit: "%",
      baseline: 98.2,
      direction: "down",
      promQlTemplate: (s) =>
        `sum(rate(payments_succeeded_total{service="${s}"}[5m])) / sum(rate(payments_total{service="${s}"}[5m])) * 100`,
    },
    {
      metricName: "payment_failure_rate",
      unit: "%",
      baseline: 1.8,
      direction: "up",
      promQlTemplate: (s) =>
        `sum(rate(payments_failed_total{service="${s}"}[5m])) / sum(rate(payments_total{service="${s}"}[5m])) * 100`,
    },
  ],
  performance: [
    {
      metricName: "api_response_time_p95",
      unit: "ms",
      baseline: 260,
      direction: "up",
      promQlTemplate: (s) =>
        `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{service="${s}"}[5m])) by (le)) * 1000`,
    },
    {
      metricName: "payment_latency_p99",
      unit: "ms",
      baseline: 420,
      direction: "up",
      promQlTemplate: (s) =>
        `histogram_quantile(0.99, sum(rate(payment_duration_seconds_bucket{service="${s}"}[5m])) by (le)) * 1000`,
    },
  ],
  infrastructure: [
    {
      metricName: "cpu_utilization",
      unit: "%",
      baseline: 42,
      direction: "up",
      promQlTemplate: (s) => `avg(rate(container_cpu_usage_seconds_total{service="${s}"}[5m])) * 100`,
    },
    {
      metricName: "memory_utilization",
      unit: "%",
      baseline: 55,
      direction: "up",
      promQlTemplate: (s) =>
        `avg(container_memory_working_set_bytes{service="${s}"}) / avg(container_spec_memory_limit_bytes{service="${s}"}) * 100`,
    },
  ],
  microservice_health: [
    {
      metricName: "service_error_rate",
      unit: "%",
      baseline: 0.4,
      direction: "up",
      promQlTemplate: (s) =>
        `sum(rate(http_requests_total{service="${s}",code=~"5.."}[5m])) / sum(rate(http_requests_total{service="${s}"}[5m])) * 100`,
    },
    {
      metricName: "service_availability",
      unit: "%",
      baseline: 99.9,
      direction: "down",
      promQlTemplate: (s) => `avg_over_time(up{service="${s}"}[5m]) * 100`,
    },
  ],
  database: [
    {
      metricName: "connection_pool_usage",
      unit: "%",
      baseline: 58,
      direction: "up",
      promQlTemplate: (s) => `db_connection_pool_active{service="${s}"} / db_connection_pool_max{service="${s}"} * 100`,
    },
    {
      metricName: "query_latency_p95",
      unit: "ms",
      baseline: 45,
      direction: "up",
      promQlTemplate: (s) =>
        `histogram_quantile(0.95, sum(rate(db_query_duration_seconds_bucket{service="${s}"}[5m])) by (le)) * 1000`,
    },
  ],
  messaging_systems: [
    {
      metricName: "consumer_lag",
      unit: "msgs",
      baseline: 350,
      direction: "up",
      promQlTemplate: (s) => `kafka_consumergroup_lag{service="${s}"}`,
    },
    {
      metricName: "queue_depth",
      unit: "msgs",
      baseline: 500,
      direction: "up",
      promQlTemplate: (s) => `queue_depth{service="${s}"}`,
    },
  ],
  external_payment_partners: [
    {
      metricName: "psp_response_time",
      unit: "ms",
      baseline: 410,
      direction: "up",
      promQlTemplate: (s) =>
        `histogram_quantile(0.95, sum(rate(psp_request_duration_seconds_bucket{service="${s}"}[5m])) by (le)) * 1000`,
    },
    {
      metricName: "psp_error_rate",
      unit: "%",
      baseline: 1.2,
      direction: "up",
      promQlTemplate: (s) =>
        `sum(rate(psp_requests_total{service="${s}",status="error"}[5m])) / sum(rate(psp_requests_total{service="${s}"}[5m])) * 100`,
    },
  ],
  merchant_issues: [
    {
      metricName: "merchant_request_error_rate",
      unit: "%",
      baseline: 1.0,
      direction: "up",
      promQlTemplate: (s) =>
        `sum(rate(merchant_requests_total{service="${s}",status="error"}[5m])) / sum(rate(merchant_requests_total{service="${s}"}[5m])) * 100`,
    },
    {
      metricName: "invalid_request_rate",
      unit: "%",
      baseline: 0.5,
      direction: "up",
      promQlTemplate: (s) =>
        `sum(rate(merchant_requests_total{service="${s}",valid="false"}[5m])) / sum(rate(merchant_requests_total{service="${s}"}[5m])) * 100`,
    },
  ],
};

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
