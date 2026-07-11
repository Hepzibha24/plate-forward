import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
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

export function useIncident(id: string | undefined) {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const unsubscribe = onSnapshot(
      doc(db, "incidents", id),
      (snapshot) => {
        setIncident(snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as Incident) : null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [id]);

  return { incident, loading, error };
}
