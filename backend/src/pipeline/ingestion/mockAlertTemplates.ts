import { CategoryId } from "../../config/categories.js";

export interface MockAlertTemplate {
  /** Used only to weight generation mix — never fed to the classifier, which sees labels/annotations like a real alert would. */
  categoryHint: CategoryId;
  alertname: string;
  service: string;
  severity: "critical" | "warning" | "info";
  summary: string;
  description: string;
  extraLabels?: Record<string, string>;
}

export const MOCK_ALERT_TEMPLATES: MockAlertTemplate[] = [
  // Transaction Health
  {
    categoryHint: "transaction_health",
    alertname: "PaymentSuccessRateDrop",
    service: "payment-service",
    severity: "critical",
    summary: "Payment success rate dropped sharply in checkout-eu",
    description: "Card payment success rate fell from 98.4% to 85.9% over the last 8 minutes.",
  },
  {
    categoryHint: "transaction_health",
    alertname: "AuthorizationFailureSpike",
    service: "payment-service",
    severity: "critical",
    summary: "Authorization failure spike detected",
    description: "Authorization decline rate jumped to 22%, well above the 3% baseline.",
  },
  {
    categoryHint: "transaction_health",
    alertname: "RefundFailureRateIncrease",
    service: "refund-service",
    severity: "warning",
    summary: "Refund failure rate increased",
    description: "Refund error rate climbed to 9% over the last 15 minutes.",
  },
  // Performance
  {
    categoryHint: "performance",
    alertname: "PaymentLatencyIncrease",
    service: "payment-service",
    severity: "warning",
    summary: "Payment latency increased across all regions",
    description: "p95 payment processing latency rose from 400ms to 2.1s.",
  },
  {
    categoryHint: "performance",
    alertname: "SlowDatabaseQueries",
    service: "payments-primary-db",
    severity: "warning",
    summary: "Slow database queries detected on payments-primary-db",
    description: "Multiple queries exceeding 2s execution time, up from a 150ms baseline.",
  },
  // Infrastructure
  {
    categoryHint: "infrastructure",
    alertname: "HighCPUUtilization",
    service: "payment-service",
    severity: "warning",
    summary: "High CPU utilization on payment-service pods",
    description: "Average CPU usage across payment-service pods in us-east-1 has held above 92% for 10 minutes.",
  },
  {
    categoryHint: "infrastructure",
    alertname: "MemoryExhaustion",
    service: "routing-service",
    severity: "critical",
    summary: "Memory exhaustion on routing-service nodes",
    description: "Memory usage approaching OOM threshold, out of memory kills observed on 2 pods.",
  },
  // Microservice Health
  {
    categoryHint: "microservice_health",
    alertname: "PaymentServiceUnavailable",
    service: "payment-service",
    severity: "critical",
    summary: "Payment Service unavailable",
    description: "payment-service health checks failing across all replicas; payment service down for ~90 seconds.",
  },
  {
    categoryHint: "microservice_health",
    alertname: "RefundServiceTimeout",
    service: "refund-service",
    severity: "warning",
    summary: "Refund Service timeout",
    description: "refund-service p99 latency exceeded 12s during the batch refund job.",
  },
  // Database
  {
    categoryHint: "database",
    alertname: "ConnectionPoolExhausted",
    service: "payments-primary-db",
    severity: "critical",
    summary: "Database connection pool exhausted",
    description: "Connection pool utilization hit 100% on payments-primary-db, causing query queuing.",
  },
  {
    categoryHint: "database",
    alertname: "ReplicationLag",
    service: "payments-replica-db",
    severity: "warning",
    summary: "Replication lag increasing",
    description: "Replica lag on payments-replica-db reached 45 seconds, above the 5s threshold.",
  },
  // Messaging Systems
  {
    categoryHint: "messaging_systems",
    alertname: "KafkaConsumerLag",
    service: "settlement-worker",
    severity: "warning",
    summary: "Kafka consumer lag building on settlement-events topic",
    description: "Consumer group settlement-writer is lagging by ~48k messages and growing.",
  },
  {
    categoryHint: "messaging_systems",
    alertname: "QueueBacklog",
    service: "notification-service",
    severity: "info",
    summary: "Queue backlog growing on notification queue",
    description: "Queue depth for notification-events has grown to 120k messages.",
  },
  // External Payment Partners
  {
    categoryHint: "external_payment_partners",
    alertname: "PSPTimeout",
    service: "payment-service",
    severity: "critical",
    summary: "Elevated timeouts from PSP Adyen",
    description: "PSP timeout rate to Adyen authorization endpoint rose to 18%, well above baseline.",
  },
  {
    categoryHint: "external_payment_partners",
    alertname: "CardNetworkFailure",
    service: "routing-service",
    severity: "critical",
    summary: "Card network failure detected for Visa transactions",
    description: "Visa network responses show elevated failure codes across all acquirers.",
  },
  // Merchant Issues
  {
    categoryHint: "merchant_issues",
    alertname: "MerchantInvalidRequests",
    service: "merchant-service",
    severity: "info",
    summary: "Merchant sending invalid requests",
    description: "Merchant acme-retail is sending malformed requests to /v1/payments at an elevated rate.",
  },
  {
    categoryHint: "merchant_issues",
    alertname: "WebhookEndpointUnavailable",
    service: "notification-service",
    severity: "warning",
    summary: "Webhook endpoint unavailable for merchant globex-inc",
    description: "The globex-inc webhook endpoint has been unreachable for 10 minutes; all callback attempts are failing.",
  },
  // Deliberately ambiguous — exercises the LLM fallback / graceful-degradation path.
  {
    categoryHint: "transaction_health",
    alertname: "CheckoutAnomaly",
    service: "payment-service",
    severity: "warning",
    summary: "Something looks off with the checkout flow",
    description: "Support tickets mentioning checkout issues have increased; no single metric has crossed a threshold yet.",
  },
  {
    categoryHint: "merchant_issues",
    alertname: "UnusualMerchantPattern",
    service: "merchant-service",
    severity: "info",
    summary: "Unusual traffic pattern from a merchant integration",
    description: "Traffic shape from one merchant integration has changed; cause not yet clear.",
  },
];

export function pickRandomTemplate(): MockAlertTemplate {
  const index = Math.floor(Math.random() * MOCK_ALERT_TEMPLATES.length);
  return MOCK_ALERT_TEMPLATES[index]!;
}
