import { Router } from "express";
import { requireIngestKey } from "../middleware/ingestAuth.js";
import { ingestAlert } from "../pipeline/orchestrator.js";
import { AlertmanagerWebhookPayload } from "../pipeline/ingestion/types.js";

export const alertsRouter = Router();

alertsRouter.post("/ingest", requireIngestKey, async (req, res) => {
  const payload = req.body as AlertmanagerWebhookPayload;
  if (!Array.isArray(payload?.alerts) || payload.alerts.length === 0) {
    res.status(400).json({ error: "Expected an Alertmanager-shaped payload with a non-empty 'alerts' array" });
    return;
  }

  try {
    const incidents = await Promise.all(payload.alerts.map((raw) => ingestAlert(raw, "alertmanager")));
    res.status(201).json({ incidents });
  } catch (err) {
    console.error("[alerts.ingest] failed", err);
    res.status(500).json({ error: "Failed to ingest alert(s)" });
  }
});
