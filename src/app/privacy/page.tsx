import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCards, Toc } from "@/components/policies/SectionCards";
import { PRIVACY_DOC } from "@/data/policies/privacy";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Abdoulaye Touré",
  description:
    "Données collectées, finalités, base légale, durées, sécurité, cookies, droits (RGPD).",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="border-b bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-violet-950/30 dark:via-background dark:to-indigo-950/20">
        <div className="container flex items-center justify-between gap-2 py-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            aria-label="Retour à l'accueil"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>
          <div className="text-right">
            <h1 className="text-xl font-bold tracking-tight">
              Politique de confidentialité
            </h1>
            <p className="text-xs text-muted-foreground">Conformité RGPD</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto grid gap-8 px-4 py-8 md:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-6">
          <SectionCards doc={PRIVACY_DOC} />
          <div className="mt-2 text-xs text-muted-foreground">
            Dernière mise à jour : {PRIVACY_DOC.updatedAt}
          </div>
          <div className="flex flex-wrap gap-3 border-t pt-6">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Me contacter</Link>
            </Button>
          </div>
        </div>
        <aside className="hidden md:block">
          <Toc doc={PRIVACY_DOC} />
        </aside>
      </main>
    </>
  );
}
