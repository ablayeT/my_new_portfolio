"use client";

import * as React from "react";

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cx(
      "relative w-full rounded-lg border p-4 text-sm",
      "border-[color:var(--tokens-border-muted)] bg-[color:var(--tokens-semantic-surface-card)] text-foreground",
      className
    )}
    {...props}
  />
));
Alert.displayName = "Alert";

export const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cx("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";
