// src/data/blog/posts.ts
export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; code: string; lang?: string }
  | { type: "quote"; text: string }
  | {
      type: "callout";
      intent?: "info" | "warn" | "success" | "danger";
      text: string;
    };

export type Category =
  | "Framework"
  | "Méthodologie"
  | "Développement"
  | "SIEM"
  | "Web Security"
  | "Detection";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // affichage
  isoDate: string; // tri
  readTime: string;
  category: Category;
  tags: string[];
  featured?: boolean;
  heroIcon?: "book";
  content: ContentBlock[];
};

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function estimateReadTime(blocks: ContentBlock[]) {
  const text = blocks
    .map((b) => {
      if (
        b.type === "p" ||
        b.type === "h2" ||
        b.type === "h3" ||
        b.type === "quote"
      )
        return "text" in b ? b.text : "";
      if (b.type === "ul") return b.items.join(" ");
      return "";
    })
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(4, Math.round(words / 220));
  return `${minutes} min`;
}

/* ==========
   ARTICLES
   ========== */

// #1 — MITRE ATT&CK (ton contenu détaillé)
const post1: BlogPost = {
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
  heroIcon: "book",
  readTime: "",
  content: [
    {
      type: "p",
      text: "Dans le paysage actuel des cybermenaces, les équipes de sécurité défensive (Blue Teams) font face à des adversaires de plus en plus sophistiqués. Comment anticiper leurs mouvements ? Comment améliorer notre détection ? Le framework MITRE ATT&CK apporte une réponse structurée à ces défis en cartographiant les techniques d'attaque utilisées dans la réalité.",
    },
    {
      type: "p",
      text: "Cet article vous guide à travers les fondamentaux de MITRE ATT&CK et son application concrète pour renforcer vos capacités de détection.",
    },
    { type: "h2", text: "Qu'est-ce que MITRE ATT&CK ?" },
    { type: "h3", text: "Définition et origines" },
    {
      type: "p",
      text: "MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) est un framework développé par la corporation MITRE qui catalogue les comportements observés chez les cybercriminels après compromission.",
    },
    {
      type: "p",
      text: "Contrairement aux approches centrées sur les IoCs, ATT&CK se focalise sur les TTPs — Tactiques, Techniques et Procédures.",
    },
    { type: "h3", text: "Structure du framework" },
    {
      type: "p",
      text: "Le framework s'organise autour de trois éléments clés :",
    },
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
    {
      type: "p",
      text: "Les méthodes spécifiques pour atteindre les objectifs tactiques (ex : T1566.001 pour le phishing avec pièce jointe malveillante).",
    },
    { type: "h3", text: "3. Procédures — le « Qui »" },
    {
      type: "p",
      text: "Implémentations précises des techniques par des groupes d’attaquants (APT, cybercriminels).",
    },
    { type: "h2", text: "Les matrices MITRE ATT&CK" },
    { type: "h3", text: "Enterprise Matrix" },
    {
      type: "p",
      text: "La matrice principale couvre Windows, macOS et Linux. Elle regroupe plus de 190 techniques au sein de 14 tactiques.",
    },
    { type: "h3", text: "Matrices spécialisées" },
    {
      type: "ul",
      items: [
        "Mobile — Android et iOS",
        "ICS — Systèmes de contrôle industriel",
        "PRE-ATT&CK — Activités de reconnaissance pré-intrusion",
      ],
    },
    { type: "h2", text: "Application pratique pour les Blue Teams" },
    { type: "h3", text: "1) Évaluation de la couverture défensive" },
    {
      type: "p",
      text: "Exercice de mapping : listez vos outils, mappez les techniques couvertes et visualisez les gaps.",
    },
    {
      type: "code",
      lang: "text",
      code: `Technique T1059.001 (PowerShell) :
✅ Couvert par : Windows Event Logs (4104, 4103)
✅ Couvert par : EDR (analyse comportementale)
❌ Gap : Détection des scripts obfusqués`,
    },
    { type: "h3", text: "2) Développement de règles de détection" },
    {
      type: "p",
      text: "Méthodologie structurée : prioriser la technique, analyser les sources de données, créer des règles graduelles.",
    },
    {
      type: "code",
      lang: "yaml",
      code: `# Exemple pour T1003.001 - LSASS Memory Dump
- Niveau 1 : Accès en lecture au processus LSASS
- Niveau 2 : Utilisation d'outils connus (mimikatz, procdump)
- Niveau 3 : Patterns de comportement suspects`,
    },
    { type: "h3", text: "3) Threat Hunting guidé" },
    {
      type: "quote",
      text: "Hypothèse : des attaquants utilisent WMI (T1047) pour exécuter des commandes à distance.",
    },
    {
      type: "code",
      lang: "sql",
      code: `-- Détection d'exécution WMI suspecte
SELECT * FROM windows_events 
WHERE event_id = 4688 
AND process_name LIKE '%wmic.exe%'
AND command_line LIKE '%process call create%'`,
    },
    {
      type: "p",
      text: "Analyse : éliminez les faux positifs, repérez les patterns malveillants, capitalisez en signatures.",
    },
    { type: "h3", text: "4) Simulation d'attaques (Purple Team)" },
    {
      type: "ul",
      items: [
        "Sélectionner un scénario d’attaque basé sur un groupe APT",
        "Reproduire des techniques en environnement contrôlé",
        "Mesurer l’efficacité de la détection",
        "Améliorer règles et processus",
      ],
    },
    { type: "h2", text: "Outils et ressources" },
    { type: "h3", text: "Outils de mapping" },
    { type: "ul", items: ["ATT&CK Navigator", "DeTT&CT", "Atomic Red Team"] },
    { type: "h3", text: "Intégrations SIEM" },
    { type: "ul", items: ["Splunk", "Elastic Security", "Microsoft Sentinel"] },
    { type: "h3", text: "Sources de données essentielles" },
    {
      type: "code",
      lang: "yaml",
      code: `Windows:
  - Security Event Logs (4624, 4625, 4688, 4104)
  - Sysmon (Event IDs 1, 3, 7, 8, 10)
  - PowerShell Logs (4103, 4104)

Network:
  - DNS queries
  - HTTP/HTTPS traffic
  - Network connections

Endpoint:
  - Process execution
  - File system changes
  - Registry modifications`,
    },
    { type: "h2", text: "Cas d’étude : chaîne d’attaque phishing → latéral" },
    {
      type: "ul",
      items: [
        "T1566.001 — Phishing avec pièce jointe",
        "T1204.002 — Exécution par l’utilisateur",
        "T1055 — Process injection",
        "T1003.001 — Dump mémoire LSASS",
        "T1021.002 — SMB/Windows Admin Shares",
      ],
    },
    { type: "p", text: "Règles de détection développées :" },
    {
      type: "code",
      lang: "yaml",
      code: `Règle 1 — Macro Office suspecte
  Trigger: Processus Office créant des processus fils (Sysmon 1)
Règle 2 — Injection de processus
  Trigger: OpenProcess + WriteProcessMemory + CreateRemoteThread (Sysmon 8,10)
Règle 3 — Accès LSASS
  Trigger: Lecture mémoire du processus LSASS (Sysmon 10)
Règle 4 — Mouvement latéral SMB
  Trigger: Connexions SMB multiples + authentification (4624/4625)`,
    },
    { type: "h2", text: "Défis et limitations" },
    {
      type: "ul",
      items: [
        "Faux positifs → baselining & contexte",
        "Volume de données → priorisation risque/impact",
        "Évolution constante → veille & contributions",
      ],
    },
    { type: "h2", text: "Bonnes pratiques d’implémentation" },
    {
      type: "ul",
      items: [
        "Approche progressive : prioriser, étendre, mesurer",
        "Collaboration Red/Blue/Purple Team",
        "Documentation rigoureuse (techniques, règles, réponses)",
      ],
    },
    {
      type: "code",
      lang: "markdown",
      code: `# Template documentation
## Technique: [ID ATT&CK - Nom]
### Description
### Sources de données
### Règles de détection
### Faux positifs connus
### Procédures de réponse`,
    },
    { type: "h2", text: "Perspectives d’évolution" },
    {
      type: "ul",
      items: [
        "IA : détection comportementale, hunting automatisé, défense adaptative",
        "Cloud : AWS/Azure/GCP & conteneurs",
        "DevSecOps : intégration CI/CD",
      ],
    },
    { type: "h2", text: "Conclusion" },
    {
      type: "p",
      text: "MITRE ATT&CK transforme la détection : on passe des IoCs réactifs aux comportements proactifs. Résultats : meilleure couverture, investissements mieux priorisés, hunting standardisé et collaboration renforcée.",
    },
    { type: "h2", text: "Ressources complémentaires" },
    {
      type: "ul",
      items: [
        "Site officiel : attack.mitre.org",
        "GitHub MITRE ATT&CK : règles et outils",
        "Formation : MITRE ATT&CK Defender (MAD)",
        "Communauté : ATT&CK Community (Slack)",
      ],
    },
  ],
};
post1.readTime = estimateReadTime(post1.content);

// #2 — Purple Team Méthodologie
const post2: BlogPost = {
  id: 2,
  slug: "purple-team-methodologie-bonnes-pratiques",
  title: "Purple Team : Méthodologie et Bonnes Pratiques",
  excerpt:
    "Mettre en place une approche Purple Team efficace : objectifs, gouvernance, scénarios, boucles d'amélioration continue.",
  date: "10 décembre 2024",
  isoDate: "2024-12-10",
  category: "Méthodologie",
  tags: ["Purple Team", "Red Team", "Blue Team", "Process"],
  readTime: "",
  content: [
    {
      type: "p",
      text: "Structurer des exercices Purple Team pour aligner sécurité offensive et défensive et accélérer l'amélioration continue.",
    },
    { type: "h2", text: "Cadre de gouvernance" },
    {
      type: "ul",
      items: [
        "Objectifs business & risques",
        "Charte de test",
        "Périmètre & fenêtres de tir",
      ],
    },
    { type: "h2", text: "Conduite d’un exercice" },
    {
      type: "ul",
      items: [
        "Sélection de techniques ATT&CK",
        "Plan d'injection contrôlée",
        "Critères de succès (MTTD/MTTR)",
      ],
    },
    { type: "h2", text: "Capitalisation" },
    {
      type: "ul",
      items: [
        "Debrief multi-équipes",
        "Backlog de détections",
        "Runbooks de réponse",
      ],
    },
  ],
};
post2.readTime = estimateReadTime(post2.content);

// #3 — Automatisation Python
const post3: BlogPost = {
  id: 3,
  slug: "automatisation-tests-securite-python",
  title: "Automatisation des Tests de Sécurité avec Python",
  excerpt:
    "Scripts et patterns Python pour automatiser la reconnaissance, l’exploitation et la post-exploitation de manière responsable.",
  date: "5 décembre 2024",
  isoDate: "2024-12-05",
  category: "Développement",
  tags: ["Python", "Automatisation", "Pentest", "Scripts"],
  readTime: "",
  content: [
    {
      type: "p",
      text: "Construire des utilitaires réutilisables, modulaires et traçables pour gagner du temps sans sacrifier la sécurité.",
    },
    { type: "h2", text: "Pattern CLI modulaire" },
    {
      type: "code",
      lang: "python",
      code: `import click

@click.group()
def cli(): ...

@cli.command()
@click.option("--cidr", required=True)
def scan(cidr):
    # wrapper nmap + parsing xml/json
    ...

@cli.command()
def brute():
    # orchestrer hydra/medusa avec rate limit
    ...

if __name__ == "__main__":
    cli()`,
    },
    { type: "h2", text: "Logs & Evidence" },
    {
      type: "ul",
      items: [
        "JSONL horodaté",
        "Hash des artefacts",
        "Reproductibilité via config",
      ],
    },
  ],
};
post3.readTime = estimateReadTime(post3.content);

// #4 — ELK Stack
const post4: BlogPost = {
  id: 4,
  slug: "analyse-logs-elk-stack",
  title: "Analyse de Logs avec ELK Stack",
  excerpt:
    "De l’ingestion à la visualisation : pipelines Logstash, mapping Elasticsearch et dashboards Kibana orientés sécurité.",
  date: "1 décembre 2024",
  isoDate: "2024-12-01",
  category: "SIEM",
  tags: ["ELK", "Elasticsearch", "Kibana", "Logs", "SIEM"],
  readTime: "",
  content: [
    {
      type: "p",
      text: "Structurer des pipelines robustes et des schémas de données adaptés aux requêtes sécurité.",
    },
    { type: "h2", text: "Pipelines Logstash" },
    {
      type: "code",
      lang: "conf",
      code: `input { beats { port => 5044 } }
filter { grok { match => { "message" => "%{COMMONAPACHELOG}" } } }
output { elasticsearch { hosts => ["localhost:9200"]; index => "weblogs-%{+YYYY.MM.dd}" } }`,
    },
    { type: "h2", text: "Dashboards utiles" },
    {
      type: "ul",
      items: ["Timeline incidents", "DNS suspects", "Top processus bruyants"],
    },
  ],
};
post4.readTime = estimateReadTime(post4.content);

// #5 — Sécurité Web
const post5: BlogPost = {
  id: 5,
  slug: "securisation-applications-web-guide-pratique",
  title: "Sécurisation d'Applications Web : Guide Pratique",
  excerpt:
    "Techniques essentielles contre l’OWASP Top 10 : contrôles d’entrée, sessions, secrets, et sécurité des en-têtes.",
  date: "25 novembre 2024",
  isoDate: "2024-11-25",
  category: "Web Security",
  tags: ["OWASP", "Web Security", "XSS", "SQLi", "CSRF"],
  readTime: "",
  content: [
    {
      type: "p",
      text: "Prioriser les contrôles à fort impact et faibles faux positifs.",
    },
    { type: "h2", text: "Checklist rapide" },
    {
      type: "ul",
      items: [
        "Validation côté serveur + sanitization",
        "Headers de sécurité (CSP, HSTS, COOP/COEP)",
        "Gestion sessions/cookies (SameSite/HttpOnly/Secure)",
        "Secrets: vault & rotation",
      ],
    },
  ],
};
post5.readTime = estimateReadTime(post5.content);

// #6 — Threat Hunting
const post6: BlogPost = {
  id: 6,
  slug: "introduction-threat-hunting",
  title: "Introduction au Threat Hunting",
  excerpt:
    "Principes, sources de vérité et playbooks pour une chasse aux menaces pilotée par hypothèses.",
  date: "20 novembre 2024",
  isoDate: "2024-11-20",
  category: "Detection",
  tags: ["Threat Hunting", "SOC", "Detection", "APT"],
  readTime: "",
  content: [
    {
      type: "p",
      text: "Du réactif au proactif : formuler des hypothèses et tester systématiquement.",
    },
    { type: "h2", text: "Sources utiles" },
    {
      type: "ul",
      items: [
        "EDR telemetry",
        "DNS/Proxy",
        "Windows Security + Sysmon",
        "Netflow",
      ],
    },
    { type: "h2", text: "Exemple de requête" },
    {
      type: "code",
      lang: "kql",
      code: `// Processus rares sur un host
DeviceProcessEvents
| summarize cnt=count() by FileName
| order by cnt asc
| take 20`,
    },
  ],
};
post6.readTime = estimateReadTime(post6.content);

const posts: BlogPost[] = [post1, post2, post3, post4, post5, post6];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1));
}
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
export function getPrevNext(slug: string) {
  const list = getAllPosts();
  const i = list.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? list[i - 1] : undefined,
    next: i < list.length - 1 ? list[i + 1] : undefined,
  };
}
