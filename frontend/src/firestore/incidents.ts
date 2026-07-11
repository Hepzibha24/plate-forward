import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Incident } from "@/types/incident";

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "incidents"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setIncidents(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Incident));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  return { incidents, loading, error };
}
