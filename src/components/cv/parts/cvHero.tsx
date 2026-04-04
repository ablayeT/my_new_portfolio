"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Mail, Linkedin, Github, MapPin, Phone, Target } from "lucide-react";
import type { ContactInfo } from "@/data/cv/cvPage/types";
import { CVDownloadModal } from "@/components/portfolio/cv-download-modal";

export function CvHero({ name, headline, contact, downloadHref, downloadName }: {
  name: string; headline: string; contact: ContactInfo;
  downloadHref: string; downloadName: string;
}) {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl border bg-card">
        {/* Subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(hsl(var(--border)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--border)) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
        {/* Top accent line */}
        <div className="h-[3px] w-full bg-gradient-to-r from-primary via-primary/60 to-transparent" />

        <div className="flex flex-col items-center gap-6 px-6 py-8 md:flex-row md:items-start md:gap-8 md:px-10 md:py-10">
          {/* Photo */}
          <div className="relative shrink-0">
            <div className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-primary/30 shadow-lg md:h-28 md:w-28">
              <img src="/cv/photo.jpeg" alt="Abdoulaye Touré" className="h-full w-full object-cover" />
            </div>
            <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-background">
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-1 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{name}</h1>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-500">
                Disponible en alternance
              </span>
            </div>
            <p className="mb-4 text-sm font-medium text-primary/80">{headline}</p>

            <div className="mb-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground md:justify-start">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{contact.location}</span>
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{contact.email}</span>
              <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{contact.phone}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {/* ← Ouvre le modal bilingue */}
              <Button
                size="sm"
                className="h-8 gap-1.5 text-xs"
                onClick={() => setCvOpen(true)}
              >
                <Download className="h-3.5 w-3.5" />
                Télécharger CV
              </Button>

              {[
                { href: contact.linkedin,          icon: <Linkedin className="h-3.5 w-3.5" />, label: "LinkedIn" },
                { href: contact.github,             icon: <Github   className="h-3.5 w-3.5" />, label: "GitHub" },
                { href: contact.tryhackme,          icon: <Target   className="h-3.5 w-3.5" />, label: "TryHackMe" },
                { href: `mailto:${contact.email}`,  icon: <Mail     className="h-3.5 w-3.5" />, label: "Email" },
              ].map(({ href, icon, label }) => (
                <Button key={label} variant="outline" size="sm" asChild className="h-8 gap-1.5 text-xs">
                  <a href={href} target="_blank" rel="noopener noreferrer">{icon}{label}</a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CVDownloadModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}