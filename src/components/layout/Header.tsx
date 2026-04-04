"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { Menu, Download, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./Theme-toggle";
import { CVDownloadModal } from "@/components/portfolio/cv-download-modal"; // ← import modal

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "CV", href: "/cv" },
  { name: "Projets", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "AI", href: "/ai" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false); // ← état modal CV

  useEffect(() => { setMounted(true); }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const brand = useMemo(() => (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-md bg-gradient-to-br from-tokens-color-brand-primary to-tokens-color-brand-purple" />
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-1"
        style={{
          backgroundColor: "color-mix(in oklab, var(--tokens-color-brand-purple) 12%, white)",
          borderColor: "color-mix(in oklab, var(--tokens-color-brand-purple) 35%, transparent)",
        }}
        aria-hidden
      >
        <Shield className="h-5 w-5" style={{ color: "var(--tokens-color-brand-purple)" }} />
      </span>
      <span className="font-semibold">Abdoulaye Touré</span>
    </div>
  ), []);

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigation.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active ? "text-foreground" : "text-foreground/65 hover:text-foreground",
              mobile && "block w-full text-left"
            )}
            onClick={() => mobile && setIsOpen(false)}
          >
            <span>{item.name}</span>
            <span className={cn(
              "pointer-events-none absolute inset-x-2 -bottom-[3px] h-[2px] rounded-full",
              "bg-gradient-to-r from-tokens-color-brand-primary/0 via-tokens-color-brand-primary/50 to-tokens-color-brand-primary/0",
              "opacity-0 transition-all duration-200 group-hover:opacity-100",
              active && "opacity-100"
            )} />
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between gap-2">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">{brand}</Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <NavItems />
          </nav>

          {/* Actions droites */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* ← Bouton desktop ouvre le modal */}
            <Button
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => setCvModalOpen(true)}
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger mon CV
            </Button>

            {/* Menu mobile */}
            {mounted && (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="md:hidden h-9 w-9 px-0"
                    aria-label="Ouvrir le menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" contained overlay="dim" panel="white" aria-label="Menu principal">
                  <SheetHeader className="px-6 pt-6 pb-2">
                    <SheetTitle className="sr-only">Menu principal</SheetTitle>
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      {brand}
                    </Link>
                  </SheetHeader>

                  <div className="px-6 pb-6">
                    <nav className="mt-4 flex flex-col">
                      <NavItems mobile />
                    </nav>

                    {/* ← Bouton mobile ouvre le modal */}
                    <div className="mt-6 border-t pt-4">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          setIsOpen(false);
                          setCvModalOpen(true);
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger CV
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </header>

      {/* ← Modal bilingue — rendu en dehors du header */}
      <CVDownloadModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />
    </>
  );
}