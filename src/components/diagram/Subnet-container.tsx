"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SubnetContainerProps {
  title: string;
  subnetType: "public" | "dmz" | "private";
  children: React.ReactNode;
  className?: string;
}

const subnetStyles: Record<SubnetContainerProps["subnetType"], string> = {
  public:
    "border-[var(--color-feedback-warning)] bg-[var(--color-feedback-warning)]/5",
  dmz: "border-[var(--color-accent-amber)] bg-[var(--color-accent-amber)]/5",
  private:
    "border-[var(--color-brand-security-green)] bg-[var(--color-brand-security-green)]/5",
};

export const SubnetContainer: React.FC<SubnetContainerProps> = ({
  title,
  subnetType,
  children,
  className,
}) => (
  <section
    className={cn(
      "relative rounded-[var(--radius-16)] border-2 border-dashed p-4 dark:bg-opacity-10",
      subnetStyles[subnetType],
      className
    )}
    aria-label={title}
  >
    <div className="absolute -top-3 left-4 bg-background px-2">
      <span className="text-sm font-semibold text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-300)]">
        {title}
      </span>
    </div>
    <div className="mt-4">{children}</div>
  </section>
);
