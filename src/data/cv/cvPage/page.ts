import type {
  ContactInfo,
  SkillCategory,
  Experience,
  EducationEntry,
} from "./types";

export const HEADLINE =
  "Analyste SecOps · Ingénieur Réseau · Cybersécurité & Automatisation";

export const PROFILE =
  "Analyste SecOps en alternance chez Hessling (LynxAI), je conçois et automatise la détection des menaces, sécurise des infrastructures hébergeant des modèles d'IA et traduis des capacités techniques complexes en propositions de valeur B2B. Ingénieur réseau de formation, j'allie approche offensive (pentest) et défensive (SOC/SIEM) pour anticiper les vulnérabilités.";

export const CONTACT: ContactInfo = {
  location: "Île-de-France",
  email: "ablayetoure2014@gmail.com",
  phone: "+33 644 93 26 27",
  github: "https://github.com/ablayeT",
  linkedin: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
  tryhackme: "https://tryhackme.com/p/ablaye.toure0",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "SOC & Blue Team",
    skills: [
      { name: "Détection & Analyse SIEM", level: "advanced" },
      { name: "ELK / Kibana", level: "advanced" },
      { name: "Threat Hunting", level: "advanced" },
      { name: "Wireshark", level: "expert" },
      { name: "Firewalling / NAC", level: "advanced" },
      { name: "Gestion des incidents", level: "advanced" },
      { name: "Centreon", level: "intermediate" },
    ],
  },
  {
    title: "Pentest & Sécurité Offensive",
    skills: [
      { name: "Burp Suite", level: "advanced" },
      { name: "Nmap", level: "expert" },
      { name: "SQLMap", level: "advanced" },
      { name: "OWASP Top 10", level: "expert" },
      { name: "Audit réseau", level: "advanced" },
    ],
  },
  {
    title: "Systèmes & Réseau",
    skills: [
      { name: "Linux (Debian/RedHat)", level: "expert" },
      { name: "Windows Server", level: "advanced" },
      { name: "TCP/IP · VLANs", level: "expert" },
      { name: "BGP · OSPF · STP", level: "advanced" },
      { name: "VxLAN · EVPN", level: "intermediate" },
      { name: "Active Directory", level: "advanced" },
      { name: "VMware · Hyper-V", level: "intermediate" },
    ],
  },
  {
    title: "Automatisation & DevSecOps",
    skills: [
      { name: "Python", level: "expert" },
      { name: "Bash", level: "expert" },
      { name: "PowerShell", level: "advanced" },
      { name: "Ansible", level: "intermediate" },
      { name: "CI/CD (GitHub Actions)", level: "advanced" },
      { name: "Docker", level: "intermediate" },
      { name: "PowerBI", level: "advanced" },
    ],
  },
  {
    title: "Développement",
    skills: [
      { name: "React / Next.js", level: "advanced" },
      { name: "Node.js", level: "advanced" },
      { name: "SQL / MySQL", level: "advanced" },
      { name: "TypeScript", level: "advanced" },
      { name: "REST API", level: "expert" },
    ],
  },
  {
    title: "Langues",
    skills: [
      { name: "Français — courant", level: "expert" },
      { name: "Anglais — C1/C2", level: "expert" },
      { name: "Espagnol — intermédiaire", level: "intermediate" },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    title: "Analyste SecOps & Ingénieur Avant-Vente",
    company: "Hessling · LynxAI — Alternance",
    period: "Jan 2026 – Présent",
    current: true,
    tasks: [
      "Surveillance, détection et analyse des menaces (SOC) — maintien de l'exigence Zero Data Exfiltration.",
      "Sécurisation des opérations et de l'infrastructure hébergeant les modèles d'IA (SecOps).",
      "Release management et coordination des mises en production.",
      "Traduction des capacités LLM open-source en proposition de valeur commerciale (DSI, cabinets d'avocats, santé).",
      "Structuration de la stratégie d'acquisition B2B : Pitch Deck, argumentaires, sensibilisation aux risques du Shadow AI.",
    ],
  },
  {
    title: "Développeur Full Stack / DevOps",
    company: "Skeelfully — Freelance",
    period: "Juil 2025 – Déc 2025",
    tasks: [
      "Développement d'une marketplace connectant porteurs de projet et talents.",
      "Stabilisation du front-end : migration Node 16, correctifs Webpack/OpenSSL.",
      "Optimisation CI/CD et ajout de tests unitaires pour fiabiliser les livraisons.",
      "Audit de sécurité applicative et durcissement des dépendances NPM.",
      "Documentation et transfert technique auprès de l'équipe produit.",
    ],
  },
  {
    title: "Audit Infrastructure & Pentest",
    company: "Advens — Stage",
    period: "Mars 2025 – Juin 2025",
    tasks: [
      "Audits techniques (systèmes / réseau / applicatif) et priorisation des risques.",
      "Tests d'intrusion web & réseau : Burp Suite, Nmap, SQLMap — méthodologie OWASP.",
      "Threat Hunting & corrélation SIEM (ELK/Kibana).",
      "Industrialisation du reporting (Bash/PowerShell) et restitution aux équipes.",
    ],
  },
  {
    title: "Développeur Web & Mobile",
    company: "Entourage — Alternance",
    period: "Oct 2022 – Oct 2023",
    tasks: [
      "Conception et sécurisation d'applications full-stack (Node.js, React) avec Security by Design.",
      "Réduction de la surface d'attaque des API : authentification robuste, gestion des secrets.",
      "Amélioration de la posture de sécurité du code (standards AppSec / OWASP).",
      "Gestion de bases de données MySQL et collaboration en méthode Agile (Jira).",
    ],
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    title: "Bac+5 — Expert en Cybersécurité",
    school: "OTERIA Cyber School",
    period: "Sep 2025 – Juil 2027",
    details:
      "Threat Intelligence, SIEM/EDR, réponse aux incidents, Red Team / Pentest, Risk Analysis.",
  },
  {
    title: "Bac+4 — Administrateur d'infrastructures sécurisées (RNCP)",
    school: "ALT-RH, Paris",
    period: "2024 – 2025",
    details:
      "Architecture Réseau, Routage/Commutation, Virtualisation (VMware/Hyper-V), Sécurité SI, Active Directory.",
  },
  {
    title: "Certification Microsoft SC-900",
    school: "Microsoft",
    period: "2025",
    details: "Fondamentaux Sécurité, Conformité et Identité (Azure/M365).",
  },
  {
    title: "Bac+3 — Développeur Web & Web Mobile",
    school: "WebForce3, Paris",
    period: "Oct 2022 – Nov 2023",
    details:
      "Full-Stack React/Node.js, sécurisation des API, OWASP Top 10, CI/CD.",
  },
  {
    title: "Bac+2 — Développeur Intégrateur Web",
    school: "OpenClassrooms",
    period: "Avr 2022 – Oct 2023",
    details: "HTML/CSS/JS, HTTP/HTTPS, manipulation des données, débogage.",
  },
  {
    title: "Certification HTML · CSS3 · SASS · JavaScript · React",
    school: "Dyma E-Learning",
    period: "Jan 2020 – Jan 2022",
    details:
      "Écosystème JavaScript complet (MERN), sécurité DOM/client, fondamentaux Cloud (AWS, Azure, GCP), Git.",
  },
  {
    title: "Master 2 — Littérature & Civilisation Anglophone",
    school: "Université Cheikh Anta Diop, Dakar",
    period: "2011 – 2015",
    details:
      "Analyse critique, recherche rigoureuse, maîtrise de l'anglais technique C1/C2.",
  },
];

export const SOFT_SKILLS = [
  "Esprit d'analyse",
  "Pédagogie technique",
  "Gestion de projet",
  "Adaptabilité",
  "Curiosité intellectuelle",
  "Communication B2B",
];

export const INTERESTS = [
  "Veille Réseau / Cloud",
  "CTF & TryHackMe",
  "Running",
  "Lecture",
  "Domotique",
];