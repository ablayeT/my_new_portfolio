"use client";

import * as React from "react";

/** Mini utilitaire "cn" pour concaténer les classes (autonome) */
function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export interface KPIProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  /** Active l’animation du compteur si `value` est numérique (par défaut: true) */
  animate?: boolean;
  /** Durée de l’animation (ms) – par défaut 900ms */
  durationMs?: number;
  /** Nombre de décimales si `value` est un nombre à virgule */
  decimalPlaces?: number;
}

const trendConfig = {
  up: {
    color: "text-[var(--color-feedback-success,#059669)]",
    bg: "bg-[color:var(--color-feedback-success,#059669)]/10 border-[color:var(--color-feedback-success,#059669)]/20",
    symbol: "↑",
  },
  down: {
    color: "text-[var(--color-feedback-danger,#dc2626)]",
    bg: "bg-[color:var(--color-feedback-danger,#dc2626)]/10 border-[color:var(--color-feedback-danger,#dc2626)]/20",
    symbol: "↓",
  },
  neutral: {
    color: "text-[var(--color-neutral-500,#6b7280)]",
    bg: "bg-[color:var(--color-neutral-500,#6b7280)]/10 border-[color:var(--color-neutral-500,#6b7280)]/20",
    symbol: "→",
  },
} as const;

export const KPI: React.FC<KPIProps> = ({
  label,
  value,
  unit,
  trend,
  trendValue,
  className = "",
  animate = true,
  durationMs = 900,
  decimalPlaces = 0,
}) => {
  const isNumber = typeof value === "number" && !Number.isNaN(value);
  const [display, setDisplay] = React.useState<number>(isNumber ? 0 : 0);
  const [visible, setVisible] = React.useState(!animate); // si pas d’anim, inutile d’attendre l’intersection
  const ref = React.useRef<HTMLDivElement | null>(null);

  // Observe l’entrée dans le viewport pour déclencher l’animation
  React.useEffect(() => {
    if (!animate || !isNumber) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animate, isNumber]);

  // Animation count-up
  React.useEffect(() => {
    if (!animate || !isNumber || !visible) return;
    let start: number | null = null;
    const from = 0;
    const to = value as number;
    const duration = Math.max(200, durationMs);

    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const current = from + (to - from) * eased;
      setDisplay(current);
      if (p < 1) requestAnimationFrame(step);
    };

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [animate, isNumber, visible, value, durationMs]);

  const trendInfo = trend ? trendConfig[trend] : null;

  // Valeur finale affichée
  const shown =
    isNumber && (animate ? visible : true)
      ? (display as number).toFixed(decimalPlaces)
      : isNumber
        ? (value as number).toFixed(decimalPlaces)
        : (value as string);

  return (
    <div
      ref={ref}
      className={cn(
        // Style Figma avec fallbacks de couleurs / rayons
        "rounded-[var(--radius-12,0.75rem)] border p-6 bg-white",
        "border-[var(--color-neutral-300,#e5e7eb)]",
        "dark:bg-[var(--color-neutral-900,#0b1324)] dark:border-[var(--color-neutral-700,#374151)]",
        "hover:shadow-sm transition-shadow",
        className
      )}
      aria-live="polite"
    >
      <div className="mb-2 text-sm text-[var(--color-neutral-500,#6b7280)] dark:text-[var(--color-neutral-400,#9ca3af)]">
        {label}
      </div>

      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[var(--color-neutral-950,#0b1324)] dark:text-[var(--color-neutral-0,#ffffff)]">
          {shown}
        </span>
        {unit && (
          <span className="text-lg text-[var(--color-neutral-500,#6b7280)] dark:text-[var(--color-neutral-400,#9ca3af)]">
            {unit}
          </span>
        )}
      </div>

      {trendInfo && trendValue && (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm",
            trendInfo.bg,
            trendInfo.color
          )}
        >
          <span>{trendInfo.symbol}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
};
