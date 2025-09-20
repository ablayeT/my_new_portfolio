// src/components/home/parts/Hero.tsx
"use client";

import Link from "next/link";
import { Shield, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { THEME, HERO } from "@/data/home/home";
import { CV_ASSET } from "@/data/cv/cv";

export function Hero({
  onNavigateToProject,
}: {
  onNavigateToProject?: () => void;
}) {
  return (
    <section className="px-4 py-16 text-center sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Shield
            className="mx-auto mb-6"
            size={80}
            style={{ color: THEME.brand }}
          />
        </div>

        <h1
          className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl"
          style={{ color: THEME.textDefault }}
        >
          {HERO.title}
        </h1>

        <p
          className="mx-auto mb-8 max-w-2xl text-base leading-relaxed"
          style={{ color: THEME.textMuted }}
        >
          {HERO.subtitle}
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {onNavigateToProject ? (
            <Button size="lg" className="group" onClick={onNavigateToProject}>
              {HERO.ctaPrimaryLabel}
              <ArrowRight
                size={18}
                className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          ) : (
            <Button asChild size="lg" className="group">
              <Link href={HERO.projectHref}>
                {HERO.ctaPrimaryLabel}
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </Button>
          )}

          <Button asChild size="lg" variant="outline">
            <a href={CV_ASSET.href} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              {HERO.ctaSecondaryLabel}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
