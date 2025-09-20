"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FEATURED_CV_PROJECTS } from "@/data/cv/cv";

export function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {FEATURED_CV_PROJECTS.map((p) => (
        <Link
          key={p.id}
          href={p.href}
          className="rounded-lg border p-4 transition-shadow hover:shadow-sm"
        >
          <h3 className="text-sm font-medium text-foreground">{p.title}</h3>
          <div className="mt-2 flex flex-wrap gap-1">
            {p.chips.map((c) => (
              <Badge key={c} variant="secondary">
                {c}
              </Badge>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
