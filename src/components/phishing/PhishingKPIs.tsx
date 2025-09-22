"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Send, Target, Check } from "lucide-react";
import type { Campaign } from "@/data/phishing/demo";

export function PhishingKPIs({ campaigns }: { campaigns: Campaign[] }) {
  const totalTargets = campaigns.reduce((n, c) => n + c.targets, 0);
  const totalSent = campaigns.reduce((n, c) => n + c.sent, 0);
  const totalClicks = campaigns.reduce((n, c) => n + c.clicks, 0);
  const totalCreds = campaigns.reduce((n, c) => n + c.credentials, 0);

  const Item = ({
    label,
    value,
    icon: Icon,
    tone,
  }: {
    label: string;
    value: number | string;
    icon: React.ElementType;
    tone: string;
  }) => (
    <Card className="border-[color:var(--tokens-border-muted)] bg-[color:var(--tokens-semantic-surface-card)]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-xl font-semibold text-foreground">{value}</p>
          </div>
          <Icon className={`h-6 w-6 ${tone}`} />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Item
        label="Cibles totales"
        value={totalTargets}
        icon={Users}
        tone="text-[color:var(--tokens-color-brand-purple)]"
      />
      <Item
        label="Emails envoyés"
        value={totalSent}
        icon={Send}
        tone="text-blue-500"
      />
      <Item
        label="Taux de clic"
        value={`${totalClicks}%`}
        icon={Target}
        tone="text-amber-500"
      />
      <Item
        label="Identifiants"
        value={totalCreds}
        icon={Check}
        tone="text-emerald-500"
      />
    </div>
  );
}
