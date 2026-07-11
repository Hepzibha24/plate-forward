export type CategoryId =
  | "transaction_health"
  | "performance"
  | "infrastructure"
  | "microservice_health"
  | "database"
  | "messaging_systems"
  | "external_payment_partners"
  | "merchant_issues";

export interface SubType {
  id: string;
  label: string;
  /** Lowercase keywords/metric-name fragments used by the rule-based classifier. */
  keywords: string[];
}

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  subTypes: SubType[];
}

export const CATEGORIES: Category[] = [
  {
    id: "transaction_health",
    label: "Transaction Health",
    description: "Business-level payment metrics",
    subTypes: [
      { id: "payment_success_rate_drop", label: "Payment success rate dropped", keywords: ["success rate", "payment success"] },
      { id: "payment_failure_rate_increase", label: "Payment failure rate increased", keywords: ["failure rate", "payment failure"] },
      { id: "refund_failure_rate_increase", label: "Refund failure rate increased", keywords: ["refund failure", "refund error"] },
      { id: "authorization_failure_spike", label: "Authorization failure spike", keywords: ["authorization failure", "auth decline", "authorization spike"] },
      { id: "settlement_delay", label: "Settlement delay", keywords: ["settlement delay", "settlement lag"] },
      { id: "duplicate_transactions", label: "Duplicate transactions detected", keywords: ["duplicate transaction", "duplicate charge"] },
      { id: "high_decline_rate", label: "High transaction decline rate", keywords: ["decline rate", "transaction declined"] },
      { id: "abandoned_payments_increase", label: "Increase in abandoned payments", keywords: ["abandoned payment", "cart abandonment", "checkout abandonment"] },
    ],
  },
  {
    id: "performance",
    label: "Performance",
    description: "System slowdowns",
    subTypes: [
      { id: "payment_latency_increase", label: "Payment latency increased", keywords: ["payment latency", "payment slow"] },
      { id: "api_response_time_increase", label: "API response time increased", keywords: ["api response time", "api latency"] },
      { id: "slow_database_queries", label: "Slow database queries", keywords: ["slow query", "query latency", "slow database"] },
      { id: "high_queue_processing_time", label: "High queue processing time", keywords: ["queue processing time", "queue latency"] },
      { id: "slow_webhook_delivery", label: "Slow webhook delivery", keywords: ["webhook delivery", "webhook latency", "slow webhook"] },
      { id: "increased_e2e_transaction_time", label: "Increased end-to-end transaction time", keywords: ["end-to-end", "e2e transaction", "e2e latency"] },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    description: "Underlying compute/network infrastructure",
    subTypes: [
      { id: "high_cpu_utilization", label: "High CPU utilization", keywords: ["cpu utilization", "cpu usage", "high cpu"] },
      { id: "memory_exhaustion", label: "Memory exhaustion", keywords: ["memory exhaustion", "oom", "out of memory", "memory usage"] },
      { id: "disk_space_full", label: "Disk space full", keywords: ["disk space", "disk full", "disk usage"] },
      { id: "k8s_pod_crash", label: "Kubernetes pod crash", keywords: ["pod crash", "crashloopbackoff", "pod restart"] },
      { id: "node_failure", label: "Node failure", keywords: ["node failure", "node not ready", "node down"] },
      { id: "load_balancer_issue", label: "Load balancer issue", keywords: ["load balancer", "lb error", "elb", "alb"] },
      { id: "network_packet_loss", label: "Network packet loss", keywords: ["packet loss", "network loss"] },
    ],
  },
  {
    id: "microservice_health",
    label: "Microservice Health",
    description: "Health of individual payment microservices",
    subTypes: [
      { id: "payment_service_unavailable", label: "Payment Service unavailable", keywords: ["payment service unavailable", "payment service down"] },
      { id: "merchant_service_errors", label: "Merchant Service errors", keywords: ["merchant service error", "merchant service"] },
      { id: "refund_service_timeout", label: "Refund Service timeout", keywords: ["refund service timeout", "refund service"] },
      { id: "tokenization_service_failure", label: "Tokenization Service failure", keywords: ["tokenization service", "tokenization failure"] },
      { id: "routing_service_failure", label: "Routing Service failure", keywords: ["routing service"] },
      { id: "notification_service_down", label: "Notification Service down", keywords: ["notification service"] },
    ],
  },
  {
    id: "database",
    label: "Database",
    description: "Datastore-level issues",
    subTypes: [
      { id: "connection_pool_exhausted", label: "Database connection pool exhausted", keywords: ["connection pool exhausted", "connection pool"] },
      { id: "deadlocks", label: "Deadlocks", keywords: ["deadlock"] },
      { id: "replication_lag", label: "Replication lag", keywords: ["replication lag", "replica lag"] },
      { id: "db_slow_queries", label: "Slow queries", keywords: ["slow query", "query timeout"] },
      { id: "high_db_latency", label: "High database latency", keywords: ["database latency", "db latency"] },
      { id: "db_failover", label: "Database failover occurred", keywords: ["failover", "database failover"] },
    ],
  },
  {
    id: "messaging_systems",
    label: "Messaging Systems",
    description: "Kafka/RabbitMQ and related event infrastructure",
    subTypes: [
      { id: "kafka_consumer_lag", label: "Kafka consumer lag", keywords: ["consumer lag", "kafka lag"] },
      { id: "producer_failures", label: "Producer failures", keywords: ["producer failure", "producer error"] },
      { id: "queue_backlog", label: "Queue backlog", keywords: ["queue backlog", "queue depth"] },
      { id: "message_processing_delay", label: "Message processing delay", keywords: ["message processing delay", "message delay"] },
      { id: "event_delivery_failures", label: "Event delivery failures", keywords: ["event delivery failure", "event delivery"] },
    ],
  },
  {
    id: "external_payment_partners",
    label: "External Payment Partners",
    description: "Third-party PSPs, banks, and networks",
    subTypes: [
      { id: "psp_timeout", label: "PSP timeout", keywords: ["psp timeout", "processor timeout"] },
      { id: "psp_unavailable", label: "PSP unavailable", keywords: ["psp unavailable", "psp down", "processor unavailable"] },
      { id: "issuer_bank_outage", label: "Issuer bank outage", keywords: ["issuer outage", "issuing bank"] },
      { id: "acquiring_bank_issue", label: "Acquiring bank issue", keywords: ["acquirer", "acquiring bank"] },
      { id: "card_network_failure", label: "Card network failure", keywords: ["card network", "visa", "mastercard", "network failure"] },
      { id: "fraud_service_unavailable", label: "Third-party fraud service unavailable", keywords: ["fraud service", "fraud check unavailable"] },
      { id: "currency_conversion_unavailable", label: "Currency conversion service unavailable", keywords: ["currency conversion", "fx service"] },
    ],
  },
  {
    id: "merchant_issues",
    label: "Merchant Issues",
    description: "Issues originating from merchant integrations",
    subTypes: [
      { id: "merchant_invalid_requests", label: "Merchant sending invalid requests", keywords: ["invalid request", "malformed request"] },
      { id: "wrong_api_version", label: "Wrong API version", keywords: ["api version", "deprecated version"] },
      { id: "invalid_authentication", label: "Invalid authentication", keywords: ["invalid authentication", "invalid api key", "auth failed"] },
      { id: "excessive_retries", label: "Excessive retries", keywords: ["excessive retries", "retry storm"] },
      { id: "webhook_endpoint_unavailable", label: "Webhook endpoint unavailable", keywords: ["webhook endpoint unavailable", "webhook unreachable"] },
    ],
  },
];

export function findSubType(subTypeId: string): { category: Category; subType: SubType } | null {
  for (const category of CATEGORIES) {
    const subType = category.subTypes.find((s) => s.id === subTypeId);
    if (subType) return { category, subType };
  }
  return null;
}
