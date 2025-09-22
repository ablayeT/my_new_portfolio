"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Boxes,
  MapPinned,
  Siren,
  GitBranch,
  FileCode,
  Network,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { HERO, FEATURES } from "@/data/projects/siemData/siem";

export function Hero({
  repoUrl = "#",
  pdfUrl = "#",
}: {
  repoUrl?: string;
  pdfUrl?: string;
}) {
  const IconMap = { ShieldCheck, Boxes, MapPinned, Siren } as const;

  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-none lg:max-w-7xl px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Texte */}
          <div className="space-y-5 sm:space-y-6">
            <div className="flex flex-wrap gap-2">
              {HERO.badges.map((b) => (
                <Badge key={b} className="rounded-full" variant="secondary">
                  {b}
                </Badge>
              ))}
            </div>

            <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
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
                  href={pdfUrl}
                  target={pdfUrl === "#" ? undefined : "_blank"}
                >
                  <FileCode className="mr-2 h-4 w-4" /> Lire le mémoire (PDF)
                </Link>
              </Button>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {FEATURES.map((f) => {
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

          {/* Carte Architecture */}
          <Card className="lg:ml-auto border-primary/10">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Network className="h-5 w-5" /> Vue d&apos;architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border bg-background p-3 sm:p-4">
                {/* SVG simple, responsive */}
                <svg
                  viewBox="0 0 600 300"
                  className="h-auto w-full max-h-56 sm:max-h-72"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* ELK */}
                  <rect
                    x="240"
                    y="20"
                    width="120"
                    height="60"
                    rx="12"
                    className="fill-transparent"
                    stroke="currentColor"
                  />
                  <text
                    x="300"
                    y="55"
                    textAnchor="middle"
                    className="fill-current"
                    style={{ fontSize: "12px" }}
                  >
                    ELK Server
                  </text>

                  {/* Sources */}
                  {[
                    { x: 40, label: "Windows (Winlogbeat)" },
                    { x: 230, label: "Linux (Filebeat)" },
                    { x: 420, label: "App (Docker)" },
                  ].map((s, i) => (
                    <g key={i}>
                      <rect
                        x={s.x}
                        y={140}
                        width="140"
                        height="50"
                        rx="10"
                        className="fill-transparent"
                        stroke="currentColor"
                      />
                      <text
                        x={s.x + 70}
                        y={170}
                        textAnchor="middle"
                        className="fill-current"
                        style={{ fontSize: "12px" }}
                      >
                        {s.label}
                      </text>
                    </g>
                  ))}

                  {/* Flèches */}
                  <defs>
                    <marker
                      id="arrow"
                      markerWidth="10"
                      markerHeight="10"
                      refX="6"
                      refY="3"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M0,0 L0,6 L9,3 z" className="fill-current" />
                    </marker>
                  </defs>
                  {[110, 300, 490].map((x, i) => (
                    <line
                      key={i}
                      x1={x}
                      y1="140"
                      x2="300"
                      y2="80"
                      stroke="currentColor"
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                  ))}
                </svg>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Pipeline: Beats → Logstash (enrichissements) → Elasticsearch →
                Kibana.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
