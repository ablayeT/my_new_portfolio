"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./cn";

type Intent = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Permet de rendre un autre élément (ex: <Link>) tout en conservant le style du bouton */
  asChild?: boolean;
  intent?: Intent;
  size?: Size;
  className?: string;
}

const intentClasses: Record<Intent, string> = {
  primary: cn(
    "text-[var(--tokens-color-neutral-0,#fff)]",
    "bg-[color:var(--tokens-color-brand-purple,#6d28d9)]",
    "hover:opacity-95",
    "disabled:opacity-60"
  ),
  secondary: cn(
    "text-[var(--color-foreground,#0b1324)]",
    "bg-[color:var(--color-muted,#f3f4f6)]",
    "hover:bg-[color:var(--color-muted,#f3f4f6)]/80",
    "border border-[color:var(--color-border,#e5e7eb)]",
    "disabled:opacity-60"
  ),
  outline: cn(
    "bg-transparent",
    "text-[var(--tokens-color-brand-purple,#6d28d9)]",
    "border border-[color:var(--color-border,#e5e7eb)]",
    "hover:bg-[color:var(--color-muted,#f3f4f6)]/60",
    "disabled:opacity-60"
  ),
  ghost: cn(
    "bg-transparent",
    "text-[var(--color-muted-foreground,#6b7280)]",
    "hover:bg-[color:var(--color-muted,#f3f4f6)]",
    "disabled:opacity-60"
  ),
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-[var(--tokens-radius-8,8px)]",
  md: "h-10 px-4 text-[14px] rounded-[var(--tokens-radius-8,8px)]",
  lg: "h-11 px-5 text-[16px] rounded-[var(--tokens-radius-12,12px)]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, intent = "primary", size = "md", className, ...props }, ref) => {
    // Si asChild est vrai, on rend le Slot (qui adopte l'élément enfant, ex: <Link>)
    // Sinon, on rend un <button> classique.
    const Comp = asChild ? Slot : ("button" as const);

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,#6366f1)] focus-visible:ring-offset-2",
          "active:scale-[0.98]",
          intentClasses[intent],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
