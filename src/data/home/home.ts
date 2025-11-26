// src/data/home/home.ts

/** ---------- Thème & textes ---------- */
export const THEME = {
  brand: "var(--tokens-color-brand-purple, #6c5ce7)",
  textDefault: "var(--tokens-semantic-text-default, var(--color-foreground))",
  textMuted: "var(--tokens-semantic-text-muted, var(--color-muted-foreground))",
} as const;

export const HERO = {
  title: "INGÉNIEUR CYBERSÉCURITÉ & PURPLE TEAM",
  subtitle:
    "De l'administration système à la sécurité offensive.J'aide les entreprises à sécuriser leurs infrastructures en combinant l'automatisation défensive et les techniques d'audit offensif (Pentest & Threat Hunting).",
  ctaPrimaryLabel: "Voir le projet Purple Team",
  ctaSecondaryLabel: "Télécharger mon CV",
  projectHref: "/projects/purple-team",
} as const;

export const FINAL_CTA = {
  title: "Prêt à collaborer ?",
  text: "Je recherche une alternance en Master Cybersécurité pour septembre 2025. Contactez-moi pour discuter d’opportunités.",
  ctaContact: "Me contacter",
  ctaCv: "Voir mon CV",
} as const;

/** ---------- KPI ---------- */
export type KPITrend = "up" | "down" | "neutral";
export type KPIItem = {
  label: string;
  value: number;
  suffix?: string;
  trend: KPITrend;
  trendValue?: string;
};

export const KPI_ITEMS: ReadonlyArray<KPIItem> = [
  {
    label: "Projets publiés",
    value: 12,
    trend: "up",
    trendValue: "3 nouveaux cette année",
  },
  {
    label: "Articles de blog",
    value: 28,
    trend: "up",
    trendValue: "5 ce mois-ci",
  },
  { label: "Certifications", value: 3, trend: "neutral" },
] as const;

/** ---------- Données du projet (titre/techs/objectifs) ---------- */
export const PROJECT = {
  title: "Purple Team Lab Infrastructure",
  subtitle: "Architecture réseau pour simulations d’attaques & défense",
  objectives: [
    "Simulation d'attaques réalistes en environnement contrôlé",
    "Détection & analyse des techniques MITRE ATT&CK",
    "Automatisation des réponses aux incidents",
    "Formation pratique aux opérations Purple Team",
  ],
  techs: [
    "Kali Linux",
    "ELK Stack",
    "Suricata",
    "DVWA",
    "GoPhish",
    "Metasploit",
    "Kibana",
    "Nginx",
  ],
} as const;

/** ---------- Types & données pour l’aperçu d’architecture ---------- */
export const ICON_NAMES = [
  "Terminal",
  "Server",
  "Mail",
  "Radar",
  "Shield",
] as const;
export type IconName = (typeof ICON_NAMES)[number];

export type ToneName = "red" | "amber" | "sky" | "slate" | "brand";

export type ArchitectureItem = {
  icon: IconName;
  tone: ToneName;
  title: string;
  subtitle: string;
};

export type ArchitectureSection = {
  title: string;
  items: ArchitectureItem[];
};

export type ArchitectureFlows = {
  red: string[];
  blue: string[];
  mgmt: string[];
};

export type ArchitectureData = {
  sections: ArchitectureSection[];
  flows: ArchitectureFlows;
};

// Helper pour typer sans `satisfies`
function makeArchitecture<T extends ArchitectureData>(a: T): T {
  return a;
}

export const ARCHITECTURE = makeArchitecture({
  sections: [
    {
      title: "Public Subnet",
      items: [
        {
          icon: "Terminal",
          tone: "red",
          title: "VM Attaquant",
          subtitle: "Kali Linux",
        },
        {
          icon: "Server",
          tone: "brand",
          title: "VM Portfolio",
          subtitle: "Nginx + Next.js",
        },
      ],
    },
    {
      title: "DMZ Subnet",
      items: [
        {
          icon: "Mail",
          tone: "amber",
          title: "VM Phishing",
          subtitle: "GoPhish + SMTP",
        },
        {
          icon: "Radar",
          tone: "sky",
          title: "VM Surveillance",
          subtitle: "ELK + Suricata",
        },
      ],
    },
    {
      title: "Private Subnet",
      items: [
        {
          icon: "Shield",
          tone: "slate",
          title: "VM Victime",
          subtitle: "Ubuntu + DVWA",
        },
      ],
    },
  ],
  flows: {
    red: [
      "Attaquant → Phishing (préparation)",
      "Phishing → Victime (leurre)",
      "Attaquant ↔ Victime (exploit)",
    ],
    blue: [
      "Victime → Surveillance (logs)",
      "Filebeat/Auditd → Logstash",
      "Surveillance → Kibana",
    ],
    mgmt: [
      "Portfolio ↔ Internet (HTTPS)",
      "Let's Encrypt SSL",
      "Secure management",
    ],
  },
});
