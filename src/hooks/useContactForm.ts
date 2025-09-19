"use client";

import * as React from "react";
import { CONTACT_ERRORS } from "@/data/contacts/contact";

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
};

const DEFAULT_FORM: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
};

export function useContactForm() {
  const [formData, setFormData] = React.useState<ContactFormData>(DEFAULT_FORM);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, type } = e.target as HTMLInputElement;
      const value =
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setFormData((prev) => ({ ...prev, [name]: value as any }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
      if (serverError) setServerError(null);
    },
    [errors, serverError]
  );

  const validateForm = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = CONTACT_ERRORS.nameReq;
    if (!formData.email.trim()) {
      next.email = CONTACT_ERRORS.emailReq;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = CONTACT_ERRORS.emailFmt;
    }
    if (!formData.message.trim()) {
      next.message = CONTACT_ERRORS.msgReq;
    } else if (formData.message.trim().length < 10) {
      next.message = CONTACT_ERRORS.msgLen;
    }
    if (!formData.consent) next.consent = CONTACT_ERRORS.consentReq;

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || "Échec d’envoi du message.");
      }

      setIsSubmitted(true);
      // reset “soft” après affichage du succès
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData(DEFAULT_FORM);
      }, 3500);
    } catch (err: any) {
      setServerError(err.message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    !!formData.name &&
    !!formData.email &&
    !!formData.message &&
    formData.consent;

  return {
    formData,
    setFormData,
    errors,
    serverError,
    isSubmitted,
    isSubmitting,
    isFormValid,
    handleInputChange,
    handleSubmit,
  };
}
