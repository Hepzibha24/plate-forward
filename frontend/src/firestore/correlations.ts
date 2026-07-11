import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Correlation } from "@/types/correlation";

export function useCorrelation(incidentId: string | undefined) {
  const [correlation, setCorrelation] = useState<Correlation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!incidentId) {
      setLoading(false);
      return;
    }
    const unsubscribe = onSnapshot(
      doc(db, "correlations", incidentId),
      (snapshot) => {
        setCorrelation(snapshot.exists() ? (snapshot.data() as Correlation) : null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [incidentId]);

  return { correlation, loading, error };
}
