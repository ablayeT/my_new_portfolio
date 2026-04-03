"use client";
import * as React from "react";
import type { Experience } from "@/data/cv/cvPage/types";

export function ExperiencesList({ items }: { items: Experience[] }) {
  return (
    <div className="relative space-y-3 pl-5">
      <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />
      {items.map((exp, i) => (
        <article key={i} className="relative">
          <div className={`absolute -left-5 top-3 h-3 w-3 rounded-full border-2 ${exp.current ? "border-emerald-500 bg-emerald-500/20" : "border-primary/60 bg-background"}`} />
          <div className={`rounded-xl border p-4 transition-colors hover:bg-muted/30 ${exp.current ? "border-emerald-500/30 bg-emerald-500/5" : ""}`}>
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{exp.title}</h3>
                  {exp.current && (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">● En cours</span>
                  )}
                </div>
                <p className="text-xs font-medium text-primary/80 mt-0.5">{exp.company}</p>
              </div>
              <span className="shrink-0 rounded-md border bg-muted/60 px-2.5 py-0.5 text-[11px] text-muted-foreground">{exp.period}</span>
            </div>
            <ul className="space-y-1.5">
              {exp.tasks.map((t, k) => (
                <li key={k} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}