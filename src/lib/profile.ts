import fs from "node:fs";
import path from "node:path";

export type Profile = typeof import("@/data/profile.json");

let cache: Profile | null = null;

export function loadProfile(): Profile {
  if (cache) return cache;
  const file = path.join(process.cwd(), "src", "data", "profile.json");
  const raw = fs.readFileSync(file, "utf8");
  cache = JSON.parse(raw);
  return cache!;
}
