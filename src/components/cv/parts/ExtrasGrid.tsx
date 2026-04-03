"use client";
import { Badge } from "@/components/ui/badge";
import { Globe, Zap, Compass } from "lucide-react";

export function ExtrasGrid({ languages, softSkills, interests }: {
  languages: string[]; softSkills: string[]; interests: string[];
}) {
  const cols = [
    { icon: <Globe className="h-3.5 w-3.5" />, title: "Langues", items: languages, variant: "secondary" as const },
    { icon: <Zap className="h-3.5 w-3.5" />, title: "Soft Skills", items: softSkills, variant: "secondary" as const },
    { icon: <Compass className="h-3.5 w-3.5" />, title: "Centres d'intérêt", items: interests, variant: "outline" as const },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cols.map(({ icon, title, items, variant }) => (
        <div key={title} className="rounded-2xl border bg-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">{icon}</span>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {items.map((s) => <Badge key={s} variant={variant} className="text-[11px]">{s}</Badge>)}
          </div>
        </div>
      ))}
    </div>
  );
}