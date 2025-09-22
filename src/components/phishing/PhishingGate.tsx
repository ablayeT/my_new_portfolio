"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft } from "lucide-react";

export function PhishingGate({
  onAccess,
  onBack,
  className = "",
}: {
  onAccess: () => void;
  onBack?: () => void;
  className?: string;
}) {
  const [accessCode, setAccessCode] = React.useState("");

  const handleAccess = () => {
    const v = accessCode.trim().toLowerCase();
    if (v === "demo" || v === "readonly") onAccess();
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="container max-w-xl py-10">
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux projets
          </Button>
        )}

        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Mail className="h-6 w-6 text-[color:var(--tokens-color-brand-purple,#6d28d9)]" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Phishing Console — Accès Démo
            </h1>
          </div>
          <Badge variant="outline" className="border-amber-400 text-amber-600">
            DEMO • READ-ONLY
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Entrer en mode démo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Code d&apos;accès
              </label>
              <Input
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Tape 'demo' ou 'readonly'"
                onKeyDown={(e) => e.key === "Enter" && handleAccess()}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleAccess}
              disabled={!accessCode.trim()}
            >
              Entrer en mode démo
            </Button>

            <div className="rounded-lg border bg-muted p-3 text-center text-sm text-muted-foreground">
              🔒 Lecture seule — SMTP egress bloqué — Données fictives
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline">Noindex</Badge>
              <Badge variant="outline">Read-only</Badge>
              <Badge variant="outline">SMTP capturé (MailHog)</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
