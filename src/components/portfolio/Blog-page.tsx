"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { getAllPosts } from "@/data/blog/posts";

export interface BlogPageProps {
  className?: string;
}

type Category =
  | "Tous"
  | "Framework"
  | "Méthodologie"
  | "Développement"
  | "SIEM"
  | "Web Security"
  | "Detection";

const allPosts = getAllPosts();

// catégories disponibles (avec "Tous")
const categories: Category[] = ((): Category[] => {
  const s = new Set<Category>(["Tous"]);
  allPosts.forEach((p) => s.add(p.category as Category));
  return Array.from(s);
})();

// compteur d’articles par catégorie (incl. Tous)
const categoryCounts = ((): Record<Category, number> => {
  const counts = Object.fromEntries(categories.map((c) => [c, 0])) as Record<
    Category,
    number
  >;
  counts["Tous"] = allPosts.length;
  allPosts.forEach((p) => {
    const cat = p.category as Category;
    counts[cat] = (counts[cat] ?? 0) + 1;
  });
  return counts;
})();

export function BlogPage({ className = "" }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category>("Tous");

  const filteredPosts =
    selectedCategory === "Tous"
      ? allPosts
      : allPosts.filter((post) => post.category === selectedCategory);

  const featuredPosts = filteredPosts.filter((p) => p.featured === true);
  const listPosts =
    selectedCategory === "Tous"
      ? filteredPosts.filter((p) => p.featured !== true)
      : filteredPosts;

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <section className="text-center">
        <div className="mb-6">
          {/* ✅ logo violet, même teinte que la Home */}
          <BookOpen
            className="mx-auto mb-4"
            size={64}
            style={{ color: "var(--tokens-color-brand-purple,#6d28d9)" }}
            aria-hidden
          />
        </div>

        <h1 className="mb-4 text-4xl font-bold text-foreground">
          Blog Technique
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground">
          Articles techniques sur la cybersécurité, retours d’expérience et
          guides pratiques pour les professionnels de la sécurité.
        </p>
      </section>

      {/* ====== FILTRES (hybride) ======
         - Mobile (sm-)   : <select> natif (compact, accessible)
         - Desktop (md+)  : chips/boutons rapides à cliquer
      */}
      <section className="flex flex-col items-center gap-3">
        {/* Mobile: Select natif */}
        <div className="w-full max-w-md md:hidden">
          <label htmlFor="blog-category" className="sr-only">
            Filtrer par catégorie
          </label>
          <div className="relative">
            <select
              id="blog-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category)}
              className="block w-full appearance-none rounded-md border bg-background px-3 py-2 pr-9 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--tokens-color-brand-purple,#6d28d9)]"
              aria-label="Filtrer par catégorie"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c} {categoryCounts[c] ? `(${categoryCounts[c]})` : ""}
                </option>
              ))}
            </select>
            {/* chevron */}
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-muted-foreground">
              ▾
            </span>
          </div>
        </div>

        {/* Desktop: Chips */}
        <div className="hidden flex-wrap justify-center gap-2 md:flex">
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <Button
                key={category}
                variant={active ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
                <span
                  className={`ml-2 inline-flex h-5 min-w-[1.5rem] items-center justify-center rounded-full px-1 text-xs ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                  aria-hidden
                >
                  {categoryCounts[category] ?? 0}
                </span>
              </Button>
            );
          })}
        </div>
      </section>

      {/* Vedette */}
      {selectedCategory === "Tous" && featuredPosts.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-foreground">
            Article en vedette
          </h2>
          {featuredPosts.map((post) => (
            <Card key={post.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="default">{post.category}</Badge>
                      <Badge variant="outline">⭐ Vedette</Badge>
                    </div>
                    <CardTitle className="mb-2 text-xl font-semibold">
                      {post.title}
                    </CardTitle>
                    <p className="mb-4 text-base text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="inline-flex items-center gap-1">
                        <Calendar size={14} />
                        <time dateTime={post.isoDate}>{post.date}</time>
                      </div>
                      <div className="inline-flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href={`/blog/${post.slug}`}>
                    Lire l’article <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {/* Liste */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">
            {selectedCategory === "Tous"
              ? "Tous les articles"
              : `Articles : ${selectedCategory}`}
          </h2>
          <span className="text-sm text-muted-foreground">
            {listPosts.length} article{listPosts.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {listPosts.map((post) => (
            <Card
              key={post.id}
              className="flex h-full flex-col transition-shadow hover:shadow-md"
            >
              <CardHeader className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <CardTitle className="mb-2 text-base font-medium">
                  {post.title}
                </CardTitle>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>

                <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="inline-flex items-center gap-1">
                    <Calendar size={12} />
                    <time dateTime={post.isoDate}>{post.date}</time>
                  </div>
                  <div className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline">+{post.tags.length - 3}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href={`/blog/${post.slug}`}>
                    Lire l’article <ArrowRight size={14} className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Empty State */}
      {listPosts.length === 0 && (
        <div className="py-12 text-center">
          <BookOpen className="mx-auto mb-4 text-slate-500" size={48} />
          <p className="mb-4 text-base text-slate-500">
            Aucun article trouvé dans cette catégorie.
          </p>
          <Button variant="outline" onClick={() => setSelectedCategory("Tous")}>
            Voir tous les articles
          </Button>
        </div>
      )}

      {/* Newsletter */}
      <Card className="border-[color:var(--tokens-color-brand-purple,#6d28d9)]/20 bg-muted">
        <CardContent className="py-8 text-center">
          <h3 className="mb-4 text-xl font-semibold">Restez informé</h3>
          <p className="mx-auto mb-6 max-w-md text-base text-muted-foreground">
            Recevez les derniers articles techniques et guides pratiques en
            cybersécurité directement dans votre boîte mail.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 rounded-md border px-3 py-2"
              aria-label="Adresse e-mail"
            />
            <Button>S’abonner</Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Pas de spam. Désabonnement en 1 clic.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default BlogPage;
