"use client";

import * as React from "react";
import { ShieldCheck, GraduationCap, User, BookOpen } from "lucide-react";
import { CvHero } from "@/components/cv/parts/cvHero";
import { CvSection } from "@/components/cv/parts/cvSection";
import { SkillsGrid } from "@/components/cv/parts//SkillsGrid";
import { ProjectsGrid } from "@/components/cv/parts//ProjectsGrid";
import { ExperiencesList } from "@/components/cv/parts//ExperiencesList";
import { EducationGrid } from "@/components/cv/parts//EducationGrid";
import { ExtrasGrid } from "@/components/cv/parts//ExtrasGrid";

import { CV_ASSET, CV_DATA } from "@/data/cv/cv";
import {
  HEADLINE,
  CONTACT,
  SKILL_CATEGORIES,
  EXPERIENCES,
  EDUCATION,
  SOFT_SKILLS,
  INTERESTS,
} from "@/data/cv/cvPage/page";

export default function CVPage() {
  return (
    <div className="space-y-8">
      <CvHero
        name={CV_DATA.identity.name}
        headline={HEADLINE}
        contact={CONTACT}
        downloadHref={CV_ASSET.href}
        downloadName={CV_ASSET.filename}
      />

      <CvSection
        title="Profil professionnel"
        icon={<User className="h-5 w-5 text-primary" />}
      >
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Je conçois et automatise l'architecture de sécurité pour détecter les
          menaces et répondre aux incidents, en anticipant les vulnérabilités
          par une approche offensive.
        </p>
      </CvSection>

      <CvSection
        title="Compétences techniques"
        icon={<ShieldCheck className="h-5 w-5 text-primary" />}
      >
        <SkillsGrid categories={SKILL_CATEGORIES} />
      </CvSection>

      <CvSection
        title="Projets phares"
        icon={<BookOpen className="h-5 w-5 text-primary" />}
      >
        <ProjectsGrid />
      </CvSection>

      <CvSection
        title="Expériences professionnelles"
        icon={<User className="h-5 w-5 text-primary" />}
      >
        <ExperiencesList items={EXPERIENCES} />
      </CvSection>

      <CvSection
        title="Formation"
        icon={<GraduationCap className="h-5 w-5 text-primary" />}
      >
        <EducationGrid items={EDUCATION} />
      </CvSection>

      <ExtrasGrid
        languages={
          SKILL_CATEGORIES.find((c) => c.title === "Langues")?.skills.map(
            (s) => s.name
          ) || []
        }
        softSkills={SOFT_SKILLS}
        interests={INTERESTS}
      />
    </div>
  );
}
