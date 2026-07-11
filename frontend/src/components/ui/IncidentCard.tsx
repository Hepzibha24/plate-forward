import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";
import { CATEGORY_LABELS, formatSubType, Incident } from "@/types/incident";
import { SeverityBadge } from "./SeverityBadge";
import { ClassificationChip } from "./ClassificationChip";

const GLOW: Record<Incident["severity"], string> = {
  critical: "hover:shadow-glow-critical",
  warning: "hover:shadow-glow-warning",
  info: "hover:shadow-glow",
  healthy: "hover:shadow-glow-healthy",
};

export function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <Link
      to={`/incidents/${incident.id}`}
      className={`panel block p-4 transition-shadow duration-200 ${GLOW[incident.severity]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mono text-xs text-slate-500">{incident.id}</p>
          <h3 className="mt-1 truncate text-sm font-semibold text-slate-100">{incident.title}</h3>
        </div>
        <SeverityBadge severity={incident.severity} />
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-slate-400">{incident.summary}</p>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span className="rounded bg-base-800 px-2 py-0.5 font-mono">
          {CATEGORY_LABELS[incident.category]} · {formatSubType(incident.subType)}
        </span>
        <span className="capitalize">{incident.status}</span>
      </div>

      {(incident.classification || incident.alertIds.length > 1) && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {incident.classification && <ClassificationChip classification={incident.classification} />}
          {incident.alertIds.length > 1 && (
            <span className="mono inline-flex items-center gap-1.5 rounded border border-panel-border bg-base-800 px-2 py-0.5 text-[11px] text-slate-400">
              <Link2 className="h-3 w-3" />
              {incident.alertIds.length} alerts grouped
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
