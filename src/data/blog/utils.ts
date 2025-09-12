// src/data/blog/utils.ts
import type { BlogPostInput, ContentBlock } from "./types";

/** Slug lisible et stable (sans accents, espaces -> tirets) */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Récupère le texte utile pour estimer la durée de lecture */
function textFromBlock(b: ContentBlock): string {
  switch (b.type) {
    case "p":
    case "h2":
    case "h3":
    case "quote":
    case "callout":
      return b.text;
    case "ul":
      return b.items.join(" ");
    case "table":
      return [...(b.head ?? []), ...b.rows.flat().map((x) => String(x))].join(
        " "
      );
    case "steps":
      return b.items
        .map((s) =>
          [s.title, s.detail ?? "", s.code ? `\n${s.code}` : ""].join(" ")
        )
        .join(" ");
    default:
      return ""; // code/img/hr : ignorés pour la lecture
  }
}

/** Estimation lecture (≈220 mots/min, min 4 min) */
export function estimateReadTime(blocks: BlogPostInput["content"]): string {
  const text = blocks.map(textFromBlock).join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(4, Math.round(words / 220));
  return `${minutes} min`;
}
