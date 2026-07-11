import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { ingestAlert } from "../pipeline/orchestrator.js";
import { generateMockRawAlert } from "../pipeline/ingestion/mockGenerator.js";

export const mockRouter = Router();

mockRouter.use(requireAuth, requireRole("responder", "admin"));

mockRouter.post("/generate", async (req, res) => {
  const count = Math.min(Math.max(Number(req.query.count) || 1, 1), 20);

  try {
    const incidents = [];
    for (let i = 0; i < count; i++) {
      incidents.push(await ingestAlert(generateMockRawAlert(), "mock"));
    }
    res.status(201).json({ incidents });
  } catch (err) {
    console.error("[mock.generate] failed", err);
    res.status(500).json({ error: "Failed to generate mock alert(s)" });
  }
});
