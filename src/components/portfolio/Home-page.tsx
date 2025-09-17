"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Shield,
  ArrowRight,
  Network,
  Terminal,
  Server,
  Mail,
  Radar,
} from "lucide-react";
import { CV_ASSET } from "@/data/cv/cv";
import { Download } from "lucide-react";
type KPITrend = "up" | "down" | "neutral";

function KPI({
  label,
  value,
  suffix = "",
  trend = "neutral",
  trendValue,
}: {
  label: string;
  value: number;
  suffix?: string;
  trend?: KPITrend;
  trendValue?: string;
}) {
  const [display, setDisplay] = React.useState(0);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const duration = 900;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(value * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [visible, value]);

  const trendColor =
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
        ? "text-red-600"
        : "text-slate-500";
  const chipBg =
    trend === "up"
      ? "bg-emerald-50 border-emerald-100"
      : trend === "down"
        ? "bg-red-50 border-red-100"
        : "bg-slate-50 border-slate-100";

  return (
    <Card
      ref={ref}
      className="transition-all hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/20"
    >
      <CardContent className="py-6">
        <div className="text-4xl font-bold tracking-tight">
          {display}
          {suffix}
        </div>
        <div className="mt-1 text-slate-500">{label}</div>
        {trendValue && (
          <div
            className={`mt-3 inline-flex items-center gap-2 rounded-md border px-2 py-1 text-sm ${chipBg} ${trendColor}`}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                trend === "up"
                  ? "bg-emerald-500"
                  : trend === "down"
                    ? "bg-red-500"
                    : "bg-slate-400"
              }`}
            />
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export interface HomePageProps {
  onNavigateToProject?: () => void;
  className?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToProject,
  className = "",
}) => {
  const brand = "var(--tokens-color-brand-purple, #6c5ce7)";
  const textDefault =
    "var(--tokens-semantic-text-default, var(--color-foreground))";
  const textMuted =
    "var(--tokens-semantic-text-muted, var(--color-muted-foreground))";
  const border = "var(--color-border, hsl(215 16% 84%))";
  const muted = "var(--color-muted, hsl(210 40% 96%))";
  const radius8 = "var(--tokens-radius-8, 0.5rem)";
  const radius12 = "var(--tokens-radius-12, 0.75rem)";
  const space8 = "var(--tokens-spacing-8, 0.5rem)";
  const space12 = "var(--tokens-spacing-12, 0.75rem)";
  const space16 = "var(--tokens-spacing-16, 1rem)";

  const TechChip = ({ children }: { children: React.ReactNode }) => (
    <span
      className="rounded-md text-xs"
      style={{
        padding: `${space8} ${space12}`,
        backgroundColor: muted,
        color: textMuted,
        borderRadius: radius8,
      }}
    >
      {children}
    </span>
  );

  const CTAProject = (
    <>
      Voir le projet
      <ArrowRight
        size={16}
        className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </>
  );

  return (
    <div className={cnHome("space-y-4", className)}>
      {/* décor doux (compatible light/dark) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[--tokens-color-brand-purple,#7c3aed]/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[--tokens-color-brand-primary,#6d28d9]/15 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Shield
              className="mx-auto mb-6"
              size={80}
              style={{ color: brand }}
            />
          </div>

          <h1
            className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{ color: textDefault }}
          >
            Cybersécurité & Purple Team
          </h1>

          <p
            className="mx-auto mb-8 max-w-2xl text-base leading-relaxed"
            style={{ color: textMuted }}
          >
            Expert en opérations de cybersécurité offensive et défensive,
            spécialisé dans la threat hunting, les tests de pénétration et
            l&apos;automatisation sécurisée.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            {onNavigateToProject ? (
              <Button size="lg" className="group" onClick={onNavigateToProject}>
                Voir le projet Purple Team
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>
            ) : (
              <Button asChild size="lg" className="group">
                <Link href="/projects/purple-team">
                  Voir le projet Purple Team
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
                Télécharger mon CV
              </a>
            </Button>
          </div>
        </div>
      </section>

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
          <KPI
            label="Projets publiés"
            value={12}
            trend="up"
            trendValue="3 nouveaux cette année"
          />
          <KPI
            label="Articles de blog"
            value={28}
            trend="up"
            trendValue="5 ce mois-ci"
          />
          <KPI label="Certifications" value={8} trend="neutral" />
        </div>
      </section>

      {/* PROJET PHARE */}
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

        <Card className="mx-auto max-w-5xl transition-all hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-black/20">
          <CardHeader>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Network size={24} style={{ color: brand }} />
                <div>
                  <h3
                    className="font-semibold"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Purple Team Lab Infrastructure
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    Architecture réseau complète pour simulations
                    d&apos;attaques et défense
                  </p>
                </div>
              </div>

              {onNavigateToProject ? (
                <Button
                  size="sm"
                  className="group"
                  onClick={onNavigateToProject}
                >
                  {CTAProject}
                </Button>
              ) : (
                <Button size="sm" asChild className="group">
                  <Link href="/projects/purple-team">{CTAProject}</Link>
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
                <ul className="space-y-2 text-sm" style={{ color: textMuted }}>
                  <li>
                    • Simulation d&apos;attaques réalistes en environnement
                    contrôlé
                  </li>
                  <li>
                    • Détection et analyse des techniques MITRE ATT&amp;CK
                  </li>
                  <li>• Automatisation des réponses aux incidents</li>
                  <li>• Formation pratique aux opérations Purple Team</li>
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
                  {[
                    "Kali Linux",
                    "ELK Stack",
                    "Suricata",
                    "DVWA",
                    "GoPhish",
                    "Metasploit",
                    "Kibana",
                    "Nginx",
                  ].map((tech) => (
                    <TechChip key={tech}>{tech}</TechChip>
                  ))}
                </div>
              </div>
            </div>

            {/* Aperçu Architecture */}
            <div
              className="rounded-xl"
              style={{
                border: `1px solid ${border}`,
                borderRadius: radius12,
                padding: space16,
                backgroundColor: muted,
              }}
            >
              <h4
                className="mb-4 font-semibold"
                style={{
                  color: "var(--color-foreground)",
                  marginBottom: space16,
                }}
              >
                Aperçu de l&apos;architecture
              </h4>

              <div
                className="grid gap-4 rounded-md p-4"
                style={{
                  minHeight: "16rem",
                  backgroundColor: "var(--color-background, white)",
                  borderRadius: radius8,
                  border: `1px solid ${border}`,
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                }}
              >
                {/* Public */}
                <div className="space-y-3">
                  <div className="text-xs font-medium text-slate-500">
                    Public Subnet
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Terminal size={18} className="text-red-500" />
                      <div className="text-sm font-medium">VM Attaquant</div>
                    </div>
                    <div className="text-xs text-slate-500">Kali Linux</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Server
                        size={18}
                        className="text-[var(--color-brand-purple,#6c5ce7)]"
                      />
                      <div className="text-sm font-medium">VM Portfolio</div>
                    </div>
                    <div className="text-xs text-slate-500">
                      Nginx + Next.js
                    </div>
                  </div>
                </div>

                {/* DMZ */}
                <div className="space-y-3">
                  <div className="text-xs font-medium text-slate-500">
                    DMZ Subnet
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Mail size={18} className="text-amber-500" />
                      <div className="text-sm font-medium">VM Phishing</div>
                    </div>
                    <div className="text-xs text-slate-500">GoPhish + SMTP</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Radar size={18} className="text-sky-600" />
                      <div className="text-sm font-medium">VM Surveillance</div>
                    </div>
                    <div className="text-xs text-slate-500">ELK + Suricata</div>
                  </div>
                </div>

                {/* Private */}
                <div className="space-y-3">
                  <div className="text-xs font-medium text-slate-500">
                    Private Subnet
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Shield size={18} className="text-slate-500" />
                      <div className="text-sm font-medium">VM Victime</div>
                    </div>
                    <div className="text-xs text-slate-500">Ubuntu + DVWA</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-md border bg-red-50/60 p-3 text-sm">
                  <div className="mb-1 font-semibold text-red-600">
                    Red Team Flows
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    <li>• Attaquant → Phishing (préparation)</li>
                    <li>• Phishing → Victime (email leurre)</li>
                    <li>• Attaquant ↔ Victime (exploit)</li>
                  </ul>
                </div>
                <div className="rounded-md border bg-sky-50/60 p-3 text-sm">
                  <div className="mb-1 font-semibold text-sky-700">
                    Blue Team Flows
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    <li>• Victime → Surveillance (logs)</li>
                    <li>• Filebeat/Auditd → Logstash</li>
                    <li>• Surveillance → Kibana</li>
                  </ul>
                </div>
                <div
                  className="rounded-md border p-3 text-sm"
                  style={{
                    backgroundColor: `${brand}11`,
                    borderColor: `${brand}33`,
                  }}
                >
                  <div className="mb-1 font-semibold" style={{ color: brand }}>
                    Management
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    <li>• Portfolio ↔ Internet (HTTPS)</li>
                    <li>• Let&apos;s Encrypt SSL</li>
                    <li>• Secure management</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA final */}
      <section className="px-4 pb-16 pt-8">
        <div className="mx-auto max-w-2xl rounded-2xl bg-slate-100 p-8 text-center dark:bg-slate-900/30">
          <h2
            className="mb-4 text-3xl font-semibold"
            style={{ color: "var(--color-foreground)" }}
          >
            Prêt à collaborer ?
          </h2>
          <p className="mb-8 text-base" style={{ color: textMuted }}>
            Je recherche une alternance en Master Cybersécurité pour septembre
            2025. Contactez-moi pour discuter d&apos;opportunités de
            collaboration.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="group">
              <Link href="/contact">
                Me contacter
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </Button>

            <Button variant="outline" asChild className="group">
              <Link href="/cv" target="_blank">
                Voir mon CV
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

function cnHome(...c: Array<string | undefined | null | false>) {
  return c.filter(Boolean).join(" ");
}

export default HomePage;
