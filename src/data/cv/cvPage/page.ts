import type {
  ContactInfo,
  SkillCategory,
  Experience,
  EducationEntry,
} from "./types";

export const HEADLINE = "Administrateur Systèmes,réseaux et sécurité";
// " j’automatise la détection et la réponse aux incidents (SIEM/ELK, MITRE ATT&CK) pour renforcer la cyberdéfense et réduire les temps de réaction."

export const CONTACT: ContactInfo = {
  location: "Paris, France",
  email: "ablayetoure2014@gmail.com",
  phone: "+33 644 93 26 27",
  github: "https://github.com/ablayeT?tab=repositories",
  linkedin: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
  tryhackme: "https://tryhackme.com/p/ablaye.toure0",
  entourage:
    "https://www.entourage-pro.fr/cv/abdoulaye-2e32086a?hideShareOptions=false",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Sécurité informatique",
    skills: [
      { name: "Contrôle d’accès (AuthN/Z)", level: "advanced" },
      { name: "Chiffrement", level: "advanced" },
      { name: "Validation/Nettoyage des entrées", level: "advanced" },
      { name: "Gestion vulnérabilités", level: "advanced" },
      { name: "Audit & Pentest (XSS, SQLi)", level: "expert" },
      { name: "Analyse logs / IOC", level: "advanced" },
    ],
  },
  {
    title: "Outils & Plateformes",
    skills: [
      { name: "Linux / Bash (admin)", level: "expert" },
      { name: "Kali Linux", level: "expert" },
      { name: "ELK (Filebeat, Logstash, Kibana)", level: "advanced" },
      { name: "Nmap, Gobuster", level: "expert" },
      { name: "Wireshark, Nessus", level: "advanced" },
      { name: "MySQL", level: "advanced" },
    ],
  },
  {
    title: "Langages & Frameworks",
    skills: [
      { name: "JavaScript / Node.js", level: "expert" },
      { name: "React", level: "expert" },
      { name: "Python", level: "expert" },
      { name: "PHP", level: "advanced" },
      { name: "Material UI", level: "advanced" },
    ],
  },
  {
    title: "Langues",
    skills: [
      { name: "Français (courant)", level: "expert" },
      { name: "Anglais (courant)", level: "expert" },
      { name: "Espagnol (intermédiaire)", level: "advanced" },
      { name: "Wolof (courant)", level: "expert" },
      { name: "Malinké (courant)", level: "expert" },
      { name: "Bambara (courant)", level: "expert" },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    title: "Développeur Full Stack Freelance",
    company: "Skeelfully • Paris",
    period: "Juillet 2025 – Octobre 2025",
    tasks: [
      "Développement d’une marketplace connectant porteurs de projet et talents",
      "Migration vers Node 16 et correctifs de compatibilité Webpack.",
      "Optimisation CI/CD et durcissement des dépendances NPM.",
    ],
  },
  {
    title: "Stage : Audit & Pentest",
    company: "ADVENS • Paris",
    period: "Mars 2025 — Mai 2025",
    tasks: [
      "Audits techniques (systèmes, réseaux, applications)",
      "Pentest (XSS, SQLi, brute force) — Burp, Nmap, SQLMap",
      "Détection/analyses via ELK (Filebeat, Logstash, Kibana)",
      "Automatisation (Bash / PowerShell) & rapports",
      "Collaboration avec équipes techniques",
    ],
  },
  {
    title: "Développeur Web & Web Mobile",
    company: "Entourage • Paris",
    period: "Oct 2022 — Nov 2023",
    tasks: [
      "Évolutions de plateformes web (front/back)",
      "Architecture & choix techniques",
      "Qualité (tests) & recettes fonctionnelles/techniques",
    ],
  },
  // {
  //   title: "Professeur d’anglais",
  //   company: "BEC • Dakar, Sénégal",
  //   period: "Sept 2017 — Nov 2019",
  //   tasks: [
  //     "Création de cours et animation de classes",
  //     "Suivi individualisé & évaluations régulières",
  //   ],
  // },
  // {
  //   title: "Fondateur & gérant",
  //   company: "Toure Multi-Services • Sénégal",
  //   period: "2017 — 2019",
  //   tasks: [
  //     "Gestion d’équipe (2 commerciaux, 1 technicien)",
  //     "Coordination commerciale/technique et suivi clients",
  //   ],
  // },
];

export const EDUCATION: EducationEntry[] = [
  {
    title: "Bac+4 : Administration d’infrastructures sécurisées",
    school: "ALT-RH • Paris",
    period: "Sept 2024 — Juin 2025",
    details: "Systèmes, réseaux, sécurité des infrastructures.",
  },
  {
    title: "Bac+2: Développeur intégrateur web",
    school: "WebForce3 • Paris",
    period: "Avr 2022 — Oct 2022",
    details: "Front-end & back-end, intégration, bonnes pratiques.",
  },
  {
    title: "Bac+3: Développeur web & web mobile (alternance)",
    school: "WebForce3 • Paris",
    period: "Oct 2022 — Nov 2023",
    details:
      "Alternance (Entourage) : développement full-stack, architecture, tests.",
  },
  {
    title:
      "Bac+5 : Littérature & civilisation anglophone (américaine & caribéenne)",
    school: "UCAD • Dakar, Sénégal",
    period: "Oct 2011 — Juil 2015",
  },
];

export const SOFT_SKILLS = ["Rigoureux", "Curieux", "Organisé", "Discret"];
export const INTERESTS = ["Lecture", "Taekwondo", "Baseball", "Course à pied"];
