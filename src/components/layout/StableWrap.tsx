// src/components/layout/StableWrap.tsx
"use client";
import * as React from "react";

type Props = {
  children: React.ReactNode;
  className?: string; // outer wrapper (border/gradient)
  contentClassName?: string; // inner content (padding etc.)
  glow?: boolean;
};

export function StableWrap({
  children,
  className = "",
  contentClassName = "p-4 sm:p-6", // ✅ default padding
  glow = true,
}: Props) {
  return (
    <div
      className={[
        "relative rounded-2xl",
        "border border-[color:var(--color-border,#e5e7eb)]",
        "shadow-[0_8px_28px_rgba(2,6,23,0.08)]",
        "dark:border-transparent dark:p-[1px]",
        "dark:bg-gradient-to-br dark:from-[#6d28d9] dark:via-[#7c3aed] dark:to-[#0ea5e9]",
        glow ? "dark:shadow-[0_18px_60px_-20px_rgba(109,40,217,0.45)]" : "",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "rounded-2xl bg-white",
          "dark:bg-[color:var(--color-neutral-900,#0b1220)]/80",
          "dark:border-transparent dark:backdrop-blur-md",
          contentClassName, // ✅ padding here
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
