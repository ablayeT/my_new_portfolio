// src/components/portfolio/Footer.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Shield, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavLink = { href: string; label: string };
type SocialLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  external?: boolean;
  aria: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/cv", label: "CV" },
  { href: "/projects", label: "Projets" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const socialLinks: SocialLink[] = [
  {
    href: "mailto:ablayetoure2014@gmail.com",
    label: "Email",
    icon: Mail,
    aria: "Envoyer un email",
  },
  {
    href: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
    label: "LinkedIn",
    icon: Linkedin,
    external: true,
    aria: "Ouvrir le profil LinkedIn",
  },
  {
    href: "https://github.com/ablayeT?tab=repositories",
    label: "GitHub",
    icon: Github,
    external: true,
    aria: "Ouvrir le profil GitHub",
  },
];

/** Logo compact, rond, avec dégradé violet */
function BrandMark() {
  return (
    <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-violet-200 via-fuchsia-500 to-indigo-200 shadow-sm ring-1 ring-black/5">
      <div className="absolute inset-[2px] rounded-full bg-background/80 backdrop-blur-sm" />
      <Shield
        size={16}
        className="relative text-violet-100 dark:text-violet-100"
        strokeWidth={2.5}
      />
    </div>
  );
}

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t bg-muted/30"
      style={{
        // couleurs de secours si variables absentes
        borderColor: "var(--tokens-semantic-border-default, hsl(240 5% 84%))",
      }}
    >
      {/* Hairline dégradée très subtile */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,.45), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Zone haute : plus compacte */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/">
              <div className="flex items-center gap-3">
                <BrandMark />

                <div className="min-w-0">
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                      Abdoulaye Touré
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Cybersécurité • Purple Team • Dev
                  </p>
                </div>
              </div>
            </Link>

            <p className="mt-3 max-w-prose text-sm leading-6 text-muted-foreground">
              Projets concrets (SIEM, hunts, réponse à incident) & outils
              automatisés, pensés pour l’impact opérationnel.
            </p>

            {/* Socials — icônes rondes, compactes */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {socialLinks.map(
                ({ href, label, icon: Icon, external, aria }) => (
                  <Button
                    key={label}
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full border border-transparent hover:border-border hover:bg-background/60 hover:text-violet-600 dark:hover:text-violet-400"
                    aria-label={aria}
                  >
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      title={label}
                    >
                      <Icon size={18} />
                      <span className="sr-only">{label}</span>
                    </a>
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-4">
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
              {navLinks.map((link) => {
                const isInternal = link.href.startsWith("/");
                const Item = (
                  <span className="inline-flex items-center gap-2 rounded-md px-1.5 py-1 text-sm text-muted-foreground hover:text-foreground">
                    <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-violet-600 after:to-indigo-500 after:transition-all after:content-[''] hover:after:w-full">
                      {link.label}
                    </span>
                  </span>
                );
                return (
                  <li key={link.href}>
                    {isInternal ? (
                      <Link href={link.href} className="block">
                        {Item}
                      </Link>
                    ) : (
                      <a href={link.href} className="block">
                        {Item}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Contact rapide */}
          <div className="md:col-span-3">
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:ablayetoure2014@gmail.com"
                  className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  aria-label="Envoyer un email"
                >
                  <Mail
                    size={16}
                    className="text-violet-600 group-hover:scale-110 group-hover:rotate-3 transition-all"
                  />
                  <span className="truncate">
                    ablayetoure2014@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/abdoulaye-toure-b37b30100/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  aria-label="Ouvrir le profil LinkedIn"
                >
                  <Linkedin
                    size={16}
                    className="text-violet-600 group-hover:scale-110 transition-transform"
                  />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ablayeT?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  aria-label="Ouvrir le profil GitHub"
                >
                  <Github
                    size={16}
                    className="text-violet-600 group-hover:scale-110 transition-transform"
                  />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre basse minimaliste */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-4 text-xs text-muted-foreground md:flex-row">
          <p>© {currentYear} Abdoulaye Touré — Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-foreground hover:underline underline-offset-4"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/legal"
              className="hover:text-foreground hover:underline underline-offset-4"
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
