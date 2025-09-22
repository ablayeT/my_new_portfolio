"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";

export function MailhogDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
}
