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
    name: "Abdoulaye Touré",
    title: "Alternance SOC / Pentest (Mastère cybersécurité – Bac+5)",
    under_title: "Disponible dès sept. 2025 · Paris/IDF · présentiel/hybride",
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

  // === PROFIL (Narratif "double compétence rare")
  summary:
    "Double compétence lettres/tech. J’automatise la détection et la réponse (ELK, playbooks) et convertis les signaux en insights actionnables. Je cherche une alternance SOC/Pentest pour créer de l’impact immédiat.",

  experiences: [
    {
      role: "Stage de fin d’études – Audit & Pentest (validation ALT-RH – Bac+4)",
      company: "ADVENS • Paris",
      period:
        "Mars 2025 – Juin 2025 · Stage de fin d’études (validation ALT-RH – Bac+4)",
      bullets: [
        "Audits techniques (systèmes/réseau/applicatif) et priorisation des risques.",
        "Tests d’intrusion web & réseau (Burp Suite, Nmap, SQLMap) : OWASP.",
        "Threat Hunting & corrélation SIEM (ELK/Kibana)",
        "Industrialisation du reporting (Bash/PowerShell)",
        "Restitution & recommandations alignées",
      ],
    },
    {
      role: "Développeur Web & Web Mobile",
      company: "Entourage • Paris",
      period: "Oct 2022 – Nov 2023",
      bullets: [
        "Conception et sécurisation d’applications full-stack (Node.js, React) en intégrant les principes de Security by Design.",
        "Réduction de la surface d’attaque des API par des contrôles de sécurité robustes (authentification, gestion des secrets).",
        "Amélioration de la posture de sécurité du code (standards AppSec).",
      ],
    },
  ],

  // === PROJETS (compacts pour 1 page)
  featuredProjects: [
    {
      name: "Purple Team Lab – Infrastructure de simulation",
      tags: ["MITRE ATT&CK", "Suricata", "ELK"],
      bullets: [
        "Scénarios mesurables ATT&CK (détection→investigation→réponse) sur lab segmenté (Public/DMZ/Privé).",
        "Chaîne Suricata + ELK : collecte, corrélation, dashboards par use-cases SOC, playbooks d’investigation.",
      ],
    },
    {
      name: "Dashboard SIEM Personnalisé",
      tags: ["Kibana", "Alerting", "Baselines"],
      bullets: [
        "Vues ciblées (phishing, exécutions suspectes, latéralisation) et indicateurs de priorisation SOC.",
        "Règles d’alerting + baselines pour optimiser le ratio signal/bruit et réduire les faux positifs.",
      ],
    },
    {
      name: "Plateforme de Simulation Phishing",
      tags: ["GoPhish", "SMTP", "Awareness"],
      bullets: [
        "Campagnes avec modèles, tracking et tableaux de bord (taux de clic, signalement) ; retours d’expérience.",
        "Industrialisation du reporting pour libérer du temps d’analyse à plus forte valeur ajoutée.",
      ],
    },
  ],

  // === COMPÉTENCES (vendeuses)
  skills: {
    security:
      "Threat Hunting via SIEM (ELK), ingénierie de la détection (corrélation, baselines), orchestration de la réponse à incident (playbooks), analyse forensique.",
    red: "Audit d’applications web (OWASP), tests d’intrusion internes/externes, cartographie et réduction de la surface d’attaque.",
    systems:
      "Linux (admin/durcissement), segmentation réseau, journalisation, supervision.",
    dev: "Automatisation & scripting : Bash, PowerShell, Node.js ; CI/CD ; documentation et rapports normalisés.",
    tools:
      "Elasticsearch, Logstash, Kibana, Suricata, Wireshark, Nmap, Burp Suite, SQLMap, Git, Docker",
    ats: "Rigueur, analyse, vulgarisation, organisation, adaptabilité, travail d’équipe",
  },

  // === FORMATIONS (rappel court et renvoi vers Expériences)
  education: [
    {
      title: "Mastère (Bac+5, en cours) – Expert en cybersécurité",
      school: "Otéria Cyber School, Gennevilliers",
      period: "2025 – 2027",
      note: "Recherche d’alternance (SOC / Pentest) pour la rentrée de septembre 2025.",
    },
    {
      title: "Bac+4 – Administrateur d’infrastructures sécurisées (RNCP 37680)",
      school: "ALT-RH, Paris",
      period: "2024 – 2025",
      note: "Cursus validé par un stage de 5 mois chez ADVENS — voir Expériences.",
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
      title:
        "Bac+5 – Littérature & civilisation anglophone (américaine & caribéenne)",
      school: "UCAD, Dakar",
      period: "2011 – 2015",
    },
  ],

  // === PERSONNEL : langues (objet, dot-notation)
  personal: {
    langues: {
      francais: "courant",
      anglais: "courant",
      espagnol: "intermédiaire",
    },
    soft: "Esprit d’analyse, pédagogie/vulgarisation, sens du service, autonomie, discrétion",
    hobbies:
      "Veille sécurité, programmation, TryHackMe/RootMe, Taekwondo, course à pied, lecture, Baseball",
  },

  // Chips visibles en bannière (sinon déduits de skills.tools)
  topChips: ["ELK/Kibana", "Suricata", "OWASP", "Burp Suite", "Nmap", "Docker"],
};
