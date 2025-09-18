// src/app/cv/page.tsx
import type { Metadata } from "next";
import CVPage from "@/components/cv/Cv-Page";

export const metadata: Metadata = {
  title: "CV — Abdoulaye Touré",
  description:
    "CV d'Abdoulaye Touré — cybersécurité, Purple Team, pentest, threat hunting et développement d’outils sécurité.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <CVPage />
    </main>
  );
}
