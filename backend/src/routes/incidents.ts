import { Router } from "express";
import { adminDb } from "../services/firebaseAdmin.js";
import { requireAuth } from "../middleware/auth.js";

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
