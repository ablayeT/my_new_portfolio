"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FINAL_CTA, THEME } from "@/data/home/home";
import { CVDownloadModal } from "@/components/portfolio/cv-download-modal";

export function FinalCTA() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <section className="px-4 pb-16 pt-8">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Accent top */}
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${THEME.brand}, transparent)` }} />

          <div className="p-8 text-center sm:p-10">
            <h2 className="mb-3 text-3xl font-bold tracking-tight" style={{ color: THEME.textDefault }}>
              {FINAL_CTA.title}
            </h2>
            <p className="mb-8 text-base leading-relaxed" style={{ color: THEME.textMuted }}>
              {FINAL_CTA.text}
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="group gap-2">
                <Link href="/contact">
                  <Mail size={16} />
                  {FINAL_CTA.ctaContact}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {/* ← Ouvre le modal bilingue */}
              <Button size="lg" variant="outline" className="group gap-2" onClick={() => setCvOpen(true)}>
                <Download size={16} />
                Télécharger mon CV
              </Button>

              <Button asChild size="lg" variant="ghost" className="group gap-2">
                <Link href="/cv">
                  {FINAL_CTA.ctaCv}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CVDownloadModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}