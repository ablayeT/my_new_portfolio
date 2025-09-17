export type ProjectSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "quote"; text: string };

export type ProjectDetail = {
  id: string; // doit correspondre au project.id de ta grille (ex: "phishing-simulation")
  title: string;
  short: string; // courte description/meta
  tags: string[];
  lastUpdated?: string; // ISO
  kpis?: { label: string; value: string | number; hint?: string }[];
  sections: ProjectSection[];
};
