import React from "react";
import { cn } from "../ui/utils";

export interface PurpleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  state?: "default" | "hover" | "pressed" | "disabled";
  children: React.ReactNode;
}

const buttonVariants = {
  intent: {
    primary: {
      default:
        "bg-[var(--tokens-semantic-action-primary-bg)] text-[var(--tokens-semantic-action-primary-text)] border border-transparent",
      hover:
        "hover:bg-[var(--tokens-semantic-action-primary-hover)] hover:shadow-[var(--tokens-effect-shadow-sm)]",
      pressed:
        "active:bg-[var(--tokens-semantic-action-primary-pressed)] active:translate-y-[1px] active:shadow-none",
      disabled:
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    },
    secondary: {
      default:
        "bg-[var(--tokens-semantic-action-secondary-bg)] text-[var(--tokens-semantic-action-secondary-text)] border border-[var(--tokens-semantic-action-secondary-border)]",
      hover:
        "hover:bg-[var(--tokens-semantic-surface-muted)] hover:shadow-[var(--tokens-effect-shadow-sm)]",
      pressed:
        "active:bg-[var(--tokens-semantic-border-default)] active:translate-y-[1px] active:shadow-none",
      disabled:
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    },
    ghost: {
      default:
        "bg-[var(--tokens-semantic-action-ghost-bg)] text-[var(--tokens-semantic-action-ghost-text)] border border-transparent",
      hover: "hover:bg-[var(--tokens-semantic-action-ghost-hover-bg)]",
      pressed:
        "active:bg-[var(--tokens-semantic-action-ghost-hover-bg)] active:translate-y-[1px]",
      disabled:
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    },
  },
  size: {
    sm: "px-[var(--tokens-spacing-12)] py-[var(--tokens-spacing-8)] text-[var(--tokens-text-caption-12)] min-h-[32px]",
    md: "px-[var(--tokens-spacing-16)] py-[var(--tokens-spacing-12)] text-[var(--tokens-text-body-14)] min-h-[40px]",
    lg: "px-[var(--tokens-spacing-24)] py-[var(--tokens-spacing-16)] text-[var(--tokens-text-body-16)] min-h-[48px]",
  },
};

export const PurpleButton: React.FC<PurpleButtonProps> = ({
  intent = "primary",
  size = "md",
  state,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const intentStyles = buttonVariants.intent[intent];

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--tokens-semantic-border-focus)]",
        "rounded-[var(--tokens-radius-8)]",
        // Base intent styles
        intentStyles.default,
        intentStyles.hover,
        intentStyles.pressed,
        // Size styles with tokens
        buttonVariants.size[size],
        // Disabled state
        (disabled || state === "disabled") && intentStyles.disabled,
        className
      )}
      disabled={disabled || state === "disabled"}
      {...props}
    >
      {children}
    </button>
  );
};
