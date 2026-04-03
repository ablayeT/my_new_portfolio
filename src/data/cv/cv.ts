// ==== Asset de téléchargement ====
export const CV_ASSET = {
  href: "/cv/download",
  filename: "CV_Abdoulaye_Toure_Cybersecurity.pdf",
  updatedAt: "2026-04",
};

export type FeaturedProject = {
  id: string;
  title: string;
  href: string;
  chips: string[];
};

export const FEATURED_CV_PROJECTS: FeaturedProject[] = [
  {
    id: "purple-team",
    title: "Purple Team Lab Infrastructure",
    href: "/projects/purple-team",
    chips: ["Purple Team", "SIEM", "Infrastructure"],
  },
  {
    id: "phishing-simulation",
    title: "Plateforme de Simulation Phishing",
    href: "/projects/phishing-simulation",
    chips: ["Red Team", "Phishing", "Formation"],
  },
  {
    id: "incident-response",
    title: "Playbook Réponse aux Incidents",
    href: "/projects/incident-response",
    chips: ["Incident Response", "Automation", "SOC"],
  },
];

export const PROFILE_LINKS = {
  Linkedin: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
  Github: "https://github.com/ablayeT",
  Tryhackme: "https://tryhackme.com/p/ablaye.toure0",
  Portfolio: "https://abdou-cyber.dev",
};

export const CONTACT = {
  location: "",
  email: "ablayetoure2014@gmail.com",
  phone: "+33 644 93 26 27",
};

// ===== Données PDF =====
export const CV_DATA = {
  meta: { updatedAt: "2026-04" },

  identity: {
    name: "Abdoulaye Toure",
    title: "Analyste SecOps · Ingénieur Réseau · Cybersécurité & Automatisation",
    under_title: "Alternance · Anglais C1/C2",
    phone: "+33 644 93 26 27",
    email: "ablayetoure2014@gmail.com",
    local: "",
    links: {
      linkedin: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
      github: "https://github.com/ablayeT",
      tryhackme: "https://tryhackme.com/p/abdou.toure0",
      portfolio: "https://abdou-cyber.dev",
    },
  },

  summary:
    "Analyste SecOps en alternance chez Hessling (LynxAI), je conçois et automatise la détection des menaces, sécurise des infrastructures hébergeant des modèles d'IA et traduis des capacités techniques complexes en propositions de valeur B2B. Ingénieur réseau de formation, j'allie approche offensive (pentest) et défensive (SOC/SIEM) pour anticiper les vulnérabilités.",

    experiences: [
      {
        role: "Analyste SecOps & Ingénieur Avant-Vente",
        company: "Hessling · LynxAI — Alternance · Paris",
        period: "Janvier 2026 – Présent",
        bullets: [
          "Surveillance, détection et analyse des menaces (SOC) — maintien de l'exigence Zero Data Exfiltration.",
          "Sécurisation des opérations et de l'infrastructure hébergeant les modèles d'IA (SecOps).",
          "Release management et coordination des mises en production.",
          "Traduction des capacités LLM open-source en proposition de valeur B2B (DSI, cabinets d'avocats, santé).",
          "Structuration de la stratégie d'acquisition : Pitch Deck, argumentaires, sensibilisation aux risques du Shadow AI.",
        ],
      },
      {
        role: "Développeur Full Stack / DevOps",
        company: "Skeelfully — Freelance · Paris",
        period: "Juillet 2025 – Décembre 2025",
        bullets: [
          "Développement d'une marketplace connectant porteurs de projet et talents.",
          "Stabilisation du front-end : migration Node 16, correctifs Webpack/OpenSSL.",
          "Optimisation CI/CD et ajout de tests unitaires pour fiabiliser les livraisons.",
          "Audit de sécurité applicative et durcissement des dépendances NPM.",
        ],
      },
      {
        role: "Audit Infrastructure & Pentest",
        company: "Advens — Stage · Paris",
        period: "Mars 2025 – Juin 2025",
        bullets: [
          "Audits techniques (systèmes / réseau / applicatif) et priorisation des risques.",
          "Tests d'intrusion web & réseau : Burp Suite, Nmap, SQLMap — méthodologie OWASP.",
          "Threat Hunting & corrélation SIEM (ELK/Kibana).",
          "Industrialisation du reporting (Bash/PowerShell) et restitution aux équipes.",
        ],
      },
      {
        role: "Développeur Web & Mobile",
        company: "Entourage — Alternance · Paris",
        period: "Octobre 2022 – Octobre 2023",
        bullets: [
          "Conception et sécurisation d'applications full-stack (Node.js, React) avec Security by Design.",
          "Réduction de la surface d'attaque des API : authentification robuste, gestion des secrets.",
          "Amélioration de la posture de sécurité du code (standards AppSec / OWASP).",
          "Gestion de bases de données MySQL et collaboration en méthode Agile (Jira).",
        ],
      },
    ],
    featuredProjects: [
      {
        name: "Purple Team Lab — Infrastructure Sécurisée",
        tags: ["SIEM", "VLANs", "ELK", "Linux"],
        bullets: [
          "Déploiement d'une architecture segmentée : VLANs, adressage IP, routage inter-VLAN.",
          "Journalisation centralisée (ELK) et règles de filtrage pour la supervision et détection.",
        ],
      },
      {
        name: "Dashboard de Supervision & Monitoring",
        tags: ["Kibana", "Data Viz", "Analyse de logs"],
        bullets: [
          "Conception de tableaux de bord Kibana pour le suivi d'activité et la détection d'anomalies.",
          "Tuning des seuils d'alerte pour réduire les faux positifs et optimiser le MCO.",
        ],
      },
      {
        name: "Automatisation de Reporting KPI",
        tags: ["PowerBI", "Python", "Scripting"],
        bullets: [
          "Automatisation de la collecte et transformation de données techniques via Python.",
          "Création de visuels décisionnels PowerBI pour le suivi des indicateurs de performance.",
        ],
      },
    ],

  skills: {
    // SOC & Blue Team — 5 éléments clés
    security: "SIEM/ELK, Threat Hunting, Wireshark, Firewalling/NAC, Centreon",

    // Pentest & Red Team — 4 essentiels
    red: "Burp Suite, Nmap, SQLMap, OWASP Top 10",

    // Systèmes & Réseau — 6 fondamentaux
    systems: "Linux (Debian/RedHat), Windows Server, TCP/IP, VLANs, BGP/OSPF, Active Directory",

    // Automatisation & Dev — 5 outils clés
    dev: "Python, Bash, PowerShell, Ansible, CI/CD (GitHub Actions)",

    // Outils — 5 max
    tools: "Docker, Git, PowerBI, VS Code, Jira",

    ats: "Esprit d'analyse, Pédagogie, Gestion de projet, Adaptabilité",

    // Langages — 4 principaux
    language: "Python, TypeScript, SQL, Bash",
  },

  education: [
    {
      title: "Bac+5 — Expert en Cybersécurité",
      school: "OTERIA Cyber School",
      period: "Sep 2025 – Juil 2027",
      note: "Threat Intelligence & Risk Analysis, détection avancée (SIEM/EDR/XDR), réponse aux incidents (DFIR), simulation d'attaques Red Team/Pentest, Zero Trust Architecture, sécurité Cloud & IA.",
    },
    {
      title: "Bac+4 — Administrateur d'infrastructures sécurisées (RNCP)",
      school: "ALT-RH, Paris",
      period: "2024 – 2025",
      note: "Déploiement et durcissement d'infrastructures (Windows/Linux), routage réseau avancé (VLANs, BGP, OSPF), virtualisation (VMware/Hyper-V), gestion des identités (Active Directory, PKI), conformité ANSSI.",
    },
    {
      title: "Certification Microsoft SC-900",
      school: "Microsoft",
      period: "2025",
      note: "Fondamentaux Sécurité, Conformité & Identité sur Azure/M365 : Zero Trust, gestion des accès (Entra ID), protection des données (Purview), conformité réglementaire.",
    },
    {
      title: "Bac+3 — Développeur Web & Web Mobile",
      school: "WebForce3, Paris",
      period: "Oct 2022 – Nov 2023",
      note: "Architecture full-stack sécurisée (React, Node.js, API REST), Security by Design, OWASP Top 10, authentification JWT/OAuth2, CI/CD et DevSecOps.",
    },
    {
      title: "Bac+2 — Développeur Intégrateur Web",
      school: "OpenClassrooms",
      period: "Avr 2022 – Oct 2023",
      note: "Fondamentaux du développement web (HTML, CSS, JavaScript), protocoles HTTP/HTTPS, manipulation des données, initiation à la sécurité applicative.",
    },
  ],

  personal: {
    langues: {
      francais: "courant",
      anglais: "courant (C1/C2)",
      espagnol: "intermédiaire",
    },
    soft: "Esprit d'analyse, Pédagogie technique, Gestion de projet, Adaptabilité, Curiosité intellectuelle",
    hobbies: "Veille Cyber/Cloud, CTF & TryHackMe, Taekwondo, Baseball, Course à pied, Lecture, Domotique",
  },

  topChips: ["Python", "SIEM/ELK", "Pentest", "Linux", "SecOps", "CI/CD"],
};