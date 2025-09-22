"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Shield } from "lucide-react";

export function ComplianceDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
}
