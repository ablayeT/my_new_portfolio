"use client";

import * as React from "react";
import { Button } from "@/components/comp/Button";
import { Card } from "@/components/comp/Card";
import { Badge } from "@/components/comp/Badge"; // ✅ bon import
import {
  Shield,
  Network,
  Terminal,
  Radar,
  Mail,
  Server,
  ArrowRight,
  Filter,
} from "@/components/portfolio/Icons"; // ⚠️ garde la même casse que le fichier

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: Array<{
    label: string;
    intent: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  }>;
  featured?: boolean;
}

export interface ProjectsPageProps {
  onProjectSelect: (projectId: string) => void;
  className?: string;
}

const allProjects: Project[] = [
  {
    id: "purple-team-lab",
    title: "Purple Team Lab Infrastructure",
    description: `Architecture réseau complète pour simulations d'attaques et défense avec monitoring en temps réel.`,
    icon: (
      <span style={{ color: "var(--tokens-color-brand-purple)" }}>
        <Network size={32} />
      </span>
    ),
    tags: [
      { label: "Purple Team", intent: "primary" },
      { label: "Infrastructure", intent: "info" },
      { label: "Monitoring", intent: "success" },
    ],
    featured: true,
  },
  {
    id: "phishing-simulation",
    title: "Plateforme de Simulation Phishing",
    description: `Outil de sensibilisation avec campagnes automatisées et analytics avancés.`,
    icon: (
      <span style={{ color: "var(--tokens-color-feedback-warning)" }}>
        <Mail size={32} />
      </span>
    ),
    tags: [
      { label: "Red Team", intent: "danger" },
      { label: "Phishing", intent: "warning" },
      { label: "Formation", intent: "info" },
    ],
  },
  {
    id: "threat-hunting",
    title: "Framework Threat Hunting",
    description: `Scripts et playbooks pour la chasse aux menaces basés sur MITRE ATT&CK.`,
    icon: (
      <span style={{ color: "var(--tokens-color-feedback-info)" }}>
        <Radar size={32} />
      </span>
    ),
    tags: [
      { label: "Blue Team", intent: "info" },
      { label: "MITRE ATT&CK", intent: "secondary" },
      { label: "Automation", intent: "success" },
    ],
  },
  {
    id: "vulnerability-scanner",
    title: "Scanner de Vulnérabilités Custom",
    description: `Outil de scan automatisé avec rapports détaillés et intégration CI/CD.`,
    icon: (
      <span style={{ color: "var(--tokens-color-feedback-danger)" }}>
        <Shield size={32} />
      </span>
    ),
    tags: [
      { label: "Vulnerability Assessment", intent: "danger" },
      { label: "CI/CD", intent: "success" },
      { label: "Python", intent: "secondary" },
    ],
  },
  {
    id: "siem-dashboard",
    title: "Dashboard SIEM Personnalisé",
    description: `Interface de monitoring avec alertes intelligentes et corrélation d'événements.`,
    icon: (
      <span style={{ color: "var(--tokens-color-brand-security-green)" }}>
        <Terminal size={32} />
      </span>
    ),
    tags: [
      { label: "SIEM", intent: "success" },
      { label: "Dashboard", intent: "info" },
      { label: "Analytics", intent: "primary" },
    ],
  },
  {
    id: "incident-response",
    title: "Playbook Réponse aux Incidents",
    description: `Procédures automatisées et workflows pour la gestion d'incidents de sécurité.`,
    icon: (
      <span style={{ color: "var(--tokens-color-accent-amber)" }}>
        <Server size={32} />
      </span>
    ),
    tags: [
      { label: "Incident Response", intent: "warning" },
      { label: "Automation", intent: "success" },
      { label: "Workflow", intent: "secondary" },
    ],
  },
];

const allTags = Array.from(
  new Set(allProjects.flatMap((p) => p.tags.map((t) => t.label)))
).sort();

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onProjectSelect,
  className = "",
}) => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [showFilters, setShowFilters] = React.useState(false);

  const filteredProjects =
    selectedTags.length === 0
      ? allProjects
      : allProjects.filter((project) =>
          project.tags.some((tag) => selectedTags.includes(tag.label))
        );

  const toggleTag = (tagLabel: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagLabel)
        ? prev.filter((t) => t !== tagLabel)
        : [...prev, tagLabel]
    );
  };

  const clearFilters = () => setSelectedTags([]);

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="text-center">
        <h1
          className="mb-4 font-bold"
          style={{
            fontSize: "var(--tokens-text-h1-36,36px)",
            color: "var(--color-foreground,#0b1324)",
          }}
        >
          Mes Projets
        </h1>
        <p
          style={{
            color: "var(--color-muted-foreground,#6b7280)",
            fontSize: "var(--tokens-text-body-16,16px)",
            maxWidth: "32rem",
            margin: "0 auto",
          }}
        >
          Découvrez mes réalisations en cybersécurité, de l&apos;infrastructure
          Purple Team aux outils d&apos;automatisation sécurisée.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            className="font-semibold"
            style={{
              fontSize: "var(--tokens-text-h3-22,22px)",
              color: "var(--color-foreground,#0b1324)",
            }}
          >
            Filtrer par spécialité
          </h2>
          <div className="flex gap-2">
            <Button
              intent="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} className="mr-2" /> Filtres
            </Button>
            {selectedTags.length > 0 && (
              <Button intent="secondary" size="sm" onClick={clearFilters}>
                Effacer ({selectedTags.length})
              </Button>
            )}
          </div>
        </div>

        {(showFilters || selectedTags.length > 0) && (
          <div
            style={{
              padding: "var(--tokens-spacing-16,16px)",
              backgroundColor: "var(--color-muted,#f3f4f6)",
              borderRadius: "var(--tokens-radius-12,12px)",
              border: "1px solid var(--color-border,#e5e7eb)",
            }}
          >
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <Badge
                    key={tag}
                    intent={isSelected ? "primary" : "secondary"}
                    className={cn(
                      "cursor-pointer transition-all hover:scale-105",
                      isSelected && "ring-2 ring-[var(--color-ring,#6366f1)]"
                    )}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            elev={project.featured ? 2 : 1}
            className={cn(
              "transition-all hover:scale-[1.02] cursor-pointer",
              project.featured &&
                "ring-2 ring-[var(--tokens-color-brand-purple,#6d28d9)]/20" // ✅ correction de la classe ring
            )}
          >
            <div className="space-y-4">
              {/* Icon + Title */}
              <div className="flex items-start gap-3">
                <div
                  style={{
                    padding: "var(--tokens-spacing-8,8px)",
                    borderRadius: "var(--tokens-radius-8,8px)",
                    backgroundColor: "var(--color-muted,#f3f4f6)",
                  }}
                >
                  {project.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className="font-semibold"
                    style={{
                      color: "var(--color-foreground,#0b1324)",
                      fontSize: "var(--tokens-text-body-16,16px)",
                      marginBottom: "var(--tokens-spacing-4,4px)",
                    }}
                  >
                    {project.title}
                    {project.featured && (
                      <span
                        style={{
                          marginLeft: "var(--tokens-spacing-8,8px)",
                          fontSize: "var(--tokens-text-caption-12,12px)",
                          color: "var(--tokens-color-brand-purple,#6d28d9)",
                        }}
                      >
                        ⭐ Phare
                      </span>
                    )}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--tokens-text-body-14,14px)",
                      color: "var(--color-muted-foreground,#6b7280)",
                      lineHeight: 1.6,
                    }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <Badge
                    key={`${project.id}-${i}`}
                    intent={tag.intent}
                    size="sm"
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>

              {/* Action */}
              <div
                style={{
                  paddingTop: "var(--tokens-spacing-8,8px)",
                  borderTop: "1px solid var(--color-border,#e5e7eb)",
                }}
              >
                <Button
                  intent="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => onProjectSelect(project.id)}
                >
                  Voir plus <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredProjects.length === 0 && (
        <div className="py-12 text-center">
          <div
            style={{
              color: "var(--color-muted-foreground,#6b7280)",
              marginBottom: "var(--tokens-spacing-16,16px)",
            }}
          >
            Aucun projet trouvé avec les filtres sélectionnés.
          </div>
          <Button intent="secondary" size="sm" onClick={clearFilters}>
            Effacer les filtres
          </Button>
        </div>
      )}

      {/* Stats */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "var(--tokens-spacing-32,32px)",
          borderTop: "1px solid var(--color-border,#e5e7eb)",
        }}
      >
        <p
          style={{
            fontSize: "var(--tokens-text-body-14,14px)",
            color: "var(--color-muted-foreground,#6b7280)",
          }}
        >
          {filteredProjects.length} projet
          {filteredProjects.length > 1 ? "s" : ""} affiché
          {filteredProjects.length > 1 ? "s" : ""}
          {selectedTags.length > 0 &&
            ` • Filtré par : ${selectedTags.join(", ")}`}
        </p>
      </div>
    </div>
  );
};

// petit util local pour éviter un import de plus
function cn(...c: Array<string | undefined | null | false>) {
  return c.filter(Boolean).join(" ");
}
