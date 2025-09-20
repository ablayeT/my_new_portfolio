"use client";

import * as React from "react";
import { KPI_ITEMS } from "@/data/home/home";
import { Hero } from "@/components/home/parts/Hero";
import { KPI } from "@/components/home/parts/KPI";
import { ProjectFeature } from "@/components/home//parts/ProjectFeature";
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
    <div className={["space-y-4", className].filter(Boolean).join(" ")}>
      {/* décor doux */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[--tokens-color-brand-purple,#7c3aed]/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[--tokens-color-brand-primary,#6d28d9]/15 blur-3xl" />
      </div>

      <Hero onNavigateToProject={onNavigateToProject} />

      {/* KPIs */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-6xl text-center">
          <h2
            className="mb-4 text-2xl font-semibold"
            style={{ color: "var(--color-foreground)" }}
          >
            Expertise en chiffres
          </h2>
          <p style={{ color: "var(--color-muted-foreground)" }}>
            Quelques statistiques sur mon parcours en cybersécurité
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
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

      <section className="px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-6xl text-center">
          <h2
            className="mb-4 text-2xl font-semibold"
            style={{ color: "var(--color-foreground)" }}
          >
            Projet phare
          </h2>
          <p style={{ color: "var(--color-muted-foreground)" }}>
            Découvrez mon laboratoire Purple Team complet
          </p>
        </div>

        <ProjectFeature onNavigateToProject={onNavigateToProject} />
      </section>

      <FinalCTA />
    </div>
  );
};

export default HomePage;
