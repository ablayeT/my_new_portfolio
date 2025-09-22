"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BookOpen,
  Search as SearchIcon,
  GitBranch,
  Target as TargetIcon,
  BarChart3,
} from "lucide-react";
import { HuntTable } from "./HuntTable";
import { CodeBlock } from "./CodeBlock";
import {
  TABS,
  type TabKey,
  HUNTS,
  OVERVIEW_BULLETS,
  ARCH_SOURCES,
  PLAYBOOK_WMI_STEPS,
  EVIDENCE_CHECKLIST,
  DETECTIONS,
  METRICS_SCORECARD,
  QUICK_WINS,
} from "@/data/projects/threatHuntingData/theatHunting";

const TabIcon: Record<TabKey, React.ComponentType<{ className?: string }>> = {
  overview: BookOpen,
  hunts: SearchIcon,
  playbooks: GitBranch,
  detections: TargetIcon,
  metrics: BarChart3,
};

export function THTabs() {
  const [tab, setTab] = React.useState<TabKey>("overview");
  const [query, setQuery] = React.useState("");

  return (
    <div className="container space-y-8 py-6">
      {/* Bandeau valeur / pro */}
      <Alert>
        <AlertDescription>
          <strong>Objectif pro&nbsp;:</strong> montrer une démarche de chasse
          industrialisée (sources, requêtes, détections, KPIs) avec livrables
          convertibles en valeur SOC.
        </AlertDescription>
      </Alert>

      {/* Selector mobile */}
      <div className="md:hidden">
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
            className="block w-full appearance-none rounded-md border bg-background px-3 py-2 pr-10 text-sm shadow-sm"
          >
            {TABS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.207l3.71-3.975a.75.75 0 011.08 1.04l-4.24 4.54a.75.75 0 01.02-1.06z" />
          </svg>
        </div>
      </div>

      {/* Desktop Tabs */}
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as TabKey)}
        className="space-y-6"
      >
        <TabsList className="hidden w-full grid-cols-5 gap-2 rounded-lg border bg-muted/50 p-1 md:grid">
          {TABS.map(({ value, label }) => {
            const Icon = TabIcon[value];
            return (
              <TabsTrigger
                key={value}
                value={value}
                className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium shadow-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                aria-label={label}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Approche</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  {OVERVIEW_BULLETS.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Architecture de données (simplifiée)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <div className="rounded-lg border bg-muted p-4">
                  <p className="mb-2 font-medium text-foreground">
                    Flux ingestés
                  </p>
                  <ul className="grid grid-cols-2 gap-2 list-disc pl-5">
                    {ARCH_SOURCES.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Hunts */}
        <TabsContent value="hunts">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Catalogue de hunts</CardTitle>
            </CardHeader>
            <CardContent>
              <HuntTable hunts={HUNTS} query={query} onQuery={setQuery} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Playbooks */}
        <TabsContent value="playbooks">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Playbook (extrait) — WMI T1047</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
                  {PLAYBOOK_WMI_STEPS.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <div className="rounded-md border bg-muted p-3 text-xs text-muted-foreground">
                  Sorties attendues : artefacts, horodatage, host, utilisateur,
                  hash, chemin, commande.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Checklist Evidence</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  {EVIDENCE_CHECKLIST.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Detections */}
        <TabsContent value="detections">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>KQL — WMI suspicious (Defender/EDR)</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock lang="kql" code={DETECTIONS.kql} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Sigma (YAML) — LOLBins abuse</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock lang="yaml" code={DETECTIONS.sigma} />
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Splunk SPL — SMB lateral bursts</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock lang="spl" code={DETECTIONS.spl} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Metrics */}
        <TabsContent value="metrics">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Scorecard (exemple JSON)</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock lang="json" code={METRICS_SCORECARD} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Lecture terrain (quick wins)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc space-y-2 pl-5">
                  {QUICK_WINS.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
