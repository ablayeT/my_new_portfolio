"use client";

import * as React from "react";
import { KPI_ITEMS } from "@/data/home/home";
import { Hero } from "@/components/home/parts/Hero";
import { KPI } from "@/components/home/parts/KPI";
import { ProjectFeature } from "@/components/home/parts/ProjectFeature";
import { FinalCTA } from "@/components/home/parts/FinalCTA";

export interface HomePageProps {
  onNavigateToProject?: () => void;
  className?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToProject,
  className = "",
}) => {
  return (
    <div className={["space-y-8", className].filter(Boolean).join(" ")}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <Hero onNavigateToProject={onNavigateToProject} />

      {/* ── KPIs ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto mb-8 max-w-6xl text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Expertise en chiffres
          </h2>
          <p className="text-sm text-muted-foreground">
            Quelques indicateurs sur mon parcours en cybersécurité
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {KPI_ITEMS.map((k) => (
            <KPI
              key={k.label}
              label={k.label}
              value={k.value}
              trend={k.trend}
              trendValue={k.trendValue}
            />
          ))}
        </div>
      </section>

      {/* ── Projet phare ─────────────────────────────────────── */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto mb-8 max-w-6xl text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Projet phare
          </h2>
          <p className="text-sm text-muted-foreground">
            Découvrez mon laboratoire Purple Team complet
          </p>
        </div>
        <ProjectFeature onNavigateToProject={onNavigateToProject} />
      </section>

      {/* ── CTA final ────────────────────────────────────────── */}
      <FinalCTA />

    </div>
  );
};

export default HomePage;