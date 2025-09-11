import type { Metadata } from "next";
// import { NavTopbar } from "@/components/portfolio/Nav-topbar";
import { ContactPage } from "@/components/portfolio/Contact-page";

export const metadata: Metadata = {
  title: "Contact - Abdoulaye Touré",
  description:
    "Contactez Abdoulaye Touré pour des opportunités d'alternance en cybersécurité, missions de conseil ou collaborations. Basé à Paris, France.",
  keywords: [
    "contact",
    "alternance",
    "cybersécurité",
    "paris",
    "consultation",
    "collaboration",
    "expert sécurité",
  ],
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* <NavTopbar /> */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <ContactPage />
      </main>
    </div>
  );
}
