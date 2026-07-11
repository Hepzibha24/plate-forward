import { useState } from "react";
import { useUsers, updateUserRole } from "@/firestore/users";
import { Role } from "@/lib/authContext";
import { useAuth } from "@/lib/authContext";

const ROLES: Role[] = ["viewer", "responder", "admin"];

export function UserManagementPanel() {
  const { users, loading, error } = useUsers();
  const { user: currentUser } = useAuth();
  const [savingUid, setSavingUid] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleRoleChange(uid: string, role: Role) {
    setSavingUid(uid);
    setSaveError(null);
    try {
      await updateUserRole(uid, role);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setSavingUid(null);
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Loading users…</p>;
  if (error) return <p className="text-sm text-severity-critical">Failed to load users: {error}</p>;

  return (
    <div>
      {saveError && <p className="mb-2 text-sm text-severity-critical">{saveError}</p>}
      <div className="overflow-hidden rounded-md border border-panel-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-panel-border bg-base-800/60 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2 font-medium">Email</th>
              <th className="px-3 py-2 font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.uid} className="border-b border-panel-border last:border-0">
                <td className="px-3 py-2 text-slate-300">
                  {u.email}
                  {u.uid === currentUser?.uid && <span className="ml-1.5 text-xs text-slate-500">(you)</span>}
                </td>
                <td className="px-3 py-2">
                  <select
                    value={u.role}
                    disabled={savingUid === u.uid}
                    onChange={(e) => handleRoleChange(u.uid, e.target.value as Role)}
                    className="rounded border border-panel-border bg-base-800 px-2 py-1 text-xs text-slate-200 outline-none focus:border-accent-cyan disabled:opacity-50"
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
