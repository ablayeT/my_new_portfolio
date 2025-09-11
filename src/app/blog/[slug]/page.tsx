// import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPrevNext } from "@/data/blog/posts";
import { ArticleRenderer } from "@/components/blog/ArticleRenderer";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen, ArrowLeft } from "lucide-react";
import { ShareButton } from "@/components/blog/ShareButton"; // ⬅️ NEW

// type PageProps = { params: { slug: string } };
export default function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const { prev, next } = getPrevNext(post.slug);

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />

      <main className="container py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>

          {/* ⬇️ Remplace le <button onClick=...> par ceci */}
          <ShareButton />
        </div>

        {/* Hero */}
        <header className="mb-8">
          <div className="mb-4">
            {post.heroIcon === "book" && (
              <BookOpen
                size={56}
                className="text-[color:var(--tokens-color-brand-purple,#6d28d9)]"
                aria-hidden
              />
            )}
          </div>

          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.isoDate}>{post.date}</time>
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <Badge variant="secondary">{post.category}</Badge>
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 4).map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </header>

        {/* Layout: article + TOC */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px]">
          <div>
            <ArticleRenderer content={post.content} />
          </div>

          <aside className="top-24 hidden md:sticky md:block">
            <TableOfContents content={post.content} />
          </aside>
        </div>

        {/* Prev / Next */}
        <nav className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="block rounded-lg border p-4 hover:bg-muted"
              >
                <div className="text-xs text-muted-foreground">
                  Article précédent
                </div>
                <div className="mt-1 font-medium text-foreground">
                  {prev.title}
                </div>
              </Link>
            )}
          </div>
          <div className="md:text-right">
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="block rounded-lg border p-4 hover:bg-muted"
              >
                <div className="text-xs text-muted-foreground">
                  Article suivant
                </div>
                <div className="mt-1 font-medium text-foreground">
                  {next.title}
                </div>
              </Link>
            )}
          </div>
        </nav>
      </main>
    </div>
  );
}
