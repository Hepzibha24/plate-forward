import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/lib/authContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-base-950 text-slate-500">
        <span className="mono text-sm">Loading…</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
