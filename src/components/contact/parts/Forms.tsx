"use client";

import * as React from "react";
import { PurpleButton } from "@/components/purple-ui/Purple-button";
import { CONTACT_FORM_TEXT } from "@/data/contacts/contact";
import type { ContactFormData } from "@/hooks/useContactForm";
import { Check, Loader2, Send } from "@/components/portfolio/Icons";

function FieldError({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="mt-1 text-sm text-[color:var(--color-feedback-danger,#dc2626)]">
      {text}
    </p>
  );
}

export function ContactForm({
  formData,
  errors,
  serverError,
  isSubmitted,
  isSubmitting,
  isFormValid,
  onChange,
  onSubmit,
}: {
  formData: ContactFormData;
  errors: Record<string, string>;
  serverError: string | null;
  isSubmitted: boolean;
  isSubmitting: boolean;
  isFormValid: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
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
        <form onSubmit={onSubmit} className="space-y-5">
          {/* name + email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[color:var(--color-foreground,#0b1324)]">
                {CONTACT_FORM_TEXT.nameLabel}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder={CONTACT_FORM_TEXT.namePlaceholder}
                autoComplete="name"
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
              <FieldError text={errors.name} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[color:var(--color-foreground,#0b1324)]">
                {CONTACT_FORM_TEXT.emailLabel}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder={CONTACT_FORM_TEXT.emailPlaceholder}
                autoComplete="email"
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
              {CONTACT_FORM_TEXT.subjectLabel}
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={onChange}
              placeholder={CONTACT_FORM_TEXT.subjectPlaceholder}
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
              {CONTACT_FORM_TEXT.messageLabel}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={onChange}
              placeholder={CONTACT_FORM_TEXT.messagePlaceholder}
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
              onChange={onChange}
              required
              className="mt-1 h-4 w-4 rounded border-[color:var(--color-border,#e5e7eb)] text-[#6d28d9] focus:ring-[#6d28d9]"
            />
            <div>
              <p className="text-sm text-[color:var(--color-muted-foreground,#6b7280)] leading-relaxed">
                En cochant cette case, vous acceptez que vos informations soient
                utilisées pour vous répondre.
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
                {CONTACT_FORM_TEXT.sending}
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                {CONTACT_FORM_TEXT.submit}
              </>
            )}
          </PurpleButton>

          {serverError && (
            <p className="mt-3 text-sm text-[color:var(--color-feedback-danger,#dc2626)]">
              {serverError}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
