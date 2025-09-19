import React from "react";
// import React from "react";
import { cn } from "@/lib/utils";
// eslint-disable-next-line @typescript-eslint/no-require-imports
// import React = require("react");

export interface PurpleCardProps {
  elev?: 0 | 1 | 2;
  withHeader?: boolean;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const elevationVariants = {
  0: "border border-[var(--color-neutral-300)]",
  1: "shadow-[var(--shadow-sm)] border border-[var(--color-neutral-300)]",
  2: "shadow-[var(--shadow-md)] border border-[var(--color-neutral-300)]",
};

export const PurpleCard: React.FC<PurpleCardProps> = ({
  elev = 0,
  withHeader = false,
  header,
  children,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "bg-[var(--color-neutral-0)] rounded-[var(--radius-12)] overflow-hidden",
        elevationVariants[elev],
        "dark:bg-[var(--color-neutral-900)] dark:border-[var(--color-neutral-700)]",
        className
      )}
    >
      {withHeader && header && (
        <div className="px-6 py-4 border-b border-[var(--color-neutral-300)] dark:border-[var(--color-neutral-700)]">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
