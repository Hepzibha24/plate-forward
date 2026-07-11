import { randomUUID } from "crypto";
import { AlertmanagerAlert } from "./types.js";
import { pickRandomTemplate } from "./mockAlertTemplates.js";

export function generateMockRawAlert(): AlertmanagerAlert {
  const template = pickRandomTemplate();
  return {
    status: "firing",
    labels: {
      alertname: template.alertname,
      service: template.service,
      severity: template.severity,
      ...template.extraLabels,
    },
    annotations: {
      summary: template.summary,
      description: template.description,
    },
    startsAt: new Date().toISOString(),
    generatorURL: "mock://generator",
    fingerprint: randomUUID(),
  };
}

export type MockAlertHandler = (raw: AlertmanagerAlert) => void | Promise<void>;

let intervalHandle: NodeJS.Timeout | null = null;

export function startMockGenerator(intervalMs: number, onAlert: MockAlertHandler) {
  if (intervalHandle) return;
  intervalHandle = setInterval(() => {
    void onAlert(generateMockRawAlert());
  }, intervalMs);
  console.log(`[mock-generator] started, emitting every ${intervalMs}ms`);
}

export function stopMockGenerator() {
  if (!intervalHandle) return;
  clearInterval(intervalHandle);
  intervalHandle = null;
  console.log("[mock-generator] stopped");
}
