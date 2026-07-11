import { Router } from "express";
import { adminDb } from "../services/firebaseAdmin.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { runRCA } from "../pipeline/rca/runRCA.js";

export const incidentsRouter = Router();

incidentsRouter.use(requireAuth);

incidentsRouter.get("/", async (req, res) => {
  const { category, status, severity } = req.query;

  let query: FirebaseFirestore.Query = adminDb.collection("incidents");
  if (typeof category === "string") query = query.where("category", "==", category);
  if (typeof status === "string") query = query.where("status", "==", status);
  if (typeof severity === "string") query = query.where("severity", "==", severity);

  const snapshot = await query.orderBy("createdAt", "desc").get();
  res.json(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
});

incidentsRouter.get("/:id", async (req, res) => {
  const doc = await adminDb.collection("incidents").doc(req.params.id).get();
  if (!doc.exists) {
    res.status(404).json({ error: "Incident not found" });
    return;
  }
  res.json({ id: doc.id, ...doc.data() });
});

incidentsRouter.post("/:id/rerun-rca", requireRole("responder", "admin"), async (req, res) => {
  const doc = await adminDb.collection("incidents").doc(req.params.id).get();
  if (!doc.exists) {
    res.status(404).json({ error: "Incident not found" });
    return;
  }

  try {
    const result = await runRCA(req.params.id);
    res.json(result);
  } catch (err) {
    console.error("[rerun-rca] failed", err);
    res.status(500).json({ error: "Failed to re-run root cause analysis" });
  }
});
