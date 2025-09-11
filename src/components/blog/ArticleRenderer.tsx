"use client";

import React from "react";
import type { ContentBlock } from "@/data/blog/posts";
import { Copy, Check, Link as LinkIcon } from "lucide-react";
import { slugify } from "@/data/blog/posts";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  async function onCopy() {
    try {
      if (navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(text);
      else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <button
      onClick={onCopy}
      className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs
                 bg-white/90 hover:bg-white text-slate-700 border-slate-200
                 dark:bg-slate-900/80 dark:hover:bg-slate-900 dark:text-slate-200 dark:border-slate-700"
      aria-label={copied ? "Code copié" : "Copier le code"}
      type="button"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {copied ? "Copié" : "Copier"}
    </button>
  );
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <div className="relative not-prose my-6">
      <div
        className="absolute right-2 top-2 z-10"
        style={{ pointerEvents: "auto" }}
      >
        <CopyButton text={code} />
      </div>
      <pre
        className="overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-relaxed"
        aria-label={lang ? `Bloc de code ${lang}` : "Bloc de code"}
        // couleurs pilotées par globals.css (variables --code-block-*)
        style={{
          backgroundColor: "var(--code-block-bg)",
          color: "var(--code-block-fg)",
          borderColor: "var(--code-block-border)",
        }}
      >
        {code}
      </pre>
    </div>
  );
}

function AnchorHeading({ level, text }: { level: 2 | 3; text: string }) {
  const id = slugify(text);
  const Tag = `h${level}` as unknown as "h2" | "h3";
  return (
    <Tag
      id={id}
      className={
        level === 2
          ? "group scroll-mt-28 text-2xl font-semibold mt-10 mb-4"
          : "group scroll-mt-28 text-xl font-semibold mt-8 mb-3"
      }
    >
      <a
        href={`#${id}`}
        className="inline-flex items-center gap-2 no-underline"
      >
        {text}
        <LinkIcon
          className="ml-1 hidden h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100"
          aria-hidden
        />
      </a>
    </Tag>
  );
}

export function ArticleRenderer({ content }: { content: ContentBlock[] }) {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      {content.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <AnchorHeading key={i} level={2} text={block.text} />;
          case "h3":
            return <AnchorHeading key={i} level={3} text={block.text} />;
          case "p":
            return (
              <p
                key={i}
                className="text-[15px] leading-7 text-muted-foreground"
              >
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="ml-5 list-disc space-y-1 text-[15px] leading-7 text-muted-foreground"
              >
                {block.items.map((it, k) => (
                  <li key={k}>{it}</li>
                ))}
              </ul>
            );
          case "code":
            return <CodeBlock key={i} code={block.code} lang={block.lang} />;
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-5 border-l-4 border-slate-300 pl-4 italic text-slate-700 dark:text-slate-300"
              >
                {block.text}
              </blockquote>
            );
          case "callout": {
            const color =
              block.intent === "danger"
                ? "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100"
                : block.intent === "warn"
                  ? "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-100"
                  : block.intent === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-100"
                    : "bg-sky-50 border-sky-200 text-sky-900 dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-100";
            return (
              <div
                key={i}
                className={`not-prose my-4 rounded-lg border p-3 text-sm ${color}`}
                role="note"
              >
                {block.text}
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </article>
  );
}
