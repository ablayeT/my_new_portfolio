"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Filter } from "lucide-react";

import type {
  TabKey,
  TabInfo,
  ScanRun,
  Finding,
  ScanStatus,
  Severity,
} from "@/data/projects/vulnScanner/vulns";
import { VSCodeBlock } from "./VSCodeBlock";

function statusBadge(s: ScanStatus) {
  switch (s) {
    case "Completed":
      return <Badge variant="outline">Completed</Badge>;
    case "Running":
      return <Badge>Running</Badge>;
    case "Queued":
      return <Badge variant="secondary">Queued</Badge>;
    case "Failed":
      return (
        <Badge className="bg-red-600 text-white hover:bg-red-600/90">
          Failed
        </Badge>
      );
  }
}

function severityBadge(sev: Severity) {
  const base = "px-2 py-0.5 text-xs";
  if (sev === "Critical")
    return (
      <Badge className={`${base} bg-red-600 text-white hover:bg-red-600/90`}>
        Critical
      </Badge>
    );
  if (sev === "High") return <Badge className={base}>High</Badge>;
  if (sev === "Medium")
    return (
      <Badge variant="secondary" className={base}>
        Medium
      </Badge>
    );
  if (sev === "Low")
    return (
      <Badge variant="outline" className={base}>
        Low
      </Badge>
    );
  return (
    <Badge variant="outline" className={base}>
      Info
    </Badge>
  );
}

/* — Sections — */
function OverviewSection({
  bullets,
}: {
  bullets: {
    toolchain: ReadonlyArray<string>;
    architecture: ReadonlyArray<string>;
  };
}) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Chaîne d’outils & principes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ul className="list-disc space-y-2 pl-5">
            {bullets.toolchain.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Architecture (simplifiée)</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <div className="rounded-lg border bg-muted p-4">
            <p className="mb-2 font-medium text-foreground">Flux</p>
            <ul className="grid grid-cols-2 gap-2 list-disc pl-5">
              {bullets.architecture.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ScansSection({ scans }: { scans: ScanRun[] }) {
  const [q, setQ] = React.useState("");

  const filtered = scans.filter(
    (s) =>
      s.id.includes(q) ||
      s.target.toLowerCase().includes(q.toLowerCase()) ||
      s.scope.toLowerCase().includes(q.toLowerCase()) ||
      s.status.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <CardTitle>Exécutions</CardTitle>
          <div className="flex w-full items-center gap-2 md:w-auto">
            <Input
              placeholder="Filtrer par cible / scope / statut"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full md:w-72"
            />
            <button
              className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm text-foreground shadow-sm opacity-60"
              disabled
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border bg-background">
          <table className="min-w-[720px] w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-3 py-2 text-left font-medium">ID</th>
                <th className="px-3 py-2 text-left font-medium">Cible</th>
                <th className="px-3 py-2 text-left font-medium">Scope</th>
                <th className="px-3 py-2 text-left font-medium">Toolchain</th>
                <th className="px-3 py-2 text-left font-medium">Départ</th>
                <th className="px-3 py-2 text-left font-medium">Durée</th>
                <th className="px-3 py-2 text-left font-medium">Statut</th>
                <th className="px-3 py-2 text-left font-medium">Findings</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="px-3 py-2 font-medium">{s.id}</td>
                  <td className="px-3 py-2">{s.target}</td>
                  <td className="px-3 py-2">{s.scope}</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {s.toolchain}
                  </td>
                  <td className="px-3 py-2">{s.startedAt}</td>
                  <td className="px-3 py-2">{s.duration}</td>
                  <td className="px-3 py-2">{statusBadge(s.status)}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{s.findings}</Badge>
                      <Badge className="bg-red-600 text-white hover:bg-red-600/90">
                        {s.critical}C
                      </Badge>
                      <Badge>{s.high}H</Badge>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function FindingsSection({ items }: { items: Finding[] }) {
  const [q, setQ] = React.useState("");
  const filtered = items.filter(
    (f) =>
      f.host.toLowerCase().includes(q.toLowerCase()) ||
      f.service.toLowerCase().includes(q.toLowerCase()) ||
      (f.cve ?? "").toLowerCase().includes(q.toLowerCase()) ||
      f.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Vulnérabilités détectées</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <Input
            placeholder="Rechercher (hôte / service / CVE / titre)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full md:w-96"
          />
        </div>
        <div className="overflow-x-auto rounded-md border bg-background">
          <table className="min-w-[720px] w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Hôte</th>
                <th className="px-3 py-2 text-left font-medium">
                  Port/Service
                </th>
                <th className="px-3 py-2 text-left font-medium">CVE</th>
                <th className="px-3 py-2 text-left font-medium">Titre</th>
                <th className="px-3 py-2 text-left font-medium">Sévérité</th>
                <th className="px-3 py-2 text-left font-medium">Remédiation</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id} className="border-t">
                  <td className="px-3 py-2 font-medium">{f.host}</td>
                  <td className="px-3 py-2">
                    {f.port} — {f.service}
                  </td>
                  <td className="px-3 py-2">{f.cve ?? "—"}</td>
                  <td className="px-3 py-2">{f.title}</td>
                  <td className="px-3 py-2">{severityBadge(f.severity)}</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {f.recommendation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function ReportsSection({ md, json }: { md: string; json: string }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Rapport Markdown (extrait)</CardTitle>
        </CardHeader>
        <CardContent>
          <VSCodeBlock lang="md" code={md} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Payload JSON (pour ELK/SIEM)</CardTitle>
        </CardHeader>
        <CardContent>
          <VSCodeBlock lang="json" code={json} />
        </CardContent>
      </Card>
    </div>
  );
}

function CicdSection({
  ghaYaml,
  cmd1,
  cmd2,
}: {
  ghaYaml: string;
  cmd1: string;
  cmd2: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>GitHub Actions (Docker toolchain)</CardTitle>
        </CardHeader>
        <CardContent>
          <VSCodeBlock lang="yaml" code={ghaYaml} />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Commandes (local runner)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <VSCodeBlock lang="bash" code={cmd1} />
          <VSCodeBlock lang="bash" code={cmd2} />
        </CardContent>
      </Card>
    </div>
  );
}

/* — Tabs “shell” (mobile select + desktop tabs + contenus) — */
export function VSTabs({
  tabs,
  scans,
  findings,
  overviewBullets,
  snippets,
}: {
  tabs: readonly TabInfo[];
  scans: ScanRun[];
  findings: Finding[];
  overviewBullets: {
    toolchain: ReadonlyArray<string>;
    architecture: ReadonlyArray<string>;
  };
  snippets: {
    reportMd: string;
    elkPayload: string;
    ghaYaml: string;
    localCmd1: string;
    localCmd2: string;
  };
}) {
  const [tab, setTab] = React.useState<TabKey>("overview");

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => setTab(v as TabKey)}
      className="space-y-6 isolate"
    >
      {/* Mobile select */}
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
            className="block w-full appearance-none rounded-md border bg-background px-3 py-2 pr-10 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {tabs.map((t) => (
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
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.207l3.71-3.975a.75.75 0 011.08 1.04l-4.24 4.54a.75.75 0 01-1.08 0l-4.24-4.54a.75.75 0 01.02-1.06z" />
          </svg>
        </div>
      </div>

      {/* Alert valeur */}
      <Alert>
        <AlertDescription>
          <strong>Positionnement :</strong> pipeline réutilisable (Nmap/Naabu +
          Nuclei) → normalisation → scoring → rapports (Markdown/CSV/JSON) →
          export SIEM/ELK. Conçu pour <em>montrer de l’impact</em> côté prod et
          CI/CD.
        </AlertDescription>
      </Alert>

      {/* Desktop tablist */}
      <TabsList
        aria-label="Sections"
        className="hidden w-full grid-cols-5 gap-2 rounded-lg border bg-muted/50 p-1 md:grid"
      >
        {tabs.map((t) => (
          <TabsTrigger
            key={t.value}
            value={t.value}
            className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium text-foreground shadow-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Panneaux */}
      <TabsContent value="overview">
        <OverviewSection bullets={overviewBullets} />
      </TabsContent>
      <TabsContent value="scans">
        <ScansSection scans={scans} />
      </TabsContent>
      <TabsContent value="findings">
        <FindingsSection items={findings} />
      </TabsContent>
      <TabsContent value="reports">
        <ReportsSection md={snippets.reportMd} json={snippets.elkPayload} />
      </TabsContent>
      <TabsContent value="cicd">
        <CicdSection
          ghaYaml={snippets.ghaYaml}
          cmd1={snippets.localCmd1}
          cmd2={snippets.localCmd2}
        />
      </TabsContent>
    </Tabs>
  );
}
