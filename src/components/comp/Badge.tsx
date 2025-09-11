"use client";

import * as React from "react";
import { cn } from "./cn";

type Intent =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";
type Size = "sm" | "md";

export default interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: Intent;
  size?: Size;
}

const intentStyles: Record<Intent, string> = {
  primary: "bg-[color:var(--tokens-color-brand-purple,#6d28d9)] text-white",
  secondary:
    "bg-[color:var(--color-muted,#f3f4f6)] text-[var(--color-muted-foreground,#6b7280)] border border-[color:var(--color-border,#e5e7eb)]",
  success:
    "bg-[color:var(--color-feedback-success,#059669)]/10 text-[color:var(--color-feedback-success,#059669)] border border-[color:var(--color-feedback-success,#059669)]/20",
  warning:
    "bg-[color:var(--color-feedback-warning,#d97706)]/10 text-[color:var(--color-feedback-warning,#d97706)] border border-[color:var(--color-feedback-warning,#d97706)]/20",
  danger:
    "bg-[color:var(--color-feedback-danger,#dc2626)]/10 text-[color:var(--color-feedback-danger,#dc2626)] border border-[color:var(--color-feedback-danger,#dc2626)]/20",
  info: "bg-[color:var(--color-feedback-info,#2563eb)]/10 text-[color:var(--color-feedback-info,#2563eb)] border border-[color:var(--color-feedback-info,#2563eb)]/20",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-2 py-1 text-[12px] rounded-[8px]",
  md: "px-3 py-1.5 text-[13px] rounded-[10px]",
};

export const Badge: React.FC<BadgeProps> = ({
  intent = "secondary",
  size = "sm",
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center border font-medium",
        intentStyles[intent],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
};
