import { LogOut, Menu } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export function Navbar({ title, onMenuClick }: { title: string; onMenuClick: () => void }) {
  const { user, role, logout } = useAuth();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-panel-border bg-base-900 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={onMenuClick} className="text-slate-400 hover:text-slate-200 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="truncate text-sm font-semibold uppercase tracking-wide text-slate-300">{title}</h1>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        {role && (
          <span className="mono hidden rounded bg-base-800 px-2 py-1 text-xs uppercase text-slate-400 sm:inline-block">
            {role}
          </span>
        )}
        <span className="hidden max-w-[160px] truncate text-sm text-slate-400 sm:inline-block">
          {user?.email}
        </span>
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
