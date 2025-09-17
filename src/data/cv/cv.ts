// src/data/cv/cv.ts

export const CV_ASSET = {
  // Place le PDF dans /public/cv/ et ajuste ci-dessous si besoin
  href: "/cv/CV_CyberSecu_Abdou_Sept_2025.pdf",
  filename: "CV_Abdoulaye_Toure_Cybersecurity.pdf",
  updatedAt: "Septembre 2025",
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
