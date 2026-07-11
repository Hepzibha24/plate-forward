import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Role } from "@/lib/authContext";
import { UserProfile } from "@/types/user";

export function useUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        setUsers(snapshot.docs.map((d) => ({ uid: d.id, ...d.data() }) as UserProfile));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  return { users, loading, error };
}

export function updateUserRole(uid: string, role: Role) {
  return updateDoc(doc(db, "users", uid), { role });
}
