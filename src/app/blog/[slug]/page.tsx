import "@/polyfills/url-canparse";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArticleRenderer } from "@/components/blog/ArticleRenderer";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { getAllPosts, getPostBySlug, getPrevNext } from "@/data/blog/posts";

export const runtime = "nodejs";
type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getPrevNext(post.slug);

  return (
    <>
      <ReadingProgress />

      {/* ── Breadcrumb sticky ──────────────────────────────── */}
      <div className="sticky top-14 z-30 border-b bg-background/90 backdrop-blur">
        <div className="container flex h-12 items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="gap-2 text-xs">
            <Link href="/blog">
              <ArrowLeft size={13} /> Tous les articles
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Calendar size={11} />
            <time dateTime={post.isoDate}>{post.date}</time>
            <span>·</span>
            <Clock size={11} />
            {post.readTime}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_260px]">

          {/* ── Article ──────────────────────────────────────── */}
          <article className="min-w-0">

            {/* Header article */}
            <header className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-full text-[11px]">
                  {post.category}
                </Badge>
                {post.tags.slice(0, 3).map((t) => (
                  <span key={t} className="flex items-center gap-1 rounded-full border border-border bg-muted/30 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    <Tag size={9} /> {t}
                  </span>
                ))}
              </div>

              <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                {post.title}
              </h1>

              <p className="mb-6 text-base text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>

              {/* Séparateur */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
                  Article
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
            </header>

            {/* Corps */}
            <div className="prose-custom">
              <ArticleRenderer content={post.content} />
            </div>

            {/* ── Navigation prev/next ──────────────────────── */}
            <div className="mt-12 border-t border-border pt-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {prev && (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      ← Précédent
                    </span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-2">
                      {prev.title}
                    </span>
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 text-right transition-all hover:-translate-y-0.5 hover:shadow-sm sm:col-start-2"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Suivant →
                    </span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-2">
                      {next.title}
                    </span>
                  </Link>
                )}
              </div>

              <div className="mt-4 text-center">
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link href="/blog">
                    <ArrowLeft size={13} /> Retour aux articles
                  </Link>
                </Button>
              </div>
            </div>
          </article>

          {/* ── Sidebar ──────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <TableOfContents content={post.content} />

              {/* Mini profil */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-9 w-9 overflow-hidden rounded-xl border border-border">
                    <img src="/cv/photo.jpeg" alt="Abdoulaye" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Abdoulaye Touré</p>
                    <p className="text-[10px] text-muted-foreground">Analyste SecOps</p>
                  </div>
                </div>
                <p className="mb-3 text-[11px] text-muted-foreground leading-relaxed">
                  Passionné de cybersécurité offensive et défensive, je partage mes expériences terrain et outils.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full text-xs gap-1.5">
                  <Link href="/contact">Me contacter</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}