// src/components/home/parts/ArchitecturePreview.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Terminal, Server, Mail, Radar, Shield } from "lucide-react";
import type {
  ArchitectureSection,
  ArchitectureFlows,
  IconName,
  ToneName,
} from "@/data/home/home";

const ICONS: Record<
  IconName,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Terminal,
  Server,
  Mail,
  Radar,
  Shield,
};

const TONES: Record<ToneName, string> = {
  red: "text-red-500",
  amber: "text-amber-500",
  sky: "text-sky-600",
  slate: "text-slate-500",
  brand: "text-[var(--tokens-color-brand-purple,#6c5ce7)]",
};

export function ArchitecturePreview({
  sections,
  flows,
}: {
  sections: ArchitectureSection[];
  flows: ArchitectureFlows;
}) {
  return (
    <Card>
      <CardContent className="space-y-4 p-4 md:p-6">
        <h4
          className="font-semibold"
          style={{ color: "var(--color-foreground)" }}
        >
          Aperçu de l&apos;architecture
        </h4>

        <div className="grid gap-4 rounded-md border p-4 md:grid-cols-3">
          {sections.map((col) => (
            <div key={col.title} className="space-y-3">
              <div className="text-xs font-medium text-slate-500">
                {col.title}
              </div>
              {col.items.map((it) => {
                const Icon = ICONS[it.icon];
                return (
                  <div key={it.title} className="rounded-md border p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon size={18} className={TONES[it.tone]} />
                      <div className="text-sm font-medium">{it.title}</div>
                    </div>
                    <div className="text-xs text-slate-500">{it.subtitle}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-md border bg-red-50/60 p-3 text-sm">
            <div className="mb-1 font-semibold text-red-600">
              Red Team Flows
            </div>
            <ul className="space-y-1 text-slate-700">
              {flows.red.map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border bg-sky-50/60 p-3 text-sm">
            <div className="mb-1 font-semibold text-sky-700">
              Blue Team Flows
            </div>
            <ul className="space-y-1 text-slate-700">
              {flows.blue.map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border p-3 text-sm">
            <div className="mb-1 font-semibold">Management</div>
            <ul className="space-y-1 text-slate-700">
              {flows.mgmt.map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
