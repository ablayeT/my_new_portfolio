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
    try {
      // Simu d'envoi (branchable plus tard sur un endpoint / server action)
      await new Promise((r) => setTimeout(r, 1500));
      console.log("Contact form submitted:", {
        ...formData,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData(DEFAULT_FORM);
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

  return {
    formData,
    setFormData,
    errors,
    isSubmitted,
    isSubmitting,
    isFormValid,
    handleInputChange,
    handleSubmit,
  };
}
