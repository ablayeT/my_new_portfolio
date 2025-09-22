import type { Status } from "@/data/phishing/demo";

export function statusToVariant(
  s: Status
): "default" | "outline" | "secondary" {
  if (s === "Running") return "default";
  if (s === "Completed") return "outline";
  return "secondary"; // Idle
}
