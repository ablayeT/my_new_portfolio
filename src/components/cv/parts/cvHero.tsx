"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Phone,
  Target,
} from "lucide-react";
import type { ContactInfo } from "@/data/cv/cvPage/types";

export function CvHero({
  name,
  headline,
  contact,
  downloadHref,
  downloadName,
}: {
  name: string;
  headline: string;
  contact: ContactInfo;
  downloadHref: string;
  downloadName: string;
}) {
  return (
    <section className="text-center">
      <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm md:h-32 md:w-32">
        <span className="text-2xl font-extrabold md:text-3xl">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </span>
      </div>

      <h1 className="mb-1 text-3xl font-bold tracking-tight text-primary md:text-4xl">
        {name}
      </h1>

      <p className="mx-auto mb-5 max-w-3xl text-sm text-muted-foreground md:text-base">
        {headline}
      </p>

      <div className="mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4" /> {contact.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Mail className="h-4 w-4" /> {contact.email}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Phone className="h-4 w-4" /> {contact.phone}
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <a href={downloadHref} download={downloadName}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger le CV (PDF)
          </a>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <a href={`mailto:${contact.email}`}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </a>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </a>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <a href={contact.tryhackme} target="_blank" rel="noopener noreferrer">
            <Target className="mr-2 h-4 w-4" />
            TryHackMe
          </a>
        </Button>
      </div>
    </section>
  );
}
