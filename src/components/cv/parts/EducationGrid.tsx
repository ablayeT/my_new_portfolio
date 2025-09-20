"use client";

import * as React from "react";
import type { EducationEntry } from "@/data/cv/cvPage/types";

export function EducationGrid({ items }: { items: EducationEntry[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((ed, idx) => (
        <div key={idx} className="rounded-lg border p-4">
          <h3 className="text-base font-medium">{ed.title}</h3>
          <p className="text-sm font-medium text-primary/90">{ed.period}</p>
          <p className="text-sm text-muted-foreground">{ed.school}</p>
          {ed.details && (
            <p className="mt-1 text-sm text-muted-foreground">{ed.details}</p>
          )}
        </div>
      ))}
    </div>
  );
}
