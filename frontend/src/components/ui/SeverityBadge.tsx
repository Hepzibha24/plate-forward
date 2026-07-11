import { Severity } from "@/types/incident";

const STYLES: Record<Severity, string> = {
  critical: "text-severity-critical border-severity-critical/40 bg-severity-critical/10",
  warning: "text-severity-warning border-severity-warning/40 bg-severity-warning/10",
  info: "text-severity-info border-severity-info/40 bg-severity-info/10",
  healthy: "text-severity-healthy border-severity-healthy/40 bg-severity-healthy/10",
};

const LABELS: Record<Severity, string> = {
  critical: "Critical",
  warning: "Warning",
  info: "Info",
  healthy: "Healthy",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-mono font-medium uppercase tracking-wide ${STYLES[severity]}`}
    >
      <StatusDot severity={severity} />
      {LABELS[severity]}
    </span>
  );
}

export function StatusDot({ severity }: { severity: Severity }) {
  const color: Record<Severity, string> = {
    critical: "bg-severity-critical",
    warning: "bg-severity-warning",
    info: "bg-severity-info",
    healthy: "bg-severity-healthy",
  };
  const pulse = severity === "critical" || severity === "warning" ? "animate-pulse-dot" : "";
  return <span className={`h-1.5 w-1.5 rounded-full ${color[severity]} ${pulse}`} />;
}
