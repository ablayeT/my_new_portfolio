"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { FEATURED_CV_PROJECTS } from "@/data/cv/cv";

export function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {FEATURED_CV_PROJECTS.map((p) => (
        <Link key={p.id} href={p.href}
          className="group relative overflow-hidden rounded-xl border bg-muted/10 p-4 transition-all hover:bg-muted/30 hover:shadow-md">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground leading-snug">{p.title}</h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {p.chips.map((c) => (
              <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}