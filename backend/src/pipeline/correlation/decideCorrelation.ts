import { Alert } from "../ingestion/types.js";
import { Incident } from "../../types/incident.js";
import { areRelatedServices } from "./serviceDependencies.js";
import { CorrelationDecision } from "./types.js";

const DEDUP_WINDOW_MS = 3 * 60 * 1000;
const CORRELATION_WINDOW_MS = 10 * 60 * 1000;

function isOpen(incident: Incident): boolean {
  return incident.status !== "resolved";
}

/**
 * Pure decision function: given a newly-normalized alert and the most recently
 * active incidents (sorted newest-first by updatedAt), decide whether the alert
 * is noise (an exact repeat already tracked), should be grouped into an existing
 * incident (likely shared root cause), or should open a new incident.
 */
export function decideCorrelation(alert: Alert, recentIncidents: Incident[]): CorrelationDecision {
  const now = alert.receivedAt;

  // Rule 1 — duplicate/noise: the same alert already firing on the same service, very recently.
  for (const incident of recentIncidents) {
    if (!isOpen(incident)) continue;
    if (now - incident.updatedAt > DEDUP_WINDOW_MS) continue;
    if (incident.service === alert.service && (incident.alertNames ?? []).includes(alert.alertName)) {
      return {
        action: "duplicate",
        incidentId: incident.id,
        reason: `Same alert "${alert.alertName}" already firing on ${alert.service}; folded in as a duplicate signal, not counted as new evidence.`,
      };
    }
  }

  // Rule 2 — same-service correlation: another open incident on the same service, within the window.
  for (const incident of recentIncidents) {
    if (!isOpen(incident)) continue;
    if (now - incident.updatedAt > CORRELATION_WINDOW_MS) continue;
    if (incident.service === alert.service) {
      return {
        action: "correlate",
        incidentId: incident.id,
        reason: `Same service (${alert.service}) as an already-active incident within the last ${
          CORRELATION_WINDOW_MS / 60000
        } minutes; grouped as a likely shared root cause.`,
      };
    }
  }

  // Rule 3 — dependency-based cross-service correlation.
  for (const incident of recentIncidents) {
    if (!isOpen(incident)) continue;
    if (now - incident.updatedAt > CORRELATION_WINDOW_MS) continue;
    if (areRelatedServices(incident.service, alert.service)) {
      return {
        action: "correlate",
        incidentId: incident.id,
        reason: `${alert.service} is a known dependency of (or depends on) ${incident.service}, which has an active incident; grouped as a likely upstream/downstream cause.`,
      };
    }
  }

  return {
    action: "new_incident",
    reason: "No related open incident found within the correlation window; opened as a new incident.",
  };
}
