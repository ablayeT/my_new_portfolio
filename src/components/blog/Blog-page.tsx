"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen, Rss, Sparkles } from "lucide-react";
import { getAllPosts } from "@/data/blog/posts";

type Category = "Tous" | "Framework" | "Méthodologie" | "Développement" | "SIEM" | "Web Security" | "Detection";

const allPosts = getAllPosts();

const categories: Category[] = (() => {
  const s = new Set<Category>(["Tous"]);
  allPosts.forEach((p) => s.add(p.category as Category));
  return Array.from(s);
})();

const categoryCounts = (() => {
  const counts = Object.fromEntries(categories.map((c) => [c, 0])) as Record<Category, number>;
  counts["Tous"] = allPosts.length;
  allPosts.forEach((p) => { const c = p.category as Category; counts[c] = (counts[c] ?? 0) + 1; });
  return counts;
})();

// ── Couleur par catégorie ─────────────────────────────────────────────────
const CAT_COLOR: Record<string, { bg: string; text: string; dot: string }> = {
  "Framework":     { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400", dot: "bg-violet-500" },
  "Méthodologie":  { bg: "bg-blue-500/10",   text: "text-blue-600 dark:text-blue-400",     dot: "bg-blue-500" },
  "Développement": { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
  "SIEM":          { bg: "bg-amber-500/10",  text: "text-amber-600 dark:text-amber-400",   dot: "bg-amber-500" },
  "Web Security":  { bg: "bg-red-500/10",    text: "text-red-600 dark:text-red-400",       dot: "bg-red-500" },
  "Detection":     { bg: "bg-sky-500/10",    text: "text-sky-600 dark:text-sky-400",       dot: "bg-sky-500" },
};

function CategoryPill({ cat }: { cat: string }) {
  const s = CAT_COLOR[cat] ?? { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-border" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${s.bg} ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {cat}
    </span>
  );
}

export function BlogPage({ className = "" }: { className?: string }) {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>("Tous");

  const filteredPosts = selectedCategory === "Tous" ? allPosts : allPosts.filter((p) => p.category === selectedCategory);
  const featured = allPosts.find((p) => p.featured);
  const listPosts = selectedCategory === "Tous"
    ? filteredPosts.filter((p) => !p.featured)
    : filteredPosts;

  return (
    <div className={["space-y-12", className].join(" ")}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="h-[3px] bg-gradient-to-r from-violet-600 via-blue-500 to-emerald-500" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles size={12} className="text-violet-500" />
              {allPosts.length} articles · Cybersécurité & Technique
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Blog<span className="text-muted-foreground/40">.</span>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Notes de terrain, guides pratiques et retours d'expérience sur la cybersécurité
              offensive, défensive et le développement d'outils.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────── */}
      {selectedCategory === "Tous" && featured && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              À la une
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-black/30">
              <div className="h-[3px] bg-gradient-to-r from-violet-600 to-transparent" />
              <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <CategoryPill cat={featured.category} />
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      ★ Vedette
                    </span>
                  </div>

                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mb-5 text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {featured.excerpt}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {featured.tags.map((t) => (
                      <span key={t} className="rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <time dateTime={featured.isoDate}>{featured.date}</time>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {featured.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-primary transition-transform group-hover:translate-x-0.5">
                      Lire <ArrowRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Decoration côté droit */}
                <div className="hidden items-center justify-center border-l border-border bg-muted/20 p-8 lg:flex">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
                    <BookOpen size={36} className="text-violet-500" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white">
                      1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── Filtres ──────────────────────────────────────────── */}
      <section>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Mobile select */}
          <div className="relative sm:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category)}
              className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c} ({categoryCounts[c]})</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">▾</span>
          </div>

          {/* Desktop chips */}
          <div className="hidden flex-wrap gap-2 sm:flex">
            {categories.map((c) => {
              const active = selectedCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={[
                    "flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-all",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  ].join(" ")}
                >
                  {c}
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] ${active ? "bg-white/20" : "bg-muted"}`}>
                    {categoryCounts[c]}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="shrink-0 text-xs text-muted-foreground">
            {listPosts.length} article{listPosts.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* ── Grille articles ────────────────────────────────── */}
        {listPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listPosts.map((post, i) => (
              <ArticleCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <BookOpen size={40} className="mx-auto mb-4 text-muted-foreground/40" />
            <p className="mb-4 text-sm text-muted-foreground">Aucun article dans cette catégorie.</p>
            <Button variant="outline" size="sm" onClick={() => setSelectedCategory("Tous")}>
              Voir tous les articles
            </Button>
          </div>
        )}
      </section>

      {/* ── Newsletter ───────────────────────────────────────── */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="h-[3px] bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-600" />
        <div className="flex flex-col items-center gap-6 px-6 py-10 text-center sm:px-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-muted/30">
            <Rss size={22} className="text-emerald-500" />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Restez dans la boucle</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Nouveaux articles sur la détection, le pentest et les outils cyber — directement dans votre boîte mail.
            </p>
          </div>
          <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <Button className="rounded-xl gap-2">
              S'abonner <ArrowRight size={14} />
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground">Pas de spam · Désabonnement en 1 clic</p>
        </div>
      </section>

    </div>
  );
}

// ── Card article ──────────────────────────────────────────────────────────
function ArticleCard({ post, index }: { post: ReturnType<typeof getAllPosts>[number]; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/20">

        {/* Accent top coloré selon la catégorie */}
        <div className={`h-[3px] w-full transition-all group-hover:h-[4px] ${
          CAT_COLOR[post.category]?.dot
            ? `bg-gradient-to-r from-[${CAT_COLOR[post.category].dot}] to-transparent`
            : "bg-gradient-to-r from-violet-500 to-transparent"
        }`}
          style={{
            background: `linear-gradient(90deg, ${
              post.category === "Framework"     ? "#8b5cf6" :
              post.category === "Méthodologie"  ? "#3b82f6" :
              post.category === "Développement" ? "#10b981" :
              post.category === "SIEM"          ? "#f59e0b" :
              post.category === "Web Security"  ? "#ef4444" :
              post.category === "Detection"     ? "#0ea5e9" : "#8b5cf6"
            }, transparent)`
          }}
        />

        <div className="flex flex-1 flex-col p-5">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between gap-2">
            <CategoryPill cat={post.category} />
            <span className="shrink-0 text-[10px] font-mono text-muted-foreground/60">
              #{String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-2.5 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 flex-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {t}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground">
                +{post.tags.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                <time dateTime={post.isoDate}>{post.date}</time>
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.readTime}
              </span>
            </div>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-muted/50 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default BlogPage;