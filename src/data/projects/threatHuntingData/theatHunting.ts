// src/data/projects/threatHunting.ts

/** Onglets */
export type TabKey =
  | "overview"
  | "hunts"
  | "playbooks"
  | "detections"
  | "metrics";

/** Statut des hunts */
export type HuntStatus = "Draft" | "Running" | "Done";

/** Hunt */
export interface Hunt {
  id: string;
  title: string;
  hypothesis: string;
  status: HuntStatus;
  sources: string[];
  tactic: string; // MITRE ATT&CK Tactic
  technique: string; // e.g. T1047
}

/** KPI (icône par nom pour laisser l’UI choisir la vraie icône) */
export type KPIIconName = "Search" | "Target" | "Clock" | "ShieldCheck";
export interface KPIItem {
  label: string;
  value: string; // rendu tel quel (ex: "3.1m", "92%")
  icon: KPIIconName;
  iconClassName?: string;
}

/** Contenu texte */
export const HERO = {
  title: "Framework Threat Hunting",
  subtitle:
    "Hypothèses → Tests → Évidence → Détections → Playbooks (SOC) — piloté par ATT&CK et métriques.",
  badges: ["v1.0", "Demo pack"],
} as const;

/** Démo: hunts */
export const HUNTS: Hunt[] = [
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

/** KPI "fixes" (le chiffre “Hunts actifs” pourra être recalculé côté UI) */
export const KPI_BASE: KPIItem[] = [
  {
    label: "Hunts actifs",
    value: "0",
    icon: "Search",
    iconClassName: "h-5 w-5 text-blue-500",
  },
  {
    label: "Couverture ATT&CK (techniques clés)",
    value: "26",
    icon: "Target",
    iconClassName: "h-5 w-5 text-amber-500",
  },
  {
    label: "MTTD (campagnes récentes)",
    value: "3.1m",
    icon: "Clock",
    iconClassName: "h-5 w-5 text-emerald-500",
  },
  {
    label: "Précision alertes (VP/FP)",
    value: "92%",
    icon: "ShieldCheck",
    iconClassName: "h-5 w-5 text-emerald-500",
  },
];
/** Tabs */
export const TABS: ReadonlyArray<{ value: TabKey; label: string }> = [
  { value: "overview", label: "Overview" },
  { value: "hunts", label: "Hunts" },
  { value: "playbooks", label: "Playbooks" },
  { value: "detections", label: "Detections" },
  { value: "metrics", label: "Metrics" },
];

/** Texte Overview */
export const OVERVIEW_BULLETS = [
  "Hypothèses guidées ATT&CK (tactique/technique/IOA attendus).",
  "Sources fiables : EDR, 4688/4104, Sysmon, DNS/Proxy, Netflow.",
  "Triangulation (process ↔ réseau ↔ identité) + horodatage précis.",
  "Livrables : requêtes versionnées, règles (Sigma/SPL/KQL), playbooks SOAR.",
  "Mesure : MTTD/MTTR, précision alertes, couverture ATT&CK.",
];

export const ARCH_SOURCES = [
  "EDR events (process/file/network)",
  "Windows Security & Sysmon",
  "DNS/Proxy web",
  "Netflow/PCAP",
  "AD authent & GPO",
  "Cloud audit (si applicable)",
];

/** Playbooks / checklists */
export const PLAYBOOK_WMI_STEPS = [
  "Collecte : 4688, 4104, Sysmon 1/3/6, EDR 7 jours.",
  "Filtrage : exclure comptes/hosts d’admin légitimes.",
  "Corrélation : authent 4624/4625, DNS/Proxy, latéralité.",
  "Conclusion : IOC/IOA, ouverture ticket, détection à long terme.",
];

export const EVIDENCE_CHECKLIST = [
  "Process lineage + hash + signature",
  "Command line + parent/child",
  "Connexions réseau associées",
  "Compte / session / machine",
  "Contexte (poste admin ? serveur ? horaires ?)",
];

/** Detections (snippets) */
export const DETECTIONS = {
  kql: `// Exécutions WMI suspectes
DeviceProcessEvents
| where ProcessCommandLine has "wmic"
| where ProcessCommandLine has "process call create"
| summarize count() by InitiatingProcessAccountName, bin(Timestamp, 1h)`,
  sigma: `title: LOLBins Suspicious Execution
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
level: medium`,
  spl: `index=edr OR index=network
| stats count by src_user, src_host, dest_host, action
| eventstats sum(count) as total by src_user, src_host
| where total > 50 AND action="SMB_SESSION"
| sort - total`,
} as const;

/** Metrics */
export const METRICS_SCORECARD = `{
  "sprint": "2024-12",
  "objectifs": ["MTTD phishing < 5m", "Couvrir T1021.002 SMB"],
  "kpi": { "MTTD": "3.1m", "MTTR": "7.6m", "precision_alertes": "92%" },
  "livrables": ["Règle KQL latéralité", "Playbook SOAR confinement"],
  "actions": ["Durcir GPO", "Blocage macros", "Sensibilisation ciblée"]
}`;

export const QUICK_WINS = [
  "Normaliser la télémétrie process (lineage + hash + signature).",
  "Corréler identité/réseau pour réduire les faux positifs.",
  "Versionner requêtes & règles (Git) + revue.",
  "Documenter chaque chasse → règle → runbook.",
  "Publier un changelog sécurité par sprint.",
];
