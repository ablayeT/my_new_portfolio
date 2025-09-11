import React from "react";
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
    href: "mailto:abdoulaye.toure.cyber@gmail.com",
    label: "Email",
    icon: Mail,
    aria: "Envoyer un email",
  },
  {
    href: "https://linkedin.com/in/abdoulaye-toure-cyber",
    label: "LinkedIn",
    icon: Linkedin,
    external: true,
    aria: "Ouvrir le profil LinkedIn",
  },
  {
    href: "https://github.com/abdoulaye-toure",
    label: "GitHub",
    icon: Github,
    external: true,
    aria: "Ouvrir le profil GitHub",
  },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="mt-16"
      style={{
        backgroundColor: "var(--tokens-semantic-surface-muted)",
        borderTop: "1px solid var(--tokens-semantic-border-default)",
      }}
    >
      {/* Barre subtile en dégradé (donne du relief sans heurter la charte) */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--tokens-color-brand-primary, #6d28d9), transparent)",
          opacity: 0.3,
        }}
      />

      {/* Contenu */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Top area: Brand + Nav + Contact */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand / intro */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <Shield
                size={28}
                className="shrink-0"
                style={{ color: "var(--tokens-color-brand-primary)" }}
              />
              <div>
                <h3 className="tokens-text-body-16-500 tokens-color-brand-primary">
                  Abdoulaye Touré
                </h3>
                <p className="tokens-text-caption-12-500 tokens-color-neutral-500">
                  Expert Cybersécurité
                </p>
              </div>
            </div>

            <p className="tokens-text-body-14-500 tokens-color-neutral-700 leading-relaxed">
              Recherche d&apos;alternance en Master Cybersécurité. Spécialisé en
              Purple Team et développement web.
            </p>

            {/* Socials (passe en ligne sur desktop, en pile sur mobile) */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map(
                ({ href, label, icon: Icon, external, aria }) => (
                  <Button
                    key={label}
                    asChild
                    variant="ghost"
                    size="sm"
                    className="gap-2 rounded-[10px] border border-transparent hover:border-[var(--tokens-semantic-border-default)] hover:shadow-sm transition-all"
                  >
                    <a
                      href={href}
                      aria-label={aria}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <Icon size={16} />
                      <span className="tokens-text-body-14-500">{label}</span>
                    </a>
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-4">
            <h4 className="tokens-text-body-16-500 tokens-color-brand-primary mb-4">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-[10px] px-2 py-1 tokens-text-body-14-500 tokens-color-neutral-700 hover:tokens-color-brand-purple hover:bg-[color:var(--color-muted,#f3f4f6)]/60 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact direct (boutons ancrés + mise en colonne) */}
          <div className="md:col-span-3">
            <h4 className="tokens-text-body-16-500 tokens-color-brand-primary mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <Button
                variant="ghost"
                size="sm"
                className="tokens-text-body-14-500 justify-start p-0 h-auto"
                asChild
              >
                <a
                  href="mailto:abdoulaye.toure.cyber@gmail.com"
                  aria-label="Envoyer un email"
                >
                  <Mail size={16} className="mr-2" />
                  <span className="truncate">
                    abdoulaye.toure.cyber@gmail.com
                  </span>
                </a>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="tokens-text-body-14-500 justify-start p-0 h-auto"
                asChild
              >
                <a
                  href="https://linkedin.com/in/abdoulaye-toure-cyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ouvrir le profil LinkedIn"
                >
                  <Linkedin size={16} className="mr-2" />
                  <span>LinkedIn</span>
                </a>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="tokens-text-body-14-500 justify-start p-0 h-auto"
                asChild
              >
                <a
                  href="https://github.com/abdoulaye-toure"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ouvrir le profil GitHub"
                >
                  <Github size={16} className="mr-2" />
                  <span>GitHub</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row"
          style={{ borderColor: "var(--tokens-semantic-border-default)" }}
        >
          <p className="tokens-text-caption-12-500 tokens-color-neutral-500 text-center md:text-left">
            © {currentYear} Abdoulaye Touré. Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="/privacy"
              className="tokens-text-caption-12-500 tokens-color-neutral-500 hover:tokens-color-brand-purple transition-colors"
            >
              Politique de confidentialité
            </a>
            <a
              href="/legal"
              className="tokens-text-caption-12-500 tokens-color-neutral-500 hover:tokens-color-brand-purple transition-colors"
            >
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
