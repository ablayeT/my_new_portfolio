"use client";

import * as React from "react";
import Link from "next/link";
import {
  Network, Mail, Radar, Shield, Terminal, Server,
  ArrowRight, Filter, X, Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ── Types ─────────────────────────────────────────────────────────────────
type TagIntent = "default" | "secondary" | "destructive" | "outline";

interface Project {
  id: string;
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: Array<{ label: string; intent: TagIntent }>;
  featured?: boolean;
  accentColor: string;
}

// ── Données ───────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: "purple-team",
    href: "/projects/purple-team",
    title: "Purple Team Lab Infrastructure",
    description:
      "Architecture réseau complète pour simulations d'attaques et défense avec monitoring en temps réel via ELK/Suricata.",
    icon: <Network size={24} />,
    accentColor: "#7c3aed",
    tags: [
      { label: "Purple Team", intent: "default" },
      { label: "Infrastructure", intent: "secondary" },
      { label: "Monitoring", intent: "outline" },
    ],
    featured: true,
  },
  {
    id: "phishing-simulation",
    href: "/projects/phishing-simulation",
    title: "Plateforme de Simulation Phishing",
    description:
      "Outil de sensibilisation avec campagnes automatisées, analytics avancés et capture SMTP (GoPhish).",
    icon: <Mail size={24} />,
    accentColor: "#d97706",
    tags: [
      { label: "Red Team", intent: "destructive" },
      { label: "Phishing", intent: "secondary" },
      { label: "Formation", intent: "outline" },
    ],
  },
  {
    id: "threat-hunting",
    href: "/projects/threat-hunting",
    title: "Framework Threat Hunting",
    description:
      "Scripts et playbooks pour la chasse aux menaces basés sur MITRE ATT&CK avec KPIs de détection.",
    icon: <Radar size={24} />,
    accentColor: "#0284c7",
    tags: [
      { label: "Blue Team", intent: "default" },
      { label: "MITRE ATT&CK", intent: "secondary" },
      { label: "Automation", intent: "outline" },
    ],
  },
  {
    id: "vulnerability-scanner",
    href: "/projects/vulnerability-scanner",
    title: "Scanner de Vulnérabilités Custom",
    description:
      "Outil de scan automatisé avec rapports détaillés, scoring CVSS et intégration CI/CD.",
    icon: <Shield size={24} />,
    accentColor: "#dc2626",
    tags: [
      { label: "Vulnerability", intent: "destructive" },
      { label: "CI/CD", intent: "outline" },
      { label: "Python", intent: "secondary" },
    ],
  },
  {
    id: "siem-dashboard",
    href: "/projects/siem-dashboard",
    title: "Dashboard SIEM Personnalisé",
    description:
      "Interface de monitoring avec alertes intelligentes, corrélation d'événements et tuning des seuils.",
    icon: <Terminal size={24} />,
    accentColor: "#059669",
    tags: [
      { label: "SIEM", intent: "default" },
      { label: "ELK Stack", intent: "secondary" },
      { label: "Analytics", intent: "outline" },
    ],
  },
  {
    id: "incident-response",
    href: "/projects/incident-response",
    title: "Playbook Réponse aux Incidents",
    description:
      "Pack opérationnel NIST 800-61 : playbooks normalisés, SOAR-ready, métriques MTTD/MTTR.",
    icon: <Server size={24} />,
    accentColor: "#ea580c",
    tags: [
      { label: "Incident Response", intent: "secondary" },
      { label: "NIST 800-61", intent: "outline" },
      { label: "Automation", intent: "default" },
    ],
  },
];

const ALL_TAGS = Array.from(
  new Set(PROJECTS.flatMap((p) => p.tags.map((t) => t.label)))
).sort();

// ── Composant principal ───────────────────────────────────────────────────
export interface ProjectsPageProps {
  onProjectSelect?: (projectId: string) => void;
  className?: string;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  className = "",
}) => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [showFilters, setShowFilters] = React.useState(false);

  const filtered =
    selectedTags.length === 0
      ? PROJECTS
      : PROJECTS.filter((p) =>
          p.tags.some((t) => selectedTags.includes(t.label))
        );

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const clearFilters = () => setSelectedTags([]);

  return (
    <div className={["space-y-10", className].filter(Boolean).join(" ")}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {PROJECTS.length} projets cybersécurité
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Mes Projets
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
          Réalisations en cybersécurité — de l'infrastructure Purple Team aux
          outils d'automatisation sécurisée.
        </p>
      </div>

      {/* ── Filtres ─────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-foreground">
            {filtered.length} projet{filtered.length > 1 ? "s" : ""}
            {selectedTags.length > 0 && (
              <span className="ml-1 text-muted-foreground">
                · filtré{filtered.length > 1 ? "s" : ""}
              </span>
            )}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowFilters((v) => !v)}
            >
              <Filter size={14} />
              Filtres
              {selectedTags.length > 0 && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {selectedTags.length}
                </span>
              )}
            </Button>
            {selectedTags.length > 0 && (
              <Button variant="ghost" size="sm" className="gap-1.5" onClick={clearFilters}>
                <X size={13} />
                Effacer
              </Button>
            )}
          </div>
        </div>

        {(showFilters || selectedTags.length > 0) && (
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={[
                      "rounded-lg border px-3 py-1 text-xs font-medium transition-all",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                    ].join(" ")}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Grille projets ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* ── Aucun résultat ──────────────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="py-16 text-center space-y-3">
          <p className="text-muted-foreground text-sm">
            Aucun projet ne correspond aux filtres sélectionnés.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Effacer les filtres
          </Button>
        </div>
      )}
    </div>
  );
};

// ── Card projet ───────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/20"
    >
      {/* Accent top */}
      <div
        className="h-[3px] w-full transition-all"
        style={{ backgroundColor: project.accentColor }}
      />

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute right-3 top-4 flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground shadow-sm">
          <Star size={10} className="text-amber-500" />
          Phare
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 space-y-4">

        {/* Icon + Titre */}
        <div className="flex items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/30 transition-colors group-hover:bg-muted"
            style={{ color: project.accentColor }}
          >
            {project.icon}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm text-foreground leading-snug line-clamp-2">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, i) => (
            <Badge key={i} variant={tag.intent} className="text-[11px]">
              {tag.label}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">Voir le projet</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/50 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight size={13} />
          </span>
        </div>

      </div>
    </Link>
  );
}

export default ProjectsPage;