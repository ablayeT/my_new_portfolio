"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  Mail,
  Terminal,
  Users,
  BarChart3,
  Eye,
  Play,
  Server,
  Shield,
} from "lucide-react";

import { statusToVariant } from "@/components/phishing/utils";
import type { Campaign, CapturedMail } from "@/data/phishing/demo";
import { TEMPLATE_NAMES, TARGETS } from "@/data/phishing/demo";
import { Badge } from "@/components/ui/badge";

export function PhishingTabs({
  activeTab,
  onTabChange,
  campaigns,
  capturedMails,
  onOpenMailhog,
}: {
  activeTab: string;
  onTabChange: (v: string) => void;
  campaigns: Campaign[];
  capturedMails: CapturedMail[];
  onOpenMailhog: () => void;
}) {
  return (
    <>
      <Alert className="border-amber-300/40 bg-amber-50 dark:bg-amber-900/20">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-foreground">
          <strong>Interface de démonstration uniquement.</strong> Tous les
          emails sont interceptés (MailHog).
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
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
                  {campaigns.map((c) => (
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
                {TEMPLATE_NAMES.map((t) => (
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
                  {TARGETS.map((t) => (
                    <TableRow key={t.email}>
                      <TableCell className="font-medium">{t.email}</TableCell>
                      <TableCell>{t.name}</TableCell>
                      <TableCell>{t.dept}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="text-muted-foreground"
                        >
                          {t.status}
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
                  <Button variant="ghost" size="sm" onClick={onOpenMailhog}>
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
                    {capturedMails.map((m) => (
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
                    <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
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
    </>
  );
}
