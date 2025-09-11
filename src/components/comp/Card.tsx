"use client";

import * as React from "react";
import { cn } from "./cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elev?: 0 | 1 | 2;
  withHeader?: boolean;
  header?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  elev = 1,
  withHeader = false,
  header,
  className,
  children,
  ...rest
}) => {
  const base =
    "rounded-[var(--tokens-radius-12,12px)] bg-white dark:bg-[var(--color-neutral-900,#0b1324)] border border-[var(--color-border,#e5e7eb)] dark:border-[var(--color-neutral-700,#374151)]";
  const shadow =
    elev === 2
      ? "shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      : elev === 1
        ? "shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
        : "";

  return (
    <div className={cn(base, shadow, "p-6", className)} {...rest}>
      {withHeader && header ? <div className="mb-4">{header}</div> : null}
      {children}
    </div>
  );
};
