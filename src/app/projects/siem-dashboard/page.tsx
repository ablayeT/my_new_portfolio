"use client";

import * as React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Siren,
  Globe,
  GitBranch,
  Boxes,
  Network,
  FileCode,
  Copy,
  ExternalLink,
  Gauge,
  Lock,
  MapPinned,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TabKey = "windows" | "linux" | "app" | "alertes";

export default function SiemDashboardPage({
  repoUrl = "#",
  pdfUrl = "#",
}: {
  repoUrl?: string;
  pdfUrl?: string;
} = {}) {
  const [tab, setTab] = React.useState<TabKey>("windows");

  const features = [
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      label: "Supervision centralisée ELK",
    },
    {
      icon: <Boxes className="h-5 w-5" />,
      label: "Sources: Windows, Linux, App (Docker)",
    },
    {
      icon: <MapPinned className="h-5 w-5" />,
      label: "Enrichissements: GeoIP + User-Agent",
    },
    {
      icon: <Siren className="h-5 w-5" />,
      label: "Règles d'alerte personnalisées",
    },
  ];

  const stats = [
    {
      label: "Sources de logs",
      value: "3+",
      hint: "Winlogbeat, Filebeat, App Docker",
    },
    {
      label: "Règles d'alerte",
      value: "15+",
      hint: "Brute force, erreurs 5xx, privilèges",
    },
    {
      label: "Dashboards",
      value: "4",
      hint: "Windows, Linux, App, Vue globale",
    },
    { label: "Enrichissements", value: "2", hint: "GeoIP, User-Agent" },
  ];

  const codeSnippets = [
    {
      title: "filebeat.yml (extrait)",
      lang: "yaml",
      code: `filebeat.inputs:\n  - type: log\n    paths: [/var/log/syslog, /var/log/auth.log]\nprocessors:\n  - add_fields:\n      target: project\n      fields:\n        name: siem-dashboard\noutput.logstash:\n  hosts: ["localhost:5044"]`,
    },
    {
      title: "winlogbeat.yml (extrait)",
      lang: "yaml",
      code: `winlogbeat.event_logs:\n  - name: Security\n  - name: System\n  - name: Application\noutput.logstash:\n  hosts: ["localhost:5044"]`,
    },
    {
      title: "logstash.conf (pipeline enrichi)",
      lang: "conf",
      code: `input { beats { port => 5044 } }\nfilter {\n  geoip { source => "[source][ip]" }\n  useragent { source => "user_agent.original" }\n}\noutput { elasticsearch { hosts => ["http://localhost:9200"] index => "siem-%{+YYYY.MM.dd}" } }`,
    },
  ];

  function onCopy(text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
  }

  return (
    <TooltipProvider>
      <main className="w-full">
        {/* HERO */}
        <section className="relative">
          {/* NOTE: max-w-none en mobile, max width seulement à partir de lg */}
          <div className="mx-auto w-full max-w-none lg:max-w-7xl px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
            <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-5 sm:space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge className="rounded-full" variant="secondary">
                    Projet SIEM
                  </Badge>
                  <Badge className="rounded-full" variant="secondary">
                    ELK + Beats
                  </Badge>
                  <Badge className="rounded-full" variant="secondary">
                    SOC-ready
                  </Badge>
                </div>

                <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
                  Dashboard SIEM{" "}
                  <span className="text-primary">personnalisé</span>
                </h1>

                <p className="text-muted-foreground text-[15px] sm:text-base leading-relaxed">
                  Conception d'une plateforme de supervision et de détection
                  basée sur ELK (Elasticsearch, Logstash, Kibana), alimentée par
                  Filebeat & Winlogbeat, avec enrichissements GeoIP /
                  User-Agent, dashboards dédiés et alertes opérationnelles.
                  Pensée pour des environnements hétérogènes (Windows, Linux,
                  conteneurs) et des cas d'usage SOC.
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
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href={pdfUrl}
                      target={pdfUrl === "#" ? undefined : "_blank"}
                    >
                      <FileCode className="mr-2 h-4 w-4" /> Lire le mémoire
                      (PDF)
                    </Link>
                  </Button>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary">{f.icon}</span>
                      {f.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mini-architecture (inline SVG) */}
              <Card className="lg:ml-auto border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Network className="h-5 w-5" /> Vue d'architecture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border bg-background p-3 sm:p-4">
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
                      <rect
                        x="40"
                        y="140"
                        width="140"
                        height="50"
                        rx="10"
                        className="fill-transparent"
                        stroke="currentColor"
                      />
                      <text
                        x="110"
                        y="170"
                        textAnchor="middle"
                        className="fill-current"
                        style={{ fontSize: "12px" }}
                      >
                        Windows (Winlogbeat)
                      </text>
                      <rect
                        x="230"
                        y="140"
                        width="140"
                        height="50"
                        rx="10"
                        className="fill-transparent"
                        stroke="currentColor"
                      />
                      <text
                        x="300"
                        y="170"
                        textAnchor="middle"
                        className="fill-current"
                        style={{ fontSize: "12px" }}
                      >
                        Linux (Filebeat)
                      </text>
                      <rect
                        x="420"
                        y="140"
                        width="140"
                        height="50"
                        rx="10"
                        className="fill-transparent"
                        stroke="currentColor"
                      />
                      <text
                        x="490"
                        y="170"
                        textAnchor="middle"
                        className="fill-current"
                        style={{ fontSize: "12px" }}
                      >
                        App (Docker)
                      </text>
                      {/* Arrows */}
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
                      <line
                        x1="110"
                        y1="140"
                        x2="300"
                        y2="80"
                        stroke="currentColor"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                      />
                      <line
                        x1="300"
                        y1="140"
                        x2="300"
                        y2="80"
                        stroke="currentColor"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                      />
                      <line
                        x1="490"
                        y1="140"
                        x2="300"
                        y2="80"
                        stroke="currentColor"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                      />
                    </svg>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Pipeline: Beats → Logstash (enrichissements) → Elasticsearch
                    → Kibana.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-2 sm:my-4" />

        {/* STATS */}
        <section className="mx-auto w-full max-w-none lg:max-w-7xl px-3 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s, i) => (
              <Card key={i} className="border-muted-foreground/10">
                <CardContent className="p-4">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground/80">
                    {s.hint}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* TABS */}
        <section className="mx-auto w-full max-w-none lg:max-w-7xl px-3 sm:px-6 lg:px-8 pb-6">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as TabKey)}
            className="w-full space-y-4"
          >
            {/* Mobile select */}
            <div className="sm:hidden">
              <label
                htmlFor="tabSelect"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Section
              </label>
              <div className="relative">
                <select
                  id="tabSelect"
                  value={tab}
                  onChange={(e) => setTab(e.target.value as TabKey)}
                  className="block w-full appearance-none rounded-md border bg-background px-3 py-2 pr-10 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="windows">Windows</option>
                  <option value="linux">Linux</option>
                  <option value="app">Application</option>
                  <option value="alertes">Alertes</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.207l3.71-3.975a.75.75 0 011.08 1.04l-4.24 4.54a.75.75 0 01-1.08 0l-4.24-4.54a.75.75 0 01.02-1.06z" />
                </svg>
              </div>
            </div>

            {/* Desktop tablist (scrollable) */}
            <TabsList
              aria-label="Sections"
              className="hidden sm:flex w-full items-center gap-2 overflow-x-auto rounded-lg border bg-muted/50 p-1"
            >
              {[
                { value: "windows", label: "Windows" },
                { value: "linux", label: "Linux" },
                { value: "app", label: "Application" },
                { value: "alertes", label: "Alertes" },
              ].map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value as TabKey}
                  aria-label={t.label}
                  className="shrink-0 inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Content panes */}
            <TabsContent value="windows" className="mt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Logons & événements critiques
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Suivi des Event IDs (4624/4625), top utilisateurs en
                      échec, heatmap des horaires anormaux.
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />{" "}
                      Détection des pics d'authentification
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />{" "}
                      Répartition des erreurs système
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Privilèges & intégrité
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Surveillance des créations/ajouts au groupe
                      administrateurs, services critiques, crashs.
                    </p>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" /> Escalades
                      suspectes détectées
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="linux" className="mt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">SSH & sudo</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Histogramme des connexions SSH acceptées/refusées, liste
                      des IP sources, commandes sudo.
                    </p>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-primary" /> Seuils d'alerte
                      brute-force
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Santé système</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Erreurs /var/log/syslog, journaux auth, processus
                      anormaux, disponibilité des services.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="app" className="mt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Erreurs HTTP & comportement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Suivi des codes 4xx/5xx, chemins sensibles, requêtes
                      suspectes, flux utilisateurs.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Contexte GeoIP / User-Agent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Carte des origines IP, OS & navigateurs dominants pour
                      profiler les accès.
                    </p>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" /> Cartographie
                      des accès
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alertes" className="mt-2">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">SSH brute-force</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>{"> 5 échecs / 2 min depuis la même IP → alerte"}</p>
                    <div className="flex items-center gap-2">
                      <Siren className="h-4 w-4 text-primary" /> Notification
                      instantanée
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Privilèges Windows
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Création de compte admin, ajout à un groupe sensible,
                      logon nocturne.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Erreurs applicatives
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>{"> 10 erreurs HTTP 500 / min → alerte DevSecOps"}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CODE SNIPPETS */}
        <section className="mx-auto w-full max-w-none lg:max-w-7xl px-3 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-bold tracking-tight">
            Extraits de configuration
          </h2>
          <p className="text-muted-foreground mt-2 mb-6">
            Copies rapides pour reproduire l'environnement local (adapter les
            hôtes et certificats).
          </p>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
            {codeSnippets.map((snip, i) => (
              <Card key={i} className="group">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-base">{snip.title}</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCopy(snip.code)}
                        aria-label={`Copier ${snip.title}`}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copier</TooltipContent>
                  </Tooltip>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* wrapper = zone scrollable (mobile) */}
                  <div className="-mx-3 sm:mx-0 overflow-x-auto overscroll-x-contain no-scrollbar">
                    {/* pre = largeur selon contenu, sans élargir la page */}
                    <pre className="inline-block w-max min-w-full max-w-none rounded-lg bg-zinc-900 p-3 text-[11px] sm:text-xs leading-5">
                      <code className="block whitespace-pre text-zinc-100">
                        {snip.code}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* MARKET & IMPACT */}
        <section className="mx-auto w-full max-w-none lg:max-w-7xl px-3 sm:px-6 lg:px-8 pb-16">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  Tendances marché & évolutivité
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="list-disc ml-5 space-y-1">
                  <li>
                    Convergence SIEM/XDR et pilotage via{" "}
                    <strong>Elastic Agent + Fleet</strong>.
                  </li>
                  <li>
                    Automatisation <strong>SOAR</strong> & playbooks de réponse.
                  </li>
                  <li>
                    Corrélations multi-sources alignées{" "}
                    <strong>MITRE ATT&CK</strong>.
                  </li>
                  <li>
                    Hybridation <strong>Cloud</strong> (Elastic Cloud,
                    Azure/GCP/AWS) & intégrations SaaS.
                  </li>
                  <li>
                    Détection par <strong>anomalies (ML)</strong> pour le tri
                    des alertes.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Résultats & portée</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="list-disc ml-5 space-y-1">
                  <li>
                    Collecte unifiée Windows / Linux / App et visualisation
                    temps réel.
                  </li>
                  <li>
                    Détection d'une attaque <strong>SSH brute-force</strong>{" "}
                    validée lors de tests contrôlés.
                  </li>
                  <li>
                    Dashboards clairs pour investigation rapide et support aux
                    audits.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Button asChild className="w-full sm:w-auto">
              <Link
                href={repoUrl}
                target={repoUrl === "#" ? undefined : "_blank"}
              >
                <GitBranch className="mr-2 h-4 w-4" /> Ouvrir sur GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/projects">
                <ExternalLink className="mr-2 h-4 w-4" /> Voir tous les projets
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </TooltipProvider>
  );
}
