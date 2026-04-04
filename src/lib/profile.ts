// src/lib/profile.ts

export interface Profile {
  identity: {
    fullName: string;
    title: string;
    location: string;
    languages: string[];
  };
  about?: string;
  contact?: {
    email: string;
    linkedin: string;
    github: string;
    portfolio: string;
    tryhackme?: string;
  };
  lookingFor: {
    roles: string[];
    contract: string[];
    domains: string[];
  };
  skills: {
    blueTeam: string[];
    redTeam: string[];
    infra: string[];
    devSec: string[];
    gov: string[];
    gouvernance?: string[]; // alias legacy
    ailab: string[];
  };
  education: {
    label: string;
    org?: string;
    year?: string;
    topics?: string[];
  }[];
  certifications?: {
    name: string;
    level?: string;
    status?: string;
    focus?: string[];
  }[];
  growthAreas?: string[];
  productionExperience?: {
    summary?: string;
    highlights?: string[];
    status?: string;
  } | string[];
  iaSkillMatrix?: {
    dimension: string;
    level: string;
    keywords: string[];
    examples: string[];
  }[];
  experience: {
    label: string;
    org: string;
    period?: string;
    type?: string;
    bullets?: string[];
    highlights?: string[];
  }[];
  projects: {
    slug?: string;
    name: string;
    url: string;
    stack?: string[];
    tags?: string[];
    description?: string;
    focus?: string[];
  }[];
  hobbies?: string[];
}

/** Chargement dynamique du profil depuis /public/data/profile.json */
export async function loadProfile(): Promise<Profile> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://abdou-cyber.dev"
      : "http://localhost:3000");

  const url = `${base}/data/profile.json`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load profile.json from ${url}`);
  return (await res.json()) as Profile;
}