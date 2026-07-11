import "dotenv/config";
import { adminDb } from "../services/firebaseAdmin.js";

interface SeedIncident {
  id: string;
  category: string;
  subType: string;
  title: string;
  summary: string;
  severity: "critical" | "warning" | "info" | "healthy";
  status: "investigating" | "identified" | "monitoring" | "resolved";
  alertIds: string[];
  createdAt: number;
  updatedAt: number;
}

const now = Date.now();
const minutes = (n: number) => n * 60 * 1000;

const MOCK_INCIDENTS: SeedIncident[] = [
  {
    id: "INC-1001",
    category: "transaction_health",
    subType: "payment_success_rate_drop",
    title: "Payment success rate dropped 12% in checkout-eu",
    summary:
      "Success rate for card payments in the EU region fell from 98.4% to 86.1% over 8 minutes, concentrated on Visa transactions routed through psp-adyen.",
    severity: "critical",
    status: "investigating",
    alertIds: ["ALT-4001", "ALT-4002", "ALT-4003"],
    createdAt: now - minutes(6),
    updatedAt: now - minutes(1),
  },
  {
    id: "INC-1002",
    category: "external_payment_partners",
    subType: "psp_timeout",
    title: "Elevated timeouts from PSP Adyen",
    summary:
      "p95 response time from the Adyen authorization endpoint climbed to 4.2s, well above the 800ms baseline, correlated with INC-1001.",
    severity: "critical",
    status: "identified",
    alertIds: ["ALT-4004", "ALT-4005"],
    createdAt: now - minutes(7),
    updatedAt: now - minutes(2),
  },
  {
    id: "INC-1003",
    category: "database",
    subType: "connection_pool_exhausted",
    title: "Connection pool exhausted on payments-primary-db",
    summary:
      "Connection pool utilization hit 100% on payments-primary-db for ~4 minutes, causing query queuing across the payment-service.",
    severity: "warning",
    status: "monitoring",
    alertIds: ["ALT-3987"],
    createdAt: now - minutes(42),
    updatedAt: now - minutes(20),
  },
  {
    id: "INC-1004",
    category: "messaging_systems",
    subType: "kafka_consumer_lag",
    title: "Consumer lag building on settlement-events topic",
    summary:
      "Consumer group settlement-writer is lagging by ~48k messages, growing at ~600 msgs/min, on the settlement-events topic.",
    severity: "warning",
    status: "investigating",
    alertIds: ["ALT-4010", "ALT-4011"],
    createdAt: now - minutes(15),
    updatedAt: now - minutes(3),
  },
  {
    id: "INC-1005",
    category: "microservice_health",
    subType: "refund_service_timeout",
    title: "Refund Service timing out on batch refunds",
    summary:
      "refund-service p99 latency exceeded 12s during the 02:00 batch refund job, triggering downstream timeouts in merchant-service.",
    severity: "info",
    status: "resolved",
    alertIds: ["ALT-3820"],
    createdAt: now - minutes(300),
    updatedAt: now - minutes(240),
  },
  {
    id: "INC-1006",
    category: "merchant_issues",
    subType: "wrong_api_version",
    title: "Merchant 'acme-retail' calling deprecated API v1",
    summary:
      "18% of requests from merchant acme-retail are hitting the deprecated /v1/payments endpoint, scheduled for sunset next month.",
    severity: "info",
    status: "monitoring",
    alertIds: ["ALT-4020"],
    createdAt: now - minutes(90),
    updatedAt: now - minutes(60),
  },
  {
    id: "INC-1007",
    category: "infrastructure",
    subType: "high_cpu_utilization",
    title: "CPU saturation on payment-service pods (us-east-1)",
    summary:
      "Average CPU utilization across payment-service pods in us-east-1 has held above 92% for 10 minutes, close to autoscaler ceiling.",
    severity: "healthy",
    status: "resolved",
    alertIds: ["ALT-3750", "ALT-3751"],
    createdAt: now - minutes(600),
    updatedAt: now - minutes(560),
  },
];

async function seed() {
  const batch = adminDb.batch();
  for (const incident of MOCK_INCIDENTS) {
    const ref = adminDb.collection("incidents").doc(incident.id);
    batch.set(ref, incident);
  }
  await batch.commit();
  console.log(`[seed] wrote ${MOCK_INCIDENTS.length} mock incidents to Firestore`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[seed] failed:", err);
    process.exit(1);
  });
