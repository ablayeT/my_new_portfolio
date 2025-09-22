"use client";

import Link from "next/link";
import { GitBranch, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MARKET_TRENDS, RESULTS } from "@/data/projects/siemData/siem";

export function MarketImpact({ repoUrl = "#" }: { repoUrl?: string }) {
  return (
    <section className="mx-auto w-full max-w-none lg:max-w-7xl px-3 sm:px-6 lg:px-8 pb-16">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Tendances marché & évolutivité
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <ul className="list-disc ml-5 space-y-1">
              {MARKET_TRENDS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Résultats & portée</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <ul className="list-disc ml-5 space-y-1">
              {RESULTS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
        <Button asChild className="w-full sm:w-auto">
          <Link href={repoUrl} target={repoUrl === "#" ? undefined : "_blank"}>
            <GitBranch className="mr-2 h-4 w-4" /> Ouvrir sur GitHub
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/projects">
            <ExternalLink className="mr-2 h-4 w-4" /> Voir tous les projets
          </Link>
        </Button>
      </div>
    </section>
  );
}
