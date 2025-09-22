"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Workflow,
  Target,
  PhoneCall,
  GitBranch,
  FileCode,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HERO,
  FEATURES,
  type IRFeature,
} from "@/data/projects/incidentData/incidentResponse";

const IconMap = { ShieldCheck, Workflow, Target, PhoneCall } as const;

export function IRHero({
  repoUrl = "#",
  docsUrl = "#",
}: {
  repoUrl?: string;
  docsUrl?: string;
}) {
  return (
    <section>
      <div className="mx-auto w-full lg:max-w-7xl px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 sm:space-y-6">
            <div className="flex flex-wrap gap-2">
              {HERO.badges.map((b: string) => (
                <Badge key={b} variant="secondary" className="rounded-full">
                  {b}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {HERO.title}
            </h1>

            <p className="text-muted-foreground text-[15px] sm:text-base leading-relaxed">
              {HERO.intro}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Button asChild className="w-full sm:w-auto">
                <Link
                  href={repoUrl}
                  target={repoUrl === "#" ? undefined : "_blank"}
                >
                  <GitBranch className="mr-2 h-4 w-4" /> Voir le repo GitHub
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link
                  href={docsUrl}
                  target={docsUrl === "#" ? undefined : "_blank"}
                >
                  <FileCode className="mr-2 h-4 w-4" /> Guide & modèles (PDF)
                </Link>
              </Button>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {FEATURES.map((f: IRFeature) => {
                const Icon = IconMap[f.icon];
                return (
                  <li
                    key={f.label}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    {f.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
