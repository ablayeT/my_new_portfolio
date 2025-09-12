// src/data/blog/posts/web-security.ts
import type { BlogPostInput } from "../types";

export const postWebSec: BlogPostInput = {
  id: 5,
  slug: "securisation-applications-web-guide-pratique",
  title: "Sécurisation d'Applications Web : Guide Pratique",
  excerpt:
    "Entrées, sessions, en-têtes de sécurité, secrets et dépendances : des contrôles concrets à haut impact et faibles faux positifs.",
  date: "25 novembre 2024",
  isoDate: "2024-11-25",
  category: "Web Security",
  tags: ["OWASP", "XSS", "CSRF", "Headers", "Secrets"],
  featured: false,
  content: [
    {
      type: "p",
      text: "Agissez là où l’impact est maximal : validation des entrées, gestion des sessions, en-têtes de sécurité et protection des secrets.",
    },
    { type: "h2", text: "Entrées & validation" },
    {
      type: "ul",
      items: [
        "Validation côté serveur + sanitization (ne jamais faire confiance au client).",
        "Listes blanches pour formats attendus (regex strictes).",
        "Encodage côté sortie (HTML/URL/SQL params).",
      ],
    },
    { type: "h2", text: "Sessions & cookies" },
    {
      type: "ul",
      items: [
        "Cookies: SameSite=Strict/Lax, HttpOnly, Secure; rotation post-auth.",
        "Expiration courte + refresh tokens; déconnexion serveur side.",
        "Limiter le *session fixation*, surveiller anomalies (device/IP).",
      ],
    },
    { type: "h2", text: "En-têtes de sécurité (Nginx)" },
    {
      type: "code",
      lang: "nginx",
      code: `add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https:" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;`,
    },
    { type: "h2", text: "Secrets & dépendances" },
    {
      type: "ul",
      items: [
        "Vault (+ rotation), jamais en clair dans le repo.",
        "SBOM + provenance (Sigstore), SCA en CI, seuils de sévérité.",
        "Politique de mises à jour de dépendances (renovate, dependabot).",
      ],
    },
    {
      type: "callout",
      intent: "warning",
      title: "Production",
      text: "Passez en CSP stricte (pas de 'unsafe-inline') dès que possible. Logguez les violations (report-to).",
    },
  ],
};
