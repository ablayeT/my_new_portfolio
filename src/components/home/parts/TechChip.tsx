// src/components/home/parts/TechChip.tsx
"use client";

import * as React from "react";

export function TechChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-md text-xs"
      style={{
        padding:
          "var(--tokens-spacing-8, 0.5rem) var(--tokens-spacing-12, 0.75rem)",
        backgroundColor: "var(--color-muted, hsl(210 40% 96%))",
        color:
          "var(--tokens-semantic-text-muted, var(--color-muted-foreground))",
        borderRadius: "var(--tokens-radius-8, 0.5rem)",
      }}
    >
      {children}
    </span>
  );
}
