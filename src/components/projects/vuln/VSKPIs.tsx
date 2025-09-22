"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Network, Bug, AlertTriangle, Clock } from "lucide-react";
import type { KPIItem, KPIIconName } from "@/data/projects/vulnScanner/vulns";

const IconMap: Record<
  KPIIconName,
  React.ComponentType<{ className?: string }>
> = {
  Network,
  Bug,
  AlertTriangle,
  Clock,
};

export function VSKPIs({ items }: { items: KPIItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((k) => {
        const Icon = IconMap[k.icon];
        const iconClass = k.iconClassName ?? "h-5 w-5 text-muted-foreground";
        return (
          <Card key={k.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <p className="text-xl font-semibold">{k.value}</p>
                </div>
                <Icon className={iconClass} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
