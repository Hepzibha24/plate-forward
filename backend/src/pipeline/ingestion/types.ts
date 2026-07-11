export type AlertSourceType = "mock" | "alertmanager" | "grafana";

export type AlertSeverity = "critical" | "warning" | "info";

/** Normalized internal representation — everything downstream of ingestion works with this, never the raw provider payload. */
export interface Alert {
  id: string;
  source: AlertSourceType;
  status: "firing" | "resolved";
  severity: AlertSeverity;
  service: string;
  alertName: string;
  summary: string;
  description: string;
  labels: Record<string, string>;
  annotations: Record<string, string>;
  startsAt: number;
  receivedAt: number;
  rawPayload: unknown;
}

/** Shape mirroring a Prometheus Alertmanager webhook alert entry — what MockAlertSource
 * produces today, and what a real Alertmanager webhook will send later. */
export interface AlertmanagerAlert {
  status: "firing" | "resolved";
  labels: Record<string, string>;
  annotations: Record<string, string>;
  startsAt: string;
  endsAt?: string;
  generatorURL?: string;
  fingerprint?: string;
}

export interface AlertmanagerWebhookPayload {
  receiver?: string;
  status?: "firing" | "resolved";
  alerts: AlertmanagerAlert[];
  groupLabels?: Record<string, string>;
  commonLabels?: Record<string, string>;
  commonAnnotations?: Record<string, string>;
}
