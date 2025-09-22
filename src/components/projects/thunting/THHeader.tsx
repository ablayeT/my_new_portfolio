"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Radar } from "lucide-react";
import { HERO } from "@/data/projects/threatHuntingData/theatHunting";

export function THHeader({ onBack }: { onBack?: () => void }) {
  return (
    <div className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        <div className="mb-3">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux projets
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-purple-300/40 bg-purple-50 px-2.5 py-2 dark:bg-purple-900/20">
              <Radar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {HERO.title}
              </h1>
              <p className="text-sm text-muted-foreground">{HERO.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {HERO.badges.map((b) => (
              <Badge
                key={b}
                variant="outline"
                className="text-muted-foreground"
              >
                {b}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
