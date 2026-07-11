import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Evidence } from "@/types/evidence";

export function useEvidence(incidentId: string | undefined) {
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!incidentId) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "evidence"), where("incidentId", "==", incidentId));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Evidence);
        docs.sort((a, b) => a.collectedAt - b.collectedAt);
        setEvidence(docs);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [incidentId]);

  return { evidence, loading, error };
}
