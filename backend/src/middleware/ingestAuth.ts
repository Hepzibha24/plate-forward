import type { NextFunction, Request, Response } from "express";

/** Machine-to-machine auth for webhook-style ingestion (Alertmanager/Grafana won't carry a Firebase ID token). */
export function requireIngestKey(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.INGEST_API_KEY;
  if (!expected) {
    next();
    return;
  }

  if (req.headers["x-ingest-key"] !== expected) {
    res.status(401).json({ error: "Invalid or missing ingest key" });
    return;
  }
  next();
}
