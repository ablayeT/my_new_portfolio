"use client";

import * as React from "react";

export function TechChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
      {children}
    </span>
  );
}