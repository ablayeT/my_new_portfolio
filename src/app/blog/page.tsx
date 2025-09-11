import type { Metadata } from "next";
import { BlogPage } from "@/components/portfolio/Blog-page";
export const metadata: Metadata = {
  title: "Blog Technique - Abdoulaye Touré",
  description:
    "Articles techniques sur la cybersécurité, guides pratiques et retours d'expérience en Purple Team, audit de sécurité et développement d'outils.",
  keywords: [
    "blog",
    "cybersécurité",
    "articles techniques",
    "purple team",
    "mitre attack",
    "pentest",
    "sécurité web",
  ],
};

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <BlogPage />
      </main>
    </div>
  );
}
