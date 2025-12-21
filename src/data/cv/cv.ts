// ==== Asset de téléchargement ====
export const CV_ASSET = {
  href: "/cv/download",
  filename: "CV_Abdoulaye_Toure_Cybersecurity.pdf",
  updatedAt: "2025-10",
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
    chips: ["Purple Team", "Monitoring", "Infrastructure"],
  },
  {
    id: "phishing-simulation",
    title: "Plateforme de Simulation Phishing",
    href: "/projects#phishing-simulation",
    chips: ["Red Team", "Phishing", "Formation"],
  },
  {
    id: "incident-response",
    title: "Playbook Réponse aux Incidents",
    href: "/projects#incident-response",
    chips: ["Incident Response", "Automation", "Workflow"],
  },
];

export const PROFILE_LINKS = {
  Linkedin: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
  Github: "https://github.com/ablayeT?tab=repositories",
  Tryhackme: "https://tryhackme.com/p/ablaye.toure0",
  Portfolio: "https://abdou-cyber.dev",
};

export const CONTACT = {
  location: "Paris, France",
  email: "ablayetoure2014@gmail.com",
  phone: "+33 644 93 26 27",
};

// ===== Données PDF =====
export const CV_DATA = {
  meta: { updatedAt: "2025-10" },

  identity: {
    name: "Abdoulaye Toure",
    title: "Ingénieur Réseau & Automatisation (Junior)",
    under_title: "Disponible immédiatement · Paris/IDF · Anglais Courant",
    phone: "+33 644 93 26 27",
    email: "ablayetoure2014@gmail.com",
    local: "Local: Île-de-France",
    links: {
      linkedin: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
      github: "https://github.com/ablayeT?tab=repositories",
      tryhackme: "https://tryhackme.com/p/ablaye.toure0",
      portfolio: "https://abdou-cyber.dev",
    },
  },

  // === PROFIL

  summary:
    "Ingénieur Réseau junior rigoureux, je combine une expertise en administration d'infrastructures LAN/WAN avec de solides compétences en automatisation (Python, Scripting).",

  experiences: [
    {
      role: "Développeur Full Stack / DevOps (Freelance)",
      company: "Skeelfully • Paris",
      period: "Juillet 2025 – Novembre 2025",
      bullets: [
        "Administration système et déploiement d'une marketplace sur serveurs Linux.",
        "Mise en place de pipelines CI/CD (Git) pour des déploiements.",
        "Scripting de maintenance et migration de l'environnement d'exécution.",
      ],
    },
    {
      role: "Audit Infrastructure /Pentest",
      company: "ADVENS • Paris",
      period: "Mars 2025 – Juin 2025",
      bullets: [
        "Cartographie et audit d'architectures réseau (Analyse de flux, topologie LAN).",
        "Diagnostic de conformité réseau et recommandations de durcissement (Switchs/Routeurs).",
        "Automatisation du reporting et traitement de données via (Bash/PowerShell).",
      ],
    },
    {
      role: "Développeur & Intégrateur Web",
      company: "Entourage • Paris",
      period: "Octobre 2022 – Novembre 2023",
      bullets: [
        "Conception d’applications web avec contraintes de haute disponibilité.",
        "Gestion de bases de données (MySQL) et optimisation des requêtes.",
        "Collaboration en méthode Agile et utilisation de Jira.",
      ],
    },
  ],

  // === PROJETS

  featuredProjects: [
    {
      name: "Lab d'Infrastructure Réseau Sécurisé",
      tags: ["Segmentation", "Linux", "Virtualisation"],
      bullets: [
        "Déploiement d'une architecture segmentée : configuration VLANs, adressage IP et routage.",
        "Mise en place de règles de filtrage et journalisation centralisée (ELK) pour la supervision.",
      ],
    },
    {
      name: "Dashboard de Supervision & Monitoring",
      tags: ["Kibana", "Data Viz", "Analyse de logs"],
      bullets: [
        "Conception de tableaux de bord pour le suivi d'activité et la détection d'anomalies.",
        "Affinage des seuils d'alerte (Tuning) pour réduire les faux positifs et optimiser le MCO.",
      ],
    },
    {
      name: "Automatisation de Reporting KPI",
      tags: ["PowerBI", "Scripting", "Python"],
      bullets: [
        "Automatisation de la collecte de données techniques et transformation pour restitution.",
        "Création de visuels décisionnels pour le suivi des indicateurs de performance.",
      ],
    },
  ],

  // === COMPÉTENCES

  skills: {
    security:
      "Supervision réseau, Analyse de flux (Wireshark), NAC, Firewalling, Gestion des incidents, Centreon.",

    red: "",

    systems:
      "Protocoles : BGP, OSPF, STP, VxLAN, EVPN, TCP/IP. Admin Linux (Debian/RedHat), Windows Server.",

    dev: "Python (Scripting réseau), Ansible, Bash, PowerShell, Git/BitBucket, CI/CD.",

    tools:
      "Centreon, Wireshark, Jira, Docker, Git, VS Code, Nmap, PowerBI, Excel",

    ats: "Rigueur, Respect des procédures, Travail d’équipe, Anglais technique, Veille techno",
    language: "Python, Bash, SQL, JavaScript",
  },

  // === FORMATIONS
  education: [
    {
      title: "Certification Microsoft SC-900",
      school: "Microsoft",
      period: "2025",
      note: "Fondamentaux Sécurité & Conformité (Utile pour le contexte bancaire).",
    },
    {
      title: "Bac+4 – Administrateur d’infrastructures sécurisées (RNCP)",
      school: "ALT-RH, Paris",
      period: "2024 – 2025",
      note: "Architecture Réseau, Routage/Commutation, Virtualisation, Sécurité des SI.",
    },
    {
      title: "Bac+3 – Développeur Web & Web Mobile",
      school: "WebForce3, Paris",
      period: "2022 – 2023",
    },
    {
      title: "Bac+2 – Développeur Intégrateur Web",
      school: "OpenClassrooms, Paris",
      period: "2022",
    },
    {
      title: "Bac+5 – Littérature & civilisation anglophone",
      school: "UCAD, Dakar",
      period: "2011 – 2015",
    },
  ],

  // === PERSONNEL
  personal: {
    langues: {
      francais: "courant",
      anglais: "courant (C1/C2)",
      espagnol: "intermédiaire",
    },
    soft: "Rigueur, Sens du service client, Capacité d'analyse, Esprit d'équipe",
    hobbies:
      "Veille technologique (Réseau/Cloud), Running, Lecture, Automatisation domotique",
  },

  // Chips (Mots clés pour le scan rapide du recruteur)
  topChips: [
    "Python",
    "BGP / OSPF",
    "Ansible",
    "Linux",
    "Wireshark",
    "Centreon",
  ],
};
