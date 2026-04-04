"use client";

import * as React from "react";
import Link from "next/link";
import {
  Network, Github, Download, ExternalLink,
  Shield, Terminal, Radar, Mail, ArrowLeft,
  Clock, Zap, Target, TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CVDownloadModal } from "@/components/portfolio/cv-download-modal";
import { NetworkDiagram } from "@/components/portfolio/Network-diagram";

export interface PurpleTeamProjectProps {
  onBack: () => void;
  className?: string;
}

type TabId = "overview" | "red-team" | "blue-team" | "results";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview",  label: "Aperçu",     icon: <Shield size={15} /> },
  { id: "red-team",  label: "Red Team",   icon: <Terminal size={15} /> },
  { id: "blue-team", label: "Blue Team",  icon: <Radar size={15} /> },
  { id: "results",   label: "Résultats",  icon: <TrendingUp size={15} /> },
];

const KPIS = [
  { label: "Temps de détection", value: "2.3", unit: "min", change: "−30%", icon: <Clock size={16} />, color: "text-emerald-500" },
  { label: "Alertes générées",   value: "24",  unit: "",    change: null,    icon: <Zap size={16} />,   color: "text-blue-500" },
  { label: "Taux de précision",  value: "94",  unit: "%",   change: "+6%",  icon: <Target size={16} />, color: "text-emerald-500" },
  { label: "Temps de réponse",   value: "5.1", unit: "min", change: "−2min", icon: <TrendingUp size={16} />, color: "text-amber-500" },
];

const ATTACKS = [
  { phase: "Reconnaissance & Phishing", time: "T+00:00", icon: Mail, desc: "Reconnaissance OSINT et déploiement campagne phishing avec GoPhish." },
  { phase: "Initial Access",            time: "T+01:30", icon: Terminal, desc: "Exploitation des vulnérabilités DVWA via Burp Suite et Metasploit." },
  { phase: "Privilege Escalation",      time: "T+02:15", icon: Shield, desc: "Élévation de privilèges et établissement de persistance." },
  { phase: "Lateral Movement",          time: "T+03:00", icon: Network, desc: "Reconnaissance interne et déplacement latéral dans l'infrastructure." },
];

const ALERTS = [
  { sev: "critical", src: "Suricata", title: "Phishing Email Campaign Detected", desc: "Détection de campagne de phishing ciblant les utilisateurs internes.", ts: "T+00:45" },
  { sev: "critical", src: "ELK",      title: "Suspicious Process Execution",     desc: "Exécution de processus malveillant détectée sur la VM victime.",    ts: "T+01:45" },
  { sev: "warn",     src: "Kibana",   title: "Lateral Movement Attempt",         desc: "Tentative de mouvement latéral détectée via analyse des logs réseau.", ts: "T+03:15" },
];

const TECHS = ["Kali Linux", "ELK Stack", "Suricata", "DVWA", "GoPhish", "Metasploit", "Kibana", "Nginx", "Docker"];

export const PurpleTeamProject: React.FC<PurpleTeamProjectProps> = ({ onBack, className = "" }) => {
  const [showDownload, setShowDownload] = React.useState(false);
  const [activeTab, setActiveTab]       = React.useState<TabId>("overview");
  const [showDiagram, setShowDiagram]   = React.useState(false);

  return (
    <div className={["space-y-8", className].filter(Boolean).join(" ")}>

      {/* ── Back ─────────────────────────────────────────────── */}
      <Button variant="ghost" size="sm" className="gap-2" onClick={onBack}>
        <ArrowLeft size={15} />
        Retour aux projets
      </Button>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="h-[3px] w-full bg-gradient-to-r from-violet-600 via-violet-400 to-transparent" />
        <div className="px-6 py-10 text-center sm:px-10">
          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative">
            <div className="mb-5 flex justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/30">
                <Network size={36} className="text-violet-600" />
              </span>
            </div>

            <div className="mb-4 flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="rounded-full">Purple Team</Badge>
              <Badge variant="secondary" className="rounded-full">Infrastructure</Badge>
              <Badge variant="secondary" className="rounded-full">MITRE ATT&CK</Badge>
            </div>

            <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Purple Team Lab Infrastructure
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm text-muted-foreground leading-relaxed sm:text-base">
              Architecture réseau complète pour simulations d&apos;attaques et défense avec
              monitoring en temps réel. Un laboratoire complet pour la formation et
              l&apos;évaluation des capacités de sécurité.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="gap-2">
                <Link href="https://github.com/ablayeT?tab=repositories" target="_blank">
                  <Github size={16} />
                  Voir sur GitHub
                </Link>
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => setShowDiagram(true)}>
                <Network size={16} />
                Diagramme réseau
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── KPIs ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className={`mb-2 ${k.color}`}>{k.icon}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{k.value}</span>
              {k.unit && <span className="text-sm text-muted-foreground">{k.unit}</span>}
            </div>
            <p className="text-xs text-muted-foreground">{k.label}</p>
            {k.change && (
              <p className={`mt-1 text-xs font-medium ${k.color}`}>{k.change}</p>
            )}
          </div>
        ))}
      </div>

      {/* ── Tabs ─────────────────────────────────────────────── */}
      <div>
        {/* Tab bar */}
        <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-muted/30 p-1">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Tab : Overview ─────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Objectif du projet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Créer un environnement de simulation Purple Team permettant de tester
                    des scénarios d&apos;attaque réalistes tout en développant et validant
                    les capacités de détection et de réponse.
                  </p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {[
                      "Infrastructure réseau segmentée (Public, DMZ, Private)",
                      "Scénarios d'attaque MITRE ATT&CK complets",
                      "Monitoring et détection en temps réel",
                      "Dashboards d'analyse et de reporting",
                      "Automatisation des réponses aux incidents",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Technologies utilisées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {TECHS.map((t) => (
                      <span key={t} className="rounded-lg border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ── Tab : Red Team ─────────────────────────────────── */}
        {activeTab === "red-team" && (
          <div className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Terminal size={16} className="text-red-500" />
                  Phase Red Team — Simulation d&apos;attaque
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Scénario d&apos;attaque complet suivant la kill chain : reconnaissance,
                  initial access, exécution, persistance et exfiltration.
                </p>
                <div className="space-y-3">
                  {ATTACKS.map((a, i) => {
                    const Icon = a.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-muted/10 p-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                          <Icon size={16} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-foreground">
                              Phase {i + 1} : {a.phase}
                            </span>
                            <Badge variant="destructive" className="text-[10px]">{a.time}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{a.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Tab : Blue Team ────────────────────────────────── */}
        {activeTab === "blue-team" && (
          <div className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Radar size={16} className="text-blue-500" />
                  Phase Blue Team — Détection et réponse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {ALERTS.map((a, i) => (
                    <div key={i} className="rounded-xl border border-border bg-muted/10 p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={a.sev === "critical" ? "text-red-500" : "text-amber-500"}>
                            ▲
                          </span>
                          <span className="text-sm font-medium text-foreground">{a.title}</span>
                          <Badge variant="secondary" className="text-[10px]">{a.src}</Badge>
                        </div>
                        <Badge
                          variant={a.sev === "critical" ? "destructive" : "outline"}
                          className="text-[10px]"
                        >
                          {a.ts}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{a.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Tab : Résultats ────────────────────────────────── */}
        {activeTab === "results" && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-emerald-600">✅ Points forts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Détection efficace des campagnes de phishing",
                      "Corrélation automatique des événements de sécurité",
                      "Temps de réponse optimisé grâce à l'automatisation",
                      "Visibilité complète sur l'infrastructure",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-amber-600">⚠️ Axes d&apos;amélioration</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Réduction des faux positifs sur les alertes réseau",
                      "Amélioration de la détection des mouvements latéraux",
                      "Intégration de l'IA pour l'analyse comportementale",
                      "Extension du périmètre de monitoring",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Ressources */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Ressources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="gap-2">
                    <Link href="https://github.com/ablayeT?tab=repositories" target="_blank">
                      <Github size={15} />
                      Code source GitHub
                    </Link>
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={() => setShowDownload(true)}>
                    <Download size={15} />
                    Rapport PDF
                  </Button>
                  <Button variant="outline" className="gap-2" asChild>
                    <Link href="/projects">
                      <ExternalLink size={15} />
                      Tous les projets
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* ── Modals ───────────────────────────────────────────── */}
      <CVDownloadModal isOpen={showDownload} onClose={() => setShowDownload(false)} />
      <NetworkDiagram open={showDiagram} onClose={() => setShowDiagram(false)} />
    </div>
  );
};