"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { NetworkNode } from "@/components/diagram/Network-node";
import { SubnetContainer } from "@/components/diagram/Subnet-container";
import { PurpleCard } from "@/components/purple-ui/Purple-card";
import { PurpleBadge } from "@/components/purple-ui/Purple-badge";
import {
  Shield,
  Terminal,
  Server,
  Network,
  Mail,
  Radar,
} from "@/components/portfolio/Icons";

export interface ArchitectureDiagramProps {
  /** "desktop" = grille 3 colonnes ; "mobile" = pile verticale */
  variant?: "desktop" | "mobile";
  /** Limiter la hauteur pour un aperçu (home) et masquer le bas avec gradient */
  clippedPreview?: boolean;
  className?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  variant = "desktop",
  clippedPreview = false,
  className = "",
}) => {
  const isMobile = variant === "mobile";

  return (
    <div
      className={cn(
        "space-y-6",
        clippedPreview && "relative overflow-hidden",
        className
      )}
      aria-label="Diagramme d’architecture du lab Purple Team"
      role="region"
    >
      {/* Légende */}
      <PurpleCard
        elev={1}
        withHeader
        header={<h4 className="font-semibold">Légende des flux</h4>}
      >
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 bg-[var(--color-feedback-danger)]" />
            <PurpleBadge intent="danger">Red Team (attaque)</PurpleBadge>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 bg-[var(--color-feedback-info)]" />
            <PurpleBadge intent="info">Blue Team (détection)</PurpleBadge>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 border-t-2 border-dashed border-[var(--color-brand-purple)]" />
            <PurpleBadge intent="info">Flux partagés</PurpleBadge>
          </div>
        </div>
      </PurpleCard>

      {/* Carte principale */}
      <PurpleCard
        elev={2}
        withHeader
        header={
          <div className="flex items-center gap-2">
            <Network className="text-[var(--color-brand-purple)]" size={20} />
            <h3 className="font-semibold">VPC — Purple Team Lab</h3>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Canevas réseau */}
          <div className="rounded-[var(--radius-12)] bg-[var(--color-neutral-100)] p-6 dark:bg-[var(--color-neutral-800)]">
            <div
              className={cn(
                "grid gap-6",
                isMobile ? "grid-cols-1" : "grid-cols-3"
              )}
            >
              {/* Public */}
              <SubnetContainer title="Public Subnet" subnetType="public">
                <div className="space-y-4">
                  <NetworkNode
                    icon={
                      <Terminal
                        className="text-[var(--color-feedback-danger)]"
                        size={24}
                      />
                    }
                    label="VM Attaquant"
                    description="Kali Linux / Exegol"
                    nodeType="attacker"
                    size={isMobile ? "sm" : "md"}
                  />
                  <NetworkNode
                    icon={
                      <Server
                        className="text-[var(--color-brand-security-green)]"
                        size={24}
                      />
                    }
                    label="VM Portfolio"
                    description="Nginx + Next.js"
                    nodeType="portfolio"
                    size={isMobile ? "sm" : "md"}
                  />
                </div>
              </SubnetContainer>

              {/* DMZ */}
              <SubnetContainer title="DMZ Subnet" subnetType="dmz">
                <div className="space-y-4">
                  <NetworkNode
                    icon={
                      <Mail
                        className="text-[var(--color-feedback-warning)]"
                        size={24}
                      />
                    }
                    label="VM Phishing"
                    description="GoPhish + SMTP"
                    nodeType="phishing"
                    size={isMobile ? "sm" : "md"}
                  />
                  <NetworkNode
                    icon={
                      <Radar
                        className="text-[var(--color-feedback-info)]"
                        size={24}
                      />
                    }
                    label="VM Surveillance"
                    description="ELK + Suricata"
                    nodeType="surveillance"
                    size={isMobile ? "sm" : "md"}
                  />
                </div>
              </SubnetContainer>

              {/* Private */}
              <SubnetContainer title="Private Subnet" subnetType="private">
                <NetworkNode
                  icon={
                    <Shield
                      className="text-[var(--color-neutral-500)]"
                      size={24}
                    />
                  }
                  label="VM Victime"
                  description="Ubuntu + DVWA"
                  nodeType="victim"
                  size={isMobile ? "sm" : "md"}
                />
              </SubnetContainer>
            </div>
          </div>

          {/* Description des flux */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[var(--radius-8)] border border-[var(--color-feedback-danger)]/20 bg-[var(--color-feedback-danger)]/10 p-4">
              <h5 className="mb-2 font-semibold text-[var(--color-feedback-danger)]">
                Red Team Flows
              </h5>
              <ul className="space-y-1 text-sm">
                <li>• Attaquant → Phishing (préparation)</li>
                <li>• Phishing → Victime (email leurre)</li>
                <li>• Attaquant ↔ Victime (exploit)</li>
              </ul>
            </div>

            <div className="rounded-[var(--radius-8)] border border-[var(--color-feedback-info)]/20 bg-[var(--color-feedback-info)]/10 p-4">
              <h5 className="mb-2 font-semibold text-[var(--color-feedback-info)]">
                Blue Team Flows
              </h5>
              <ul className="space-y-1 text-sm">
                <li>• Victime → Surveillance (logs)</li>
                <li>• Filebeat/Auditd → Logstash</li>
                <li>• Surveillance → Kibana</li>
              </ul>
            </div>

            <div className="rounded-[var(--radius-8)] border border-[var(--color-brand-purple)]/20 bg-[var(--color-brand-purple)]/10 p-4">
              <h5 className="mb-2 font-semibold text-[var(--color-brand-purple)]">
                Management
              </h5>
              <ul className="space-y-1 text-sm">
                <li>• Portfolio ↔ Internet (HTTPS)</li>
                <li>• Let’s Encrypt SSL</li>
                <li>• Secure management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Masque de prévisualisation (si clippedPreview) */}
        {clippedPreview && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-background)]/90 to-transparent" />
            <div
              className="absolute inset-0"
              style={{
                maskImage: "linear-gradient(#000 60%, transparent 100%)",
              }}
              aria-hidden
            />
          </>
        )}
      </PurpleCard>
    </div>
  );
};
