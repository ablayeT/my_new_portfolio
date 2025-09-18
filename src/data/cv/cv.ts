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
  linkedin: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
  github: "https://github.com/ablayeT?tab=repositories",
  tryhackme: "https://tryhackme.com/p/abdoulaye.toure0",
};

export const CONTACT = {
  location: "Paris, France",
  email: "ablayetoure2014@gmail.com",
  phone: "+33 644 93 26 27",
};

// src/data/cv/cv.ts
export const CV_DATA = {
  identity: {
    name: "Abdoulaye Touré",
    title: "Alternant – Cybersécurité (Blue Team / Automatisation)",
    phone: "+33 644 93 26 27",
    email: "ablayetoure2014@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
      github: "https://github.com/ablayeT?tab=repositories",
      tryhackme: "https://tryhackme.com/p/ablaye.toure0",
    },
    location: "Paris, France",
    photoPublicPath: "/cv/photo.jpg", // mets ta photo ici: public/cv/photo.jpg
  },

  summary:
    "Étudiant en cybersécurité avec une double compétence en systèmes/réseaux sécurisés et en développement. Je recherche une alternance à partir de septembre 2025 pour mettre en pratique mes compétences ",

  experiences: [
    {
      role: "Stage – Audit & Pentest",
      company: "ADVENS • Paris",
      period: "Mars 2025 – Mai 2025",
      bullets: [
        "Audits techniques systèmes/réseaux/applications.",
        "Pentest (XSS, SQLi, brute force) avec Burp Suite, Nmap, SQLMap.",
        "Analyse & détection via ELK (Filebeat, Logstash, Kibana).",
        "Automatisation de tâches d’audit (Bash/PowerShell) et rapports avec recommandations.",
      ],
    },
    {
      role: "Développeur Web & Web Mobile",
      company: "Entourage • Paris",
      period: "Oct 2022 – Nov 2023",
      bullets: [
        "Développement et évolutions de plateformes web (front/back).",
        "Contribution à l’architecture, aux choix techniques, aux tests/recettes.",
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
        "Gestion d’équipe (2 commerciaux, 1 technicien), coordination commerciale/technique, suivi clients.",
      ],
    },
  ],

  featuredProjects: [
    {
      name: "Purple Team Lab – Infrastructure de simulation",
      bullets: [
        "Lab segmenté (Public / DMZ / Privé) aligné MITRE ATT&CK.",
        "Suricata + ELK pour collecte, corrélation et visualisation en temps réel.",
        "Automatisation, playbooks: démontrer la chaîne détection → investigation → réponse.",
      ],
    },
    {
      name: "Plateforme de simulation Phishing",
      bullets: [
        "Campagnes GoPhish (modèles, tracking, dashboard de métriques).",
        // "Intégration SMTP et rapports de sensibilisation.",
      ],
    },
    {
      name: "Dashboard SIEM personnalisé",
      bullets: [
        "Vues Kibana par use-case (phishing, exécution suspecte, mouvements latéraux).",
        // "Règles d’alerting & lignes de base pour réduire le bruit.",
      ],
    },
    {
      name: "Framework de Threat Hunting",
      bullets: [
        "Hypothèses de chasse (TTP), requêtes KQL, procédures d’enrichissement, traces & IOC.",
      ],
    },
  ],

  skills: {
    security:
      "Red team (Burp Suite, Nmap, SQLMap), vulnérabilités (Nessus, Wireshark), chiffrement & AuthN/Z, automatisation.",
    systems: "Linux (Kali, administration), Bash, powershell.",
    dev: "JavaScript/Node.js, React, Python, PHP, MySQL.",
    tools: "ELK, Nmap, Nesus, Wireshark.",
    ats: "Blue Team, Pentest, MITRE ATT&CK, SIEM/ELK, Incident Response, Threat Hunting, Automatisation, CI/CD, Sécurité applicative.",
  },

  education: [
    {
      title: "Master I – Expert en Cybersécurité",
      school: "Oterie Cyber School, Gennevilliers",
      period: "Sept 2025 – en cours",
    },
    {
      title: "Bac+4 – Administration d’infrastructures sécurisées",
      school: "ALT-RH, Paris",
      period: "Sept 2024 – Juin 2025",
    },
    {
      title: "Titre RNCP – Développeur Web & Web Mobile (Alternance)", // formation manquante ajoutée
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
    languages:
      "Français • Anglais (courant) • Espagnol (intermédiaire) • Wolof • Malinké • Bambara.",
    soft: "Rigoureux • Curieux • Organisé • Discret.",
    hobbies: "Lecture • Taekwondo • Baseball • Course à pied.",
  },
};
