"use client";
import * as React from "react";
import type { EducationEntry } from "@/data/cv/cvPage/types";

const SCHOOL_COLORS: Record<string, string> = {
  "OTERIA": "bg-violet-500/10 text-violet-500 border-violet-500/30",
  "ALT-RH": "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "WebForce3": "bg-primary/10 text-primary border-primary/30",
  default: "bg-muted text-muted-foreground border-border",
};

export function EducationGrid({ items }: { items: EducationEntry[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((ed, idx) => {
        const colorKey = Object.keys(SCHOOL_COLORS).find(k => ed.school?.includes(k)) ?? "default";
        const color = SCHOOL_COLORS[colorKey];
        return (
          <div key={idx} className="rounded-xl border bg-muted/10 p-4 hover:bg-muted/30 transition-colors">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${color}`}>
                {ed.school}
              </div>
              <span className="text-[11px] text-muted-foreground shrink-0">{ed.period}</span>
            </div>
            <h3 className="text-sm font-semibold text-foreground leading-snug">{ed.title}</h3>
            {ed.details && <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{ed.details}</p>}
          </div>
        );
      })}
    </div>
  );
}