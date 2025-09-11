import React from "react";
import { cn } from "../ui/utils";

export default interface PurpleBadgeProps {
  intent?: "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const badgeVariants = {
  intent: {
    info: "bg-[var(--tokens-semantic-state-info)]/10 text-[var(--tokens-semantic-text-default)] border border-[var(--tokens-semantic-border-default)]",
    success:
      "bg-[var(--tokens-semantic-state-success)]/10 text-[var(--tokens-semantic-text-default)] border border-[var(--tokens-semantic-border-default)]",
    warning:
      "bg-[var(--tokens-semantic-state-warning)]/10 text-[var(--tokens-semantic-text-default)] border border-[var(--tokens-semantic-border-default)]",
    danger:
      "bg-[var(--tokens-semantic-state-danger)]/10 text-[var(--tokens-semantic-text-default)] border border-[var(--tokens-semantic-border-default)]",
  },
  size: {
    sm: "px-[var(--tokens-spacing-8)] py-[var(--tokens-spacing-4)] text-[10px] min-h-[20px]",
    md: "px-[var(--tokens-spacing-8)] py-[var(--tokens-spacing-4)] text-[var(--tokens-text-caption-12)] min-h-[24px]",
    lg: "px-[var(--tokens-spacing-12)] py-[var(--tokens-spacing-8)] text-[var(--tokens-text-body-14)] min-h-[28px]",
  },
};

export const PurpleBadge: React.FC<PurpleBadgeProps> = ({
  intent = "info",
  size = "md",
  children,
  className = "",
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors",
        "rounded-[var(--tokens-radius-8)]",
        badgeVariants.intent[intent],
        badgeVariants.size[size],
        className
      )}
    >
      {children}
    </span>
  );
};
