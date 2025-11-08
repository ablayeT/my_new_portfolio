// src/lib/profile.ts

export type Profile = Record<string, unknown>;

/**
 * Charge le profil d'Abdou depuis le fichier public/data/profile.json.
 * Compatible standalone / hébergement VPS.
 */
export async function loadProfile(): Promise<Profile> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${base}/data/profile.json`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Échec du chargement : ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error("❌ Impossible de charger profile.json :", err);
    throw new Error("Failed to load profile.json");
  }
}
