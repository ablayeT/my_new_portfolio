import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Mail,
  BarChart3,
  Terminal,
  Eye,
  Send,
  X,
  Check,
  Server,
  AlertTriangle,
  ArrowLeft,
  Play,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";

interface PhishingDemoPageProps {
  className?: string;
  onBack?: () => void;
}

// Mock data for demo
const mockCampaigns = [
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

const mockMailhogCaptured = [
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

export const PhishingDemoPage: React.FC<PhishingDemoPageProps> = ({
  className = "",
  onBack,
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  const totalTargets = mockCampaigns.reduce(
    (sum, campaign) => sum + campaign.targets,
    0
  );
  const totalSent = mockCampaigns.reduce(
    (sum, campaign) => sum + campaign.sent,
    0
  );
  const totalClicks = mockCampaigns.reduce(
    (sum, campaign) => sum + campaign.clicks,
    0
  );
  const totalCredentials = mockCampaigns.reduce(
    (sum, campaign) => sum + campaign.credentials,
    0
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "idle":
        return "secondary";
      case "running":
        return "default";
      case "completed":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen tokens-bg-neutral-950 tokens-color-neutral-0">
      {/* Header avec bouton retour */}
      <div className="border-b tokens-semantic-border-default tokens-p-16">
        <div className="max-w-7xl mx-auto">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Retour au portfolio
            </Button>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="tokens-p-8 tokens-bg-feedback-warning tokens-radius-8">
                <Mail className="tokens-color-neutral-0" size={24} />
              </div>
              <div>
                <h1 className="tokens-text-h2-28-700 tokens-color-neutral-0">
                  Phishing Console
                </h1>
                <p className="tokens-text-body-14-500 tokens-color-neutral-300">
                  Démonstration d'outil de simulation - Mode LECTURE SEULE
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="tokens-color-feedback-warning border-amber-400"
              >
                <Shield size={12} className="mr-1" />
                DEMO MODE
              </Badge>
              <Badge variant="outline" className="tokens-color-neutral-300">
                v2.3.1
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto tokens-p-24 space-y-8">
        {/* Alerte de sécurité */}
        <Alert className="border-amber-400 tokens-bg-feedback-warning/10">
          <AlertTriangle className="h-4 w-4 tokens-color-feedback-warning" />
          <AlertDescription className="tokens-color-neutral-0">
            <strong>Interface de démonstration uniquement</strong> - Cet outil
            est présenté à des fins éducatives. Aucun email ne peut être envoyé
            depuis cette démo. Toutes les actions sont simulées et sécurisées.
          </AlertDescription>
        </Alert>

        {/* KPIs Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="tokens-bg-neutral-900 border-neutral-700">
            <CardContent className="tokens-p-16">
              <div className="flex items-center justify-between">
                <div>
                  <p className="tokens-text-caption-12-500 tokens-color-neutral-500">
                    Cibles totales
                  </p>
                  <p className="tokens-text-h3-22-600 tokens-color-neutral-0">
                    {totalTargets}
                  </p>
                </div>
                <Users className="tokens-color-brand-purple" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="tokens-bg-neutral-900 border-neutral-700">
            <CardContent className="tokens-p-16">
              <div className="flex items-center justify-between">
                <div>
                  <p className="tokens-text-caption-12-500 tokens-color-neutral-500">
                    Emails envoyés
                  </p>
                  <p className="tokens-text-h3-22-600 tokens-color-neutral-0">
                    {totalSent}
                  </p>
                </div>
                <Send className="tokens-color-feedback-info" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="tokens-bg-neutral-900 border-neutral-700">
            <CardContent className="tokens-p-16">
              <div className="flex items-center justify-between">
                <div>
                  <p className="tokens-text-caption-12-500 tokens-color-neutral-500">
                    Taux de clic
                  </p>
                  <p className="tokens-text-h3-22-600 tokens-color-neutral-0">
                    {totalClicks}%
                  </p>
                </div>
                <Target className="tokens-color-feedback-warning" size={24} />
              </div>
            </CardContent>
          </Card>

          <Card className="tokens-bg-neutral-900 border-neutral-700">
            <CardContent className="tokens-p-16">
              <div className="flex items-center justify-between">
                <div>
                  <p className="tokens-text-caption-12-500 tokens-color-neutral-500">
                    Identifiants
                  </p>
                  <p className="tokens-text-h3-22-600 tokens-color-neutral-0">
                    {totalCredentials}
                  </p>
                </div>
                <Shield className="tokens-color-feedback-danger" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets principaux */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 tokens-bg-neutral-900">
            <TabsTrigger
              value="campaigns"
              className="flex items-center gap-2 data-[state=active]:tokens-bg-brand-purple"
            >
              <Mail size={16} />
              Campagnes
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="flex items-center gap-2 data-[state=active]:tokens-bg-brand-purple"
            >
              <Terminal size={16} />
              Modèles
            </TabsTrigger>
            <TabsTrigger
              value="targets"
              className="flex items-center gap-2 data-[state=active]:tokens-bg-brand-purple"
            >
              <Users size={16} />
              Cibles
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center gap-2 data-[state=active]:tokens-bg-brand-purple"
            >
              <BarChart3 size={16} />
              Rapports
            </TabsTrigger>
          </TabsList>

          {/* Campagnes Tab */}
          <TabsContent value="campaigns">
            <Card className="tokens-bg-neutral-900 border-neutral-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="tokens-color-neutral-0">
                    Campagnes de phishing
                  </CardTitle>
                  <Button disabled className="tokens-text-body-14-500">
                    <Play size={16} className="mr-2" />
                    Nouvelle campagne
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-neutral-700">
                      <TableHead className="tokens-color-neutral-300">
                        Nom
                      </TableHead>
                      <TableHead className="tokens-color-neutral-300">
                        Status
                      </TableHead>
                      <TableHead className="tokens-color-neutral-300">
                        Cibles
                      </TableHead>
                      <TableHead className="tokens-color-neutral-300">
                        Envoyés
                      </TableHead>
                      <TableHead className="tokens-color-neutral-300">
                        Clics
                      </TableHead>
                      <TableHead className="tokens-color-neutral-300">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCampaigns.map((campaign) => (
                      <TableRow
                        key={campaign.id}
                        className="border-neutral-700"
                      >
                        <TableCell className="tokens-color-neutral-0">
                          {campaign.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="tokens-color-neutral-0">
                          {campaign.targets}
                        </TableCell>
                        <TableCell className="tokens-color-neutral-0">
                          {campaign.sent}
                        </TableCell>
                        <TableCell className="tokens-color-neutral-0">
                          {campaign.clicks}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" disabled>
                              <Eye size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" disabled>
                              <Play size={14} />
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

          {/* Templates Tab */}
          <TabsContent value="templates">
            <Card className="tokens-bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="tokens-color-neutral-0">
                  Modèles d'email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Password Reset",
                    "IT Support",
                    "HR Update",
                    "Security Alert",
                    "Invoice",
                    "Meeting Request",
                  ].map((template, index) => (
                    <Card
                      key={index}
                      className="tokens-bg-neutral-800 border-neutral-600 hover:border-brand-purple/50 transition-colors"
                    >
                      <CardContent className="tokens-p-16">
                        <h4 className="tokens-text-body-16-500 tokens-color-neutral-0 mb-2">
                          {template}
                        </h4>
                        <p className="tokens-text-body-14-500 tokens-color-neutral-400 mb-4">
                          Modèle {template.toLowerCase()} pour campagne de
                          sensibilisation
                        </p>
                        <Button variant="outline" size="sm" disabled>
                          <Eye size={14} className="mr-2" />
                          Aperçu
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Targets Tab */}
          <TabsContent value="targets">
            <Card className="tokens-bg-neutral-900 border-neutral-700">
              <CardHeader>
                <CardTitle className="tokens-color-neutral-0">
                  Liste des cibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="Rechercher une cible..."
                      className="tokens-bg-neutral-800 border-neutral-600"
                      disabled
                    />
                    <Button variant="outline" disabled>
                      Importer CSV
                    </Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow className="border-neutral-700">
                        <TableHead className="tokens-color-neutral-300">
                          Email
                        </TableHead>
                        <TableHead className="tokens-color-neutral-300">
                          Nom
                        </TableHead>
                        <TableHead className="tokens-color-neutral-300">
                          Département
                        </TableHead>
                        <TableHead className="tokens-color-neutral-300">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        "user1@demo.local",
                        "user2@demo.local",
                        "user3@demo.local",
                      ].map((email, index) => (
                        <TableRow key={index} className="border-neutral-700">
                          <TableCell className="tokens-color-neutral-0">
                            {email}
                          </TableCell>
                          <TableCell className="tokens-color-neutral-0">
                            Utilisateur {index + 1}
                          </TableCell>
                          <TableCell className="tokens-color-neutral-0">
                            IT
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="tokens-color-neutral-300"
                            >
                              Actif
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="space-y-6">
              <Card className="tokens-bg-neutral-900 border-neutral-700">
                <CardHeader>
                  <CardTitle className="tokens-color-neutral-0">
                    Emails capturés (MailHog)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-neutral-700">
                        <TableHead className="tokens-color-neutral-300">
                          Destinataire
                        </TableHead>
                        <TableHead className="tokens-color-neutral-300">
                          Sujet
                        </TableHead>
                        <TableHead className="tokens-color-neutral-300">
                          Status
                        </TableHead>
                        <TableHead className="tokens-color-neutral-300">
                          Horodatage
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockMailhogCaptured.map((email) => (
                        <TableRow key={email.id} className="border-neutral-700">
                          <TableCell className="tokens-color-neutral-0">
                            {email.to}
                          </TableCell>
                          <TableCell className="tokens-color-neutral-0">
                            {email.subject}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="tokens-color-feedback-success border-green-400"
                            >
                              {email.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="tokens-color-neutral-400">
                            {email.timestamp}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="tokens-bg-neutral-900 border-neutral-700">
                <CardHeader>
                  <CardTitle className="tokens-color-neutral-0">
                    Analyses de sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 tokens-p-12 tokens-bg-feedback-success/10 tokens-radius-8 border border-green-400/20">
                      <Check
                        className="tokens-color-feedback-success"
                        size={20}
                      />
                      <div>
                        <p className="tokens-text-body-14-500 tokens-color-neutral-0">
                          Emails capturés avec succès
                        </p>
                        <p className="tokens-text-caption-12-500 tokens-color-neutral-400">
                          Tous les emails sont interceptés par MailHog et ne
                          sont pas délivrés aux utilisateurs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 tokens-p-12 tokens-bg-feedback-info/10 tokens-radius-8 border border-blue-400/20">
                      <Shield
                        className="tokens-color-feedback-info"
                        size={20}
                      />
                      <div>
                        <p className="tokens-text-body-14-500 tokens-color-neutral-0">
                          Environnement sécurisé
                        </p>
                        <p className="tokens-text-caption-12-500 tokens-color-neutral-400">
                          Simulation en laboratoire isolé - Aucun risque pour
                          les utilisateurs réels
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
    </div>
  );
};

export default PhishingDemoPage;
