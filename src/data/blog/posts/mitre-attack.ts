import type { BlogPostInput } from "../types";

export const postMitre: BlogPostInput = {
  id: 1,
  slug: "introduction-mitre-attack-blue-team",
  title:
    "Introduction au Framework MITRE ATT&CK : Guide Pratique pour les Blue Teams",
  excerpt:
    "Comprenez les fondamentaux de MITRE ATT&CK et appliquez-le pour évaluer votre couverture défensive, créer des règles de détection et guider le threat hunting.",
  date: "11 septembre 2025",
  isoDate: "2025-09-11",
  category: "Framework",
  tags: ["MITRE ATT&CK", "Blue Team", "Threat Hunting", "Détection", "TTPs"],
  featured: true,
  content: [
    { type: "p", text: "Dans le paysage actuel des cybermenaces, ..." },
    { type: "p", text: "Cet article vous guide ..." },
    { type: "h2", text: "Qu'est-ce que MITRE ATT&CK ?" },
    { type: "h3", text: "Définition et origines" },
    {
      type: "p",
      text: "MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) ...",
    },
    { type: "p", text: "Contrairement aux approches centrées ..." },
    { type: "h3", text: "Structure du framework" },
    { type: "h3", text: "1. Tactiques — le « Pourquoi »" },
    {
      type: "ul",
      items: [
        "Initial Access — Obtenir un pied dans le réseau",
        "Persistence — Maintenir l'accès",
        "Privilege Escalation — Élever les privilèges",
        "Defense Evasion — Contourner les défenses",
        "Credential Access — Vol d’identifiants",
        "Discovery — Reconnaissance interne",
        "Lateral Movement — Déplacement latéral",
        "Collection — Rassembler les données",
        "Exfiltration — Extraire les données",
      ],
    },
    { type: "h3", text: "2. Techniques — le « Comment »" },
    { type: "p", text: "Les méthodes spécifiques ..." },
    { type: "h3", text: "3. Procédures — le « Qui »" },
    { type: "p", text: "Implémentations précises ..." },
    { type: "h2", text: "Les matrices MITRE ATT&CK" },
    { type: "h3", text: "Enterprise Matrix" },
    { type: "p", text: "La matrice principale couvre ..." },
    { type: "h3", text: "Matrices spécialisées" },
    {
      type: "ul",
      items: [
        "Mobile — Android et iOS",
        "ICS — Systèmes industriels",
        "PRE-ATT&CK — Pré-intrusion",
      ],
    },
    { type: "h2", text: "Application pratique pour les Blue Teams" },
    { type: "h3", text: "1) Évaluation de la couverture défensive" },
    { type: "p", text: "Exercice de mapping ..." },
    {
      type: "code",
      lang: "text",
      code: `Technique T1059.001 (PowerShell) :
✅ Couvert : Windows Event Logs (4104, 4103)
✅ Couvert : EDR (analyse comportementale)
❌ Gap : Détection des scripts obfusqués`,
    },
    { type: "h3", text: "2) Développement de règles de détection" },
    { type: "p", text: "Méthodologie structurée ..." },
    {
      type: "code",
      lang: "yaml",
      code: `# Exemple T1003.001 - LSASS Memory Dump
- L1: Lecture du processus LSASS
- L2: Outils connus (mimikatz, procdump)
- L3: Patterns comportementaux`,
    },
    { type: "h3", text: "3) Threat Hunting guidé" },
    {
      type: "quote",
      text: "Hypothèse : utilisation de WMI (T1047) pour exécution distante.",
    },
    {
      type: "code",
      lang: "sql",
      code: `-- WMI suspect
SELECT * FROM windows_events 
WHERE event_id = 4688 
AND process_name LIKE '%wmic.exe%'
AND command_line LIKE '%process call create%'`,
    },
    { type: "h3", text: "4) Simulation d’attaques (Purple Team)" },
    {
      type: "ul",
      items: [
        "Scénario APT",
        "Reproduction contrôlée",
        "Mesure d’efficacité",
        "Amélioration continue",
      ],
    },
    { type: "h2", text: "Outils et ressources" },
    {
      type: "ul",
      items: [
        "ATT&CK Navigator",
        "DeTT&CT",
        "Atomic Red Team",
        "Elastic/Splunk/Sentinel",
      ],
    },
    { type: "h2", text: "Cas d’étude : phishing → latéral" },
    {
      type: "ul",
      items: [
        "T1566.001 — Phishing",
        "T1204.002 — User Execution",
        "T1055 — Process injection",
        "T1003.001 — LSASS dump",
        "T1021.002 — SMB",
      ],
    },
    {
      type: "code",
      lang: "yaml",
      code: `Règle 1 — Macro Office -> enfants (Sysmon 1)
Règle 2 — Injection (Sysmon 8,10)
Règle 3 — Accès LSASS (Sysmon 10)
Règle 4 — SMB mouvements (4624/4625)`,
    },
    { type: "h2", text: "Bonnes pratiques & limites" },
    {
      type: "ul",
      items: [
        "Faux positifs : baselining + contexte",
        "Volume : priorisation risque/impact",
        "Évolution : veille continue",
      ],
    },
    { type: "h2", text: "Conclusion & ressources" },
    {
      type: "ul",
      items: [
        "attack.mitre.org",
        "MITRE ATT&CK Defender (MAD)",
        "Communauté Slack",
      ],
    },
  ],
};
