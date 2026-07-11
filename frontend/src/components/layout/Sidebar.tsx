import { NavLink } from "react-router-dom";
import { Activity, LayoutGrid, Settings, Radar } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Live Feed", icon: Radar, end: true },
  { to: "/categories", label: "Categories", icon: LayoutGrid },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-panel-border bg-base-900">
      <div className="flex items-center gap-2 px-5 py-5">
        <Activity className="h-5 w-5 text-accent-cyan" />
        <span className="mono text-sm font-semibold text-slate-100">PAYMENT&nbsp;IOC</span>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-base-800 text-accent-cyan"
                  : "text-slate-400 hover:bg-base-800 hover:text-slate-200"
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
