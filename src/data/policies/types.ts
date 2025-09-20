export type PolicySection = {
  id: string;
  title: string;
  /** paragraphe(s) – chaque string = un <p> */
  body?: string[];
  /** liste à puces – chaque string = un <li> */
  bullets?: string[];
  /** lien externe éventuel (ex. hébergeur) */
  links?: { label: string; href: string }[];
  /** clé d'icône (sera résolue côté page) */
  icon:
    | "ShieldCheck"
    | "Database"
    | "FileSignature"
    | "Clock4"
    | "Mail"
    | "Globe2"
    | "Cookie"
    | "Lock"
    | "FileText"
    | "Server"
    | "Scale"
    | "Hammer"
    | "Sparkles";
};

export type PolicyDoc = {
  updatedAt: string; // JJ/MM/AAAA
  sections: PolicySection[];
};
