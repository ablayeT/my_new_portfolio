"use client";

import * as React from "react";
import { useContactForm } from "@/hooks/useContactForm";
import { CONTACT_COPY } from "@/data/contacts/contact";
import { StableWrap } from "@/components/layout/StableWrap";

// Parts
import { ContactHeader } from "@/components/contact/parts/Header";
import { ContactForm } from "@/components/contact/parts/Forms";
import { DirectList } from "@/components/contact/parts/DirectList";
import { LocationAvailability } from "@/components/contact/parts/LocationAvailability";

export interface ContactPageProps {
  className?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ className = "" }) => {
  const {
    formData,
    errors,
    serverError,
    isSubmitted,
    isSubmitting,
    isFormValid,
    handleInputChange,
    handleSubmit,
  } = useContactForm();

  return (
    <div className={`relative ${className}`}>
      {/* décor dark doux */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
      >
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#6d28d9]/15 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-[#0ea5e9]/15 blur-3xl" />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ContactHeader
          heading={CONTACT_COPY.heading}
          subtitle={CONTACT_COPY.subtitle}
        />

        {/* Grille */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Formulaire */}
          <StableWrap glow>
            <ContactForm
              formData={formData}
              errors={errors}
              serverError={serverError}
              isSubmitted={isSubmitted}
              isSubmitting={isSubmitting}
              isFormValid={isFormValid}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          </StableWrap>

          {/* Colonne de droite */}
          <div className="space-y-8">
            <StableWrap>
              <DirectList />
            </StableWrap>

            <StableWrap>
              <LocationAvailability />
            </StableWrap>
          </div>
        </div>

        {/* Pied d’info */}
        <div className="mx-auto mt-10 max-w-3xl text-center text-sm text-[color:var(--color-muted-foreground,#6b7280)]">
          * Vos informations ne seront jamais partagées. Réponse sous 24h (jours
          ouvrés).
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
