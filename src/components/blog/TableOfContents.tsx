"use client";

import React from "react";
import type { ContentBlock } from "@/data/blog/types";
import { slugify } from "@/data/blog/utils";
import { List } from "lucide-react";

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
    <nav aria-label="Table des matières" className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <List size={14} className="text-muted-foreground" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Sommaire
        </span>
      </div>
      <ul className="space-y-0.5">
        {headings.map((h, i) => (
          <li key={i}>
            
              href={`#${h.id}`}
              className={[
                "flex items-start gap-2 rounded-lg px-2 py-1.5 text-xs transition-all",
                h.level === 3 ? "ml-3" : "",
                activeId === h.id
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
            <a>
              {h.level === 2 && (
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
              )}
              {h.level === 3 && (
                <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-current opacity-40" />
              )}
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}