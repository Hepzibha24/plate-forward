/** Static, best-effort dependency map for the mock service topology. Used only to
 * decide whether two alerts on different services plausibly share a root cause
 * (e.g. a DB issue and an outage on a service that depends on that DB). */
const SERVICE_DEPENDENCIES: Record<string, string[]> = {
  "payment-service": ["payments-primary-db", "routing-service", "notification-service"],
  "refund-service": ["payments-primary-db", "payment-service"],
  "merchant-service": ["payment-service"],
  "routing-service": ["payments-primary-db"],
  "settlement-worker": ["payments-primary-db"],
  "notification-service": [],
  "payments-primary-db": [],
  "payments-replica-db": ["payments-primary-db"],
};

export function areRelatedServices(a: string, b: string): boolean {
  if (a === b) return true;
  const aDeps = SERVICE_DEPENDENCIES[a] ?? [];
  const bDeps = SERVICE_DEPENDENCIES[b] ?? [];
  return aDeps.includes(b) || bDeps.includes(a);
}
