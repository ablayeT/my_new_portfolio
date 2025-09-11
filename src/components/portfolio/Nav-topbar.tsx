// src/components/portfolio/Nav-topbar.tsx
"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CVDownloadModal } from "./cv-download-modal";
import { Shield, Moon, Sun, Download, Loader2 } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navItems = [
  { id: "/", label: "Accueil" },
  { id: "/cv", label: "CV" },
  { id: "/projects", label: "Projets" },
  { id: "/blog", label: "Blog" },
  { id: "/contact", label: "Contact" },
];

export const NavTopbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ next-themes: on utilise resolvedTheme + setTheme (pas de toggleTheme)
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const [showDownloadModal, setShowDownloadModal] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : undefined;

  const handleNavigation = (path: string) => router.push(path);

  const handleToggleTheme = () => {
    if (!mounted) return;
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      <header
        style={{
          backgroundColor: "var(--tokens-semantic-surface-default)",
          borderBottom: "1px solid var(--tokens-semantic-border-default)",
          padding: "var(--tokens-spacing-16) var(--tokens-spacing-24)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Shield
              style={{ color: "var(--tokens-color-brand-primary)" }}
              size={28}
            />
            <div>
              <h1
                style={{
                  fontWeight: 600,
                  color: "var(--tokens-semantic-text-default)",
                  fontSize: "var(--tokens-text-body-16)",
                }}
              >
                Abdoulaye Touré
              </h1>
              <p
                style={{
                  fontSize: "var(--tokens-text-caption-12)",
                  color: "var(--tokens-semantic-text-muted)",
                }}
              >
                Expert Cybersécurité
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={pathname === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.id)}
                className="tokens-text-body-14-500"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDownloadModal(true)}
              className="tokens-text-body-14-500"
            >
              <Download size={16} />
              CV PDF
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleTheme}
              aria-label={
                !mounted
                  ? "Changer le thème"
                  : isDark
                    ? "Activer le mode clair"
                    : "Activer le mode sombre"
              }
            >
              {!mounted ? (
                <Loader2 size={16} className="animate-spin" />
              ) : isDark ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </Button>
          </div>
        </div>
      </header>

      <CVDownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </>
  );
};
