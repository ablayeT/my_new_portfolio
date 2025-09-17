import type { ProjectDetail } from "./types";

export const phishingSimulation: ProjectDetail = {
  id: "phishing-simulation",
  title: "Plateforme de Simulation Phishing",
  short:
    "Campagnes de sensibilisation, pages d’atterrissage réalistes, tracking granularisé (ouvertures/clics), dashboards de risques et intégration SIEM.",
  tags: ["Red Team", "Awareness", "Campaigns", "Dashboards", "SIEM"],
  lastUpdated: "2025-02-20",
  kpis: [
    { label: "Taux de clic moyen", value: "8.4%", hint: "12 derniers mois" },
    { label: "Utilisateurs formés", value: 1420 },
    { label: "Campagnes / mois", value: 6 },
    { label: "Réduction YoY", value: "-36%", hint: "par rapport à N-1" },
  ],
  sections: [
    {
      type: "p",
      text: "La plateforme permet de concevoir, lancer et mesurer des campagnes de phishing de sensibilisation en production contrôlée. L’objectif : réduire le risque humain par l’entraînement contextualisé, le feedback immédiat, et un pilotage KPI fiable.",
    },

    { type: "h2", text: "Fonctionnalités clés" },
    {
      type: "ul",
      items: [
        "Templates d’emails multi-marques (+ éditeur drag & drop)",
        "Pages d’atterrissage réalistes avec jetons uniques (tracking)",
        "Liens de tracking ouverts/clics (pixel 1×1, redirections signées)",
        "Scénarios adaptatifs : relance, seconde vague, learning pages",
        "Dashboards (campagne, BU, localisation, persona) + export CSV",
        "Intégration SIEM (webhooks / syslog) + API JSON pour BI",
        "Rôles & permissions (RGPD/Privacy by design, consentements)",
      ],
    },

    { type: "h2", text: "Architecture (vue logique)" },
    {
      type: "ul",
      items: [
        "Frontend (Next.js) — génération landing + pages de formation",
        "Service Campaigns (Node) — planification, envoi, throttling",
        "Tracking (Node) — collecte événements, signatures HMAC",
        "Stockage (Postgres) — contacts, campagnes, métriques agrégées",
        "Queues (Redis) — envoi asynchrone, webhooks, agrégations",
        "Intégration SIEM — sérialisation normalisée (CEFe/JSON) + retries",
      ],
    },

    { type: "h2", text: "Exemple : Tracking d’ouverture & clic" },
    {
      type: "code",
      lang: "ts",
      code: `// Express.js — routes de tracking (extrait)
import express from "express";
import type { Request, Response } from "express";
import crypto from "crypto";

const router = express.Router();
const HMAC_SECRET = process.env.TRACKING_HMAC!;

// Vérifie l’intégrité des paramètres (anti-fraude de campagne)
function verifySignature(params: Record<string, string>): boolean {
  const payload = \`\${params.cid}:\${params.uid}:\${params.ts}\`;
  const sig = crypto.createHmac("sha256", HMAC_SECRET).update(payload).digest("hex");
  return sig === params.sig;
}

router.get("/open", async (req: Request, res: Response) => {
  const { cid, uid, ts, sig } = req.query as Record<string, string>;
  if (!cid || !uid || !ts || !sig || !verifySignature({ cid, uid, ts, sig })) {
    return res.status(400).end();
  }
  // Enqueue event: { type: 'open', cid, uid, ts }
  // ... push Redis / write to DB (idempotence par (cid, uid, ts))
  // renvoie un pixel transparent
  const img = Buffer.from(
    "R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
    "base64"
  );
  res.setHeader("Content-Type", "image/gif");
  res.setHeader("Cache-Control", "no-store");
  res.send(img);
});

router.get("/click", async (req: Request, res: Response) => {
  const { cid, uid, ts, sig, to } = req.query as Record<string, string>;
  if (!cid || !uid || !ts || !sig || !to || !verifySignature({ cid, uid, ts, sig })) {
    return res.status(400).send("Bad signature");
  }
  // Enqueue event: { type: 'click', cid, uid, ts, to }
  // ... push Redis / normalize for SIEM
  // redirection finale (landing d’entrainement)
  res.redirect(302, to);
});

export default router;`,
    },

    { type: "h2", text: "Snippet HTML d’email (macro)" },
    {
      type: "code",
      lang: "html",
      code: `<!-- Variables: {{name}}, {{cid}}, {{uid}}, {{ts}}, {{sig}}, {{landing}} -->
<p>Bonjour {{name}},</p>
<p>Une action est requise pour votre compte. Veuillez vérifier vos informations :</p>
<p>
  <a href="{{landing}}?cid={{cid}}&uid={{uid}}&ts={{ts}}&sig={{sig}}">
    Vérifier maintenant →
  </a>
</p>
<img src="https://track.example.com/open?cid={{cid}}&uid={{uid}}&ts={{ts}}&sig={{sig}}" width="1" height="1" alt="" />`,
    },

    { type: "h2", text: "Sécurité & conformité (exigences minimales)" },
    {
      type: "ul",
      items: [
        "Hachage des identifiants de campagne et rotation des secrets HMAC",
        "Limitation d’envoi (rate limit/quota) + anti-rebonds",
        "Ne jamais stocker de mots de passe : pages d’entrainement n’acceptent pas de credentials réels (placeholders uniquement)",
        "RGPD : minimisation des données, base légale (intérêt légitime/consentement), durée de rétention limitée, registre de traitement",
        "Option ‘opt-out’ + anonymisation pour la formation si requis",
      ],
    },

    { type: "h2", text: "Tableau de bord (KPI & pilotage)" },
    {
      type: "ul",
      items: [
        "Taux d’ouverture / clic / soumission par campagne, BU, persona",
        "Heatmap temporelle des clics + corrélation avec sensibilisations",
        "Suivi longitudinal par population (pré/post formation)",
        "Exports CSV et API pour BI (Power BI, Grafana, etc.)",
      ],
    },

    {
      type: "quote",
      text: "La valeur vient de l’amélioration continue : boucler campagnes → feedback → formation → re-test, avec KPIs partagés aux métiers.",
    },
  ],
};
