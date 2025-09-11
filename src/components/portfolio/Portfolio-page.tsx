import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export interface ContactPageProps {
  className?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitStatus("success");
    setIsSubmitting(false);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
      setSubmitStatus("idle");
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email professionnel",
      value: "ablayetoure2014@gmail.com",
      description: "Réponse sous 24h en général",
      href: "mailto:ablayetoure2014@gmail.com",
      primary: true,
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "/in/abdoulaye-toure",
      description: "Réseau professionnel",
      href: "https://linkedin.com/in/abdoulaye-toure",
      primary: false,
    },
    {
      icon: Github,
      title: "GitHub",
      value: "/abdoulaye-toure",
      description: "Mes projets open source",
      href: "https://github.com/abdoulaye-toure",
      primary: false,
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 644 93 26 27",
      description: "Sur rendez-vous uniquement",
      href: "tel:+33644932627",
      primary: false,
    },
  ];

  const availabilitySlots = [
    "Recherche d'alternance Master Cybersécurité (Sept 2025)",
    "Missions de conseil courte durée",
    "Projets freelance en sécurité",
    "Conférences et formations",
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <section className="text-center">
        <div className="mb-6">
          <MessageCircle
            className="mx-auto mb-4 tokens-color-brand-purple"
            size={64}
          />
        </div>

        <h1 className="tokens-text-h1-36-700 tokens-color-brand-primary mb-4">
          Contactez-moi
        </h1>

        <p className="tokens-text-body-16-500 tokens-color-neutral-700 max-w-2xl mx-auto mb-6">
          Vous avez un projet en cybersécurité ? Une opportunité
          d&apos;alternance ? Ou simplement envie d&apos;échanger sur les
          dernières tendances en sécurité informatique ? N&apos;hésitez pas à me
          contacter !
        </p>

        <div className="flex items-center justify-center gap-2 mb-8">
          <Badge variant="default" className="tokens-text-body-14-500">
            <Calendar size={14} className="mr-1" />
            Disponible pour alternance Sept 2025
          </Badge>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="tokens-text-h3-22-600 flex items-center gap-2">
              <Send className="tokens-color-brand-purple" size={20} />
              Envoyer un message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="tokens-text-body-14-500">
                    Nom *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="tokens-text-body-14-500">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company" className="tokens-text-body-14-500">
                  Entreprise
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="tokens-text-body-14-500">
                  Sujet *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <Label htmlFor="message" className="tokens-text-body-14-500">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 min-h-[120px]"
                  placeholder="Décrivez votre projet, opportunité ou question..."
                />
              </div>

              {submitStatus === "success" && (
                <div className="flex items-center gap-2 tokens-p-12 tokens-bg-feedback-success/10 tokens-color-feedback-success tokens-radius-8">
                  <CheckCircle size={16} />
                  <span className="tokens-text-body-14-500">
                    Message envoyé avec succès ! Je vous répondrai sous 24h.
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 tokens-p-12 tokens-bg-feedback-danger/10 tokens-color-feedback-danger tokens-radius-8">
                  <AlertCircle size={16} />
                  <span className="tokens-text-body-14-500">
                    Erreur lors de l&apos;envoi. Veuillez réessayer.
                  </span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full tokens-text-body-14-500"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Envoyer le message
                  </>
                )}
              </Button>

              <p className="tokens-text-caption-12-500 tokens-color-neutral-500 text-center">
                * Champs obligatoires
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Contact Methods & Info */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="tokens-text-h3-22-600">
                Autres moyens de contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <div key={method.title} className="flex items-start gap-3">
                    <div
                      className={`tokens-p-8 tokens-radius-8 ${method.primary ? "tokens-bg-brand-purple" : "tokens-bg-neutral-100"}`}
                    >
                      <IconComponent
                        className={
                          method.primary
                            ? "tokens-color-neutral-0"
                            : "tokens-color-brand-purple"
                        }
                        size={16}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="tokens-text-body-14-500 mb-1">
                        {method.title}
                      </h4>
                      <a
                        href={method.href}
                        className="tokens-color-brand-purple hover:underline tokens-text-body-14-500 block mb-1"
                        target={
                          method.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          method.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {method.value}
                      </a>
                      <p className="tokens-text-caption-12-500 tokens-color-neutral-500">
                        {method.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="tokens-text-h3-22-600 flex items-center gap-2">
                <Calendar className="tokens-color-brand-purple" size={20} />
                Disponibilités
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {availabilitySlots.map((slot, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle
                      className="tokens-color-feedback-success mt-1 flex-shrink-0"
                      size={16}
                    />
                    <span className="tokens-text-body-14-500">{slot}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="tokens-text-h3-22-600 flex items-center gap-2">
                <MapPin className="tokens-color-brand-purple" size={20} />
                Localisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="tokens-text-body-16-500 mb-2">📍 Paris, France</p>
              <p className="tokens-text-body-14-500 tokens-color-neutral-700 mb-4">
                Basé à Paris, disponible pour des missions en Île-de-France ou
                en remote.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="tokens-text-caption-12-500">
                  Remote OK
                </Badge>
                <Badge variant="outline" className="tokens-text-caption-12-500">
                  Déplacements IDF
                </Badge>
                <Badge variant="outline" className="tokens-text-caption-12-500">
                  Missions courtes
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="tokens-text-h3-22-600">
            Questions fréquentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="tokens-text-body-16-500 mb-2">
                🎓 Quand commencez-vous votre alternance ?
              </h4>
              <p className="tokens-text-body-14-500 tokens-color-neutral-700 mb-4">
                Je recherche une alternance pour septembre 2025 dans le cadre de
                mon Master en Cybersécurité.
              </p>
            </div>

            <div>
              <h4 className="tokens-text-body-16-500 mb-2">
                💼 Quels types de missions vous intéressent ?
              </h4>
              <p className="tokens-text-body-14-500 tokens-color-neutral-700 mb-4">
                Audit/pentest, développement d&apos;outils sécurité, Purple
                Team, et projets innovants en cybersécurité.
              </p>
            </div>

            <div>
              <h4 className="tokens-text-body-16-500 mb-2">
                ⏱️ Quel est votre délai de réponse ?
              </h4>
              <p className="tokens-text-body-14-500 tokens-color-neutral-700 mb-4">
                Je réponds généralement sous 24h aux messages professionnels,
                même le weekend.
              </p>
            </div>

            <div>
              <h4 className="tokens-text-body-16-500 mb-2">
                🌍 Travaillez-vous en remote ?
              </h4>
              <p className="tokens-text-body-14-500 tokens-color-neutral-700 mb-4">
                Oui, j&apos;ai l&apos;expérience du travail à distance et peux
                m&apos;adapter selon vos besoins.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
