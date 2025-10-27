// src/data/cv/cv.ts

export const CV_ASSET = {
  href: "/cv/download",
  filename: "CV_Abdoulaye_Toure_Cybersecurity.pdf",
  updatedAt: "2025-09",
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
    name: "Abdoulaye Touré",
    title: "Analyste en Cybersécurité à la recherche d'une alternance",
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

  // Accroche : 1 phrase, posture pro, mots-clés ATS (cyberdéfense, incidents…)
  summary:
    "Analyste en cybersécurité, je conçois et automatise des solutions de cyberdéfense pour la détection et la réponse aux incidents, afin de renforcer la sécurité réseau et la résilience des SI face aux vulnérabilités.",

  // >>> UNIQUEMENT les expériences pertinentes, détaillées (≥5 bullets chacune)
  experiences: [
    {
      role: "Stage – Audit & Pentest",
      company: "ADVENS • Paris",
      period: "Mars 2025 – Juillet 2025",
      bullets: [
        "Mené des audits techniques (systèmes, sécurité réseau, applications) pour cartographier les risques et prioriser les corrections.",
        "Conçu et exécuté des tests d’intrusion (XSS, SQLi, bruteforce) avec Burp Suite, Nmap et SQLMap pour valider l’efficacité des contrôles.",
        "Analysé les journaux avec ELK (Elasticsearch, Logstash, Kibana) afin d’identifier des patterns d’anomalies et de renforcer la détection.",
        "Automatisé la génération de rapports (Bash/PowerShell), réduisant de ~40 % le temps de production et standardisant les livrables.",
        "Présenté des recommandations techniques (durcissement, remédiations, baselines) à l’équipe sécurité et suivi de leur implémentation.",
      ],
    },
    {
      role: "Développeur Web & Web Mobile",
      company: "Entourage • Paris",
      period: "Oct 2022 – Nov 2023",
      bullets: [
        "Conçu et développé des plateformes web full-stack (Node.js, React, MySQL) avec une attention particulière à la sécurité applicative.",
        "Mis en place des architectures sécurisées (authentification, validation des entrées, gestion des secrets) et durci les endpoints API.",
        "Écrit des tests unitaires/intégration et intégré la CI/CD, réduisant de ~25 % les incidents post-déploiement et accélérant les releases.",
        "Piloté des choix techniques, réalisé des revues de code et documenté les bonnes pratiques de sécurité (OWASP, gestion des vulnérabilités).",
        "Collaboré avec produit/UX pour améliorer l’ergonomie et la conformité sécurité (journalisation, traçabilité, gestion des erreurs).",
      ],
    },
  ],

  featuredProjects: [
    {
      name: "Purple Team Lab – Infrastructure de simulation",
      tags: ["MITRE ATT&CK", "Suricata", "ELK"],
      bullets: [
        "Lab segmenté (Public/DMZ/Privé) pour scénarios ATT&CK mesurables.",
        "Suricata + ELK : collecte, corrélation et visualisation en temps réel.",
        "Chaîne automatisée détection → investigation → réponse (playbooks).",
      ],
    },
    {
      name: "Dashboard SIEM Personnalisé",
      tags: ["Kibana", "Alerting", "Baselines"],
      bullets: [
        "Vues par use-cases (phishing, exécution suspecte, latéralisation).",
        "Règles d’alerting et baselines pour réduire le bruit de détection.",
      ],
    },
    {
      name: "Plateforme de Simulation Phishing",
      tags: ["GoPhish", "SMTP", "Awareness"],
      bullets: [
        "Campagnes avec modèles, tracking et tableau de bord d’indicateurs.",
        "Mesure du taux de clic et plan de sensibilisation continue.",
      ],
    },
  ],

  skills: {
    security:
      "Cyberdéfense, gestion des incidents, sécurité réseau, gestion des vulnérabilités, SIEM.",
    systems: "Administration Linux, durcissement, segmentation réseau.",
    dev: "Automatisation et scripting (Bash, PowerShell, Node.js).",
    tools: "ELK, Suricata, Wireshark, Git, Docker.",
    ats: "Rigueur, analyse, curiosité, organisation, communication.",
  },

  education: [
    {
      title: "Mastère - Cybersecurity Analyst",
      school: "Paris",
      period: "2025 –  2026",
    },
    {
      title: "Bac+4 – Administration d’infrastructures sécurisées",
      school: "ALT-RH, Paris",
      period: "2024 – 2025",
    },
    {
      title: "Bac+3 – Développeur Web & Web Mobile",
      school: "WebForce3, Paris",
      period: "2022 – 2023",
    },
    {
      title: "Bac+2 – Développeur Intégrateur Web",
      school: "OpenClassrooms, Paris",
      period: "Avr 2022 – Oct 2022",
    },
    {
      title:
        "BAc+5 – Littérature & civilisation anglophone (américaine & caribéenne)",
      school: "UCAD, Dakar",
      period: "2011 – 2015",
    },
  ],

  personal: {
    languages: "Français(courant), Anglais(courant) Espagnol(intermédiare)",
    soft: "Rigueur, curiosité, sens de l’analyse, organisation, adaptabilité, Discrétion",
    hobbies:
      "Veille sécurité, Programmation, Taekwondo, Course à pied, Baseball, Lecture.",
  },
};
