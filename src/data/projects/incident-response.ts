import type { ProjectDetail } from "./types";

export const incidentResponse: ProjectDetail = {
  id: "incident-response",
  title: "Playbook Réponse aux Incidents",
  short:
    "Catalogue de playbooks, automatisations SOAR et modèles IR alignés NIST 800-61 & MITRE ATT&CK pour accélérer triage, containment et rétablissement.",
  tags: ["Incident Response", "SOAR", "NIST 800-61", "MITRE ATT&CK"],
  lastUpdated: "2025-09-17",
  kpis: [
    { label: "Playbooks", value: "12+" },
    { label: "Automations", value: "8+" },
    { label: "MTTD (obj.)", value: "≤ 5m" },
    { label: "MTTR (obj.)", value: "≤ 60m" },
  ],
  sections: [
    { type: "h2", text: "Cadre & objectifs" },
    {
      type: "p",
      text: "Dispositif IR complet : préparation, détection/triage, containment, éradication, rétablissement et amélioration continue. Gouvernance RACI et communication de crise.",
    },

    { type: "h2", text: "Playbooks (exemples)" },
    {
      type: "ul",
      items: [
        "Ransomware : isolation EDR, coupure SMB/RPC, restauration clean, rotation secrets.",
        "Compte privilégié compromis : révoquer sessions, reset, MFA forcée, audit groupes sensibles.",
        "Phishing ciblé : enrichissement URLs/attachments, quarantaine mailbox, blocage proxy, IOC → SIEM.",
      ],
    },

    { type: "h2", text: "Automatisation (SOAR — pseudo YAML)" },
    {
      type: "code",
      lang: "yaml",
      code:
        "flow: phishing_triage_v1\n" +
        "on:\n" +
        "  - type: email.reported\n" +
        "steps:\n" +
        "  - enrich_urls: [ urlscan, vt, whois ]\n" +
        "  - analyze_attachments: [ clamav, sandbox ]\n" +
        "  - decision:\n" +
        "      if: risk_score < 30\n" +
        '      then: close(reason="Benign", notify=reporter)\n' +
        "      elif: risk_score < 70\n" +
        '      then: ticket(queue="SOC-Triage", sla="2h")\n' +
        "      else: contain:\n" +
        "        - block_urls@proxy\n" +
        "        - quarantine_inbox@o365\n" +
        '        - open_incident(sev="High")',
    },

    { type: "h2", text: "Modèle — Rapport d’incident (extrait)" },
    {
      type: "code",
      lang: "md",
      code:
        "# Rapport d'incident\n" +
        "- ID/Sev: IR-2025-001 (Sev1)\n" +
        "- Dates: Détection, Containment T0+15m, Rétablissement T0+6h\n" +
        "- Portée: assets, users, données\n" +
        "- Cause racine: …\n" +
        "- Mesures: containment, eradication, durcissement\n" +
        "- Impacts: disponibilité, confidentialité, réglementation\n" +
        "- Leçons & actions: owners + échéances\n",
    },

    { type: "h2", text: "Métriques & pilotage" },
    {
      type: "code",
      lang: "json",
      code:
        "{\n" +
        '  "sprint": "2025-09",\n' +
        '  "objectifs": ["MTTD <= 5m", "Containment initial <= 60m", "Automatisation phishing triage"],\n' +
        '  "kpi": { "MTTD": "4m", "MTTR": "52m", "coverage_playbooks": "12" },\n' +
        '  "livrables": ["Playbook ransomware v2", "SOAR flow phishing", "Modèles rapport/postmortem"],\n' +
        '  "actions": ["Isolation 1-click EDR", "Blocs proxy auto", "RACI revue trimestrielle"]\n' +
        "}",
    },
  ],
};
