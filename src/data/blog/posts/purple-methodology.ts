// src/data/blog/posts/purple-methodology.ts
import type { BlogPostInput } from "../types";

export const postPurple: BlogPostInput = {
  id: 2,
  slug: "purple-team-methodologie-bonnes-pratiques",
  title: "Purple Team : Méthodologie et Bonnes Pratiques",
  excerpt:
    "Mettre en place une approche Purple Team efficace : objectifs, gouvernance, scénarios prioritaires, métriques et boucles d’amélioration continue.",
  date: "10 décembre 2024",
  isoDate: "2024-12-10",
  category: "Méthodologie",
  tags: ["Purple Team", "Red Team", "Blue Team", "Gouvernance", "KPIs"],
  featured: false,
  content: [
    {
      type: "p",
      text: "La méthodologie Purple Team combine les forces offensives (Red Team) et défensives (Blue Team) au sein d’un cadre collaboratif et mesurable. Objectif : accélérer l’amélioration de la détection et de la réponse en production, pas seulement au laboratoire.",
    },
    { type: "h2", text: "Qu’est-ce qu’une Purple Team ?" },
    {
      type: "p",
      text: "Plutôt qu’une équipe séparée, c’est une pratique qui synchronise activités d’attaque et d’observation en temps réel, facilite l’apprentissage croisé, et aligne les objectifs sur des résultats vérifiables (MTTD/MTTR, baisse des faux positifs, couverture ATT&CK…).",
    },
    {
      type: "table",
      head: ["Aspect", "Red/Blue classique", "Purple Team"],
      rows: [
        ["Communication", "Souvent limitée", "Transparente et continue"],
        ["Objectif", "Faire tomber / Résister", "Amélioration collective"],
        ["Feedback", "Post-exercice", "Temps réel + post-exercice"],
        ["Rythme", "Campagnes ponctuelles", "Itératif et continu"],
      ],
    },
    { type: "h2", text: "Objectifs & KPIs" },
    {
      type: "ul",
      items: [
        "Réduire le MTTD/MTTR et augmenter la précision des alertes",
        "Mesurer la couverture de détection par Tactiques/Techniques ATT&CK",
        "Capitaliser via playbooks et règles versionnées (Git)",
        "Acculturer SOC/Ingénierie/Infra aux TTP contemporaines",
      ],
    },
    {
      type: "callout",
      intent: "info",
      text: "Fixez des objectifs quantifiés à 90 jours (OKR), visualisez la progression, et publiez un changelog sécurité après chaque itération.",
    },
    { type: "h2", text: "Gouvernance pragmatique" },
    {
      type: "ul",
      items: [
        "Comité Purple Team (mensuel) : priorités, arbitrage, budget/risque",
        "Cérémonies agiles : planning toutes les 2–4 semaines, démo, rétro",
        "Rôles : PT Lead, Red lead, Blue lead, observateurs métier/IT",
      ],
    },
    { type: "h2", text: "Cadre PTES-Purple (adapté)" },
    {
      type: "steps",
      items: [
        {
          title: "Pré-engagement",
          detail:
            "Périmètre technique/organisationnel, objectifs mesurables, contraintes légales/production.",
        },
        {
          title: "Reconnaissance collaborative",
          detail:
            "OSINT partagé, notifications de scans, monitoring en parallèle par la Blue Team.",
        },
        {
          title: "Exploitation guidée",
          detail:
            "Approche par paliers (basique → avancé → expert) avec pauses pédagogiques et adaptation aux détections.",
        },
        {
          title: "Post-exploitation éducative",
          detail:
            "Persistance contrôlée, latéralité guidée, focus sur les artefacts et signaux exploitables par le SOC.",
        },
        {
          title: "Débriefing & amélioration",
          detail:
            "Rapport chronologique, résultats ATT&CK, KPIs, quick wins + roadmap (30/60/90j).",
        },
      ],
    },
    { type: "h3", text: "Exemple de scénario priorisé (phishing→latéralité)" },
    {
      type: "ul",
      items: [
        "Préparation : mails spear-phishing co-construits, règles de détection mails (SPF/DKIM/DMARC + heuristiques)",
        "Exécution : tracking des clics/téléchargements/exécutions, corrélation EDR + proxy + DNS",
        "Latéralité : détections SMB/RDP, Kerberoasting, services distants, AD artefacts (BloodHound)",
        "Rétro/action : nouvelles règles SIEM, durcissement GPO, runbooks SOC mis à jour",
      ],
    },
    { type: "h2", text: "Mesure & pilotage" },
    {
      type: "ul",
      items: [
        "MTTD/MTTR/MTTC par kill chain",
        "Précision des alertes (vrais/faux positifs) et coût analyste",
        "Couverture ATT&CK (Navigator) par technique → règles/telemetry",
        "Scorecards Purple : progression par sprint (détections, playbooks, corrections)",
      ],
    },
    { type: "h3", text: "Scorecard (exemple JSON stocké en Git)" },
    {
      type: "code",
      lang: "json",
      code: `{
  "sprint": "2024-12",
  "objectifs": ["Réduire MTTD phishing", "Couvrir T1021.002 SMB"],
  "kpi": { "MTTD": "3.1m", "MTTR": "7.6m", "precision_alertes": "92%" },
  "livrables": ["Règle KQL latéralité", "Playbook SOAR confinement"],
  "actions": ["Durcir GPO", "Blocage macros", "Sensibilisation ciblée"]
}`,
    },
    { type: "h2", text: "Pièges fréquents & remèdes" },
    {
      type: "ul",
      items: [
        "Sur-focalisation « red show » : basculer vers objectifs détectables/mesurables",
        "Documents sans exécution : imposer des jalons démontrables",
        "Silotage IT/Sécurité : intégrer un représentant infra au comité",
      ],
    },
    { type: "hr" },
    {
      type: "callout",
      intent: "info",
      title: "À retenir",
      text: "La valeur d’une Purple Team se mesure à la vitesse d’amélioration mesurable en production (détection, réponse, durcissement).",
    },
  ],
};
