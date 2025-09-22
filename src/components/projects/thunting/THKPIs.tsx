"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Search, Target, Clock, ShieldCheck } from "lucide-react";
import type {
  KPIItem,
  KPIIconName,
  Hunt,
} from "@/data/projects/threatHuntingData/theatHunting";

const IconMap: Record<
  KPIIconName,
  React.ComponentType<{ className?: string }>
> = {
  Search,
  Target,
  Clock,
  ShieldCheck,
};

export function THKPIs({ base, hunts }: { base: KPIItem[]; hunts: Hunt[] }) {
  const running = hunts.filter((h) => h.status === "Running").length.toString();
  const items = base.map((it, idx) =>
    idx === 0 ? { ...it, value: running } : it
  );

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
