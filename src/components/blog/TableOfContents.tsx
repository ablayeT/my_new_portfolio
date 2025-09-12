// src/components/blog/TableOfContents.tsx
"use client";

import React from "react";
import type { ContentBlock } from "@/data/blog/types";
import { slugify } from "@/data/blog/utils";

export function TableOfContents({ content }: { content: ContentBlock[] }) {
  const headings = React.useMemo(
    () =>
      content
        .filter((b) => b.type === "h2" || b.type === "h3")
        .map((b) => ({
          level: b.type === "h2" ? 2 : 3,
          text: (b as Extract<ContentBlock, { type: "h2" | "h3" }>).text,
          id: slugify((b as Extract<ContentBlock, { type: "h2" | "h3" }>).text),
        })),
    [content]
  );

  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveId(id),
        { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table des matières" className="rounded-lg border p-4">
      <div className="mb-2 text-sm font-semibold text-foreground">Sommaire</div>
      <ul className="space-y-1">
        {headings.map((h, i) => (
          <li key={i} className={h.level === 3 ? "ml-3" : ""}>
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
