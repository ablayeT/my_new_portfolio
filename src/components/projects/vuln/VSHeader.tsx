"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { HEADER } from "@/data/projects/vulnScanner/vulns";

export function VSHeader() {
  const router = useRouter();
  return (
    <div className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        <div className="mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/projects")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux projets
          </Button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-emerald-300/40 bg-emerald-50 px-2.5 py-2 dark:bg-emerald-900/20">
              <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {HEADER.title}
              </h1>
              <p className="text-sm text-muted-foreground">{HEADER.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline">{HEADER.badges[0]}</Badge>
            <Badge variant="outline" className="text-muted-foreground">
              {HEADER.badges[1]}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
