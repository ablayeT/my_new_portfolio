"use client";

import * as React from "react";
import { Siren, Lock, ClipboardList, Copy } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TABS,
  SNIPPETS,
  METRICS_JSON,
  QUICK_WINS,
  type IRTabCard,
  type IRTabKey,
} from "@/data/projects/incidentData/incidentResponse";

const IconMap = { Siren, Lock, ClipboardList } as const;

function CodeBlock({ title, code }: { title: string; code: string }) {
  const onCopy = (text: string) =>
    navigator.clipboard.writeText(text).catch(() => {});
  return (
    <Card className="group">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
                onClick={() => onCopy(code)}
                aria-label={`Copier ${title}`}
              >
                <Copy className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Copier</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="-mx-3 sm:mx-0 overflow-x-auto overscroll-x-contain no-scrollbar">
          <pre className="inline-block w-max min-w-full max-w-none rounded-lg bg-zinc-900 p-3 text-[11px] sm:text-xs leading-5">
            <code className="block whitespace-pre text-zinc-100">{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

export function IRTabs() {
  const [tab, setTab] = React.useState<IRTabKey>("overview");

  const renderCards = (cards: IRTabCard[]) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((c: IRTabCard, i: number) => {
        const Icon = c.icon ? IconMap[c.icon] : null;
        return (
          <Card key={i}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base inline-flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                {c.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <ul className="list-disc ml-5 space-y-1">
                {c.bullets.map((b: string, j: number) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <section className="mx-auto w-full lg:max-w-7xl px-3 sm:px-6 lg:px-8 pb-10">
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as IRTabKey)}
        className="w-full space-y-4"
      >
        {/* Select mobile */}
        <div className="sm:hidden">
          <label htmlFor="ir-tab" className="mb-2 block text-sm font-medium">
            Section
          </label>
          <div className="relative">
            <select
              id="ir-tab"
              value={tab}
              onChange={(e) => setTab(e.target.value as IRTabKey)}
              className="block w-full appearance-none rounded-md border bg-background px-3 py-2 pr-10 text-sm shadow-sm"
            >
              <option value="overview">Overview</option>
              <option value="playbooks">Playbooks</option>
              <option value="automation">Automation</option>
              <option value="templates">Modèles</option>
              <option value="metrics">Métriques</option>
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.207l3.71-3.975a.75.75 0 011.08 1.04l-4.24 4.54a.75.75 0 01-1.08 0l-4.24-4.54a.75.75 0 01.02-1.06z" />
            </svg>
          </div>
        </div>

        {/* Tabs desktop */}
        <TabsList className="hidden sm:flex w-full items-center gap-2 overflow-x-auto rounded-lg border bg-muted/50 p-1">
          {[
            { value: "overview", label: "Overview" },
            { value: "playbooks", label: "Playbooks" },
            { value: "automation", label: "Automation" },
            { value: "templates", label: "Modèles" },
            { value: "metrics", label: "Métriques" },
          ].map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value as IRTabKey}
              className="shrink-0 inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium shadow-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-2">
          {renderCards(TABS.overview)}
        </TabsContent>

        <TabsContent value="playbooks" className="mt-2">
          {renderCards(TABS.playbooks)}
        </TabsContent>

        <TabsContent value="automation" className="mt-2">
          <div className="grid gap-4 md:grid-cols-2">
            {SNIPPETS.slice(1, 3).map((s, i: number) => (
              <CodeBlock key={i} title={s.title} code={s.code} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-2">
          <div className="grid gap-4 md:grid-cols-2">
            {[SNIPPETS[0], SNIPPETS[3]].map((s, i: number) => (
              <CodeBlock key={i} title={s.title} code={s.code} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="mt-2">
          <div className="grid gap-4 md:grid-cols-2">
            <CodeBlock title="Scorecard (exemple JSON)" code={METRICS_JSON} />
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  Quick wins (terrain)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc ml-5 space-y-1">
                  {QUICK_WINS.map((w: string) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
