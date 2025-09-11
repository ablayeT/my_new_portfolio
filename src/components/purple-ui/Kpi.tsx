import React from "react";
import { cn } from "../ui/utils";

export interface KPIProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const trendConfig = {
  up: { color: "text-[var(--color-feedback-success)]", symbol: "↑" },
  down: { color: "text-[var(--color-feedback-danger)]", symbol: "↓" },
  neutral: { color: "text-[var(--color-neutral-500)]", symbol: "→" },
};

export const KPI: React.FC<KPIProps> = ({
  label,
  value,
  unit,
  trend,
  trendValue,
  className = "",
}) => {
  const trendInfo = trend ? trendConfig[trend] : null;

  return (
    <div
      className={cn(
        "bg-white border border-[var(--color-neutral-300)] rounded-[var(--radius-12)] p-6",
        "dark:bg-[var(--color-neutral-900)] dark:border-[var(--color-neutral-700)]",
        className
      )}
    >
      <div className="text-sm text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)] mb-2">
        {label}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-0)]">
          {value}
        </span>
        {unit && (
          <span className="text-lg text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)]">
            {unit}
          </span>
        )}
      </div>

      {trendInfo && trendValue && (
        <div className={cn("flex items-center gap-1 text-sm", trendInfo.color)}>
          <span>{trendInfo.symbol}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
};
