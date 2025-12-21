import type {
  ContactInfo,
  SkillCategory,
  Experience,
  EducationEntry,
} from "./types";

export const HEADLINE = "Ingénieur Réseau & Automatisation (Junior)";

export const CONTACT: ContactInfo = {
  location: "Paris, France",
  email: "ablayetoure2014@gmail.com",
  phone: "+33 644 93 26 27",
  github: "https://github.com/ablayeT?tab=repositories",
  linkedin: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
  tryhackme: "https://tryhackme.com/p/ablaye.toure0",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Réseaux & Systèmes",
    skills: [
      { name: "Protocoles (BGP, OSPF, STP)", level: "intermediate" },
      { name: "Architecture LAN/WAN", level: "intermediate" },
      { name: "Linux (RHEL/Debian) Admin", level: "advanced" },
      { name: "TCP/IP & Wireshark", level: "advanced" },
      { name: "Virtualisation / Docker", level: "intermediate" },
      { name: "Segmentation / VLAN / VxLAN", level: "advanced" },
    ],
  },
  {
    // CATEGORIE 2 : L'atout différenciant (NetDevOps)
    title: "Automatisation & DevOps",
    skills: [
      { name: "Python (Scripting Réseau)", level: "advanced" },
      { name: "Ansible (Configuration)", level: "intermediate" },
      { name: "PowerBI (Data Viz)", level: "advanced" }, // <--- AJOUTÉ ICI
      { name: "Bash / PowerShell", level: "advanced" },
      { name: "Git / CI/CD (Pipelines)", level: "intermediate" },
      { name: "Centreon (Supervision)", level: "intermediate" },
      { name: "ELK (Monitoring Logs)", level: "intermediate" },
    ],
  },
  {
    title: "Sécurité & Conformité",
    skills: [
      { name: "Audit de configurations", level: "intermediate" },
      { name: "Analyse de flux / Logs", level: "advanced" },
      { name: "Durcissement (Hardening)", level: "intermediate" },
      { name: "Gestion des vulnérabilités", level: "intermediate" },
      { name: "Firewalling & NAC", level: "intermediate" },
    ],
  },
  {
    title: "Langues",
    skills: [
      { name: "Anglais (Professionnel/Courant)", level: "advanced" },
      { name: "Français (Langue maternelle)", level: "expert" },
      { name: "Espagnol (Intermédiaire)", level: "intermediate" },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    title: "Développeur Full Stack / DevOps (Freelance)",
    company: "Skeelfully • Paris",
    period: "Juillet 2025 – Octobre 2025",
    tasks: [
      "Administration système et déploiement d'une marketplace sur Linux",
      "Mise en place de pipelines CI/CD pour automatiser les livraisons",
      "Scripting de maintenance et migration d'environnement (Node.js)",
    ],
  },
  {
    title: "Consultant Technique – Audit & Infra",
    company: "ADVENS • Paris",
    period: "Mars 2025 — Mai 2025",
    tasks: [
      "Cartographie d'architectures réseaux et analyse de flux",
      "Audit de configuration des équipements (Switchs/Routeurs)",
      "Mise en place de supervision (ELK) et détection d'anomalies",
      "Automatisation du reporting technique via scripting et PowerBI", // <--- Mis à jour pour refléter la compétence
      "Restitution technique auprès des équipes infrastructure",
    ],
  },
  {
    title: "Développeur Web & Intégrateur",
    company: "Entourage • Paris",
    period: "Oct 2022 — Nov 2023",
    tasks: [
      "Conception d'applications web haute disponibilité",
      "Gestion de base de données (MySQL) et optimisation",
      "Travail en méthodologie Agile (Jira) et respect des procédures",
    ],
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    title: "Certification Microsoft SC-900",
    school: "Microsoft",
    period: "2025",
    details:
      "Fondamentaux Sécurité, Conformité et Identité (Scope Azure/M365).",
  },
  {
    title: "Bac+4 : Administrateur d’infrastructures sécurisées",
    school: "ALT-RH • Paris",
    period: "Sept 2024 — Juin 2025",
    details:
      "Administration Réseau (Cisco), Virtualisation, Scripting & Sécurité.",
  },
  {
    title: "Bac+3: Développeur web & web mobile",
    school: "WebForce3 • Paris",
    period: "Oct 2022 — Nov 2023",
    details: "Alternance chez Entourage : Développement, API et CI/CD.",
  },
  {
    title: "Bac+5 : Littérature & civilisation anglophone",
    school: "UCAD • Dakar",
    period: "2011 — 2015",
    details:
      "Maîtrise complète de l'anglais (écrit/oral) en contexte académique.",
  },
];

export const SOFT_SKILLS = [
  "Rigueur",
  "Esprit d'analyse",
  "Sens du service",
  "Travail d'équipe",
  "Curiosité technique",
];
export const INTERESTS = [
  "Veille Tech (Réseau/Cloud)",
  "Automatisation",
  "Taekwondo",
  "Running",
];
