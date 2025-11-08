import { NextRequest, NextResponse } from "next/server";
import { getOpenRouter } from "@/lib/openrouter";
import { loadProfile, type Profile } from "@/lib/profile";
import { ROUTES } from "@/lib/routes";
import { sanitizeInput, looksSuspicious } from "@/lib/sanitize";
import { rateLimit } from "@/lib/ratelimit";
import { corsHeaders } from "@/lib/cors";

const MAX_TOKENS = Number(process.env.OPENROUTER_MAX_TOKENS ?? 800);
const PRIMARY_MODEL =
  process.env.OPENROUTER_ASSISTANT_MODEL || "mistralai/mistral-small-latest";
const CHEAP_MODEL =
  process.env.OPENROUTER_CHEAP_MODEL || "mistralai/mistral-small-latest";

/** Certains SDKs renvoient string | ContentItem[] */
type ContentItem =
  | string
  | { type: "text"; text: string }
  | { type: string; [k: string]: unknown };

function contentToString(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    const parts: string[] = [];
    for (const item of content as ContentItem[]) {
      if (typeof item === "string") parts.push(item);
      else if (
        (item as any)?.type === "text" &&
        typeof (item as any).text === "string"
      ) {
        parts.push((item as any).text);
      } else if (typeof (item as any)?.text === "string") {
        parts.push((item as any).text as string);
      }
    }
    return parts.join("\n").trim();
  }
  try {
    return JSON.stringify(content);
  } catch {
    return "";
  }
}

function clampToTokens(s: string, maxTokens: number) {
  const est = Math.ceil(s.length / 4);
  if (est <= maxTokens) return s;
  return s.slice(-(maxTokens * 4));
}

/** ✅ Typage corrigé : p: Profile */
const PROFILE_SYSTEM = (p: Profile) => `
Tu es le copilot personnel de ${p.identity.fullName}.
Connais ces données VÉRIFIÉES (ne pas inventer) :
IDENTITY: ${p.identity.title}, ${p.identity.location}, langues=${p.identity.languages.join(", ")}
LOOKING_FOR: roles=${p.lookingFor.roles.join(", ")}; contrats=${p.lookingFor.contract.join(", ")}; domaines=${p.lookingFor.domains.join(", ")}
SKILLS: blue=${p.skills.blueTeam.join(", ")}; red=${p.skills.redTeam.join(", ")}; devSec=${p.skills.devSec.join(", ")}; gov=${p.skills.gouvernance.join(", ")}
EDU: ${p.education.map((e) => e.label).join(" • ")}
EXP: ${p.experience.map((e) => `${e.label} @ ${e.org}`).join(" • ")}
PROJECTS: ${p.projects.map((pr) => `${pr.name} (${pr.url})`).join(" • ")}
ROUTES: home=${ROUTES.home}, projects=${ROUTES.projects}, purple=${ROUTES.purple}, siem=${ROUTES.siem}, contact=${ROUTES.contact}, cv=${ROUTES.cv}

Règles:
- Réponds dans la langue de l’utilisateur (FR/EN).
- 5–8 lignes max, direct, professionnel, accueillant. Pas de fluff.
- Offre un CTA vers une page du portfolio quand pertinent (utilise ROUTES).
- Si info manquante: pose UNE question ciblée au maximum.
- Ne JAMAIS inventer d’infos hors du JSON ci-dessus.
`;

async function callOnce(
  model: string,
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
  maxTokens: number
) {
  const client = getOpenRouter();
  console.time(`llm:${model}`);
  const res = await client.chat.send({ model, messages, maxTokens });
  console.timeEnd(`llm:${model}`);

  try {
    console.log(
      "LLM used:",
      model,
      "| finish_reason:",
      (res as any)?.choices?.[0]?.finish_reason ?? "n/a"
    );
  } catch {}

  const raw = (res as any)?.choices?.[0]?.message?.content ?? "";
  const text = contentToString(raw).trim();
  return {
    text,
    modelUsed: (res as any)?.model ?? model,
    rawChoice: (res as any)?.choices?.[0],
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: { ...corsHeaders() } });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anon";
  if (!rateLimit(ip, 50).allowed) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: corsHeaders() }
    );
  }

  try {
    const body = (await req.json()) as { q?: unknown };
    const rawQ = sanitizeInput(String(body?.q ?? ""), 4000);
    if (!rawQ)
      return NextResponse.json(
        { error: "empty" },
        { status: 400, headers: corsHeaders() }
      );
    if (looksSuspicious(rawQ))
      return NextResponse.json(
        { error: "input_blocked" },
        { status: 400, headers: corsHeaders() }
      );

    // ✅ Attente du profil asynchrone
    const profile = await loadProfile();

    const messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }> = [
      { role: "system", content: PROFILE_SYSTEM(profile) },
      { role: "user", content: clampToTokens(rawQ, 1500) },
    ];

    // 1) essai avec le modèle principal
    let { text, modelUsed } = await callOnce(
      PRIMARY_MODEL,
      messages,
      MAX_TOKENS
    );

    // 2) si vide → retry avec modèle fallback + plus de tokens
    if (!text) {
      const second = await callOnce(
        CHEAP_MODEL,
        messages,
        Math.max(1024, Math.floor(MAX_TOKENS * 1.5))
      );
      text = second.text;
      modelUsed = second.modelUsed;
    }

    // 3) si toujours vide → message utile
    if (!text) {
      text =
        "Je n’ai pas pu générer de réponse cette fois. Réessaie avec une question plus précise, ou change de modèle dans la config. Exemples :\n" +
        "• Présentez Abdoulaye en 30 secondes\n" +
        "• Ses expériences Purple Team clés ?\n" +
        "• Comment le contacter ?\n" +
        "• Ce qu’il recherche actuellement (alternance/CDI)\n" +
        "→ /projects | /contact";
    }

    return NextResponse.json(
      { model: modelUsed, content: text },
      { headers: corsHeaders() }
    );
  } catch (e) {
    const err = e as { statusCode?: number; body?: unknown; message?: string };
    const code = err?.statusCode ?? 500;
    const msg =
      (typeof err?.body === "string" ? err?.body : undefined) ||
      err?.message ||
      "unexpected_error";
    return NextResponse.json(
      { error: msg },
      { status: code, headers: corsHeaders() }
    );
  }
}
