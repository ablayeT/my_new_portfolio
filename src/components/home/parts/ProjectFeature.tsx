// src/components/home/parts/ProjectFeature.tsx
"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, ArrowRight } from "lucide-react";
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
      <ArrowRight
        size={16}
        className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </>
  );

  return (
    <Card className="mx-auto max-w-5xl transition-all hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-black/20">
      <CardHeader>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Network size={24} style={{ color: THEME.brand }} />
            <div>
              <h3
                className="font-semibold"
                style={{ color: "var(--color-foreground)" }}
              >
                {PROJECT.title}
              </h3>
              <p
                className="text-xs"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                {PROJECT.subtitle}
              </p>
            </div>
          </div>

          {onNavigateToProject ? (
            <Button size="sm" className="group" onClick={onNavigateToProject}>
              {CTA}
            </Button>
          ) : (
            <Button size="sm" asChild className="group">
              <Link href="/projects/purple-team">{CTA}</Link>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h4
              className="mb-3 font-semibold"
              style={{ color: "var(--color-foreground)" }}
            >
              Objectifs du projet
            </h4>
            <ul
              className="space-y-2 text-sm"
              style={{ color: THEME.textMuted }}
            >
              {PROJECT.objectives.map((o) => (
                <li key={o}>• {o}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="mb-3 font-semibold"
              style={{ color: "var(--color-foreground)" }}
            >
              Technologies utilisées
            </h4>
            <div className="flex flex-wrap gap-2">
              {PROJECT.techs.map((t) => (
                <TechChip key={t}>{t}</TechChip>
              ))}
            </div>
          </div>
        </div>

        <ArchitecturePreview
          sections={ARCHITECTURE.sections}
          flows={ARCHITECTURE.flows}
        />
      </CardContent>
    </Card>
  );
}
