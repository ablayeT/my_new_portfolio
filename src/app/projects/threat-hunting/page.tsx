"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Radar,
  Search,
  BookOpen,
  Target,
  GitBranch,
  BarChart3,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Filter,
  Copy as CopyIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";

/* --------------------------------- Types --------------------------------- */

type HuntStatus = "Draft" | "Running" | "Done";

type Hunt = {
  id: string;
  title: string;
  hypothesis: string;
  status: HuntStatus;
  sources: string[];
  tactic: string; // MITRE ATT&CK Tactic
  technique: string; // e.g. T1047
};

/* ------------------------------- Demo data -------------------------------- */

const HUNTS: Hunt[] = [
  {
    id: "wmi-remote-exec",
    title: "Exécutions WMI distantes anormales",
    hypothesis:
      "Des acteurs abusent de WMI (T1047) pour exécuter des commandes à distance sans outils externes.",
    status: "Running",
    sources: ["EDR", "Windows Security 4688", "Sysmon 1/3/6", "DNS/Proxy"],
    tactic: "Execution",
    technique: "T1047",
  },
  {
    id: "smb-lateral",
    title: "Mouvement latéral via SMB/RPC",
    hypothesis:
      "Des comptes techniques effectuent des connexions SMB inhabituelles vers de multiples hôtes.",
    status: "Draft",
    sources: ["EDR", "NetFlow/PCAP", "Firewall Logs", "AD Auth 4624"],
    tactic: "Lateral Movement",
    technique: "T1021.002",
  },
  {
    id: "lolbins-signed",
    title: "Abus de binaries signés (LOLBins)",
    hypothesis:
      "Des binaries signés (regsvr32/mshta/powershell) exécutent du code depuis des emplacements atypiques.",
    status: "Done",
    sources: ["EDR", "Windows Security 4688", "Sysmon 11", "Proxy"],
    tactic: "Defense Evasion",
    technique: "T1218",
  },
];

/* --------------------------- UI helpers (pro) ----------------------------- */

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-md bg-zinc-900 p-4 text-sm text-zinc-100">
        <code className="whitespace-pre">{code}</code>
      </pre>
      <Button
        variant="outline"
        size="sm"
        onClick={onCopy}
        className="absolute right-2 top-2"
      >
        <CopyIcon className="mr-1 h-4 w-4" />
        {copied ? "Copié" : "Copier"}
      </Button>
      <span className="sr-only">{lang}</span>
    </div>
  );
}

function statusBadge(status: HuntStatus) {
  if (status === "Running") return <Badge>Running</Badge>;
  if (status === "Done") return <Badge variant="outline">Done</Badge>;
  return <Badge variant="secondary">Draft</Badge>;
}

/* ------------------------------ Tabs config ------------------------------ */

const TABS = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "hunts", label: "Hunts", icon: Search },
  { value: "playbooks", label: "Playbooks", icon: GitBranch },
  { value: "detections", label: "Detections", icon: Target },
  { value: "metrics", label: "Metrics", icon: BarChart3 },
] as const;

/* --------------------------------- Page ---------------------------------- */

export default function ThreatHuntingPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [tab, setTab] = React.useState<string>("overview");

  const filtered = HUNTS.filter(
    (h) =>
      h.title.toLowerCase().includes(query.toLowerCase()) ||
      h.hypothesis.toLowerCase().includes(query.toLowerCase()) ||
      h.technique.toLowerCase().includes(query.toLowerCase())
  );

  // KPIs (mock) — vision “pilotage” pour recruteurs
  const KPIS = [
    {
      label: "Hunts actifs",
      value: HUNTS.filter((h) => h.status === "Running").length,
      icon: <Search className="h-5 w-5 text-blue-500" />,
    },
    {
      label: "Couverture ATT&CK (techniques clés)",
      value: "26",
      icon: <Target className="h-5 w-5 text-amber-500" />,
    },
    {
      label: "MTTD (campagnes récentes)",
      value: "3.1m",
      icon: <Clock className="h-5 w-5 text-emerald-500" />,
    },
    {
      label: "Précision alertes (VP/FP)",
      value: "92%",
      icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4">
          <div className="mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/projects")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux projets
            </Button>
          </div>

          {/* Header flexible (pas d’écrasement) */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-purple-300/40 bg-purple-50 px-2.5 py-2 dark:bg-purple-900/20">
                <Radar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Framework Threat Hunting
                </h1>
                <p className="text-sm text-muted-foreground">
                  Hypothèses → Tests → Évidence → Détections → Playbooks (SOC) —
                  piloté par ATT&amp;CK et métriques.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline">v1.0</Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Demo pack
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container space-y-8 py-6">
        {/* Bandeau valeur/pro */}
        <Alert>
          <AlertDescription>
            <strong>Objectif pro&nbsp;:</strong> montrer une démarche de chasse
            industrialisée (sources, requêtes, détections, KPIs) avec livrables
            convertibles en valeur SOC.
          </AlertDescription>
        </Alert>

        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((k) => (
            <Card key={k.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{k.label}</p>
                    <p className="text-xl font-semibold">{k.value}</p>
                  </div>
                  {k.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs responsive */}
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          {/* Mobile switcher (select) */}
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
                onChange={(e) => setTab(e.target.value)}
                className="block w-full appearance-none rounded-md border bg-background px-3 py-2 pr-10 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.207l3.71-3.975a.75.75 0 011.08 1.04l-4.24 4.54a.75.75 0 01-1.08 0l-4.24-4.54a.75.75 0 01.02-1.06z" />
              </svg>
            </div>
          </div>

          {/* Desktop tablist */}
          <TabsList
            aria-label="Sections"
            className="hidden w-full grid-cols-5 gap-2 rounded-lg border bg-muted/50 p-1 md:grid"
          >
            {TABS.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                aria-label={label}
                className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* — Overview — */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Approche</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      <strong>Hypothèses</strong> guidées ATT&amp;CK
                      (tactique/technique/IOA attendus).
                    </li>
                    <li>
                      <strong>Sources</strong> fiables : EDR, 4688/4104, Sysmon,
                      DNS/Proxy, Netflow.
                    </li>
                    <li>
                      <strong>Triangulation</strong> (process ↔ réseau ↔
                      identité) + horodatage précis.
                    </li>
                    <li>
                      <strong>Livrables</strong> : requêtes versionnées, règles
                      (Sigma/SPL/KQL), playbooks SOAR.
                    </li>
                    <li>
                      <strong>Mesure</strong> : MTTD/MTTR, précision alertes,
                      couverture ATT&amp;CK.
                    </li>
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
                      <li>EDR events (process/file/network)</li>
                      <li>Windows Security &amp; Sysmon</li>
                      <li>DNS/Proxy web</li>
                      <li>Netflow/PCAP</li>
                      <li>AD authent &amp; GPO</li>
                      <li>Cloud audit (si applicable)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* — Hunts — */}
          <TabsContent value="hunts">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle>Catalogue de hunts</CardTitle>
                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <Input
                      placeholder="Rechercher (technique, titre, hypothèse)"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full md:w-72"
                    />
                    <Button variant="outline" disabled>
                      <Filter className="mr-2 h-4 w-4" />
                      Filtres
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border bg-background">
                  <Table className="min-w-[720px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Hypothèse</TableHead>
                        <TableHead>ATT&amp;CK</TableHead>
                        <TableHead>Sources</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((h) => (
                        <TableRow key={h.id}>
                          <TableCell className="font-medium">
                            {h.title}
                          </TableCell>
                          <TableCell className="max-w-[360px] text-sm text-muted-foreground">
                            {h.hypothesis}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{h.tactic}</Badge>{" "}
                            <Badge variant="secondary">{h.technique}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {h.sources.join(", ")}
                          </TableCell>
                          <TableCell>{statusBadge(h.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* — Playbooks — */}
          <TabsContent value="playbooks">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Playbook (extrait) — WMI T1047</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
                    <li>Collecte : 4688, 4104, Sysmon 1/3/6, EDR 7 jours.</li>
                    <li>Filtrage : exclure comptes/hosts d’admin légitimes.</li>
                    <li>
                      Corrélation : authent 4624/4625, DNS/Proxy, latéralité.
                    </li>
                    <li>
                      Conclusion : IOC/IOA, ouverture ticket, détection à long
                      terme.
                    </li>
                  </ol>
                  <div className="rounded-md border bg-muted p-3 text-xs text-muted-foreground">
                    Sorties attendues : artefacts, horodatage, host,
                    utilisateur, hash, chemin, commande.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Checklist Evidence</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Process lineage + hash + signature</li>
                    <li>Command line + parent/child</li>
                    <li>Connexions réseau associées</li>
                    <li>Compte / session / machine</li>
                    <li>Contexte (poste admin ? serveur ? horaires ?) </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* — Detections — */}
          <TabsContent value="detections">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>KQL — WMI suspicious (Defender/EDR)</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    lang="kql"
                    code={`// Exécutions WMI suspectes
DeviceProcessEvents
| where ProcessCommandLine has "wmic"
| where ProcessCommandLine has "process call create"
| summarize count() by InitiatingProcessAccountName, bin(Timestamp, 1h)`}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Sigma (YAML) — LOLBins abuse</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    lang="yaml"
                    code={`title: LOLBins Suspicious Execution
id: 3b6c2f2a-1d8e-4f7a-9c28-aaa000111222
status: experimental
logsource:
  product: windows
  category: process_creation
detection:
  selection:
    Image|endswith:
      - '\\\\regsvr32.exe'
      - '\\\\mshta.exe'
      - '\\\\rundll32.exe'
  condition: selection
level: medium`}
                  />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Splunk SPL — SMB lateral bursts</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    lang="spl"
                    code={`index=edr OR index=network
| stats count by src_user, src_host, dest_host, action
| eventstats sum(count) as total by src_user, src_host
| where total > 50 AND action="SMB_SESSION"
| sort - total`}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* — Metrics — */}
          <TabsContent value="metrics">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Scorecard (exemple JSON)</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    lang="json"
                    code={`{
  "sprint": "2024-12",
  "objectifs": ["MTTD phishing < 5m", "Couvrir T1021.002 SMB"],
  "kpi": { "MTTD": "3.1m", "MTTR": "7.6m", "precision_alertes": "92%" },
  "livrables": ["Règle KQL latéralité", "Playbook SOAR confinement"],
  "actions": ["Durcir GPO", "Blocage macros", "Sensibilisation ciblée"]
}`}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Lecture terrain (quick wins)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      Normaliser la télémétrie process (lineage + hash +
                      signature).
                    </li>
                    <li>
                      Corréler identité/réseau pour réduire les faux positifs.
                    </li>
                    <li>Versionner requêtes & règles (Git) + revue.</li>
                    <li>Documenter chaque chasse → règle → runbook.</li>
                    <li>Publier un changelog sécurité par sprint.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
