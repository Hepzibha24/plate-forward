import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { RCAResult } from "@/types/rca";

export function useRCA(incidentId: string | undefined) {
  const [rca, setRca] = useState<RCAResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!incidentId) {
      setLoading(false);
      return;
    }
    const unsubscribe = onSnapshot(
      doc(db, "rca_results", incidentId),
      (snapshot) => {
        setRca(snapshot.exists() ? (snapshot.data() as RCAResult) : null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [incidentId]);

  return { rca, loading, error };
}
