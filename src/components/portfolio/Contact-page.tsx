"use client";

import * as React from "react";
import { PurpleButton } from "@/components/purple-ui/Purple-button";
import { PurpleCard } from "@/components/purple-ui/Purple-card";
import {
  Mail,
  LinkedIn,
  GitHub,
  MapPin,
  Send,
  Check,
  Loader2,
} from "@/components/portfolio/Icons";

export interface ContactPageProps {
  className?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ className = "" }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // -------- Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = "Le nom est requis";
    if (!formData.email.trim()) {
      next.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Format d'email invalide";
    }
    if (!formData.message.trim()) {
      next.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      next.message = "Le message doit contenir au moins 10 caractères";
    }
    if (!formData.consent) {
      next.consent = "Vous devez accepter le traitement de vos données";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // simulate
      await new Promise((r) => setTimeout(r, 1500));
      console.log("Contact form submitted:", {
        ...formData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          consent: false,
        });
      }, 3500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    !!formData.name &&
    !!formData.email &&
    !!formData.message &&
    formData.consent;

  // -------- UI helpers
  function FieldError({ text }: { text?: string }) {
    if (!text) return null;
    return (
      <p className="mt-1 text-sm text-[color:var(--color-feedback-danger,#dc2626)]">
        {text}
      </p>
    );
  }

  /**
   * FancyWrap
   * - **mode clair** : pas de fond, simple bordure + ombre douce (propre comme la home)
   * - **mode sombre** : léger “ring” dégradé pour garder le look premium
   */
  function FancyWrap({
    children,
    className = "",
    glow = true,
  }: {
    children: React.ReactNode;
    className?: string;
    glow?: boolean;
  }) {
    return (
      <div
        className={[
          "relative rounded-2xl",
          // Light: clean card (no bg color), border + shadow
          "border border-[color:var(--color-border,#e5e7eb)] shadow-[0_8px_28px_rgba(2,6,23,0.08)]",
          // Dark: gradient ring & stronger drop shadow
          "dark:border-transparent dark:p-[1px] dark:bg-gradient-to-br dark:from-[#6d28d9] dark:via-[#7c3aed] dark:to-[#0ea5e9]",
          glow ? "dark:shadow-[0_18px_60px_-20px_rgba(109,40,217,0.45)]" : "",
          className,
        ].join(" ")}
      >
        <PurpleCard
          elev={1}
          className={[
            "rounded-2xl",
            // Light: **pas de couleur de fond**
            "bg-transparent border-transparent",
            // Dark: surface douce et lisible
            "dark:bg-[color:var(--color-neutral-900,#0b1220)]/80 dark:border-transparent dark:backdrop-blur-md",
          ].join(" ")}
        >
          {children}
        </PurpleCard>
      </div>
    );
  }

  const contactItems = [
    {
      icon: Mail,
      title: "Email",
      value: "abdoulaye.toure@example.com",
      href: "mailto:abdoulaye.toure@example.com",
      toneBg: "bg-[#6d28d9]/15",
      tone: "text-[#6d28d9]",
    },
    {
      icon: LinkedIn,
      title: "LinkedIn",
      value: "/in/abdoulaye-toure",
      href: "https://linkedin.com/in/abdoulaye-toure",
      toneBg: "bg-[#0ea5e9]/15",
      tone: "text-[#0ea5e9]",
    },
    {
      icon: GitHub,
      title: "GitHub",
      value: "/abdoulaye-toure",
      href: "https://github.com/abdoulaye-toure",
      toneBg: "bg-[#6b7280]/15",
      tone: "text-[#6b7280]",
    },
  ] as const;

  return (
    <div className={`relative ${className}`}>
      {/* Décor : visible uniquement en sombre (clair = aucune couleur de fond) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
      >
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#6d28d9]/15 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-[#0ea5e9]/15 blur-3xl" />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="mb-10 text-center">
          <h1
            className={[
              "mb-3 font-extrabold leading-tight",
              "[font-size:clamp(28px,4.2vw,40px)]",
              "bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#0ea5e9] bg-clip-text text-transparent",
            ].join(" ")}
          >
            Contact
          </h1>
          <p className="mx-auto max-w-2xl text-[color:var(--color-muted-foreground,#6b7280)] [font-size:var(--tokens-text-body-16,16px)]">
            Vous avez une question, un projet ou souhaitez collaborer ?
            Écrivez-moi, je réponds rapidement.
          </p>
        </div>

        {/* grille */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* formulaire */}
          <FancyWrap glow>
            <div className="space-y-6">
              <h2 className="[font-size:var(--tokens-text-h3-22,22px)] font-semibold text-[color:var(--color-foreground,#0b1324)]">
                Envoyez-moi un message
              </h2>

              {isSubmitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#22c55e]/15">
                    <Check className="text-[#16a34a]" size={28} />
                  </div>
                  <h3 className="mb-1 font-semibold text-[color:var(--color-foreground,#0b1324)]">
                    Message envoyé !
                  </h3>
                  <p className="text-[color:var(--color-muted-foreground,#6b7280)]">
                    Merci pour votre message. Je vous répondrai très vite.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* name + email */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[color:var(--color-foreground,#0b1324)]">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Votre nom et prénom"
                        required
                        className={[
                          // **mode clair : pas de fond**, bord + ombre
                          "w-full rounded-2xl px-3 py-2 transition-all",
                          "bg-transparent",
                          "border border-[color:var(--color-border,#e5e7eb)]",
                          "shadow-[0_2px_10px_rgba(2,6,23,0.06)] hover:shadow-[0_6px_18px_rgba(2,6,23,0.08)]",
                          "focus:outline-none focus:ring-4 focus:ring-[#6d28d9]/20 focus:border-[#6d28d9]",
                          // sombre : surface légère
                          "dark:bg-white/5",
                        ].join(" ")}
                      />
                      <FieldError text={errors.name} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[color:var(--color-foreground,#0b1324)]">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="vous@exemple.com"
                        required
                        className={[
                          "w-full rounded-2xl px-3 py-2 transition-all",
                          "bg-transparent",
                          "border border-[color:var(--color-border,#e5e7eb)]",
                          "shadow-[0_2px_10px_rgba(2,6,23,0.06)] hover:shadow-[0_6px_18px_rgba(2,6,23,0.08)]",
                          "focus:outline-none focus:ring-4 focus:ring-[#6d28d9]/20 focus:border-[#6d28d9]",
                          "dark:bg-white/5",
                        ].join(" ")}
                      />
                      <FieldError text={errors.email} />
                    </div>
                  </div>

                  {/* subject */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[color:var(--color-foreground,#0b1324)]">
                      Sujet
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Objet de votre message"
                      className={[
                        "w-full rounded-2xl px-3 py-2 transition-all",
                        "bg-transparent",
                        "border border-[color:var(--color-border,#e5e7eb)]",
                        "shadow-[0_2px_10px_rgba(2,6,23,0.06)] hover:shadow-[0_6px_18px_rgba(2,6,23,0.08)]",
                        "focus:outline-none focus:ring-4 focus:ring-[#6d28d9]/20 focus:border-[#6d28d9]",
                        "dark:bg-white/5",
                      ].join(" ")}
                    />
                  </div>

                  {/* message */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[color:var(--color-foreground,#0b1324)]">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Décrivez votre projet, question ou demande…"
                      rows={6}
                      required
                      className={[
                        "w-full resize-vertical rounded-2xl px-3 py-2 transition-all",
                        "bg-transparent",
                        "border border-[color:var(--color-border,#e5e7eb)]",
                        "shadow-[0_2px_10px_rgba(2,6,23,0.06)] hover:shadow-[0_6px_18px_rgba(2,6,23,0.08)]",
                        "focus:outline-none focus:ring-4 focus:ring-[#6d28d9]/20 focus:border-[#6d28d9]",
                        "dark:bg-white/5",
                      ].join(" ")}
                    />
                    <FieldError text={errors.message} />
                  </div>

                  {/* consent */}
                  <div className="flex items-start gap-3 rounded-2xl border border-[color:var(--color-border,#e5e7eb)] bg-transparent p-3 shadow-[0_2px_10px_rgba(2,6,23,0.04)] dark:bg-white/5">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      required
                      className="mt-1 h-4 w-4 rounded border-[color:var(--color-border,#e5e7eb)] text-[#6d28d9] focus:ring-[#6d28d9]"
                    />
                    <div>
                      <p className="text-sm text-[color:var(--color-muted-foreground,#6b7280)] leading-relaxed">
                        J&apos;accepte que mes données personnelles soient
                        utilisées pour me recontacter dans le cadre de cette
                        demande. Elles ne seront pas partagées ni utilisées à
                        d&apos;autres fins. *
                      </p>
                      <FieldError text={errors.consent} />
                    </div>
                  </div>

                  {/* CTA */}
                  <PurpleButton
                    type="submit"
                    intent="primary"
                    size="lg"
                    className="w-full rounded-2xl"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </PurpleButton>
                </form>
              )}
            </div>
          </FancyWrap>

          {/* colonne droite */}
          <div className="space-y-8">
            {/* contact direct */}
            <FancyWrap>
              <div className="space-y-6">
                <h2 className="[font-size:var(--tokens-text-h3-22,22px)] font-semibold text-[color:var(--color-foreground,#0b1324)]">
                  Contact direct
                </h2>

                <div className="space-y-4">
                  {contactItems.map((c) => {
                    const Icon = c.icon;
                    return (
                      <a
                        key={c.title}
                        href={c.href}
                        target={
                          c.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          c.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={[
                          "group flex items-center gap-3 rounded-2xl border",
                          "border-[color:var(--color-border,#e5e7eb)]",
                          "bg-transparent",
                          "px-3 py-3 transition-all hover:shadow-[0_10px_28px_rgba(2,6,23,0.08)]",
                          "dark:bg-white/5",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "rounded-xl p-2 transition-transform",
                            c.toneBg,
                            "group-hover:scale-105",
                          ].join(" ")}
                        >
                          <Icon className={c.tone} size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-[color:var(--color-foreground,#0b1324)]">
                            {c.title}
                          </p>
                          <p className="truncate text-sm text-[color:var(--color-muted-foreground,#6b7280)]">
                            {c.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </FancyWrap>

            {/* localisation & dispo */}
            <FancyWrap>
              <div className="space-y-5">
                <h3 className="font-semibold text-[color:var(--color-foreground,#0b1324)]">
                  Localisation & Disponibilité
                </h3>

                <div className="flex items-start gap-3 rounded-2xl border border-[color:var(--color-border,#e5e7eb)] bg-transparent p-3 shadow-[0_2px_10px_rgba(2,6,23,0.04)] dark:bg-white/5">
                  <div className="rounded-xl bg-[#0ea5e9]/15 p-2">
                    <MapPin className="text-[#0ea5e9]" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-[color:var(--color-foreground,#0b1324)]">
                      Paris, France
                    </p>
                    <p className="text-sm text-[color:var(--color-muted-foreground,#6b7280)]">
                      Disponible en remote ou sur site (IDF)
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-300/40 bg-emerald-50/80 px-3 py-2 text-emerald-700 shadow-[0_2px_10px_rgba(2,6,23,0.04)] dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-900/40">
                  ✅ Actuellement disponible pour nouveaux projets
                </div>
              </div>
            </FancyWrap>
          </div>
        </div>

        {/* pied d’info léger */}
        <div className="mx-auto mt-10 max-w-3xl text-center text-sm text-[color:var(--color-muted-foreground,#6b7280)]">
          * Vos informations ne seront jamais partagées. Réponse sous 24h (jours
          ouvrés).
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
