"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { TABS, type TabKey } from "@/data/projects/siemData/siem";
import { CheckCircle2, Lock, Gauge, Globe, Siren } from "lucide-react";

const IconMap = { CheckCircle2, Lock, Gauge, Globe, Siren } as const;

export function TabsPanel() {
  const [tab, setTab] = React.useState<TabKey>("windows");

  return (
    <section className="mx-auto w-full max-w-none lg:max-w-7xl px-3 sm:px-6 lg:px-8 pb-6">
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as TabKey)}
        className="w-full space-y-4"
      >
        {/* Mobile select */}
        <div className="sm:hidden">
          <label
            htmlFor="tabSelect"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Section
          </label>
          <div className="relative">
            <select
              id="tabSelect"
              value={tab}
              onChange={(e) => setTab(e.target.value as TabKey)}
              className="block w-full appearance-none rounded-md border bg-background px-3 py-2 pr-10 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="windows">Windows</option>
              <option value="linux">Linux</option>
              <option value="app">Application</option>
              <option value="alertes">Alertes</option>
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.207l3.71-3.975a.75.75 0 011.08 1.04l-4.24 4.54a.75.75 0 01-1.08 0l-4.24-4.54a.75.75 0 01.02-1.06z" />
            </svg>
          </div>
        </div>

        {/* Desktop tabs */}
        <TabsList
          aria-label="Sections"
          className="hidden sm:flex w-full items-center gap-2 overflow-x-auto rounded-lg border bg-muted/50 p-1"
        >
          {[
            { value: "windows", label: "Windows" },
            { value: "linux", label: "Linux" },
            { value: "app", label: "Application" },
            { value: "alertes", label: "Alertes" },
          ].map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value as TabKey}
              className="shrink-0 inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium text-foreground shadow-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(TABS).map(([k, cards]) => (
          <TabsContent key={k} value={k}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((c) => {
                const Ico = c.icon ? IconMap[c.icon] : null;
                return (
                  <Card key={c.title}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        {Ico && <Ico className="h-4 w-4 text-primary" />}
                        {c.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <ul className="list-outside space-y-1">
                        {c.bullets.map((b) => (
                          <li key={b}>• {b}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
