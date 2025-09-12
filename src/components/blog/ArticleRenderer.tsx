// src/components/blog/Article-renderer.tsx
"use client";

import * as React from "react";
import { Copy } from "lucide-react";
import type { ContentBlock } from "@/data/blog/types";
import { slugify } from "@/data/blog/utils";

export function ArticleRenderer({ content }: { content: ContentBlock[] }) {
  return (
    <div className="article-content space-y-5">
      {content.map((b, i) => {
        switch (b.type) {
          case "h2": {
            const id = slugify(b.text);
            return (
              <h2
                id={id}
                key={i}
                className="scroll-mt-24 text-xl font-semibold tracking-tight md:text-2xl"
              >
                {b.text}
              </h2>
            );
          }
          case "h3": {
            const id = slugify(b.text);
            return (
              <h3
                id={id}
                key={i}
                className="scroll-mt-24 text-lg font-semibold tracking-tight md:text-xl"
              >
                {b.text}
              </h3>
            );
          }
          case "p":
            return (
              <p
                key={i}
                className="text-[15px] leading-7 text-muted-foreground"
              >
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground"
              >
                {b.items.map((it, k) => (
                  <li key={k}>{it}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-border/60 pl-4 italic text-muted-foreground"
              >
                {b.text}
              </blockquote>
            );
          case "hr":
            return <hr key={i} className="my-8 border-border/60" />;
          case "img":
            return (
              <figure key={i} className="my-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.src}
                  alt={b.alt ?? ""}
                  className="mx-auto rounded-lg border"
                />
                {b.caption && (
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <div
                key={i}
                role="note"
                className={
                  "rounded-lg border p-4 text-sm " +
                  (b.intent === "warning"
                    ? "border-amber-300/40 bg-amber-50 dark:bg-amber-900/20"
                    : b.intent === "danger"
                      ? "border-red-300/40 bg-red-50 dark:bg-red-900/20"
                      : "border-blue-300/40 bg-blue-50 dark:bg-blue-900/20")
                }
              >
                <strong className="mr-2">{b.title ?? "Note"}</strong>
                <span className="text-muted-foreground">{b.text}</span>
              </div>
            );
          case "code":
            return <CodeBlock key={i} lang={b.lang} code={b.code} />;
          case "table":
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full border-collapse rounded-lg border text-sm">
                  {b.head && (
                    <thead className="bg-muted/60">
                      <tr>
                        {b.head.map((th, idx) => (
                          <th
                            key={idx}
                            className="border px-3 py-2 text-left font-medium"
                          >
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="even:bg-muted/30">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className="border px-3 py-2 align-top text-muted-foreground"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "steps":
            return (
              <ol
                key={i}
                className="list-decimal space-y-3 pl-5 text-[15px] text-muted-foreground"
              >
                {b.items.map((it, k) => (
                  <li key={k}>
                    <div className="font-medium text-foreground">
                      {it.title}
                    </div>
                    {it.detail && <div className="mt-1">{it.detail}</div>}
                    {it.code && (
                      <CodeBlock lang={it.lang ?? "bash"} code={it.code} />
                    )}
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  };
  return (
    <div className="relative">
      <pre className="code-block" data-lang={lang}>
        <code>{code}</code>
      </pre>
      <button
        type="button"
        aria-label="Copier le code"
        onClick={onCopy}
        className="copy-btn"
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">{copied ? "Copié" : "Copier"}</span>
      </button>
      {copied && <span className="copy-toast">Copié</span>}
    </div>
  );
}
