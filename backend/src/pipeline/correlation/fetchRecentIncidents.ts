import { adminDb } from "../../services/firebaseAdmin.js";
import { Incident } from "../../types/incident.js";

export async function fetchRecentIncidents(limit = 25): Promise<Incident[]> {
  const snapshot = await adminDb.collection("incidents").orderBy("updatedAt", "desc").limit(limit).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Incident);
}
