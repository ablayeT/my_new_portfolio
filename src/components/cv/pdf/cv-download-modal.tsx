// src/components/portfolio/cv-download-modal.tsx
"use client";

import { useCallback } from "react";
import { Download, Eye, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CV_ASSET } from "@/data/cv/cv";

export interface CVDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const CVDownloadModal = ({
  isOpen,
  onClose,
  className = "",
}: CVDownloadModalProps) => {
  const handleDownload = useCallback(() => {
    try {
      const a = document.createElement("a");
      a.href = CV_ASSET.href;
      a.download = CV_ASSET.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      onClose();
    }
  }, [onClose]);

  const handlePreview = useCallback(() => {
    window.open(CV_ASSET.href, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className={`sm:max-w-md ${className}`}
        aria-describedby="cv-download-description"
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Fermer"
        >
          <X size={16} />
        </button>

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download size={18} />
            Télécharger mon CV
          </DialogTitle>
          <p className="text-xs text-muted-foreground">
            Dernière mise à jour : {CV_ASSET.updatedAt}
          </p>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              CV — Abdoulaye Touré
            </CardTitle>
            <p id="cv-download-description" className="text-sm text-slate-500">
              Expert en Cybersécurité & Développement Web
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handlePreview}
                variant="outline"
                className="justify-center"
              >
                <Eye size={16} className="mr-2" />
                Aperçu
              </Button>

              <Button onClick={handleDownload} className="justify-center">
                <Download size={16} className="mr-2" />
                Télécharger PDF
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-slate-500">
                Format PDF • Mise à jour : {CV_ASSET.updatedAt}
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
