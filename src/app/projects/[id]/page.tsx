import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { Button } from "@/components/comp/Button";
import { Card } from "@/components/comp/Card";
import { Badge } from "@/components/comp/Badge";

import { getAllProjectIds, getProjectById } from "@/data/projects";
import type { ProjectSection } from "@/data/projects/types";

// (facultatif) forcer runtime Node si tu utilises des libs Node côté server
export const runtime = "nodejs";

type Params = { id: string };

export function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const proj = getProjectById(params.id);
  if (!proj) return {};
  return {
    title: `${proj.title} — Projets`,
    description: proj.short,
    alternates: { canonical: `/projects/${proj.id}` },
    openGraph: { title: proj.title, description: proj.short, type: "article" },
  };
}

export default function ProjectDetailPage({ params }: { params: Params }) {
  const proj = getProjectById(params.id);
  if (!proj) notFound();

  return (
    <>
      {/* Barre sticky pour retour */}
      <div className="sticky top-14 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-2">
          <Button
            asChild
            intent="ghost"
            size="sm"
            aria-label="Retour aux projets"
          >
            <Link href="/projects">
              <ArrowLeft size={16} className="mr-2" />
              Retour aux projets
            </Link>
          </Button>
        </div>
      </div>

      <main className="container mx-auto grid gap-8 px-4 py-8 md:grid-cols-[1fr_300px]">
        {/* Colonne contenu */}
        <article className="min-w-0 space-y-6">
          <header className="space-y-3">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {proj.title}
            </h1>
            <p className="text-[15px] leading-7 text-muted-foreground">
              {proj.short}
            </p>
            <div className="flex flex-wrap gap-2">
              {proj.tags.map((t) => (
                <Badge key={t} intent="secondary" size="sm">
                  {t}
                </Badge>
              ))}
            </div>
            {proj.lastUpdated && (
              <div className="text-xs text-muted-foreground">
                Dernière mise à jour :{" "}
                <time dateTime={proj.lastUpdated}>
                  {new Date(proj.lastUpdated).toLocaleDateString("fr-FR")}
                </time>
              </div>
            )}
          </header>

          {/* KPIs */}
          {proj.kpis?.length ? (
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {proj.kpis.map((k) => (
                <Card key={k.label} className="p-4">
                  <div className="text-xs text-muted-foreground">{k.label}</div>
                  <div className="text-xl font-semibold">{k.value}</div>
                  {k.hint && (
                    <div className="text-xs text-muted-foreground">
                      {k.hint}
                    </div>
                  )}
                </Card>
              ))}
            </section>
          ) : null}

          {/* Corps */}
          <section className="space-y-5">
            {proj.sections.map((b, i) => {
              switch (b.type) {
                case "h2":
                  return (
                    <h2
                      key={i}
                      className="scroll-mt-24 text-xl font-semibold tracking-tight md:text-2xl"
                    >
                      {b.text}
                    </h2>
                  );
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
                        <li key={k} className="flex items-start gap-2">
                          <Check size={16} className="mt-0.5 text-foreground" />
                          <span>{it}</span>
                        </li>
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
                case "code":
                  return (
                    <div key={i} className="relative">
                      <pre className="code-block" data-lang={b.lang}>
                        <code>{b.code}</code>
                      </pre>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </section>

          {/* CTA bas de page */}
          <div className="mt-8 border-t pt-6">
            <Button asChild intent="secondary">
              <Link href="/projects">
                <ArrowLeft size={16} className="mr-2" />
                Retour aux projets
              </Link>
            </Button>
          </div>
        </article>

        {/* Colonne droite : résumé rapide */}
        <aside className="hidden md:block space-y-4">
          <Card className="p-4">
            <div className="text-sm font-semibold mb-2">Résumé</div>
            <p className="text-sm text-muted-foreground">
              Conception de campagnes, tracking sécurisé, KPI actionnables et
              intégration SIEM pour piloter la réduction du risque humain.
            </p>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-semibold mb-2">Tech</div>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Next.js (App Router)</li>
              <li>Node/Express (tracking)</li>
              <li>Postgres + Redis</li>
              <li>API + Webhooks SIEM</li>
            </ul>
          </Card>
        </aside>
      </main>
    </>
  );
}
