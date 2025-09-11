"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CVDownloadModal } from "./cv-download-modal";
import {
  Download,
  Mail,
  Linkedin,
  Github,
  MapPin,
  GraduationCap,
  User,
  Phone,
  Target,
  BookOpen,
  ShieldCheck,
  Globe2,
} from "lucide-react";
import Link from "next/link";

export interface CVPageProps {
  className?: string;
}

type BadgeVariant = "default" | "secondary" | "outline";

function getSkillBadgeStyle(level: string): BadgeVariant {
  switch (level) {
    case "expert":
      return "default";
    case "advanced":
      return "secondary";
    default:
      return "outline";
  }
}

export default function CVPage({ className = "" }: CVPageProps) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // ===== Données (depuis ton CV) =====
  const headline = useMemo(
    () =>
      "Actuellement en recherche d’une alternance en cybersécurité dans le cadre de mon Master à partir de septembre 2025. Spécialisé en audit, pentest, threat hunting et développement d’outils sécurité.",
    []
  );

  const contact = {
    location: "Paris, France",
    email: "ablayetoure2014@gmail.com",
    phone: "+33 644 93 26 27",
    github: "https://github.com/ablayeT?tab=repositories",
    linkedin: "https://www.linkedin.com/in/abdoulaye-toure-b37b30100/",
    tryhackme: "https://tryhackme.com/p/ablaye.toure0",
    entourage:
      "https://www.entourage-pro.fr/cv/abdoulaye-2e32086a?hideShareOptions=false",
  };

  const skillCategories: Array<{
    title: string;
    skills: { name: string; level: "expert" | "advanced" | "intermediate" }[];
  }> = [
    {
      title: "Sécurité informatique",
      skills: [
        { name: "Contrôle des accès & AuthN/Z", level: "advanced" },
        { name: "Chiffrement des données", level: "advanced" },
        { name: "Validation & désinfection des entrées", level: "advanced" },
        { name: "Gestion des vulnérabilités & correctifs", level: "advanced" },
        { name: "Audit & Pentest (XSS, SQLi, brute force)", level: "expert" },
        { name: "Analyse sécurité (logs/IOC)", level: "advanced" },
      ],
    },
    {
      title: "Outils & Plateformes",
      skills: [
        { name: "Linux / Bash (admin système)", level: "expert" },
        { name: "Kali Linux", level: "expert" },
        { name: "ELK (Filebeat, Logstash, Kibana)", level: "advanced" },
        { name: "Nmap, Gobuster", level: "expert" },
        { name: "Wireshark, Nessus", level: "advanced" },
        { name: "MySQL", level: "advanced" },
      ],
    },
    {
      title: "Langages & Frameworks",
      skills: [
        { name: "JavaScript / Node.js", level: "expert" },
        { name: "React", level: "expert" },
        { name: "Python", level: "expert" },
        { name: "PHP", level: "advanced" },
        { name: "Material UI", level: "advanced" },
      ],
    },
    {
      title: "Langues",
      skills: [
        { name: "Français (courant)", level: "expert" },
        { name: "Anglais (courant)", level: "expert" },
        { name: "Espagnol (intermédiaire)", level: "advanced" }, // intermédiaire → on garde un style secondary
        { name: "Wolof (courant)", level: "expert" },
        { name: "Malinké (courant)", level: "expert" },
        { name: "Bambara (courant)", level: "expert" },
      ],
    },
  ];

  const experiences: Array<{
    title: string;
    company: string;
    period: string;
    tasks: string[];
  }> = [
    {
      title: "Stage : Audit & Pentest",
      company: "ADVENS • Paris",
      period: "Mars 2025 — Mai 2025",
      tasks: [
        "Réalisation d’audits techniques (systèmes, réseaux, applications)",
        "Pentest (XSS, SQLi, brute force) avec Burp Suite, Nmap, SQLMap",
        "Analyse de logs & détection via la stack ELK (Filebeat, Logstash, Kibana)",
        "Automatisation d’audits (Bash / PowerShell)",
        "Rédaction de rapports techniques & recommandations",
        "Interactions régulières avec les équipes techniques",
      ],
    },
    {
      title: "Développeur Web & Web Mobile",
      company: "Entourage • Paris",
      period: "Oct 2022 — Nov 2023",
      tasks: [
        "Développement et évolutions des plateformes web",
        "Contribution aux choix techniques et à l’architecture",
        "Conception, développement et qualité (tests)",
        "Mise en place de recettes fonctionnelles/techniques",
      ],
    },
    {
      title: "Professeur d’anglais",
      company: "BEC • Dakar, Sénégal",
      period: "Sept 2017 — Nov 2019",
      tasks: [
        "Création de cours adaptés aux niveaux des apprenants",
        "Animation de classes hétérogènes & suivi individualisé",
        "Structuration pédagogique des contenus",
        "Évaluations régulières et feedback",
      ],
    },
    {
      title: "Fondateur & gérant",
      company: "Toure Multi-Services • Sénégal",
      period: "2017 — 2019",
      tasks: [
        "Gestion d’une équipe (2 commerciaux, 1 technicien)",
        "Coordination des tâches commerciales et techniques",
        "Suivi des projets clients et de la satisfaction",
      ],
    },
  ];

  const education: Array<{
    title: string;
    school: string;
    period: string;
    details?: string;
  }> = [
    {
      title: "Bac +3 : Administration d’infrastructures sécurisées",
      school: "ALT-RH • Paris",
      period: "Sept 2024 — Juin 2025",
      details: "Systèmes, réseaux, sécurité des infrastructures.",
    },
    {
      title: "Développeur intégrateur web",
      school: "WebForce3 • Paris",
      period: "Avr 2022 — Oct 2022",
      details: "Front-end & back-end, intégration, bonnes pratiques.",
    },
    {
      title: "Master II : Littérature & civilisation américaine & caribéenne",
      school: "UCAD • Dakar, Sénégal",
      period: "Oct 2011 — Juil 2015",
    },
  ];

  const softSkills = ["Rigoureux", "Curieux", "Organisé", "Discret"];
  const interests = ["Lecture", "Taekwondo", "Baseball", "Course à pied"];

  // ===== Rendu =====
  return (
    <div className={`space-y-8 ${className}`}>
      {/* En-tête CV */}
      <section className="text-center">
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm md:h-32 md:w-32">
          <span className="text-2xl font-extrabold md:text-3xl">AT</span>
        </div>

        <h1 className="mb-1 text-3xl font-bold tracking-tight text-primary md:text-4xl">
          Abdoulaye Touré
        </h1>

        <p className="mx-auto mb-5 max-w-3xl text-sm text-muted-foreground md:text-base">
          {headline}
        </p>

        {/* Contacts */}
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

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => setShowDownloadModal(true)}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger le CV (PDF)
          </Button>

          <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${contact.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </a>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <a
              href={contact.tryhackme}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Target className="mr-2 h-4 w-4" />
              TryHackMe
            </a>
          </Button>
        </div>
      </section>

      {/* Profil pro */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold md:text-xl">
              Profil professionnel
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground md:text-base">
          Étudiant en cybersécurité avec une solide base en développement web.
          Expérience pratique en audit/pentest, maîtrise des outils de sécurité
          et compétences full-stack. Objectif&nbsp;: approfondir mes
          connaissances et contribuer à la protection des SI par des approches
          Purple Team.
        </CardContent>
      </Card>

      {/* Compétences */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold md:text-xl">
              Compétences techniques
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {skillCategories.map((category) => (
              <div key={category.title} className="space-y-3">
                <h3 className="text-sm font-medium text-foreground md:text-base">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant={getSkillBadgeStyle(
                        skill.level === "intermediate" ? "default" : skill.level
                      )}
                      className="gap-2"
                    >
                      {skill.level === "expert" && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                      )}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Légende niveaux */}
          <div className="rounded-lg border bg-accent/30 p-4">
            <h4 className="mb-2 text-sm font-medium">Niveau de maîtrise</h4>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
                Expert
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                Avancé
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />
                Intermédiaire/Débutant
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expériences */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold md:text-xl">
            Expériences professionnelles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <article
                key={i}
                className="relative rounded-lg border p-4 md:p-5"
              >
                {/* barre colorée gauche en md+ */}
                <span className="absolute left-0 top-0 hidden h-full w-1 rounded-l bg-primary/80 md:block" />
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <h3 className="text-base font-medium text-foreground md:text-lg">
                    {exp.title}
                  </h3>
                  <span className="text-xs font-medium text-muted-foreground md:text-sm">
                    {exp.period}
                  </span>
                </div>
                <p className="mb-3 mt-1 text-sm font-medium text-primary/90">
                  {exp.company}
                </p>
                <ul className="list-outside space-y-2 pl-0 text-sm text-muted-foreground">
                  {exp.tasks.map((t, k) => (
                    <li key={k}>• {t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formation */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold md:text-xl">
              Formation
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((ed, idx) => (
            <div key={idx} className="rounded-lg border p-4">
              <h3 className="text-base font-medium">{ed.title}</h3>
              <p className="text-sm font-medium text-primary/90">{ed.period}</p>
              <p className="text-sm text-muted-foreground">{ed.school}</p>
              {ed.details && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {ed.details}
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Langues & Soft skills / Centres d’intérêt */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-semibold md:text-xl">
                Langues
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skillCategories
              .find((c) => c.title === "Langues")
              ?.skills.map((s) => (
                <Badge key={s.name} variant={getSkillBadgeStyle("advanced")}>
                  {s.name}
                </Badge>
              ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-semibold md:text-xl">
                Soft skills
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {softSkills.map((s) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-semibold md:text-xl">
                Centres d’intérêt
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {interests.map((h) => (
              <Badge key={h} variant="outline">
                {h}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Liens utiles */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold md:text-xl">
            Profils & liens
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link
              href={contact.tryhackme}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Target className="mr-2 h-4 w-4" /> TryHackMe
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link
              href={contact.entourage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <User className="mr-2 h-4 w-4" /> Entourage Pro
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Modal de téléchargement */}
      <CVDownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </div>
  );
}
