import type { Metadata } from "next";
import { contactMetadata } from "@/data/contacts/contact";
import { ContactPage } from "@/components/portfolio/Contact-page";

export const metadata: Metadata = contactMetadata;

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <ContactPage />
      </main>
    </div>
  );
}
