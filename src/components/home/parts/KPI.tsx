// src/components/home/parts/KPI.tsx
"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
        ? "text-red-600"
        : "text-slate-500";
  const chipBg =
    trend === "up"
      ? "bg-emerald-50 border-emerald-100"
      : trend === "down"
        ? "bg-red-50 border-red-100"
        : "bg-slate-50 border-slate-100";

  return (
    <Card
      ref={ref}
      className="transition-all hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/20"
    >
      <CardContent className="py-6">
        <div className="text-4xl font-bold tracking-tight">
          {display}
          {suffix}
        </div>
        <div className="mt-1 text-slate-500">{label}</div>
        {trendValue && (
          <div
            className={`mt-3 inline-flex items-center gap-2 rounded-md border px-2 py-1 text-sm ${chipBg} ${trendColor}`}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                trend === "up"
                  ? "bg-emerald-500"
                  : trend === "down"
                    ? "bg-red-500"
                    : "bg-slate-400"
              }`}
            />
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
