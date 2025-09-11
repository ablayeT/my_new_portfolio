"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"; // ou ton bouton maison
import { Sun, Moon, Loader2 } from "@/components/portfolio/Icons";

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : undefined;

  const aria = !mounted
    ? "Changer le thème"
    : isDark
      ? "Activer le mode clair"
      : "Activer le mode sombre";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={aria}
      onClick={() => {
        if (!mounted) return;
        setTheme(isDark ? "light" : "dark");
      }}
    >
      {/* Icône stable au SSR (placeholder) puis vraie icône après mount */}
      <span aria-hidden>
        {!mounted ? (
          <Loader2 size={16} className="animate-spin" />
        ) : isDark ? (
          <Sun size={16} />
        ) : (
          <Moon size={16} />
        )}
      </span>
    </Button>
  );
}
