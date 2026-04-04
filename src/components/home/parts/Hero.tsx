"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { THEME, HERO } from "@/data/home/home";
import { CVDownloadModal } from "@/components/portfolio/cv-download-modal";

export function Hero({ onNavigateToProject }: { onNavigateToProject?: () => void }) {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 text-center sm:px-6">
        {/* Glow background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: THEME.brand }} />
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Disponible en alternance · Île-de-France
          </div>

          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-muted/30">
              <Shield size={40} style={{ color: THEME.brand }} />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
            style={{ color: THEME.textDefault }}>
            {HERO.title}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: THEME.textMuted }}>
            {HERO.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {onNavigateToProject ? (
              <Button size="lg" className="group" onClick={onNavigateToProject}>
                {HERO.ctaPrimaryLabel}
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button asChild size="lg" className="group">
                <Link href={HERO.projectHref}>
                  {HERO.ctaPrimaryLabel}
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}

            {/* ← Bouton CV ouvre le modal bilingue */}
            <Button size="lg" variant="outline" className="group gap-2" onClick={() => setCvOpen(true)}>
              <Download size={16} />
              {HERO.ctaSecondaryLabel}
            </Button>
          </div>
        </div>
      </section>

      <CVDownloadModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}