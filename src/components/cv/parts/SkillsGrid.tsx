"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@/data/cv/cvPage/types";

function getBadgeVariant(level: string): "default" | "secondary" | "outline" {
  if (level === "expert") return "default";
  if (level === "advanced") return "secondary";
  return "outline";
}

export function SkillsGrid({ categories }: { categories: SkillCategory[] }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {categories.map((category) => (
          <div key={category.title} className="space-y-3">
            <h3 className="text-sm font-medium text-foreground md:text-base">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((s) => (
                <Badge
                  key={s.name}
                  variant={getBadgeVariant(s.level)}
                  className="gap-2"
                >
                  {s.level === "expert" && (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                  )}
                  {s.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-accent/30 p-4">
        <h4 className="mb-2 text-sm font-medium">Niveau de maîtrise</h4>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
            Expert
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
            Avancé
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />
            Intermédiaire/Débutant
          </span>
        </div>
      </div>
    </div>
  );
}
