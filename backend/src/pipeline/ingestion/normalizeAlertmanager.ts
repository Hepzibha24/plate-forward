import { randomUUID } from "crypto";
import { Alert, AlertmanagerAlert, AlertmanagerWebhookPayload, AlertSeverity, AlertSourceType } from "./types.js";

function toSeverity(raw: string | undefined): AlertSeverity {
  const value = raw?.toLowerCase();
  if (value === "critical" || value === "warning" || value === "info") return value;
  return "info";
}

export function normalizeAlertmanagerAlert(raw: AlertmanagerAlert, source: AlertSourceType): Alert {
  const labels = raw.labels ?? {};
  const annotations = raw.annotations ?? {};

  return {
    id: raw.fingerprint ?? randomUUID(),
    source,
    status: raw.status,
    severity: toSeverity(labels.severity),
    service: labels.service ?? labels.job ?? "unknown-service",
    alertName: labels.alertname ?? "UnknownAlert",
    summary: annotations.summary ?? labels.alertname ?? "Alert fired",
    description: annotations.description ?? "",
    labels,
    annotations,
    startsAt: raw.startsAt ? new Date(raw.startsAt).getTime() : Date.now(),
    receivedAt: Date.now(),
    rawPayload: raw,
  };
}

export function normalizeAlertmanagerWebhook(
  payload: AlertmanagerWebhookPayload,
  source: AlertSourceType = "alertmanager",
): Alert[] {
  return payload.alerts.map((alert) => normalizeAlertmanagerAlert(alert, source));
}
