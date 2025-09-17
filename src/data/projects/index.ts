import type { ProjectDetail } from "./types";
import { phishingSimulation } from "./phishing-simulation";
import { siemDashboard } from "./siem-dashboard";
import { incidentResponse } from "./incident-response";

export const PROJECTS: ProjectDetail[] = [
  phishingSimulation,
  siemDashboard,
  incidentResponse,
];

export function getAllProjectIds(): string[] {
  return PROJECTS.map((p) => p.id);
}

export function getProjectById(id: string): ProjectDetail | undefined {
  return PROJECTS.find((p) => p.id === id);
}
