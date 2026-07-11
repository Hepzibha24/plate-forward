import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export function Navbar({ title }: { title: string }) {
  const { user, role, logout } = useAuth();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-panel-border bg-base-900 px-6">
      <h1 className="text-sm font-semibold uppercase tracking-wide text-slate-300">{title}</h1>
      <div className="flex items-center gap-4">
        {role && (
          <span className="mono rounded bg-base-800 px-2 py-1 text-xs uppercase text-slate-400">
            {role}
          </span>
        )}
        <span className="text-sm text-slate-400">{user?.email}</span>
        <button
          onClick={() => logout()}
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-slate-400 hover:bg-base-800 hover:text-slate-200"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
