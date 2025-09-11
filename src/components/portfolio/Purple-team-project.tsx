"use client";

import * as React from "react";
import { Button } from "@/components/comp/Button";
import { Card } from "@/components/comp/Card";
import { Badge } from "@/components/comp/Badge";
import {
  Network,
  GitHub,
  Download,
  External,
  Shield,
  Terminal,
  Radar,
  Mail,
  ArrowLeft,
} from "@/components/portfolio/Icons";
import { CVDownloadModal } from "@/components/portfolio/cv-download-modal";

export interface PurpleTeamProjectProps {
  onBack: () => void;
  className?: string;
}

type TabId = "overview" | "red-team" | "blue-team" | "results";

export const PurpleTeamProject: React.FC<PurpleTeamProjectProps> = ({
  onBack,
  className = "",
}) => {
  const [showDownloadModal, setShowDownloadModal] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<TabId>("overview");

  const kpis = [
    {
      label: "Temps de détection",
      value: "2.3",
      unit: "min",
      change: "30% plus rapide",
      intent: "success" as const,
    },
    {
      label: "Alertes générées",
      value: "24",
      change: null,
      intent: "secondary" as const,
    },
    {
      label: "Taux de précision",
      value: "94",
      unit: "%",
      change: "6% d'amélioration",
      intent: "success" as const,
    },
    {
      label: "Temps de réponse",
      value: "5.1",
      unit: "min",
      change: "2min plus rapide",
      intent: "warning" as const,
    },
  ];

  const attacks = [
    { phase: "Reconnaissance & Phishing", time: "T+00:00", icon: Mail },
    { phase: "Initial Access", time: "T+01:30", icon: Terminal },
    { phase: "Privilege Escalation", time: "T+02:15", icon: Shield },
    { phase: "Lateral Movement", time: "T+03:00", icon: Network },
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Back Navigation */}
      <div>
        <Button
          intent="ghost"
          size="sm"
          onClick={onBack}
          className="min-h-[44px]"
        >
          <ArrowLeft size={16} className="mr-2" />
          Retour aux projets
        </Button>
      </div>

      {/* Hero */}
      <section className="py-8 text-center">
        <div
          style={{
            marginBottom: "var(--tokens-spacing-24,24px)",
            color: "var(--tokens-color-brand-purple)",
          }}
        >
          <Network className="mx-auto mb-4" size={64} />
        </div>

        <h1
          style={{
            fontSize:
              "clamp(var(--tokens-text-h2-28,28px), 4vw, var(--tokens-text-h1-36,36px))",
            fontWeight: 700,
            color: "var(--color-foreground,#0b1324)",
            marginBottom: "var(--tokens-spacing-16,16px)",
            lineHeight: 1.2,
          }}
        >
          Purple Team Lab Infrastructure
        </h1>

        <p
          style={{
            color: "var(--color-muted-foreground,#6b7280)",
            fontSize: "var(--tokens-text-body-16,16px)",
            maxWidth: "48rem",
            margin: "0 auto",
            marginBottom: "var(--tokens-spacing-32,32px)",
            lineHeight: 1.6,
            padding: "0 var(--tokens-spacing-16,16px)",
          }}
        >
          Architecture réseau complète pour simulations d&apos;attaques et
          défense avec monitoring en temps réel. Un laboratoire complet pour la
          formation et l&apos;évaluation des capacités de sécurité.
        </p>

        <div className="flex flex-col justify-center gap-4 px-4 sm:flex-row">
          <Button
            intent="primary"
            size="lg"
            className="min-h-[44px] w-full sm:w-auto"
          >
            <GitHub size={18} className="mr-2" />
            <span className="hidden sm:inline">Voir le dépôt GitHub</span>
            <span className="sm:hidden">GitHub</span>
          </Button>
          <Button
            intent="secondary"
            size="lg"
            className="min-h-[44px] w-full sm:w-auto"
          >
            <Network size={18} className="mr-2" />
            <span className="hidden sm:inline">Voir le diagramme</span>
            <span className="sm:hidden">Diagramme</span>
          </Button>
        </div>
      </section>

      {/* Tabs (style Figma) */}
      <div
        style={{
          borderBottom: "1px solid var(--color-border,#e5e7eb)",
          overflowX: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div className="min-w-max px-4 sm:px-0 flex gap-1">
          {[
            {
              id: "overview" as TabId,
              label: "Aperçu",
              icon: <Shield size={16} />,
            },
            {
              id: "red-team" as TabId,
              label: "Red Team",
              icon: <Terminal size={16} />,
            },
            {
              id: "blue-team" as TabId,
              label: "Blue Team",
              icon: <Radar size={16} />,
            },
            {
              id: "results" as TabId,
              label: "Résultats",
              icon: <Network size={16} />,
            },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding:
                    "var(--tokens-spacing-8,8px) var(--tokens-spacing-12,12px)",
                  borderRadius:
                    "var(--tokens-radius-8,8px) var(--tokens-radius-8,8px) 0 0",
                  fontWeight: 500,
                  fontSize: "var(--tokens-text-body-14,14px)",
                  transition: "all 0.15s ease-out",
                  minHeight: "44px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  backgroundColor: isActive
                    ? "var(--color-background,#fff)"
                    : "transparent",
                  color: isActive
                    ? "var(--tokens-color-brand-purple,#6d28d9)"
                    : "var(--color-muted-foreground,#6b7280)",
                  border: isActive
                    ? "1px solid var(--color-border,#e5e7eb)"
                    : "none",
                  borderBottom: isActive ? "1px solid transparent" : "none",
                  marginBottom: isActive ? "-1px" : "0",
                }}
                className="focus:outline-none focus:ring-2 focus:ring-[var(--color-ring,#6366f1)] hover:text-[var(--color-foreground,#0b1324)] hover:bg-[color:var(--color-muted,#f3f4f6)]/50"
              >
                <div className="flex items-center gap-2">
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">
                    {tab.label === "Aperçu"
                      ? "Aperçu"
                      : tab.label === "Red Team"
                        ? "Red"
                        : tab.label === "Blue Team"
                          ? "Blue"
                          : "Résultats"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 sm:px-0">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Aperçu */}
            <Card
              elev={1}
              withHeader
              header={
                <h2
                  className="font-semibold"
                  style={{ fontSize: "var(--tokens-text-h3-22,22px)" }}
                >
                  Aperçu du projet
                </h2>
              }
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h3
                    className="mb-4 font-semibold"
                    style={{ color: "var(--color-foreground,#0b1324)" }}
                  >
                    Objectif
                  </h3>
                  <p
                    className="mb-6"
                    style={{
                      color: "var(--color-muted-foreground,#6b7280)",
                      fontSize: "var(--tokens-text-body-16,16px)",
                      lineHeight: 1.6,
                    }}
                  >
                    Créer un environnement de simulation Purple Team permettant
                    de tester des scénarios d&apos;attaque réalistes tout en
                    développant et validant les capacités de détection et de
                    réponse.
                  </p>

                  <h3
                    className="mb-4 font-semibold"
                    style={{ color: "var(--color-foreground,#0b1324)" }}
                  >
                    Technologies clés
                  </h3>
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
                      "Docker",
                    ].map((tech) => (
                      <Badge key={tech} intent="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3
                    className="mb-4 font-semibold"
                    style={{ color: "var(--color-foreground,#0b1324)" }}
                  >
                    Portée
                  </h3>
                  <ul
                    className="space-y-2"
                    style={{
                      color: "var(--color-muted-foreground,#6b7280)",
                      fontSize: "var(--tokens-text-body-14,14px)",
                    }}
                  >
                    <li>
                      • Infrastructure réseau segmentée (Public, DMZ, Private)
                    </li>
                    <li>• Scénarios d&apos;attaque MITRE ATT&CK complets</li>
                    <li>• Monitoring et détection en temps réel</li>
                    <li>• Dashboards d&apos;analyse et de reporting</li>
                    <li>• Automatisation des réponses aux incidents</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* KPIs */}
            <Card
              elev={1}
              withHeader
              header={
                <h2
                  className="font-semibold"
                  style={{ fontSize: "var(--tokens-text-h3-22,22px)" }}
                >
                  Statistiques du laboratoire
                </h2>
              }
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((k) => (
                  <div
                    key={k.label}
                    className="rounded-[8px] border p-4"
                    style={{
                      backgroundColor:
                        "var(--tokens-color-neutral-100,#f5f7fa)",
                    }}
                  >
                    <p
                      className="mb-2 text-[12px]"
                      style={{ color: "var(--color-muted-foreground,#6b7280)" }}
                    >
                      {k.label}
                    </p>
                    <div className="mb-1 flex items-baseline gap-1">
                      <span
                        className="text-[22px] font-semibold"
                        style={{
                          color: "var(--tokens-color-brand-primary,#1B2A4A)",
                        }}
                      >
                        {k.value}
                      </span>
                      {k.unit && (
                        <span
                          className="text-[14px]"
                          style={{
                            color: "var(--color-muted-foreground,#6b7280)",
                          }}
                        >
                          {k.unit}
                        </span>
                      )}
                    </div>
                    {k.change && (
                      <p
                        className="text-[12px]"
                        style={{
                          color: "var(--color-feedback-success,#059669)",
                        }}
                      >
                        {k.change}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "red-team" && (
          <Card
            elev={1}
            withHeader
            header={
              <div className="flex items-center gap-2">
                <span
                  style={{
                    color: "var(--tokens-color-feedback-danger,#dc2626)",
                  }}
                >
                  <Terminal size={20} />
                </span>
                <h2
                  className="font-semibold"
                  style={{ fontSize: "var(--tokens-text-h3-22,22px)" }}
                >
                  Phase Red Team - Simulation d&apos;attaque
                </h2>
              </div>
            }
          >
            <p
              className="mb-6"
              style={{
                color: "var(--color-muted-foreground,#6b7280)",
                fontSize: "var(--tokens-text-body-16,16px)",
              }}
            >
              Scénario d&apos;attaque complet suivant la kill chain :
              reconnaissance, initial access, exécution, persistance et
              exfiltration.
            </p>

            <div className="space-y-4">
              {attacks.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-[8px] p-4"
                    style={{
                      backgroundColor:
                        "var(--tokens-color-neutral-100,#f5f7fa)",
                    }}
                  >
                    <div
                      className="rounded-[8px] p-2"
                      style={{
                        backgroundColor: "var(--color-feedback-danger,#dc2626)",
                      }}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h4 className="font-medium">
                          Phase {i + 1}: {a.phase}
                        </h4>
                        <Badge intent="danger" size="sm">
                          {a.time}
                        </Badge>
                      </div>
                      <p
                        className="text-[14px]"
                        style={{
                          color: "var(--color-muted-foreground,#6b7280)",
                        }}
                      >
                        {a.phase === "Reconnaissance & Phishing" &&
                          "Reconnaissance OSINT et déploiement campagne phishing avec GoPhish."}
                        {a.phase === "Initial Access" &&
                          "Exploitation des vulnérabilités DVWA via Burp Suite et Metasploit."}
                        {a.phase === "Privilege Escalation" &&
                          "Élévation de privilèges et établissement de persistance."}
                        {a.phase === "Lateral Movement" &&
                          "Reconnaissance interne et déplacement latéral dans l'infrastructure."}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {activeTab === "blue-team" && (
          <Card
            elev={1}
            withHeader
            header={
              <div className="flex items-center gap-2">
                <span
                  style={{ color: "var(--tokens-color-feedback-info,#2563eb)" }}
                >
                  <Radar size={20} />
                </span>
                <h2
                  className="font-semibold"
                  style={{ fontSize: "var(--tokens-text-h3-22,22px)" }}
                >
                  Phase Blue Team - Détection et réponse
                </h2>
              </div>
            }
          >
            <div className="space-y-6">
              {/* KPIs */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((k) => (
                  <div
                    key={k.label}
                    className="rounded-[8px] border p-4"
                    style={{
                      backgroundColor:
                        "var(--tokens-color-neutral-100,#f5f7fa)",
                    }}
                  >
                    <p
                      className="mb-2 text-[12px]"
                      style={{ color: "var(--color-muted-foreground,#6b7280)" }}
                    >
                      {k.label}
                    </p>
                    <div className="mb-1 flex items-baseline gap-1">
                      <span
                        className="text-[20px] font-semibold"
                        style={{
                          color: "var(--tokens-color-brand-primary,#1B2A4A)",
                        }}
                      >
                        {k.value}
                      </span>
                      {k.unit && (
                        <span
                          className="text-[14px]"
                          style={{
                            color: "var(--color-muted-foreground,#6b7280)",
                          }}
                        >
                          {k.unit}
                        </span>
                      )}
                    </div>
                    {k.change && (
                      <p
                        className="text-[12px]"
                        style={{
                          color: "var(--color-feedback-success,#059669)",
                        }}
                      >
                        {k.change}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Alertes */}
              <div className="space-y-4">
                <h3
                  className="mb-2 font-semibold"
                  style={{
                    fontSize: "var(--tokens-text-h3-22,22px)",
                    color: "var(--color-foreground,#0b1324)",
                  }}
                >
                  Alertes de sécurité détectées
                </h3>

                {[
                  {
                    sev: "critical",
                    src: "Suricata",
                    title: "Phishing Email Campaign Detected",
                    desc: "Détection de campagne de phishing ciblant les utilisateurs internes.",
                    ts: "T+00:45",
                  },
                  {
                    sev: "critical",
                    src: "ELK",
                    title: "Suspicious Process Execution",
                    desc: "Exécution de processus malveillant détectée sur la VM victime.",
                    ts: "T+01:45",
                  },
                  {
                    sev: "warn",
                    src: "Kibana",
                    title: "Lateral Movement Attempt",
                    desc: "Tentative de mouvement latéral détectée via analyse des logs réseau.",
                    ts: "T+03:15",
                  },
                ].map((d, i) => (
                  <div key={i} className="rounded-[8px] border p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            d.sev === "critical"
                              ? "text-[var(--color-feedback-danger,#dc2626)]"
                              : "text-[var(--color-feedback-warning,#d97706)]"
                          }
                        >
                          ▲
                        </span>
                        <h4 className="font-medium">{d.title}</h4>
                        <Badge intent="secondary" size="sm">
                          {d.src}
                        </Badge>
                      </div>
                      <Badge
                        intent={d.sev === "critical" ? "danger" : "warning"}
                        size="sm"
                      >
                        {d.ts}
                      </Badge>
                    </div>
                    <p
                      className="text-[14px]"
                      style={{ color: "var(--color-muted-foreground,#6b7280)" }}
                    >
                      {d.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {activeTab === "results" && (
          <div className="space-y-8">
            <Card
              elev={1}
              withHeader
              header={
                <h2
                  className="font-semibold"
                  style={{ fontSize: "var(--tokens-text-h3-22,22px)" }}
                >
                  Résultats et leçons apprises
                </h2>
              }
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h3
                    className="mb-4 font-semibold"
                    style={{ color: "var(--color-feedback-success,#059669)" }}
                  >
                    ✅ Points forts identifiés
                  </h3>
                  <ul
                    className="space-y-2 text-[14px]"
                    style={{ color: "var(--color-muted-foreground,#6b7280)" }}
                  >
                    <li>• Détection efficace des campagnes de phishing</li>
                    <li>
                      • Corrélation automatique des événements de sécurité
                    </li>
                    <li>
                      • Temps de réponse optimisé grâce à l&apos;automatisation
                    </li>
                    <li>• Visibilité complète sur l&apos;infrastructure</li>
                  </ul>
                </div>
                <div>
                  <h3
                    className="mb-4 font-semibold"
                    style={{ color: "var(--color-feedback-warning,#d97706)" }}
                  >
                    ⚠️ Axes d&apos;amélioration
                  </h3>
                  <ul
                    className="space-y-2 text-[14px]"
                    style={{ color: "var(--color-muted-foreground,#6b7280)" }}
                  >
                    <li>
                      • Réduction des faux positifs sur les alertes réseau
                    </li>
                    <li>
                      • Amélioration de la détection des mouvements latéraux
                    </li>
                    <li>
                      • Intégration de l&apos;intelligence artificielle pour
                      l&apos;analyse
                    </li>
                    <li>• Extension du périmètre de monitoring</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card
              elev={1}
              withHeader
              header={
                <h2
                  className="font-semibold"
                  style={{ fontSize: "var(--tokens-text-h3-22,22px)" }}
                >
                  Ressources et liens
                </h2>
              }
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Button intent="primary" className="min-h-[44px]">
                  <GitHub size={18} className="mr-2" />
                  Code source GitHub
                </Button>
                <Button
                  intent="secondary"
                  className="min-h-[44px]"
                  onClick={() => setShowDownloadModal(true)}
                >
                  <Download size={18} className="mr-2" />
                  Rapport détaillé (PDF)
                </Button>
                <Button intent="secondary" className="min-h-[44px]">
                  <External size={18} className="mr-2" />
                  Présentation (Slides)
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Modal */}
      <CVDownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </div>
  );
};
