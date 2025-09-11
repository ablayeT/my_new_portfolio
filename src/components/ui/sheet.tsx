// src/components/ui/sheet.tsx
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetPortal = SheetPrimitive.Portal;

/**
 * Overlay : stylé via classe passée depuis SheetContent.
 */
export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40",
      // Animations Radix
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

/**
 * Variants pour le contenu (panneau).
 */
const sheetVariants = cva(
  "fixed z-50 shadow-lg focus:outline-none transition-colors duration-200",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b w-full",
        bottom: "inset-x-0 bottom-0 border-t w-full",
        left: "left-0 top-4 my-4 h-auto max-h-[min(85vh,640px)] w-[min(88vw,300px)] sm:w-[300px] rounded-r-2xl border-r",
        right:
          "right-0 top-4 my-4 h-auto max-h-[min(85vh,400px)] w-[min(92vw,240px)] sm:w-[200px] rounded-l-2xl border-l",
      },
    },
    defaultVariants: { side: "right" },
  }
);

type OverlayMode = "none" | "dim" | "solid";
type PanelMode = "adaptive" | "white" | "dark";

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  /** Ajuste largeur/arrondis */
  contained?: boolean;
  /** Style de l'overlay */
  overlay?: OverlayMode;
  /** Couleur du panneau */
  panel?: PanelMode;
}

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(
  (
    {
      side = "right",
      contained = false,
      overlay = "dim",
      panel = "adaptive", // 👈 Changé : adaptatif par défaut
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Map overlay -> classes Tailwind
    const overlayClass =
      overlay === "none"
        ? "bg-transparent"
        : overlay === "solid"
          ? "bg-white dark:bg-gray-900"
          : "bg-black/30 dark:bg-black/50"; // Plus visible en mode sombre

    // Map panel -> classes pour le fond et le texte
    const getPanelClasses = () => {
      switch (panel) {
        case "white":
          return "bg-white text-gray-900 border-gray-200";
        case "dark":
          return "bg-gray-900 text-white border-gray-700";
        case "adaptive":
        default:
          return [
            // Fond adaptatif
            "bg-white dark:bg-gray-900",
            // Texte adaptatif
            "text-gray-900 dark:text-white",
            // Bordures adaptatives
            "border-gray-200 dark:border-gray-700",
          ].join(" ");
      }
    };

    return (
      <SheetPortal>
        <SheetOverlay className={overlayClass} />
        <SheetPrimitive.Content
          ref={ref}
          data-contained={contained ? "true" : undefined}
          data-overlay={overlay}
          data-panel={panel}
          className={cn(
            sheetVariants({ side }),
            // Animations directionnelles
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            side === "left" &&
              "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
            side === "right" &&
              "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            side === "top" &&
              "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            side === "bottom" &&
              "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            // Layout interne
            "box-border overflow-y-auto p-4",
            // Largeur contenue supplémentaire
            contained && "sm:max-w-screen-md",
            // Classes adaptatives pour le panneau
            getPanelClasses(),
            className
          )}
          {...props}
        >
          {children}

          {/* Bouton de fermeture adaptatif */}
          <SheetPrimitive.Close
            className={cn(
              "absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors",
              "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
              "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            )}
            aria-label="Fermer le menu"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        </SheetPrimitive.Content>
      </SheetPortal>
    );
  }
);
SheetContent.displayName = "SheetContent";

/** Helpers adaptatifs */
export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-2 grid gap-2 text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

export const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "text-base font-semibold leading-none tracking-tight",
      "text-gray-900 dark:text-white", // Adaptatif
      className
    )}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm",
      "text-gray-600 dark:text-gray-400", // Adaptatif
      className
    )}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
