// src/app/blog/[slug]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAllPosts, getPostBySlug, getPrevNext } from "@/data/blog/posts";
import { ArticleRenderer } from "@/components/blog/ArticleRenderer";
import { TableOfContents } from "@/components/blog/TableOfContents";

type Params = { slug: string };

export async function generateStaticParams() {
  // si tu build en statique
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Blog`,
    description: post.excerpt,
  };
}

export default function BlogArticlePage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    // tu peux aussi throw notFound()
    return (
      <div className="container py-10">
        <div className="mb-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux articles
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground">Article introuvable.</p>
      </div>
    );
  }

  const { prev, next } = getPrevNext(post.slug);

  return (
    <>
      {/* Barre sticky avec le bouton "Retour aux articles" */}
      <div className="sticky top-14 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            aria-label="Retour à la liste des articles"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux articles
            </Link>
          </Button>
        </div>
      </div>

      <main className="container mx-auto grid gap-8 px-4 py-8 md:grid-cols-[1fr_280px]">
        {/* Colonne article */}
        <article className="min-w-0">
          <header className="mb-6">
            <h1 className="mb-3 text-3xl font-bold tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={post.isoDate}>{post.date}</time>
              <span aria-hidden>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <ArticleRenderer content={post.content} />

          {/* Navigation bas de page */}
          <div className="mt-10 flex flex-col items-stretch gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Button asChild variant="outline">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux articles
              </Link>
            </Button>

            <div className="flex gap-2">
              {prev && (
                <Button asChild variant="ghost">
                  <Link href={`/blog/${prev.slug}`}>← {prev.title}</Link>
                </Button>
              )}
              {next && (
                <Button asChild variant="ghost">
                  <Link href={`/blog/${next.slug}`}>{next.title} →</Link>
                </Button>
              )}
            </div>
          </div>
        </article>

        {/* Colonne sommaire */}
        <aside className="hidden md:block">
          <TableOfContents content={post.content} />
        </aside>
      </main>
    </>
  );
}
