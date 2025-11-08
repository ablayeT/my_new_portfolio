// src/lib/profile.ts

/** Structure complète du profil (selon ton JSON) */
export interface Profile {
  identity: {
    fullName: string;
    title: string;
    location: string;
    languages: string[];
  };
  lookingFor: {
    roles: string[];
    contract: string[];
    domains: string[];
  };
  skills: {
    blueTeam: string[];
    redTeam: string[];
    devSec: string[];
    gouvernance: string[];
  };
  education: { label: string }[];
  experience: { label: string; org: string }[];
  projects: { name: string; url: string }[];
}

/** Chargement dynamique du profil depuis /public/data/profile.json */
export async function loadProfile(): Promise<Profile> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${base}/data/profile.json`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load profile.json from ${url}`);
  return (await res.json()) as Profile;
}
