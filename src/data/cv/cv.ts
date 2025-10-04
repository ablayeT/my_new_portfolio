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
  meta: { updatedAt: "2025-09" },

  identity: {
    name: "Abdoulaye Touré",
    title: "Expert en Cybersécurité",
    under_title: " En recherche d'alternance",
    phone: "+33 644 93 26 27",
    email: "ablayetoure2014@gmail.com",
    links: {
      linkedin: PROFILE_LINKS.Linkedin,
      github: PROFILE_LINKS.Github,
      tryhackme: PROFILE_LINKS.Tryhackme,
      portfolio: PROFILE_LINKS.Portfolio,
    },

    location: "Paris, France",
    photoPublicPath: "/cv/photo.jpg", // côté React (page HTML), pas utilisé dans le PDF
  },

  summary:
    "Étudiant en cybersécurité avec double compétence systèmes/réseaux et développement. Je recherche une alternance dès septembre 2025 pour renforcer détection, réponse aux incidents et automatisation sécurité.",

  experiences: [
    {
      role: "Stage – Audit & Pentest",
      company: "ADVENS • Paris",
      period: "Mars 2025 – Mai 2025",
      bullets: [
        "Audits techniques systèmes/réseaux/applications.",
        "Pentests (XSS, SQLi, bruteforce) – Burp Suite, Nmap, SQLMap.",
        "Analyse & détection via ELK (Filebeat, Logstash, Kibana).",
        "Automatisation (Bash/PowerShell) et rapports de recommandations.",
      ],
    },
    {
      role: "Développeur Web & Web Mobile",
      company: "Entourage • Paris",
      period: "Oct 2022 – Nov 2023",
      bullets: [
        "Développement et évolutions de plateformes web (front/back).",
        "Architecture, choix techniques, tests et recettes.",
      ],
    },
    {
      role: "Professeur d’anglais",
      company: "BEC • Dakar, Sénégal",
      period: "Sept 2017 – Nov 2019",
      bullets: [
        "Conception de cours, animation de classes, évaluations régulières.",
      ],
    },
    {
      role: "Fondateur & Gérant",
      company: "Toure Multi-Services • Sénégal",
      period: "2017 – 2019",
      bullets: [
        "Gestion d’équipe (2 commerciaux, 1 technicien) et suivi clients.",
      ],
    },
  ],

  featuredProjects: [
    {
      name: "Purple Team Lab – Infrastructure de simulation",
      tags: ["MITRE ATT&CK", "Suricata", "ELK"],
      bullets: [
        "Lab segmenté Public/DMZ/Privé pour scénarios ATT&CK.",
        "Suricata + ELK : collecte, corrélation, vues temps réel.",
        "Automations & playbooks pour détection → investigation → réponse",
      ],
    },
    {
      name: "Plateforme de simulation Phishing",
      tags: ["GoPhish", "SMTP", "Awareness"],
      bullets: [
        "Campagnes GoPhish avec modèles, tracking, dashboard.",
        "Intégration SMTP et rapports de sensibilisation.",
      ],
    },
    {
      name: "Dashboard SIEM personnalisé",
      tags: ["Kibana", "Alerting", "Baselines"],
      bullets: [
        "Vues par use-cases (phishing, exécution suspecte, latéral).",
        "Règles d’alerting & lignes de base pour réduire le bruit.",
      ],
    },
    {
      name: "Framework de Threat Hunting",
      tags: ["TTP", "KQL", "IOC"],
      bullets: ["Hypothèses de chasse, requêtes KQL, enrichissement & IOC."],
    },
  ],

  skills: {
    security:
      "Pentest, vulnérabilités (Nessus/Wireshark), chiffrement & AuthN/Z, sécurité applicative,(Bash/PowerShell).",
    systems: "Linux (Kali, admin), Bash.",
    dev: "JavaScript/Node.js, React, Python, PHP, MySQL (UI: Material UI).",
    tools: "ELK, Nmap, Gobuster, Nessus, Wireshark.",
    ats: "Blue Team, MITRE ATT&CK, SIEM/ELK, Incident Response, Threat Hunting, Automatisation, CI/CD",
  },

  education: [
    {
      title: "Mastere Cybersécurité - annee 4",
      school: "Hetic , Paris",
      period: "Novembre 2025",
    },
    {
      title: "Bac+4 – Administration d’infrastructures sécurisées",
      school: "ALT-RH, Paris",
      period: "Sept 2024 – Juin 2025",
    },
    {
      title: "Titre RNCP – Développeur Web & Web Mobile (Alternance)",
      school: "WebForce3, Paris",
      period: "Oct 2022 – Nov 2023",
    },
    {
      title: "Parcours – Développeur Intégrateur Web",
      school: "OpenClassrooms, Paris",
      period: "Avr 2022 – Oct 2022",
    },
    {
      title: "Master II – Littérature & civilisation américaine & caribéenne",
      school: "UCAD, Dakar",
      period: "Oct 2011 – Juil 2015",
    },
  ],

  personal: {
    languages: "Français • Anglais • Wolof • Malinké • Bambara.",
    soft: "Rigoureux • Curieux • Organisé • Discret.",
    hobbies: "Lecture • Taekwondo • Baseball • Course à pied.",
  },
};
