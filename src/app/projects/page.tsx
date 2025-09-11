// src/app/projects/page.tsx
"use client";

import { useRouter } from "next/navigation";
// import { NavTopbar } from "@/components/portfolio/Nav-topbar";
import { ProjectsPage } from "@/components/portfolio/Projects-page";

export default function Page() {
  const router = useRouter();

  const handleProjectSelect = (projectId: string) => {
    if (projectId === "purple-team-lab") {
      router.push("/projects/purple-team");
    } else if (projectId === "phishing-simulation") {
      router.push("/phishing-demo"); // mets ici la vraie route si tu l’as
    } else {
      console.log(`Projet sélectionné: ${projectId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Garde NavTopbar si tu ne montes pas un Header global dans layout */}
      {/* <NavTopbar /> */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <ProjectsPage onProjectSelect={handleProjectSelect} />
      </main>
    </div>
  );
}
