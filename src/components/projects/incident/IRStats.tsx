"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  STATS,
  type IRStat,
} from "@/data/projects/incidentData/incidentResponse";

export function IRStats() {
  return (
    <section className="mx-auto w-full lg:max-w-7xl px-3 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STATS.map((s: IRStat, i: number) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight">
                {s.value}
              </div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
              {s.hint && (
                <div className="mt-1 text-xs text-muted-foreground/80">
                  {s.hint}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
