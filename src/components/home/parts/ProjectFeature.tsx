"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Network, ArrowRight, Target, Cpu } from "lucide-react";
import { THEME, PROJECT, ARCHITECTURE } from "@/data/home/home";
import { TechChip } from "./TechChip";
import { ArchitecturePreview } from "./ArchitecturePreview";

export function ProjectFeature({
  onNavigateToProject,
}: {
  onNavigateToProject?: () => void;
}) {
  const CTA = (
    <>
      Voir le projet
      <ArrowRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
    </>
  );

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md dark:hover:shadow-black/20">

      {/* ── Accent top ────────────────────────────────────── */}
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${THEME.brand}, transparent)` }} />

      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex flex-col items-start gap-3 border-b border-border bg-muted/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background">
            <Network size={20} style={{ color: THEME.brand }} />
          </span>
          <div>
            <h3 className="font-semibold text-foreground">{PROJECT.title}</h3>
            <p className="text-xs text-muted-foreground">{PROJECT.subtitle}</p>
          </div>
        </div>

        {onNavigateToProject ? (
          <Button size="sm" className="group shrink-0" onClick={onNavigateToProject}>
            {CTA}
          </Button>
        ) : (
          <Button size="sm" asChild className="group shrink-0">
            <Link href="/projects/purple-team">{CTA}</Link>
          </Button>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Objectifs */}
          <div className="rounded-xl border border-border bg-muted/10 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Target size={15} style={{ color: THEME.brand }} />
              <h4 className="text-sm font-semibold text-foreground">
                Objectifs du projet
              </h4>
            </div>
            <ul className="space-y-2">
              {PROJECT.objectives.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: THEME.brand }} />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="rounded-xl border border-border bg-muted/10 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Cpu size={15} style={{ color: THEME.brand }} />
              <h4 className="text-sm font-semibold text-foreground">
                Technologies utilisées
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {PROJECT.techs.map((t) => (
                <TechChip key={t}>{t}</TechChip>
              ))}
            </div>
          </div>

        </div>

        {/* Architecture */}
        <ArchitecturePreview
          sections={ARCHITECTURE.sections}
          flows={ARCHITECTURE.flows}
        />
      </div>
    </div>
  );
}