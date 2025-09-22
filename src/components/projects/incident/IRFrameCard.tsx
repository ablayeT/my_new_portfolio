"use client";

import { ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OPERATIONAL_FRAME } from "@/data/projects/incidentData/incidentResponse";

export function IRFrameCard({ className = "" }: { className?: string }) {
  return (
    <Card className={`border-primary/10 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" /> {OPERATIONAL_FRAME.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-2">
        <ul className="list-disc ml-5 space-y-1">
          {OPERATIONAL_FRAME.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
