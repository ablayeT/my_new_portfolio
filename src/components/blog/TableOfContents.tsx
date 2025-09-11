"use client";

import React from "react";
import type { ContentBlock } from "@/data/blog/posts";
import { slugify } from "@/data/blog/posts";

type HeadingLevel = 2 | 3;
type Heading = { level: HeadingLevel; text: string; id: string };

// Type guard pour filtrer les blocs titres sans `any`
function isHeading(
  b: ContentBlock
): b is Extract<ContentBlock, { type: "h2" | "h3" }> {
  return b.type === "h2" || b.type === "h3";
}

export function TableOfContents({ content }: { content: ContentBlock[] }) {
  // On dérive la liste des headings une seule fois (mémoïsée)
  const headings: Heading[] = React.useMemo(() => {
    return content.filter(isHeading).map<Heading>((b) => ({
      level: b.type === "h2" ? 2 : 3,
      text: b.text,
      id: slugify(b.text),
    }));
  }, [content]);

  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (headings.length === 0) return;

    // Fallback “actif” = premier titre si besoin
    setActiveId((prev) => prev ?? headings[0]?.id ?? null);

    // Evite les erreurs SSR / anciens navigateurs
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const observers: IntersectionObserver[] = [];

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(h.id);
        },
        {
          // déclenche quand le titre approche ~30% du viewport
          rootMargin: "0px 0px -70% 0px",
          threshold: [0, 1],
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [headings]); // ✅ dépend de `headings` (et plus de `content`)

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table des matières" className="rounded-lg border p-4">
      <div className="mb-2 text-sm font-semibold text-foreground">Sommaire</div>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ml-3" : ""}>
            <a
              href={`#${h.id}`}
              className={`block rounded px-2 py-1 text-sm transition ${
                activeId === h.id
                  ? "bg-[color:var(--tokens-color-brand-purple,#6d28d9)]/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
