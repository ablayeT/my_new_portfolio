"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { CODE_SNIPPETS } from "@/data/projects/siemData/siem";

export function CodeSnippets() {
  const onCopy = (text: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard?.writeText(text).catch(() => {});
    }
  };

  return (
    <section className="mx-auto w-full max-w-none lg:max-w-7xl px-3 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold tracking-tight">
        Extraits de configuration
      </h2>
      <p className="text-muted-foreground mt-2 mb-6">
        Copies rapides pour reproduire l&apos;environnement local (adapter hôtes
        & certificats).
      </p>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
        {CODE_SNIPPETS.map((snip) => (
          <Card key={snip.title} className="group">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">{snip.title}</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCopy(snip.code)}
                    aria-label={`Copier ${snip.title}`}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copier</TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="-mx-3 sm:mx-0 overflow-x-auto overscroll-x-contain no-scrollbar">
                <pre className="inline-block w-max min-w-full max-w-none rounded-lg bg-zinc-900 p-3 text-[11px] sm:text-xs leading-5">
                  <code className="block whitespace-pre text-zinc-100">
                    {snip.code}
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
