import type { PolicyDoc } from "./types";

export const LEGAL_DOC: PolicyDoc = {
  updatedAt: "01/10/2025",
  sections: [
    {
      id: "editeur",
      title: "Éditeur du site",
      icon: "FileText",
      body: [
        "Abdoulaye Touré — site personnel de présentation (cybersécurité, projets, CV).",
        "Statut : personne physique — usage non commercial.",
        "Contact : ablayetoure2014@gmail.com — Paris, France.",
      ],
    },
    {
      id: "directeur",
      title: "Directeur de la publication",
      icon: "Sparkles",
      body: ["Abdoulaye Touré."],
    },
    {
      id: "hebergeur",
      title: "Hébergement",
      icon: "Server",
      body: [
        "Site hébergé par Vercel. Les journaux serveur/métriques peuvent être traités pour l’exploitation et la sécurité.",
      ],
      links: [{ label: "vercel.com", href: "https://vercel.com" }],
    },
    {
      id: "propriete",
      title: "Propriété intellectuelle",
      icon: "Scale",
      body: [
        "Sauf mention contraire, les contenus (textes, visuels, code) sont protégés par le droit d’auteur.",
        "Toute reproduction ou adaptation nécessite une autorisation écrite préalable.",
      ],
    },
    {
      id: "responsabilite",
      title: "Responsabilité & disponibilité",
      icon: "Scale",
      body: [
        "Informations fournies à titre informatif sans garantie d’exhaustivité.",
        "Liens externes : l’éditeur n’est pas responsable des contenus tiers.",
      ],
    },
    {
      id: "securite",
      title: "Sécurité & bonne conduite",
      icon: "Hammer",
      body: [
        "Mesures raisonnables : TLS/HTTPS, mises à jour, journalisation limitée.",
        "Tout usage malveillant (scan non autorisé, injection, scraping abusif) est prohibé.",
      ],
    },
    {
      id: "droit",
      title: "Droit applicable",
      icon: "Scale",
      body: [
        "Droit français. Juridictions compétentes à défaut de résolution amiable.",
        "Pour les données personnelles, voir la Politique de confidentialité.",
      ],
    },
    {
      id: "credits",
      title: "Crédits & tech",
      icon: "Sparkles",
      bullets: [
        "Next.js, React, TypeScript",
        "Tailwind CSS, shadcn/ui, lucide-react",
        "Hébergement : Vercel",
      ],
    },
  ],
};
