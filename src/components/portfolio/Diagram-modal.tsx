"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ArchitectureDiagram } from "@/components/diagram/Architecture-diagram";

export interface DiagramModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function DiagramModal({ open, onOpenChange }: DiagramModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-2 z-50 mx-auto max-w-6xl rounded-2xl bg-background shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          aria-label="Diagramme d’architecture — plein écran"
        >
          <div className="relative p-4 sm:p-6">
            <Dialog.Title className="sr-only">
              Diagramme d’architecture
            </Dialog.Title>

            {/* Diagramme desktop */}
            <ArchitectureDiagram variant="desktop" />

            <Dialog.Close
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
