"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Mail, ArrowLeft } from "lucide-react";

export function PhishingHeader({
  onBack,
  onOpenCompliance,
}: {
  onBack?: () => void;
  onOpenCompliance: () => void;
}) {
  return (
    <div className="border-b border-[color:var(--tokens-border-muted)]/80 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        <div className="mb-3 flex items-center justify-between">
          {onBack ? (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux projets
            </Button>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onOpenCompliance}>
              <Shield className="mr-2 h-4 w-4" />
              Conformité
            </Button>
            <Badge
              variant="outline"
              className="border-amber-400 text-amber-600 dark:text-amber-400"
            >
              <Shield className="mr-1 h-3.5 w-3.5" />
              DEMO MODE
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              v2.3.1
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-amber-300/40 bg-amber-50 px-2.5 py-2 dark:bg-amber-900/20">
            <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Phishing Console (Demo)
            </h1>
            <p className="text-sm text-muted-foreground">
              Simulation éducative — aucun email réel n’est envoyé.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
