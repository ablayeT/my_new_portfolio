import type { PolicyDoc } from "./types";

export const PRIVACY_DOC: PolicyDoc = {
  updatedAt: "01/10/2025",
  sections: [
    {
      id: "responsable",
      title: "Responsable du traitement",
      icon: "ShieldCheck",
      body: [
        "Abdoulaye Touré — éditeur du site.",
        "Contact : ablayetoure2014@gmail.com",
      ],
    },
    {
      id: "donnees",
      title: "Données collectées",
      icon: "Database",
      bullets: [
        "Formulaire de contact : nom, e-mail, sujet (facultatif), message, consentement.",
        "Journaux techniques (sécurité/diagnostic) : date, user-agent, référent, erreurs.",
        "Aucun compte utilisateur, aucune prospection, aucun profilage.",
      ],
    },
    {
      id: "finalites",
      title: "Finalités & base légale",
      icon: "FileSignature",
      bullets: [
        "Répondre à vos demandes (base légale : consentement).",
        "Sécuriser et maintenir le site (base légale : intérêt légitime).",
      ],
    },
    {
      id: "durees",
      title: "Durées de conservation",
      icon: "Clock4",
      bullets: [
        "Messages de contact : jusqu’à 12 mois après la dernière réponse.",
        "Logs techniques : durée strictement nécessaire au diagnostic.",
      ],
    },
    {
      id: "destinataires",
      title: "Destinataires & sous-traitants",
      icon: "Mail",
      body: [
        "Les données sont destinées à l’éditeur. Sous-traitants techniques :",
      ],
      bullets: [
        "Hébergeur : Vercel (exploitation et sécurité du service).",
        "Messagerie SMTP (Gmail/Outlook de l’éditeur) pour l’acheminement des e-mails.",
      ],
    },
    {
      id: "transferts",
      title: "Transferts hors UE",
      icon: "Globe2",
      body: [
        "L’hébergement et/ou l’envoi d’e-mails peuvent impliquer des prestataires hors UE (ex. États-Unis). Des garanties appropriées (CCT) s’appliquent. Transferts limités au nécessaire.",
      ],
    },
    {
      id: "securite",
      title: "Sécurité",
      icon: "Lock",
      bullets: [
        "Chiffrement en transit (HTTPS/TLS).",
        "Mises à jour régulières, journalisation limitée.",
        "Accès restreint aux boîtes de réception et au déploiement.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      icon: "Cookie",
      body: [
        "Uniquement des cookies techniques nécessaires au fonctionnement. Pas de publicité ni de profilage.",
        "Vous pouvez refuser tout cookie non essentiel via votre navigateur.",
      ],
    },
    {
      id: "droits",
      title: "Vos droits (RGPD)",
      icon: "ShieldCheck",
      body: [
        "Accès, rectification, effacement, limitation, opposition, portabilité.",
        "Pour exercer vos droits : ablayetoure2014@gmail.com. Réclamation possible auprès de la CNIL (cnil.fr).",
      ],
    },
    {
      id: "maj",
      title: "Modifications",
      icon: "FileSignature",
      body: [
        "Cette politique peut évoluer. La date de mise à jour est indiquée ci-dessous.",
      ],
    },
  ],
};
