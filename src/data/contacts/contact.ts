import type { Metadata } from "next";

/** Clés d'icônes utilisées côté composant */
export type IconKey = "Mail" | "LinkedIn" | "GitHub" | "MapPin";

/** Métadonnées de la page Contact (réutilisable par app/contact) */
export const contactMetadata: Metadata = {
  title: "Contact - Abdoulaye Touré",
  description:
    "Contactez Abdoulaye Touré pour des opportunités d'alternance en cybersécurité, missions de conseil ou collaborations. Basé à Paris, France.",
  keywords: [
    "contact",
    "alternance",
    "cybersécurité",
    "paris",
    "consultation",
    "collaboration",
    "expert sécurité",
  ],
};

/** Copys / textes statiques */
export const CONTACT_COPY = {
  heading: "Contact",
  subtitle:
    "Vous avez une question, un projet ou souhaitez collaborer ? Écrivez-moi, je réponds rapidement.",
  location: {
    city: "Paris, France",
    note: "Disponible en remote ou sur site (IDF)",
  },
  availability: "✅ Actuellement disponible pour de nouvelles opportunités",
  consent:
    "J'accepte que mes données personnelles soient utilisées pour me recontacter dans le cadre de cette demande. Elles ne seront pas partagées ni utilisées à d'autres fins. *",
};

/** Coordonnées / liens (data only, pas de composants React ici) */
export type ContactItemData = {
  icon: IconKey;
  title: string;
  value: string;
  href: string;
  toneBg: string;
  tone: string;
};

export const CONTACT_ITEMS: readonly ContactItemData[] = [
  {
    icon: "Mail",
    title: "Email",
    value: "ablayetoure2014@gmail.com",
    href: "mailto:ablayetoure2014@gmail.com",
    toneBg: "bg-[#6d28d9]/15",
    tone: "text-[#6d28d9]",
  },
  {
    icon: "LinkedIn",
    title: "LinkedIn",
    value: "/in/abdoulaye-toure",
    href: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
    toneBg: "bg-[#0ea5e9]/15",
    tone: "text-[#0ea5e9]",
  },
  {
    icon: "GitHub",
    title: "GitHub",
    value: "/abdoulaye-toure",
    href: "https://github.com/ablayeT?tab=repositories",
    toneBg: "bg-[#6b7280]/15",
    tone: "text-[#6b7280]",
  },
] as const;

/** Placeholders / labels (optionnel, pour uniformiser) */
export const CONTACT_FORM_TEXT = {
  nameLabel: "Nom complet *",
  namePlaceholder: "Votre nom et prénom",
  emailLabel: "Email *",
  emailPlaceholder: "vous@exemple.com",
  subjectLabel: "Sujet",
  subjectPlaceholder: "Objet de votre message",
  messageLabel: "Message *",
  messagePlaceholder: "Décrivez votre projet, question ou demande…",
  submit: "Envoyer le message",
  sending: "Envoi en cours…",
};

/** Messages d'erreur (centralisés) */
export const CONTACT_ERRORS = {
  nameReq: "Le nom est requis",
  emailReq: "L'email est requis",
  emailFmt: "Format d'email invalide",
  msgReq: "Le message est requis",
  msgLen: "Le message doit contenir au moins 10 caractères",
  consentReq: "Vous devez accepter le traitement de vos données",
};
