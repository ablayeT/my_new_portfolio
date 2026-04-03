"use client";
import * as React from "react";

export function CvSection({ title, icon, children }: {
  title: string; icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-card overflow-hidden">
      <div className="flex items-center gap-2.5 border-b bg-muted/30 px-5 py-3">
        {icon && <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</span>}
        <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground/70">{title}</h2>
      </div>
      <div className="px-5 py-5">{children}</div>
    </section>
  );
}