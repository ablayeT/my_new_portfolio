"use client";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@/data/cv/cvPage/types";

const LEVELS = {
  expert:       { dot: "bg-amber-400",  label: "Expert" },
  advanced:     { dot: "bg-blue-500",   label: "Avancé" },
  intermediate: { dot: "bg-muted-foreground/50", label: "Intermédiaire" },
};

function badgeVariant(level: string): "default" | "secondary" | "outline" {
  if (level === "expert") return "default";
  if (level === "advanced") return "secondary";
  return "outline";
}

export function SkillsGrid({ categories }: { categories: SkillCategory[] }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat.title} className="rounded-xl border bg-muted/10 p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{cat.title}</p>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((s) => {
                const cfg = LEVELS[s.level as keyof typeof LEVELS] ?? LEVELS.intermediate;
                return (
                  <Badge key={s.name} variant={badgeVariant(s.level)} className="gap-1.5 text-[11px]">
                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                    {s.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 rounded-lg border bg-muted/10 px-4 py-2.5 text-[11px] text-muted-foreground">
        {Object.entries(LEVELS).map(([, { dot, label }]) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${dot}`} /> {label}
          </span>
        ))}
      </div>
    </div>
  );
}