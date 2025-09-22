// src/data/projects/siemData/siem.ts
import type { LucideIcon } from "lucide-react";

/** Onglets pris en charge */
export type TabKey = "windows" | "linux" | "app" | "alertes";

/** Badges de features du Hero */
export type Feature = {
  icon: "ShieldCheck" | "Boxes" | "MapPinned" | "Siren";
  label: string;
};

/** Cartes de stats */
export type Stat = { label: string; value: string; hint?: string };

/** Extraits de code */
export type CodeSnippet = { title: string; code: string };

/** Carte d’onglet (titre + puces) + icône optionnelle */
export type TabCard = {
  title: string;
  bullets: string[];
  icon?: "CheckCircle2" | "Lock" | "Gauge" | "Globe" | "Siren";
};

/** Contenu des onglets */
export type TabsContent = Record<TabKey, TabCard[]>;

/** —————————————————————— */
/** HERO (⚠️ uniquement des strings ici) */
export const HERO = {
  badges: ["Projet SIEM", "ELK + Beats", "SOC-ready"] as const,
  title: "Dashboard SIEM",
  titleEmphasis: "personnalisé",
  intro:
    "Conception d'une plateforme de supervision et de détection basée sur ELK (Elasticsearch, Logstash, Kibana), alimentée par Filebeat & Winlogbeat, avec enrichissements GeoIP / User-Agent, dashboards dédiés et alertes opérationnelles.",
} as const;

/** Features (icône + label) */
export const FEATURES: Feature[] = [
  { icon: "ShieldCheck", label: "Supervision centralisée ELK" },
  { icon: "Boxes", label: "Sources: Windows, Linux, App (Docker)" },
  { icon: "MapPinned", label: "Enrichissements: GeoIP + User-Agent" },
  { icon: "Siren", label: "Règles d'alerte personnalisées" },
];

/** Stats (KPI) */
export const STATS: Stat[] = [
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
  { label: "Dashboards", value: "4", hint: "Windows, Linux, App, Vue globale" },
  { label: "Enrichissements", value: "2", hint: "GeoIP, User-Agent" },
];

/** Extraits de configuration */
export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    title: "filebeat.yml (extrait)",
    code:
      `filebeat.inputs:\n` +
      `  - type: log\n` +
      `    paths: [/var/log/syslog, /var/log/auth.log]\n` +
      `processors:\n` +
      `  - add_fields:\n` +
      `      target: project\n` +
      `      fields:\n` +
      `        name: siem-dashboard\n` +
      `output.logstash:\n` +
      `  hosts: ["localhost:5044"]`,
  },
  {
    title: "winlogbeat.yml (extrait)",
    code:
      `winlogbeat.event_logs:\n` +
      `  - name: Security\n` +
      `  - name: System\n` +
      `  - name: Application\n` +
      `output.logstash:\n` +
      `  hosts: ["localhost:5044"]`,
  },
  {
    title: "logstash.conf (pipeline enrichi)",
    code:
      `input { beats { port => 5044 } }\n` +
      `filter {\n` +
      `  geoip { source => "[source][ip]" }\n` +
      `  useragent { source => "user_agent.original" }\n` +
      `}\n` +
      `output { elasticsearch { hosts => ["http://localhost:9200"] index => "siem-%{+YYYY.MM.dd}" } }`,
  },
];

/** Contenu des onglets */
export const TABS: TabsContent = {
  windows: [
    {
      title: "Logons & événements critiques",
      bullets: [
        "Event IDs (4624/4625), top utilisateurs en échec",
        "Heatmap des horaires anormaux",
        "Détection des pics d'authentification",
      ],
      icon: "CheckCircle2",
    },
    {
      title: "Privilèges & intégrité",
      bullets: [
        "Créations/ajouts au groupe administrateurs",
        "Services critiques & crashs",
        "Escalades suspectes détectées",
      ],
      icon: "Lock",
    },
  ],
  linux: [
    {
      title: "SSH & sudo",
      bullets: [
        "Connexions acceptées/refusées",
        "IP sources, commandes sudo",
        "Seuil d’alerte brute-force",
      ],
      icon: "Gauge",
    },
    {
      title: "Santé système",
      bullets: [
        "Erreurs /var/log/syslog",
        "Journaux auth, processus anormaux",
        "Disponibilité des services",
      ],
    },
  ],
  app: [
    {
      title: "Erreurs HTTP & comportement",
      bullets: ["Codes 4xx/5xx", "Chemins sensibles", "Requêtes suspectes"],
    },
    {
      title: "Contexte GeoIP / User-Agent",
      bullets: ["Carte des origines IP", "OS & navigateurs dominants"],
      icon: "Globe",
    },
  ],
  alertes: [
    {
      title: "SSH brute-force",
      bullets: [
        "> 5 échecs / 2 min depuis la même IP → alerte",
        "Notification instantanée",
      ],
      icon: "Siren",
    },
    {
      title: "Privilèges Windows",
      bullets: [
        "Création compte admin",
        "Ajout groupe sensible",
        "Logon nocturne",
      ],
    },
    {
      title: "Erreurs applicatives",
      bullets: ["> 10 erreurs HTTP 500 / min → alerte DevSecOps"],
    },
  ],
};

/** Marché & résultats */
export const MARKET_TRENDS = [
  "Convergence SIEM/XDR (Elastic Agent + Fleet)",
  "Automatisation SOAR & playbooks de réponse",
  "Corrélations multi-sources alignées MITRE ATT&CK",
  "Hybridation Cloud (Elastic Cloud, Azure/GCP/AWS)",
  "Détection par anomalies (ML)",
] as const;

export const RESULTS = [
  "Collecte unifiée Windows / Linux / App et visualisation temps réel",
  "Détection SSH brute-force validée lors de tests contrôlés",
  "Dashboards clairs pour investigation et support aux audits",
] as const;

/** (facultatif) mapping d’icônes si besoin ailleurs */
export const ICONS: Record<string, LucideIcon> = {};
