// src/components/home/parts/FinalCTA.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FINAL_CTA, THEME } from "@/data/home/home";

export function FinalCTA() {
  return (
    <section className="px-4 pb-16 pt-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-slate-100 p-8 text-center dark:bg-slate-900/30">
        <h2
          className="mb-4 text-3xl font-semibold"
          style={{ color: "var(--color-foreground)" }}
        >
          {FINAL_CTA.title}
        </h2>
        <p className="mb-8 text-base" style={{ color: THEME.textMuted }}>
          {FINAL_CTA.text}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="group">
            <Link href="/contact">
              {FINAL_CTA.ctaContact}
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </Button>
          <Button variant="outline" asChild className="group">
            <Link href="/cv" target="_blank">
              {FINAL_CTA.ctaCv}
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
