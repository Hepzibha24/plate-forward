import { useRef, useState, MouseEvent } from "react";
import { MetricResult } from "@/types/evidence";

const STATUS_COLOR: Record<MetricResult["status"], string> = {
  critical: "#f87171",
  warning: "#fb923c",
  healthy: "#4ade80",
};

const WIDTH = 240;
const HEIGHT = 56;
const PAD = 6;

function scaleY(value: number, min: number, max: number): number {
  if (max === min) return HEIGHT / 2;
  const t = (value - min) / (max - min);
  return HEIGHT - PAD - t * (HEIGHT - PAD * 2);
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function MetricSparkline({ metric }: { metric: MetricResult }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (metric.series.length === 0) {
    return <div className="flex h-14 items-center text-xs text-slate-600">No data points</div>;
  }

  const values = metric.series.map((p) => p.value);
  const min = Math.min(...values, metric.baseline);
  const max = Math.max(...values, metric.baseline);

  const points = metric.series.map((p, i) => ({
    x: PAD + (i / Math.max(1, metric.series.length - 1)) * (WIDTH - PAD * 2),
    y: scaleY(p.value, min, max),
    point: p,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const baselineY = scaleY(metric.baseline, min, max);
  const last = points[points.length - 1]!;
  const color = STATUS_COLOR[metric.status];

  function handleMouseMove(e: MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let nearest = 0;
    let nearestDist = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - relX);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = i;
      }
    });
    setHoverIndex(nearest);
  }

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-14 w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <line x1={PAD} x2={WIDTH - PAD} y1={baselineY} y2={baselineY} stroke="#232d3d" strokeWidth={1} />
        <path d={pathD} fill="none" stroke="#64748b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {hovered && (
          <line x1={hovered.x} x2={hovered.x} y1={PAD} y2={HEIGHT - PAD} stroke="#334155" strokeWidth={1} />
        )}
        <circle cx={last.x} cy={last.y} r={6} fill="#111826" />
        <circle cx={last.x} cy={last.y} r={4} fill={color} />
        {hovered && hoverIndex !== points.length - 1 && (
          <circle cx={hovered.x} cy={hovered.y} r={3} fill="#94a3b8" />
        )}
      </svg>
      {hovered && (
        <div
          className="mono pointer-events-none absolute -top-7 rounded border border-panel-border bg-base-900 px-1.5 py-0.5 text-[10px] whitespace-nowrap text-slate-300 shadow-lg"
          style={{ left: `${(hovered.x / WIDTH) * 100}%`, transform: "translateX(-50%)" }}
        >
          {formatTime(hovered.point.timestamp)} · {hovered.point.value}
          {metric.unit}
        </div>
      )}
    </div>
  );
}
