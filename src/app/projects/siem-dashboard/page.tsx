"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { Hero } from "@/components/projects/siem/Hero";
import { StatsGrid } from "@/components/projects/siem/StatsGrid";
import { TabsPanel } from "@/components/projects/siem/TabsPanel";
import { CodeSnippets } from "@/components/projects/siem/CodeSnippets";
import { MarketImpact } from "@/components/projects/siem/MarketImpact";

export default function SiemDashboardPage({
  repoUrl = "#",
  pdfUrl = "#",
}: {
  repoUrl?: string;
  pdfUrl?: string;
} = {}) {
  return (
    <main className="w-full">
      <Hero repoUrl={repoUrl} pdfUrl={pdfUrl} />
      <Separator className="my-2 sm:my-4" />
      <StatsGrid />
      <TabsPanel />
      <CodeSnippets />
      <MarketImpact repoUrl={repoUrl} />
    </main>
  );
}
