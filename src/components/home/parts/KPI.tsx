"use client";

import * as React from "react";
import type { KPITrend } from "@/data/home/home";

export function KPI({
  label,
  value,
  suffix = "",
  trend = "neutral",
  trendValue,
}: {
  label: string;
  value: number;
  suffix?: string;
  trend?: KPITrend;
  trendValue?: string;
}) {
  const [display, setDisplay] = React.useState(0);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const duration = 900;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(value * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [visible, value]);

  const trendColor =
    trend === "up" ? "text-emerald-600 dark:text-emerald-400"
    : trend === "down" ? "text-red-600"
    : "text-slate-500";

  const chipBg =
    trend === "up" ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800"
    : trend === "down" ? "bg-red-50 border-red-200 dark:bg-red-900/20"
    : "bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700";

  const dotColor =
    trend === "up" ? "bg-emerald-500"
    : trend === "down" ? "bg-red-500"
    : "bg-slate-400";

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/20"
    >
      <div className="text-4xl font-bold tracking-tight text-foreground">
        {display}{suffix}
      </div>
      <div className="mt-1.5 text-sm text-muted-foreground">{label}</div>
      {trendValue && (
        <div className={`mt-3 inline-flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs font-medium ${chipBg} ${trendColor}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
          {trendValue}
        </div>
      )}
    </div>
  );
}