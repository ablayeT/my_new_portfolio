"use client";

import * as React from "react";
import type { Experience } from "@/data/cv/cvPage/types";

export function ExperiencesList({ items }: { items: Experience[] }) {
  return (
    <div className="space-y-8">
      {items.map((exp, i) => (
        <article key={i} className="relative rounded-lg border p-4 md:p-5">
          <span className="absolute left-0 top-0 hidden h-full w-1 rounded-l bg-primary/80 md:block" />
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <h3 className="text-base font-medium text-foreground md:text-lg">
              {exp.title}
            </h3>
            <span className="text-xs font-medium text-muted-foreground md:text-sm">
              {exp.period}
            </span>
          </div>
          <p className="mb-3 mt-1 text-sm font-medium text-primary/90">
            {exp.company}
          </p>
          <ul className="list-outside space-y-2 pl-0 text-sm text-muted-foreground">
            {exp.tasks.map((t, k) => (
              <li key={k}>• {t}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
