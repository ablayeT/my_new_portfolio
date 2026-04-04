"use client";

import { ProjectsPage } from "@/components/projects/Projects-page";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <ProjectsPage />
      </main>
    </div>
  );
}