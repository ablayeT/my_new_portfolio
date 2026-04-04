"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft, Mail, Shield, Eye, Copy, CheckCircle,
  AlertTriangle, Clock, Terminal, FileCode, Zap,
  ChevronRight, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export interface PhishingDemoPageProps {
  className?: string;
  onBack?: () => void;
}

// ── Données de la simulation ──────────────────────────────────────────────

const TIMELINE = [
  {
    phase: "T+00:00",
    actor: "Red",
    title: "Préparation de l'email",
    desc: "L'attaquant crée un email usurpant l'identité du service IT, avec un lien vers une page de connexion clonée.",
    icon: <Mail size={16} />,
    color: "bg-red-500",
  },
  {
    phase: "T+00:45",
    actor: "Red",
    title: "Envoi via GoPhish",
    desc: "Email envoyé à 24 cibles. L'objet : \"[URGENT] Réinitialisation de votre mot de passe VPN\".",
    icon: <Zap size={16} />,
    color: "bg-red-500",
  },
  {
    phase: "T+01:12",
    actor: "Blue",
    title: "Alerte Suricata",
    desc: "Suricata déclenche la règle ET_PHISHING sur le domaine frauduleux. Alert loggée dans ELK.",
    icon: <AlertTriangle size={16} />,
    color: "bg-blue-500",
  },
  {
    phase: "T+02:30",
    actor: "Blue",
    title: "Corrélation SIEM",
    desc: "Kibana corrèle : 3 utilisateurs ont cliqué. Ticket d'incident créé automatiquement.",
    icon: <Shield size={16} />,
    color: "bg-blue-500",
  },
  {
    phase: "T+04:00",
    actor: "Blue",
    title: "Containment",
    desc: "Blocage du domaine frauduleux au proxy, quarantaine des emails, notification aux utilisateurs.",
    icon: <CheckCircle size={16} />,
    color: "bg-emerald-500",
  },
];

const PHISHING_EMAIL = `From: it-support@companyname-helpdesk.com
To: john.martin@target-company.com
Subject: [URGENT] Réinitialisation obligatoire — Accès VPN expiré
Date: Sat, 04 Apr 2026 08:42:11 +0200
X-Mailer: GoPhish
MIME-Version: 1.0

Bonjour John,

Votre accès VPN arrive à expiration dans les 24 heures.
Pour maintenir votre accès, cliquez sur le lien ci-dessous :

  → https://company-it-portal.auth-vpn.net/reset?token=a8f3c2

Ce lien expire dans 2 heures.

Cordialement,
Support IT — Sécurité des accès`;

const IOCS = [
  { type: "Domaine", value: "company-it-portal.auth-vpn.net", risk: "Élevé" },
  { type: "IP",      value: "185.220.101.47",                  risk: "Élevé" },
  { type: "URL",     value: "/reset?token=a8f3c2",             risk: "Moyen" },
  { type: "Header",  value: "X-Mailer: GoPhish",               risk: "Élevé" },
];

const SIEM_LOG = `{
  "@timestamp": "2026-04-04T08:43:22.000Z",
  "event.category": "network",
  "event.type": "alert",
  "rule.name": "ET PHISHING Suspicious Domain Redirect",
  "rule.id": "2027865",
  "source.ip": "185.220.101.47",
  "destination.ip": "10.0.1.45",
  "http.request.referrer": "https://company-it-portal.auth-vpn.net",
  "user.name": "john.martin",
  "host.name": "PC-JMARTIN-001",
  "event.severity": 3,
  "tags": ["phishing", "credential-harvesting", "T1566.002"],
  "mitre.technique": "Spearphishing Link",
  "mitre.tactic": "Initial Access"
}`;

const SIGMA_RULE = `title: Phishing — Credential Harvesting via Fake Login Page
id: a3b2c1d4-e5f6-7890-abcd-ef1234567890
status: experimental
description: |
  Détecte les tentatives d'accès à des pages de phishing
  imitant des portails d'entreprise via URL suspicieuse.
author: Abdoulaye Touré
date: 2026-04-04
tags:
  - attack.initial_access
  - attack.t1566.002
logsource:
  category: proxy
  product: squid
detection:
  selection:
    c-uri|contains:
      - 'auth-vpn.net'
      - 'helpdesk-portal.net'
      - 'reset?token='
    cs-method: GET
  filter:
    c-uri|contains:
      - 'companyname.com'
  condition: selection and not filter
falsepositives:
  - Portails VPN légitimes (à whitelister)
level: high
fields:
  - c-ip
  - cs-username
  - c-uri
  - cs-bytes`;

const IR_STEPS = [
  {
    step: "1. Triage",
    time: "T+01:12",
    actions: [
      "Identifier la règle Suricata déclenchée (ET_PHISHING)",
      "Lister les utilisateurs ayant cliqué via les logs proxy",
      "Confirmer le domaine frauduleux (WHOIS, VirusTotal)",
    ],
    severity: "critical",
  },
  {
    step: "2. Containment",
    time: "T+02:00",
    actions: [
      "Bloquer le domaine au proxy (Squid/Zscaler)",
      "Quarantaine des emails non ouverts (O365/Exchange)",
      "Forcer reset MFA pour les comptes compromis",
    ],
    severity: "high",
  },
  {
    step: "3. Eradication",
    time: "T+04:00",
    actions: [
      "Révoquer les sessions actives des comptes cliqueurs",
      "Signaler le domaine (abuse@registrar, Google SafeBrowsing)",
      "Pousser l'IOC dans le SIEM (blocklist)",
    ],
    severity: "medium",
  },
  {
    step: "4. Lessons Learned",
    time: "T+24h",
    actions: [
      "Formation ciblée pour les 3 utilisateurs ayant cliqué",
      "Écriture de la règle Sigma pour futurs scénarios similaires",
      "Mise à jour du playbook IR avec le vecteur identifié",
    ],
    severity: "low",
  },
];

const KPIS = [
  { label: "MTTD",           value: "1m 12s", sub: "Détection initiale",    color: "text-blue-500" },
  { label: "MTTR",           value: "4m 00s", sub: "Containment complet",   color: "text-emerald-500" },
  { label: "Taux de clic",   value: "12.5%",  sub: "3 / 24 utilisateurs",   color: "text-amber-500" },
  { label: "IOCs extraits",  value: "4",      sub: "Domaine, IP, URL, Header", color: "text-violet-500" },
];

// ── Helpers ───────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/80 hover:bg-white/20 transition-colors"
    >
      {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
      {copied ? "Copié" : "Copier"}
    </button>
  );
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-2">
        <span className="text-[11px] font-medium text-zinc-400">{lang}</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto bg-zinc-950 p-4 text-[11px] leading-5 text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Composant principal ───────────────────────────────────────────────────

export default function PhishingDemoPage({ className = "", onBack }: PhishingDemoPageProps) {

  return (
    <div className={["min-h-screen bg-background", className].join(" ")}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          {onBack ? (
            <Button variant="ghost" size="sm" className="gap-2" onClick={onBack}>
              <ArrowLeft size={15} /> Retour aux projets
            </Button>
          ) : (
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft size={15} /> Projets
              </Button>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-amber-400 text-amber-600 dark:text-amber-400">
              DEMO · READ-ONLY
            </Badge>
            <Badge variant="secondary" className="text-[11px]">
              MITRE T1566.002
            </Badge>
          </div>
        </div>
      </div>

      <div className="container space-y-10 py-8">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="h-[3px] bg-gradient-to-r from-amber-500 via-red-500 to-violet-600" />
          <div className="p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="destructive" className="rounded-full">Red Team</Badge>
              <Badge className="rounded-full bg-blue-600 text-white">Blue Team</Badge>
              <Badge variant="secondary" className="rounded-full">GoPhish · ELK · Suricata</Badge>
            </div>
            <h1 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Simulation de Phishing :  Anatomie d'une attaque
            </h1>
            <p className="mb-6 max-w-2xl text-sm text-muted-foreground leading-relaxed">
              Démonstration complète Purple Team : simulation d'une attaque par spearphishing
              (T1566.002), détection automatique via SIEM/Suricata et réponse à l'incident
              structurée. Chaque étape est documentée avec les artefacts réels produits en lab.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {KPIS.map((k) => (
                <div key={k.label} className="rounded-xl border bg-muted/20 p-3 text-center">
                  <div className={`text-xl font-bold ${k.color}`}>{k.value}</div>
                  <div className="text-xs font-medium text-foreground">{k.label}</div>
                  <div className="text-[10px] text-muted-foreground">{k.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <div>
          <h2 className="mb-4 text-base font-semibold text-foreground">
            Déroulement de l'attaque
          </h2>
          <div className="relative space-y-0">
            {/* Ligne verticale */}
            <div className="absolute left-[19px] top-3 h-[calc(100%-24px)] w-px bg-border" />
            {TIMELINE.map((t, i) => (
              <div key={i} className="relative flex gap-4 pb-4 last:pb-0">
                <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${t.color}`}>
                  {t.icon}
                </div>
                <div className="flex-1 rounded-xl border border-border bg-card p-4">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-md border bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {t.phase}
                    </span>
                    <Badge
                      variant={t.actor === "Red" ? "destructive" : "default"}
                      className={`text-[10px] ${t.actor === "Blue" ? "bg-blue-600" : ""}`}
                    >
                      {t.actor} Team
                    </Badge>
                    <span className="text-sm font-semibold text-foreground">{t.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs détail ──────────────────────────────────────── */}
        <div>
          <h2 className="mb-4 text-base font-semibold text-foreground">
            Artefacts de la simulation
          </h2>
          <Tabs defaultValue="email" className="space-y-4">
            <TabsList className="flex w-full gap-1 overflow-x-auto rounded-xl border bg-muted/30 p-1">
              {[
                { value: "email",   label: "Email d'attaque", icon: <Mail size={14} /> },
                { value: "logs",    label: "Logs SIEM",        icon: <Terminal size={14} /> },
                { value: "sigma",   label: "Règle Sigma",      icon: <FileCode size={14} /> },
                { value: "ir",      label: "Playbook IR",      icon: <Shield size={14} /> },
              ].map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg text-sm"
                >
                  {t.icon}
                  <span className="hidden sm:inline">{t.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ── Email d'attaque ────────────────────────────── */}
            <TabsContent value="email" className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Email brut (headers + body)</h3>
                  <CodeBlock code={PHISHING_EMAIL} lang="Email · Spearphishing" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Indicators of Compromise (IOCs)</h3>
                  <div className="space-y-2">
                    {IOCS.map((ioc, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-muted/10 px-4 py-3">
                        <div>
                          <span className="text-[11px] font-semibold uppercase text-muted-foreground">
                            {ioc.type}
                          </span>
                          <p className="font-mono text-xs text-foreground">{ioc.value}</p>
                        </div>
                        <Badge
                          variant={ioc.risk === "Élevé" ? "destructive" : "outline"}
                          className="text-[10px]"
                        >
                          {ioc.risk}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-amber-300/30 bg-amber-50 p-3 dark:bg-amber-900/20">
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      <strong>MITRE ATT&CK T1566.002</strong> — Spearphishing Link :
                      lien vers une landing page clonée pour capturer des credentials.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ── Logs SIEM ──────────────────────────────────── */}
            <TabsContent value="logs" className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Log ELK — Alerte Suricata</h3>
                  <CodeBlock code={SIEM_LOG} lang="JSON · Elasticsearch" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Lecture du log</h3>
                  <div className="space-y-2">
                    {[
                      { key: "event.severity",    val: "3 (Critical)",           color: "text-red-500" },
                      { key: "mitre.technique",   val: "Spearphishing Link",     color: "text-amber-500" },
                      { key: "mitre.tactic",      val: "Initial Access",         color: "text-orange-500" },
                      { key: "source.ip",         val: "185.220.101.47",         color: "text-foreground" },
                      { key: "user.name",         val: "john.martin",            color: "text-foreground" },
                      { key: "host.name",         val: "PC-JMARTIN-001",         color: "text-foreground" },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted/10 px-3 py-2">
                        <span className="font-mono text-[11px] text-muted-foreground">{r.key}</span>
                        <span className={`font-mono text-[11px] font-medium ${r.color}`}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-blue-300/30 bg-blue-50 p-3 dark:bg-blue-900/20">
                    <p className="text-xs text-blue-700 dark:text-blue-400">
                      Ce log est généré automatiquement par Suricata et ingéré dans ELK
                      via Filebeat en moins de 30 secondes après le clic.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ── Règle Sigma ────────────────────────────────── */}
            <TabsContent value="sigma" className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Règle Sigma — détection du scénario</h3>
                  <CodeBlock code={SIGMA_RULE} lang="YAML · Sigma Rule" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Pourquoi cette règle ?</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Générique", desc: "Détecte tout domaine usurpant un portail IT via token de reset, pas seulement ce vecteur précis." },
                      { title: "Portable",  desc: "Le format Sigma se convertit en KQL (Elastic), SPL (Splunk) ou QRadar via sigma-cli." },
                      { title: "Filtré",    desc: "Le filtre exclut le vrai domaine pour éviter les faux positifs." },
                    ].map((r, i) => (
                      <div key={i} className="rounded-xl border border-border bg-muted/10 p-3">
                        <p className="mb-1 text-xs font-semibold text-foreground">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.desc}</p>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" asChild className="gap-2 w-full">
                      <a href="https://github.com/SigmaHQ/sigma" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={13} /> Sigma HQ — Documentation
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ── Playbook IR ────────────────────────────────── */}
            <TabsContent value="ir" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {IR_STEPS.map((s, i) => {
                  const borderColor =
                    s.severity === "critical" ? "border-red-300/50 dark:border-red-800" :
                    s.severity === "high"     ? "border-amber-300/50 dark:border-amber-800" :
                    s.severity === "medium"   ? "border-blue-300/50 dark:border-blue-800" :
                    "border-emerald-300/50 dark:border-emerald-800";
                  const dotColor =
                    s.severity === "critical" ? "bg-red-500" :
                    s.severity === "high"     ? "bg-amber-500" :
                    s.severity === "medium"   ? "bg-blue-500" : "bg-emerald-500";

                  return (
                    <div key={i} className={`rounded-xl border p-4 ${borderColor}`}>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${dotColor}`} />
                          <span className="text-sm font-semibold text-foreground">{s.step}</span>
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground">{s.time}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {s.actions.map((a, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <ChevronRight size={12} className="mt-0.5 shrink-0 text-muted-foreground/50" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-xl border border-emerald-300/30 bg-emerald-50 p-4 dark:bg-emerald-900/20">
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  <strong>Cadre NIST 800-61 :</strong> Ce playbook couvre les phases
                  Detect → Contain → Eradicate → Recover, avec des délais objectifs
                  MTTD ≤ 5 min et MTTR ≤ 30 min pour ce type de vecteur.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <h2 className="mb-2 text-lg font-bold text-foreground">
            Intéressé par ce type de compétence ?
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Je peux reproduire ce scénario sur votre infrastructure, écrire des règles de
            détection adaptées à votre SIEM, ou former vos équipes à la sensibilisation.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="gap-2">
              <Link href="/contact">Me contacter</Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/cv">Voir mon CV</Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}