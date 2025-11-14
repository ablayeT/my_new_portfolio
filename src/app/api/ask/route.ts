// src/app/api/ask/route.ts
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

/** Persona strict : visiteur ≠ Abdoulaye. Mode propriétaire optionnel. */
function PROFILE_SYSTEM(p: Profile, ownerMode: boolean) {
  // ✅ Champs identity
  const fullName = p.identity?.fullName ?? "Abdoulaye Touré";
  const title = p.identity?.title ?? "Analyste cybersécurité";
  const location = p.identity?.location ?? "Île-de-France";

  const languages = Array.isArray(p.identity?.languages)
    ? p.identity!.languages.join(", ")
    : "non précisé";

  // ✅ LookingFor
  const roles = Array.isArray(p.lookingFor?.roles)
    ? p.lookingFor!.roles.join(", ")
    : "non précisé";

  const contracts = Array.isArray(p.lookingFor?.contract)
    ? p.lookingFor!.contract.join(", ")
    : "non précisé";

  const domains = Array.isArray(p.lookingFor?.domains)
    ? p.lookingFor!.domains.join(", ")
    : "non précisé";

  // ✅ Skills (avec compat gov / gouvernance)
  const blueTeam = Array.isArray(p.skills?.blueTeam)
    ? p.skills!.blueTeam.join(", ")
    : "—";

  const redTeam = Array.isArray(p.skills?.redTeam)
    ? p.skills!.redTeam.join(", ")
    : "—";

  const devSec = Array.isArray(p.skills?.devSec)
    ? p.skills!.devSec.join(", ")
    : "—";

  const gov = Array.isArray((p as any).skills?.gov)
    ? (p as any).skills.gov.join(", ")
    : Array.isArray((p as any).skills?.gouvernance)
      ? (p as any).skills.gouvernance.join(", ")
      : "—";

  // ✅ Education / expérience / projets
  const edu = Array.isArray(p.education)
    ? p.education.map((e) => e.label).join(" • ")
    : "—";

  const exp = Array.isArray(p.experience)
    ? p.experience.map((e) => `${e.label} @ ${e.org}`).join(" • ")
    : "—";

  const projects = Array.isArray(p.projects)
    ? p.projects.map((pr) => `${pr.name} (${pr.url})`).join(" • ")
    : "—";

  const ownerFlag = ownerMode ? "true" : "false";

  return `
Tu es l’assistant officiel du portfolio d'Abdoulaye Touré.
RÔLE: conseiller les VISITEURS sur le profil d'Abdoulaye (infos carrière, projets, compétences, contact).

IDENTITÉ DU SUJET: "${fullName}" — ${title}, ${location}.
LANGUES: ${languages}.
CE QUE CHERCHE ABDOULAYE: roles=${roles}; contrats=${contracts}; domaines=${domains}.
COMPÉTENCES: blue=${blueTeam}; red=${redTeam}; devSec=${devSec}; gov=${gov}.
PARCOURS: EDU=[${edu}] | EXP=[${exp}].
PROJETS: ${projects}.
ROUTES: home=${ROUTES.home} | projects=${ROUTES.projects} | purple=${ROUTES.purple} | siem=${ROUTES.siem} | contact=${ROUTES.contact} | cv=${ROUTES.cv}.

RÈGLES PERSONA:
- NE JAMAIS supposer que l’utilisateur est Abdoulaye.
- Par défaut, TU t’adresses au VISITEUR et tu parles d’“Abdoulaye” à la 3ᵉ personne.
- Si l’utilisateur dit "je" à propos de sa vie/expérience, considère-le comme VISITEUR (pas Abdoulaye), sauf si OWNER_MODE=true.
- Interdiction : ne dis jamais "tu es Abdoulaye", "nous avons fait", etc., sauf OWNER_MODE.

OWNER_MODE: ${ownerFlag}.
- Si OWNER_MODE=true, parle à la 1ʳᵉ personne ("je") en incarnant Abdoulaye. Sinon, utilise la 3ᵉ personne ("Abdoulaye").

STYLE:
- Réponds dans la langue de l’utilisateur (FR/EN).
- 5–8 lignes, direct, pro, accueillant. Pas de fluff.
- Propose un CTA vers une route pertinente quand utile (utilise ROUTES).
- Si une info manque, pose UNE question ciblée max.
- Ne JAMAIS inventer hors des données ci-dessus.
  `.trim();
}

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
    const body = (await req.json()) as { q?: unknown; owner?: boolean };
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

    const profile = await loadProfile();
    const ownerMode = Boolean(body?.owner);

    const messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }> = [
      { role: "system", content: PROFILE_SYSTEM(profile, ownerMode) },
      { role: "user", content: clampToTokens(rawQ, 1500) },
    ];

    // 1) modèle principal
    let { text, modelUsed } = await callOnce(
      PRIMARY_MODEL,
      messages,
      MAX_TOKENS
    );

    // 2) fallback si vide
    if (!text) {
      const second = await callOnce(
        CHEAP_MODEL,
        messages,
        Math.max(1024, Math.floor(MAX_TOKENS * 1.5))
      );
      text = second.text;
      modelUsed = second.modelUsed;
    }

    // 3) fallback final si toujours vide
    if (!text) {
      text =
        "Je n’ai pas pu générer de réponse cette fois. Réessaie avec une question plus précise, ou change de modèle dans la config. Exemples :\n" +
        "• Présentation d’Abdoulaye en 30 secondes\n" +
        "• Ses expériences Purple Team clés\n" +
        "• Comment le contacter\n" +
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
