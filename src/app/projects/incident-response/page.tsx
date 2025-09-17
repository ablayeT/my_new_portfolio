"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  GitBranch,
  FileCode,
  ExternalLink,
  Workflow,
  Target,
  TimerReset,
  PhoneCall,
  Lock,
  Siren,
  ShieldCheck,
  ClipboardList,
  Copy,
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

type TabKey = "overview" | "playbooks" | "automation" | "templates" | "metrics";

export default function IncidentResponsePage({
  repoUrl = "#",
  docsUrl = "#", // ex: un README ou un PDF “Runbook IR”
}: {
  repoUrl?: string;
  docsUrl?: string;
} = {}) {
  const [tab, setTab] = React.useState<TabKey>("overview");

  // Highlights (marché + valeur recruteur)
  const features = [
    { icon: <ShieldCheck className="h-5 w-5" />, label: "Cadre NIST 800-61" },
    { icon: <Workflow className="h-5 w-5" />, label: "Playbooks SOAR-ready" },
    { icon: <Target className="h-5 w-5" />, label: "Aligné MITRE ATT&CK" },
    { icon: <PhoneCall className="h-5 w-5" />, label: "RACI & comm. de crise" },
  ];

  // KPIs (exemples réalistes à viser)
  const stats = [
    {
      label: "Playbooks normalisés",
      value: "12+",
      hint: "Phishing, Ransomware, EDR, IAM…",
    },
    {
      label: "Automations actives",
      value: "8+",
      hint: "Enrichissement, containment, tickets",
    },
    { label: "MTTD (objectif)", value: "≤ 5m", hint: "détection to triage" },
    { label: "MTTR (objectif)", value: "≤ 60m", hint: "containment initial" },
  ];

  // Snippets utiles (scrollables mobile)
  const snippets = [
    {
      title: "Playbook — Ransomware (extrait)",
      lang: "md",
      code: `# Ransomware — Réponse rapide
## 1) Détection & triage
- Indicateurs: spikes chiffrement, notes ransom, EDR alerts, SMB bursts
- Classifier: *Sev1* si serveurs critiques impactés

## 2) Containment (15 min)
- Isoler hôtes via EDR/MDM (block network)
- Désactiver comptes compromis (IdP/IAM)
- Stopper tâches latérales (RPC/SMB, PSRemoting)

## 3) Eradication & validation
- Kill process / supprimer persistance (services, Scheduled Tasks)
- YARA sweep + restore à blanc
- Patching vuln. initiale (VPN, RDP, app)

## 4) Rétablissement & durcissement
- Restauration *clean* (snapshots/verifié)
- Rotation secrets/krbtgt, GPO durcies
- Leçons apprises + règles détection
`,
    },
    {
      title: "SOAR — Phishing triage (YAML pseudo)",
      lang: "yaml",
      code: `flow: phishing_triage_v1
on:
  - type: email.reported
steps:
  - enrich_urls: [ urlscan, vt, whois ]
  - analyze_attachments: [ clamav, sandbox ]
  - decision:
      if: risk_score < 30
      then: close(reason="Benign", notify=reporter)
      elif: risk_score < 70
      then: ticket(queue="SOC-Triage", sla="2h")
      else: contain:
        - block_urls@proxy
        - quarantine_inbox@o365
        - open_incident(sev="High")`,
    },
    {
      title: "Webhook — Slack (alerte Sev1)",
      lang: "json",
      code: `{
  "text": ":rotating_light: *SEV1 INCIDENT* — Ransomware suspected",
  "blocks": [
    { "type": "section",
      "text": { "type": "mrkdwn",
        "text": "*Host:* dc-01  |  *User:* svc-backup  |  *IOCs:* 3 hashes" } },
    { "type": "actions",
      "elements": [
        { "type": "button", "text": { "type": "plain_text","text": "Isoler via EDR" }, "url": "https://edr/host/dc-01" },
        { "type": "button", "text": { "type": "plain_text","text": "Ouvrir TheHive" }, "url": "https://thehive/incidents/new" }
      ]}
  ]
}`,
    },
    {
      title: "Modèle — Rapport d’incident",
      lang: "md",
      code: `# Rapport d'incident
- ID/Sev: IR-2025-001 (Sev1)
- Dates: Détection, Containment T0+15m, Rétablissement T0+6h
- Portée: assets, users, données
- Cause racine: …
- Mesures: containment, eradication, durcissement
- Impacts: disponibilité, confidentialité, réglementation
- Leçons & actions: owners + échéances
`,
    },
  ];

  function onCopy(text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
  }

  return (
    <TooltipProvider>
      <main className="w-full bg-gradient-to-b from-background to-muted/30">
        {/* HERO */}
        <section>
          <div className="mx-auto w-full lg:max-w-7xl px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-5 sm:space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    Incident Response
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    NIST 800-61
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    SOAR-ready
                  </Badge>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  Playbook Réponse aux Incidents
                </h1>

                <p className="text-muted-foreground text-[15px] sm:text-base leading-relaxed">
                  Pack opérationnel de gestion d’incidents : playbooks
                  normalisés, automatisations SOAR, modèles de rapports et
                  métriques (MTTD/MTTR). Cohérent avec NIST 800-61 & MITRE
                  ATT&CK, pensé pour accélérer triage, containment et retour à
                  la normale.
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
                      href={docsUrl}
                      target={docsUrl === "#" ? undefined : "_blank"}
                    >
                      <FileCode className="mr-2 h-4 w-4" /> Guide & modèles
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

              {/* Mini-vision */}
              <Card className="border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5" /> Cadre opérationnel
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <ul className="list-disc ml-5 space-y-1">
                    <li>
                      Cycle NIST : Préparation → Détection/Triage → Containment
                      → Eradication → Rétablissement → Retex.
                    </li>
                    <li>
                      RACI & communication : SOC ↔ IT ↔ Legal ↔ Direction ↔
                      Communication.
                    </li>
                    <li>
                      Catalogue d’actions rapides : isolation EDR, blocage
                      proxy/IdP, reset credentials, GPO.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-2 sm:my-4" />

        {/* KPIs */}
        <section className="mx-auto w-full lg:max-w-7xl px-3 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s, i) => (
              <Card key={i}>
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
        <section className="mx-auto w-full lg:max-w-7xl px-3 sm:px-6 lg:px-8 pb-8">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as TabKey)}
            className="w-full space-y-4"
          >
            {/* Mobile select */}
            <div className="sm:hidden">
              <label
                htmlFor="tabSelect"
                className="mb-2 block text-sm font-medium"
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
                  <option value="overview">Overview</option>
                  <option value="playbooks">Playbooks</option>
                  <option value="automation">Automation</option>
                  <option value="templates">Modèles</option>
                  <option value="metrics">Métriques</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.207l3.71-3.975a.75.75 0 011.08 1.04l-4.24 4.54a.75.75 0 01-1.08 0l-4.24-4.54a.75.75 0 01.02-1.06z" />
                </svg>
              </div>
            </div>

            {/* Desktop tabs */}
            <TabsList className="hidden sm:flex w-full items-center gap-2 overflow-x-auto rounded-lg border bg-muted/50 p-1">
              {[
                { value: "overview", label: "Overview" },
                { value: "playbooks", label: "Playbooks" },
                { value: "automation", label: "Automation" },
                { value: "templates", label: "Modèles" },
                { value: "metrics", label: "Métriques" },
              ].map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value as TabKey}
                  className="shrink-0 inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium shadow-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="mt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Préparation (readiness)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Catalogue d’incidents + matrice de sévérité.</li>
                      <li>
                        Sources: SIEM/EDR, IdP/IAM, proxy/DNS, endpoints & cloud
                        logs.
                      </li>
                      <li>Runbooks versionnés (Git), tests table-top.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Triage & escalade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        Critères: impact, portée, exploitabilité, données
                        sensibles.
                      </li>
                      <li>
                        Décisions: fermer, surveiller, escalader
                        (Sev1/Sev2/Sev3).
                      </li>
                      <li>
                        Comms: Slack/Teams, ticket (Jira/ServiceNow), incident
                        commander.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Playbooks */}
            <TabsContent value="playbooks" className="mt-2">
              <div className="grid gap-4 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Siren className="h-4 w-4" /> Ransomware
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Isoler hôtes (EDR), couper latéralité (SMB/RPC).</li>
                      <li>
                        Blocage C2/DGA, rotation secrets, sauvegardes “clean”.
                      </li>
                      <li>Rétablissement contrôlé + durcissement GPO.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Lock className="h-4 w-4" /> Compte privilégié
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        Révocation sessions, reset mot de passe, MFA forcée.
                      </li>
                      <li>
                        Audit groupes sensibles, recherche activités anormales.
                      </li>
                      <li>Création détection durable (SIEM/EDR, KQL/Sigma).</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <ClipboardList className="h-4 w-4" /> Phishing ciblé
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        Enrichir URLs/PIÈCES-JOINTES, auto-quarantaine mailbox.
                      </li>
                      <li>
                        Blocage proxy/secure email gateway, notification
                        employés.
                      </li>
                      <li>IOC → SIEM, formation ciblée.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Automation */}
            <TabsContent value="automation" className="mt-2">
              <div className="grid gap-4 md:grid-cols-2">
                {snippets.slice(1, 3).map((snip, i) => (
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
                      <div className="-mx-3 sm:mx-0 overflow-x-auto overscroll-x-contain no-scrollbar">
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
            </TabsContent>

            {/* Templates */}
            <TabsContent value="templates" className="mt-2">
              <div className="grid gap-4 md:grid-cols-2">
                {[snippets[0], snippets[3]].map((snip, i) => (
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
                      <div className="-mx-3 sm:mx-0 overflow-x-auto overscroll-x-contain no-scrollbar">
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
            </TabsContent>

            {/* Metrics */}
            <TabsContent value="metrics" className="mt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Scorecard (exemple JSON)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="-mx-3 sm:mx-0 overflow-x-auto overscroll-x-contain no-scrollbar">
                      <pre className="inline-block w-max min-w-full max-w-none rounded-lg bg-zinc-900 p-3 text-[11px] sm:text-xs leading-5">
                        <code className="block whitespace-pre text-zinc-100">{`{
  "sprint": "2025-09",
  "objectifs": ["MTTD <= 5m", "Containment initial <= 60m", "Automatisation phishing triage"],
  "kpi": { "MTTD": "4m", "MTTR": "52m", "coverage_playbooks": "12" },
  "livrables": ["Playbook ransomware v2", "SOAR flow phishing", "Modèles rapport/postmortem"],
  "actions": ["Isolation 1-click EDR", "Blocs proxy auto", "RACI revue trimestrielle"]
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Quick wins (terrain)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <ul className="list-disc ml-5 space-y-1">
                      <li>
                        Isolation EDR 1-click + webhook Slack (commande unique).
                      </li>
                      <li>
                        Templates de tickets (Jira/SNOW) préremplis + SLA.
                      </li>
                      <li>
                        Runbooks versionnés (Git) + rétrospectives
                        post-incident.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA bas de page */}
        <section className="mx-auto w-full lg:max-w-7xl px-3 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col sm:flex-row gap-3">
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
