"use client";

import * as React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { mockCampaigns, mockCapturedMails } from "@/data/phishing/demo";

import { PhishingGate } from "@/components/phishing/PhishingGate";
import { PhishingHeader } from "@/components/phishing/PhishingHeader";
import { PhishingKPIs } from "@/components/phishing/PhishingKPIs";
import { PhishingTabs } from "@/components/phishing/PhishingTabs";
import { ComplianceDialog } from "@/components/phishing/ComplianceDialog";
import { MailhogDialog } from "@/components/phishing/MailhogDialog";

export interface PhishingDemoPageProps {
  className?: string;
  onBack?: () => void;
}

const READ_ONLY_NOTE =
  "Lecture seule : aucune livraison réelle (SMTP capturé), données de démonstration.";

const DemoNote = () => (
  <Alert className="border-amber-300/40 bg-amber-50 dark:bg-amber-900/20">
    <AlertDescription className="text-xs text-muted-foreground">
      {READ_ONLY_NOTE}
    </AlertDescription>
  </Alert>
);

export default function PhishingDemoPage({
  className = "",
  onBack,
}: PhishingDemoPageProps) {
  // Vue gate/console
  const [view, setView] = React.useState<"gate" | "console">("gate");
  // Tabs
  const [activeTab, setActiveTab] = React.useState("campaigns");
  // Modales
  const [showCompliance, setShowCompliance] = React.useState(false);
  const [showMailhog, setShowMailhog] = React.useState(false);

  if (view === "gate") {
    return (
      <PhishingGate
        className={className}
        onBack={onBack}
        onAccess={() => setView("console")}
      />
    );
  }

  return (
    <div
      className={`min-h-screen bg-[color:var(--tokens-semantic-surface-default)] ${className}`}
    >
      <PhishingHeader
        onBack={onBack}
        onOpenCompliance={() => setShowCompliance(true)}
      />

      <div className="container space-y-8 py-6">
        <DemoNote />
        <PhishingKPIs campaigns={mockCampaigns} />
        <PhishingTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          campaigns={mockCampaigns}
          capturedMails={mockCapturedMails}
          onOpenMailhog={() => setShowMailhog(true)}
        />
      </div>

      <ComplianceDialog
        open={showCompliance}
        onOpenChange={setShowCompliance}
      />
      <MailhogDialog open={showMailhog} onOpenChange={setShowMailhog} />
    </div>
  );
}
