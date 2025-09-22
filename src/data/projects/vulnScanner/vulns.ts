// Types de base
export type TabKey = "overview" | "scans" | "findings" | "reports" | "cicd";
export type ScanStatus = "Queued" | "Running" | "Completed" | "Failed";
export type Severity = "Critical" | "High" | "Medium" | "Low" | "Info";

export type ScanRun = {
  id: string;
  target: string; // IP/CIDR/FQDN
  scope: string; // "External" | "Internal"
  toolchain: string; // "Nmap + Nuclei" …
  startedAt: string;
  duration: string; // "04m32s" | "—"
  status: ScanStatus;
  findings: number;
  critical: number;
  high: number;
};

export type Finding = {
  id: string;
  host: string;
  port: string;
  service: string;
  cve?: string;
  title: string;
  severity: Severity;
  recommendation: string;
};

// — Header copy —
export const HEADER = {
  title: "Scanner de Vulnérabilités — Custom",
  subtitle:
    "Outil de scan automatisé, parsers, rapports et intégration CI/CD (fail build si sévérité critique).",
  badges: ["v1.0", "Demo pack"],
} as const;

// — KPIs (avec classes Tailwind contrôlables) —
export type KPIIconName = "Network" | "Bug" | "AlertTriangle" | "Clock";
export type KPIItem = {
  label: string;
  value: string;
  icon: KPIIconName;
  iconClassName?: string; // ex: "h-5 w-5 text-blue-500"
};

export const KPI_BASE: KPIItem[] = [
  {
    label: "Cibles scannées",
    value: "256",
    icon: "Network",
    iconClassName: "h-5 w-5 text-blue-500",
  },
  {
    label: "Vulnérabilités (dernière exécution)",
    value: "18",
    icon: "Bug",
    iconClassName: "h-5 w-5 text-amber-500",
  },
  {
    label: "Critiques / Hautes",
    value: "1 / 4",
    icon: "AlertTriangle",
    iconClassName: "h-5 w-5 text-red-500",
  },
  {
    label: "Temps moyen (scan)",
    value: "4m12s",
    icon: "Clock",
    iconClassName: "h-5 w-5 text-emerald-500",
  },
];

// — Tabs (icône déclarative, pas de JSX ici) —
export type TabIconName =
  | "Settings2"
  | "Activity"
  | "Bug"
  | "FileText"
  | "GitBranch";
export interface TabInfo {
  value: TabKey;
  label: string;
  icon: TabIconName;
}
export const TABS: readonly TabInfo[] = [
  { value: "overview", label: "Overview", icon: "Settings2" },
  { value: "scans", label: "Scans", icon: "Activity" },
  { value: "findings", label: "Findings", icon: "Bug" },
  { value: "reports", label: "Reports", icon: "FileText" },
  { value: "cicd", label: "CI/CD", icon: "GitBranch" },
] as const;

// — Données demo (inchangées) —
export const SCANS: ScanRun[] = [
  {
    id: "scan-2401",
    target: "10.10.0.0/24",
    scope: "Internal",
    toolchain: "Nmap(Fast) + Nuclei(Core)",
    startedAt: "2024-12-20 09:14",
    duration: "03m48s",
    status: "Completed",
    findings: 18,
    critical: 1,
    high: 4,
  },
  {
    id: "scan-2402",
    target: "app.prod.example.com",
    scope: "External",
    toolchain: "Nmap(Full TCP) + Nuclei(Web)",
    startedAt: "2024-12-22 21:02",
    duration: "07m11s",
    status: "Completed",
    findings: 11,
    critical: 0,
    high: 2,
  },
  {
    id: "scan-2403",
    target: "192.168.1.0/25",
    scope: "Internal",
    toolchain: "Nmap + Nuclei + Naabu",
    startedAt: "2024-12-23 10:31",
    duration: "—",
    status: "Running",
    findings: 0,
    critical: 0,
    high: 0,
  },
];

export const FINDINGS: Finding[] = [
  {
    id: "f-001",
    host: "10.10.0.12",
    port: "443/tcp",
    service: "https",
    cve: "CVE-2023-23924",
    title: "TLS weak cipher / misconfig",
    severity: "High",
    recommendation:
      "Désactiver TLS 1.0/1.1, supprimer les suites RC4/3DES, activer HSTS.",
  },
  {
    id: "f-002",
    host: "10.10.0.42",
    port: "22/tcp",
    service: "ssh",
    title: "Default banner / weak kex",
    severity: "Medium",
    recommendation:
      "Durcir sshd_config (KexAlgorithms, Ciphers), bannière minimale, MFA admins.",
  },
  {
    id: "f-003",
    host: "app.prod.example.com",
    port: "443/tcp",
    service: "https",
    cve: "CVE-2022-37434",
    title: "Librairie vulnérable détectée via Nuclei",
    severity: "High",
    recommendation:
      "Mettre à jour la dépendance affectée, ajouter SCA en CI, tests de régression.",
  },
  {
    id: "f-004",
    host: "10.10.0.5",
    port: "80/tcp",
    service: "http",
    title: "Server header exposé",
    severity: "Low",
    recommendation: "Masquer server tokens, activer security headers (CSP…).",
  },
];

// — Overview (listes)
export const OVERVIEW_BULLETS = {
  toolchain: [
    "Découverte : Nmap / Naabu (TCP/UDP) — profils rapide/complet.",
    "Vulnérabilités : Nuclei (templates core + custom), NSE ciblés.",
    "Normalisation : JSON unifié (host/service/CVE/severity/source).",
    "Score : mapping CVSS + contexte (exposition, asset criticality).",
    "Exports : Markdown (lecture), CSV (BI), JSON (ELK/SIEM).",
  ],
  architecture: [
    "Runner CI → Docker toolchain",
    "Ingest JSON → Parse/merge",
    "Score → Filtres seuils",
    "Artifacts → Markdown/CSV/JSON",
    "Webhook → ELK/SIEM",
    "Fail build si critical > 0",
  ],
} as const;

// — Snippets (rapports / payload / CI / commandes)
export const SNIPPETS = {
  reportMd: `# Rapport de Scan — 10.10.0.0/24
- Date: 2024-12-20 09:14
- Toolchain: Nmap(Fast) + Nuclei(Core)
- Durée: 03m48s
- Résumé: 18 findings (1 Critical, 4 High)

## Critique
- 10.10.0.12:443 — TLS misconfig (CVE-2023-23924)
  - Remédiation: désactiver TLS 1.0/1.1, HSTS, supprimer RC4/3DES.

## Hautes (extrait)
- app.prod.example.com:443 — Librairie vulnérable (CVE-2022-37434)
  - Remédiation: mise à jour + SCA en CI

## Recommandations globales
- Enforcement Security Headers (CSP, HSTS)
- Durcissement SSH (kex/ciphers), MFA admins
- Patch management + SCA automatisé
`,
  elkPayload: `{
  "scan_id": "scan-2401",
  "toolchain": "nmap+nuclei",
  "started_at": "2024-12-20T09:14:00Z",
  "targets": ["10.10.0.0/24"],
  "summary": { "findings": 18, "critical": 1, "high": 4 },
  "items": [
    {
      "host": "10.10.0.12",
      "port": "443",
      "service": "https",
      "cve": "CVE-2023-23924",
      "severity": "High",
      "title": "TLS misconfig",
      "recommendation": "Disable TLS 1.0/1.1, remove RC4/3DES, enable HSTS"
    }
  ]
}`,
  ghaYaml: `name: vuln-scan
on:
  workflow_dispatch:
  schedule: [{ cron: "0 2 * * 1" }] # Lundi 02:00
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run scanner
        run: |
          docker run --rm \\
            -v \${{ github.workspace }}:/work \\
            myorg/vuln-scanner:latest \\
            --target "10.10.0.0/24" --profile fast \\
            --out-json /work/report.json --out-md /work/report.md
      - name: Fail on critical
        run: |
          CRIT=$(jq '.summary.critical' report.json)
          if [ "$CRIT" -gt 0 ]; then
            echo "Critical findings: $CRIT"; exit 1; fi
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: vuln-reports
          path: |
            report.json
            report.md`,
  localCmd1: `# Découverte rapide
nmap -T4 -F -oX nmap_fast.xml 10.10.0.0/24

# Découverte complète TCP
nmap -T3 -p- -sV -oX nmap_full.xml 10.10.0.0/24

# Vulnérabilités (web core)
nuclei -u https://app.prod.example.com -severity medium,high,critical -json -o nuclei.json

# Merge + report
vuln-merge --nmap nmap_full.xml --nuclei nuclei.json --out-json report.json --out-md report.md`,
  localCmd2: `# Envoi ELK
curl -XPOST "http://elk:9200/vuln-scans/_doc" \\
  -H "Content-Type: application/json" \\
  -d @report.json

# Seuils qualité (CI)
jq '.summary' report.json
jq '.summary.critical' report.json`,
} as const;
