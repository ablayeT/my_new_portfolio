// src/data/projects/incidentResponse.ts

/** Onglets pris en charge */
export type IRTabKey =
  | "overview"
  | "playbooks"
  | "automation"
  | "templates"
  | "metrics";

/** Feature du Hero */
export type IRFeature = {
  icon: "ShieldCheck" | "Workflow" | "Target" | "PhoneCall";
  label: string;
};

/** KPIs */
export type IRStat = { label: string; value: string; hint?: string };

/** Snippets de code */
export type IRSnippet = { title: string; code: string };

/** Carte d’onglet (titre + puces) + icône optionnelle */
export type IRTabCard = {
  title: string;
  bullets: string[];
  icon?: "Siren" | "Lock" | "ClipboardList";
};

/** Contenu des onglets */
export type IRTabsContent = Record<IRTabKey, IRTabCard[]>;

/** —————————————————————— */
/** HERO (que des strings) */
export const HERO = {
  badges: ["Incident Response", "NIST 800-61", "SOAR-ready"] as const,
  title: "Playbook Réponse aux Incidents",
  intro:
    "Pack opérationnel : playbooks normalisés, automatisations SOAR, modèles de rapports et métriques (MTTD/MTTR). Aligné NIST 800-61 & MITRE ATT&CK pour accélérer triage, containment et retour à la normale.",
} as const;

/** Highlights */
export const FEATURES: IRFeature[] = [
  { icon: "ShieldCheck", label: "Cadre NIST 800-61" },
  { icon: "Workflow", label: "Playbooks SOAR-ready" },
  { icon: "Target", label: "Aligné MITRE ATT&CK" },
  { icon: "PhoneCall", label: "RACI & comm. de crise" },
];

/** KPIs (exemples) */
export const STATS: IRStat[] = [
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
  { label: "MTTD (objectif)", value: "≤ 5m", hint: "détection → triage" },
  { label: "MTTR (objectif)", value: "≤ 60m", hint: "containment initial" },
];

/** Snippets */
export const SNIPPETS: IRSnippet[] = [
  {
    title: "Playbook — Ransomware (extrait)",
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
- Restauration *clean* (snapshots/vérifié)
- Rotation secrets/krbtgt, GPO durcies
- Leçons apprises + règles détection`,
  },
  {
    title: "SOAR — Phishing triage (YAML pseudo)",
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
    code: `# Rapport d'incident
- ID/Sev: IR-2025-001 (Sev1)
- Dates: Détection, Containment T0+15m, Rétablissement T0+6h
- Portée: assets, users, données
- Cause racine: …
- Mesures: containment, eradication, durcissement
- Impacts: disponibilité, confidentialité, réglementation
- Leçons & actions: owners + échéances`,
  },
];

/** Contenu onglets */
export const TABS: IRTabsContent = {
  overview: [
    {
      title: "Préparation (readiness)",
      bullets: [
        "Catalogue d’incidents + matrice de sévérité",
        "Sources: SIEM/EDR, IdP/IAM, proxy/DNS, endpoints & cloud logs",
        "Runbooks versionnés (Git), tests table-top",
      ],
    },
    {
      title: "Triage & escalade",
      bullets: [
        "Critères: impact, portée, exploitabilité, données sensibles",
        "Décisions: fermer / surveiller / escalader (Sev1/2/3)",
        "Comms: Slack/Teams, ticket (Jira/SNOW), incident commander",
      ],
    },
  ],
  playbooks: [
    {
      title: "Ransomware",
      bullets: [
        "Isoler hôtes (EDR), couper latéralité (SMB/RPC)",
        "Blocage C2/DGA, rotation secrets, sauvegardes 'clean'",
        "Rétablissement contrôlé + durcissement GPO",
      ],
      icon: "Siren",
    },
    {
      title: "Compte privilégié",
      bullets: [
        "Révocation sessions, reset mot de passe, MFA forcée",
        "Audit groupes sensibles, recherche activités anormales",
        "Détections durables (SIEM/EDR, KQL/Sigma)",
      ],
      icon: "Lock",
    },
    {
      title: "Phishing ciblé",
      bullets: [
        "Enrichir URLs/PIJ, auto-quarantaine mailbox",
        "Blocage proxy/SEG, notification employés",
        "IOC → SIEM, formation ciblée",
      ],
      icon: "ClipboardList",
    },
  ],
  automation: [], // rendu via SNIPPETS[1..2]
  templates: [], // rendu via SNIPPETS[0] et SNIPPETS[3]
  metrics: [], // rendu via METRICS_JSON + QUICK_WINS
};

/** Exemple de JSON 'scorecard' + quick wins */
export const METRICS_JSON = `{
  "sprint": "2025-09",
  "objectifs": ["MTTD <= 5m", "Containment initial <= 60m", "Automatisation phishing triage"],
  "kpi": { "MTTD": "4m", "MTTR": "52m", "coverage_playbooks": "12" },
  "livrables": ["Playbook ransomware v2", "SOAR flow phishing", "Modèles rapport/postmortem"],
  "actions": ["Isolation 1-click EDR", "Blocs proxy auto", "RACI revue trimestrielle"]
}`;

export const QUICK_WINS = [
  "Isolation EDR 1-click + webhook Slack",
  "Templates de tickets (Jira/SNOW) préremplis + SLA",
  "Runbooks versionnés (Git) + rétrospectives post-incident",
] as const;

export const OPERATIONAL_FRAME = {
  title: "Cadre opérationnel",
  bullets: [
    "Cycle NIST : Préparation → Détection/Triage → Containment → Eradication → Rétablissement → Retex.",
    "RACI & communication : SOC ↔ IT ↔ Legal ↔ Direction ↔ Communication.",
    "Catalogue d’actions rapides : isolation EDR, blocage proxy/IdP, reset credentials, GPO.",
  ],
} as const;
