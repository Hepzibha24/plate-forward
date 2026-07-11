import "dotenv/config";
import { adminDb } from "../services/firebaseAdmin.js";
import { getEmbeddingProvider } from "../pipeline/historical/embeddings/providers.js";

interface SeedHistoricalIncident {
  id: string;
  category: string;
  subType: string;
  title: string;
  summary: string;
  resolutionSummary: string;
  outcome: string;
  createdAt: number;
}

const now = Date.now();
const days = (n: number) => n * 24 * 60 * 60 * 1000;

const HISTORICAL_INCIDENTS: SeedHistoricalIncident[] = [
  {
    id: "HIST-001",
    category: "transaction_health",
    subType: "payment_success_rate_drop",
    title: "Payment success rate dropped after expired TLS certificate",
    summary: "Card payment success rate fell sharply on the psp-adyen integration.",
    resolutionSummary:
      "Root cause was an expired TLS certificate on the psp-adyen integration. Renewed the certificate and success rate recovered within 12 minutes.",
    outcome: "Resolved — certificate renewed, added 30-day expiry alerting.",
    createdAt: now - days(48),
  },
  {
    id: "HIST-002",
    category: "transaction_health",
    subType: "authorization_failure_spike",
    title: "Authorization failure spike during issuer bank outage",
    summary: "Authorization decline rate jumped well above baseline for card transactions.",
    resolutionSummary:
      "An issuer bank had a regional outage affecting authorization responses. No action possible on our side; declines returned to baseline once the issuer recovered.",
    outcome: "Resolved externally — issuer bank outage, no code change required.",
    createdAt: now - days(21),
  },
  {
    id: "HIST-003",
    category: "performance",
    subType: "payment_latency_increase",
    title: "Payment latency spike traced to a bad tokenization-service deploy",
    summary: "Payment latency increased across all regions after a deploy.",
    resolutionSummary:
      "A recent tokenization-service deploy introduced a slow downstream call. Rolled back to the previous version; latency normalized within 5 minutes.",
    outcome: "Resolved — rollback, root cause fixed in next release with a timeout budget.",
    createdAt: now - days(15),
  },
  {
    id: "HIST-004",
    category: "infrastructure",
    subType: "high_cpu_utilization",
    title: "CPU saturation on payment-service due to misconfigured autoscaler",
    summary: "High CPU utilization on payment-service pods held above 90% for over 10 minutes.",
    resolutionSummary:
      "The horizontal pod autoscaler's max replica count was set too low for the current traffic level. Raised the ceiling; CPU utilization normalized as new pods came up.",
    outcome: "Resolved — autoscaler max replicas increased, documented in runbook.",
    createdAt: now - days(60),
  },
  {
    id: "HIST-005",
    category: "infrastructure",
    subType: "memory_exhaustion",
    title: "Memory exhaustion on routing-service from an unbounded cache",
    summary: "Memory usage on routing-service climbed steadily until pods began OOM-killing.",
    resolutionSummary:
      "A recently added in-memory cache had no eviction policy. Deployed a hotfix capping cache size and restarted affected pods.",
    outcome: "Resolved — hotfix deployed, cache size now bounded and monitored.",
    createdAt: now - days(9),
  },
  {
    id: "HIST-006",
    category: "microservice_health",
    subType: "payment_service_unavailable",
    title: "payment-service crash loop after bad config rollout",
    summary: "payment-service health checks failed across all replicas shortly after a config change.",
    resolutionSummary:
      "A config rollout introduced an invalid feature flag combination causing the service to crash on startup. Reverted the config; service recovered automatically once the previous config was restored.",
    outcome: "Resolved — config reverted, added a config validation step to the deploy pipeline.",
    createdAt: now - days(33),
  },
  {
    id: "HIST-007",
    category: "database",
    subType: "connection_pool_exhausted",
    title: "Connection pool exhausted on payments-primary-db from a stuck migration",
    summary: "Database connection pool utilization hit 100% on payments-primary-db, causing query queuing.",
    resolutionSummary:
      "A long-running schema migration job held connections open far longer than expected. Killed the stuck migration job, which released the held connections; pool usage returned to normal within 3 minutes.",
    outcome: "Resolved — migration job killed, migrations now run with an explicit connection timeout.",
    createdAt: now - days(6),
  },
  {
    id: "HIST-008",
    category: "database",
    subType: "replication_lag",
    title: "Replica lag spike after a brief network partition",
    summary: "Replication lag on payments-replica-db climbed to 45 seconds above the 5s threshold.",
    resolutionSummary:
      "A brief network partition between primary and replica caused the replica to fall behind. Lag cleared on its own once network connectivity was restored and the replica caught up.",
    outcome: "Resolved — self-healed after network recovery, no manual intervention needed.",
    createdAt: now - days(27),
  },
  {
    id: "HIST-009",
    category: "messaging_systems",
    subType: "kafka_consumer_lag",
    title: "Settlement consumer lag from a slow downstream database write",
    summary: "Consumer group settlement-writer fell behind on the settlement-events topic.",
    resolutionSummary:
      "The consumer's downstream database write had become the bottleneck under increased load. Scaled the consumer group from 3 to 6 instances; lag cleared within 20 minutes.",
    outcome: "Resolved — consumer group scaled up, added lag-based autoscaling.",
    createdAt: now - days(4),
  },
  {
    id: "HIST-010",
    category: "external_payment_partners",
    subType: "psp_timeout",
    title: "Elevated PSP Adyen timeouts during their regional incident",
    summary: "PSP timeout rate to the Adyen authorization endpoint rose well above baseline.",
    resolutionSummary:
      "Adyen was experiencing a regional incident on their end. Failed traffic over to the backup PSP for the duration of the outage, which limited customer impact until Adyen resolved their incident.",
    outcome: "Resolved externally — PSP incident, failover to backup PSP mitigated impact.",
    createdAt: now - days(12),
  },
  {
    id: "HIST-011",
    category: "merchant_issues",
    subType: "webhook_endpoint_unavailable",
    title: "Merchant webhook endpoint unreachable during their maintenance window",
    summary: "Webhook delivery to a merchant's endpoint failed repeatedly for about 40 minutes.",
    resolutionSummary:
      "The merchant's endpoint was down for a scheduled maintenance window they hadn't announced. Queued webhooks were automatically retried and delivered successfully once their endpoint came back online.",
    outcome: "Resolved — automatic retry succeeded, no action needed beyond notifying the merchant.",
    createdAt: now - days(18),
  },
  {
    id: "HIST-012",
    category: "transaction_health",
    subType: "refund_failure_rate_increase",
    title: "Refund failure rate increase from a validation logic bug",
    summary: "Refund error rate climbed well above baseline for partial refunds.",
    resolutionSummary:
      "A recent change to refund validation logic incorrectly rejected partial refunds above a certain amount. Shipped a hotfix correcting the validation bounds; refund failure rate returned to baseline.",
    outcome: "Resolved — hotfix shipped, added regression test for partial refund validation.",
    createdAt: now - days(39),
  },
];

async function seed() {
  // Uses whichever EMBEDDING_ADAPTER is configured — the embeddings stored here must
  // come from the same provider queries will later use, or cosine similarity is comparing
  // vectors from two different embedding spaces. Re-run this after switching adapters.
  const provider = getEmbeddingProvider();

  const batch = adminDb.batch();
  for (const incident of HISTORICAL_INCIDENTS) {
    const ref = adminDb.collection("historical_incidents").doc(incident.id);
    const embedding = await provider.embed(`${incident.title}. ${incident.summary}`);
    batch.set(ref, { ...incident, embedding });
  }
  await batch.commit();
  console.log(`[seed] wrote ${HISTORICAL_INCIDENTS.length} historical incidents to Firestore`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[seed] failed:", err);
    process.exit(1);
  });
