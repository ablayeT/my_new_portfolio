"use client";

import * as React from "react";
import {
  Mail,
  Shield,
  Users,
  Send,
  Target,
  Check,
  AlertTriangle,
  Eye,
  Play,
  BarChart3,
  Terminal,
  ArrowLeft,
  Server,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Status = "Idle" | "Running" | "Completed";

type Campaign = {
  id: number;
  name: string;
  status: Status;
  targets: number;
  sent: number;
  clicks: number;
  credentials: number;
  domain: string;
  template: string;
};

type CapturedMail = {
  id: number;
  to: string;
  subject: string;
  status: string;
  timestamp: string;
};

export interface PhishingDemoPageProps {
  className?: string;
  onBack?: () => void;
}

/** Données demo */
const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Awareness-Q3-DEMO",
    status: "Idle",
    targets: 25,
    sent: 0,
    clicks: 0,
    credentials: 0,
    domain: "demo.local",
    template: "Password Reset",
  },
  {
    id: 2,
    name: "Password-Reset-DEMO",
    status: "Idle",
    targets: 18,
    sent: 0,
    clicks: 0,
    credentials: 0,
    domain: "demo.local",
    template: "IT Support",
  },
  {
    id: 3,
    name: "Security-Training-DEMO",
    status: "Idle",
    targets: 32,
    sent: 0,
    clicks: 0,
    credentials: 0,
    domain: "demo.local",
    template: "HR Update",
  },
];

const mockMailhogCaptured: CapturedMail[] = [
  {
    id: 1,
    to: "user1@demo.local",
    subject: "[DEMO] Password Reset Request",
    status: "Captured (not sent)",
    timestamp: "2024-12-15 10:30:00",
  },
  {
    id: 2,
    to: "user2@demo.local",
    subject: "[DEMO] IT Security Update",
    status: "Captured (not sent)",
    timestamp: "2024-12-15 10:28:15",
  },
  {
    id: 3,
    to: "user3@demo.local",
    subject: "[DEMO] HR Policy Changes",
    status: "Captured (not sent)",
    timestamp: "2024-12-15 10:25:42",
  },
];

function statusToVariant(s: Status) {
  // variantes Badge shadcn: default | secondary | destructive | outline
  if (s === "Running") return "default" as const;
  if (s === "Completed") return "outline" as const;
  return "secondary" as const; // Idle
}

export const PhishingDemoPage: React.FC<PhishingDemoPageProps> = ({
  className = "",
  onBack,
}) => {
  // --- Gate d’accès (lecture seule)
  const [view, setView] = React.useState<"gate" | "console">("gate");
  const [accessCode, setAccessCode] = React.useState("");

  // --- Console
  const [activeTab, setActiveTab] = React.useState("campaigns");
  const [showCompliance, setShowCompliance] = React.useState(false);
  const [showMailhog, setShowMailhog] = React.useState(false);

  const totalTargets = mockCampaigns.reduce((n, c) => n + c.targets, 0);
  const totalSent = mockCampaigns.reduce((n, c) => n + c.sent, 0);
  const totalClicks = mockCampaigns.reduce((n, c) => n + c.clicks, 0);
  const totalCreds = mockCampaigns.reduce((n, c) => n + c.credentials, 0);

  const handleAccess = () => {
    const v = accessCode.trim().toLowerCase();
    if (v === "demo" || v === "readonly") {
      setView("console");
    }
  };

  if (view === "gate") {
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
            <Badge
              variant="outline"
              className="border-amber-400 text-amber-600"
            >
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

  // --- Vue console
  return (
    <div
      className={`min-h-screen bg-[color:var(--tokens-semantic-surface-default)] ${className}`}
    >
      {/* Header */}
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCompliance(true)}
              >
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

          <div className="flex items-center justify-between">
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
      </div>

      {/* Body */}
      <div className="container space-y-8 py-6">
        {/* Alerte sécurité */}
        <Alert className="border-amber-300/40 bg-amber-50 dark:bg-amber-900/20">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-foreground">
            <strong>Interface de démonstration uniquement.</strong> Tous les
            emails sont interceptés (MailHog) pour éviter toute livraison
            réelle.
          </AlertDescription>
        </Alert>

        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-[color:var(--tokens-border-muted)] bg-[color:var(--tokens-semantic-surface-card)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Cibles totales
                  </p>
                  <p className="text-xl font-semibold text-foreground">
                    {totalTargets}
                  </p>
                </div>
                <Users className="h-6 w-6 text-[color:var(--tokens-color-brand-purple)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[color:var(--tokens-border-muted)] bg-[color:var(--tokens-semantic-surface-card)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Emails envoyés
                  </p>
                  <p className="text-xl font-semibold text-foreground">
                    {totalSent}
                  </p>
                </div>
                <Send className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[color:var(--tokens-border-muted)] bg-[color:var(--tokens-semantic-surface-card)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Taux de clic</p>
                  <p className="text-xl font-semibold text-foreground">
                    {totalClicks}%
                  </p>
                </div>
                <Target className="h-6 w-6 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[color:var(--tokens-border-muted)] bg-[color:var(--tokens-semantic-surface-card)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Identifiants</p>
                  <p className="text-xl font-semibold text-foreground">
                    {totalCreds}
                  </p>
                </div>
                <Check className="h-6 w-6 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Campagnes
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Terminal className="h-4 w-4" /> Modèles
            </TabsTrigger>
            <TabsTrigger value="targets" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Cibles
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Rapports
            </TabsTrigger>
          </TabsList>

          {/* Campagnes */}
          <TabsContent value="campaigns">
            <Card className="border-[color:var(--tokens-border-muted)] bg-[color:var(--tokens-semantic-surface-card)]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Campagnes de phishing</CardTitle>
                  <Button disabled>
                    <Play className="mr-2 h-4 w-4" />
                    Nouvelle campagne
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Cibles</TableHead>
                      <TableHead>Envoyés</TableHead>
                      <TableHead>Clics</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCampaigns.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell>
                          <Badge variant={statusToVariant(c.status)}>
                            {c.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{c.targets}</TableCell>
                        <TableCell>{c.sent}</TableCell>
                        <TableCell>{c.clicks}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" disabled>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" disabled>
                              <Play className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Modèles */}
          <TabsContent value="templates">
            <Card className="border-[color:var(--tokens-border-muted)] bg-[color:var(--tokens-semantic-surface-card)]">
              <CardHeader className="pb-3">
                <CardTitle>Modèles d’email</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Password Reset",
                    "IT Support",
                    "HR Update",
                    "Security Alert",
                    "Invoice",
                    "Meeting Request",
                  ].map((t) => (
                    <Card
                      key={t}
                      className="border-[color:var(--tokens-border-muted)] bg-muted/40 transition-colors hover:border-[color:var(--tokens-color-brand-purple)]/40"
                    >
                      <CardContent className="p-4">
                        <h4 className="mb-1 text-sm font-medium text-foreground">
                          {t}
                        </h4>
                        <p className="mb-3 text-sm text-muted-foreground">
                          Modèle {t.toLowerCase()} pour campagnes de
                          sensibilisation.
                        </p>
                        <Button variant="outline" size="sm" disabled>
                          <Eye className="mr-2 h-4 w-4" /> Aperçu
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cibles */}
          <TabsContent value="targets">
            <Card className="border-[color:var(--tokens-border-muted)] bg-[color:var(--tokens-semantic-surface-card)]">
              <CardHeader className="pb-3">
                <CardTitle>Liste des cibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-2">
                  <Input
                    placeholder="Rechercher une cible…"
                    className="max-w-sm"
                    disabled
                  />
                  <Button variant="outline" disabled>
                    Importer CSV
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Département</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      "user1@demo.local",
                      "user2@demo.local",
                      "user3@demo.local",
                    ].map((email, i) => (
                      <TableRow key={email}>
                        <TableCell className="font-medium">{email}</TableCell>
                        <TableCell>Utilisateur {i + 1}</TableCell>
                        <TableCell>IT</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-muted-foreground"
                          >
                            Actif
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rapports */}
          <TabsContent value="reports">
            <div className="space-y-6">
              <Card className="border-[color:var(--tokens-border-muted)] bg-[color:var(--tokens-semantic-surface-card)]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Emails capturés (MailHog)</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMailhog(true)}
                    >
                      <Server className="mr-2 h-4 w-4" />
                      Ouvrir l’UI MailHog
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Destinataire</TableHead>
                        <TableHead>Sujet</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Horodatage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockMailhogCaptured.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell className="font-medium">{m.to}</TableCell>
                          <TableCell>{m.subject}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="text-emerald-600 dark:text-emerald-400"
                            >
                              {m.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {m.timestamp}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-[color:var(--tokens-border-muted)] bg-[color:var(--tokens-semantic-surface-card)]">
                <CardHeader className="pb-3">
                  <CardTitle>Analyses de sécurité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg border border-emerald-300/30 bg-emerald-50 p-3 dark:bg-emerald-900/15">
                      <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Emails interceptés
                        </p>
                        <p className="text-xs text-muted-foreground">
                          MailHog capte tous les messages — aucune livraison
                          réelle.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-blue-300/30 bg-blue-50 p-3 dark:bg-blue-900/15">
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Environnement sécurisé
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Lab isolé — idéal formation & démonstrations.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modale conformité */}
      <Dialog open={showCompliance} onOpenChange={setShowCompliance}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              Sécurité & Conformité (Démo)
            </DialogTitle>
            <DialogDescription>
              Mesures actives pour un environnement sûr
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-2 text-sm">
            {[
              "Egress SMTP (25/465/587) BLOQUÉ",
              "Données cibles fictives uniquement",
              "UI Read-only (rôle viewer)",
              "Bannières DEMO visibles",
              "Logs anonymisés (PII scrubbing)",
            ].map((it) => (
              <li key={it} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      {/* Modale MailHog */}
      <Dialog open={showMailhog} onOpenChange={setShowMailhog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>MailHog Preview</DialogTitle>
            <DialogDescription>
              Interface de capture des emails (démo)
            </DialogDescription>
          </DialogHeader>
          <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed border-muted bg-muted">
            <div className="text-center">
              <Mail className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-sm font-medium">
                Capture d’écran fictive MailHog
              </p>
              <p className="text-xs text-muted-foreground">
                En vrai&nbsp;: http://localhost:8025
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhishingDemoPage;
