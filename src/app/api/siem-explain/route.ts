// src/app/api/siem-explain/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getOpenRouter } from "@/lib/openrouter";
import { sanitizeInput, looksSuspicious } from "@/lib/sanitize";
import { rateLimit } from "@/lib/ratelimit";
import { corsHeaders } from "@/lib/cors";

// Type minimal compatible avec le SDK OpenRouter
type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const BodySchema = z.object({
  raw: z.string().min(1),
  source: z.string().default("unknown"),
  model: z.string().optional(),
});

const SYSTEM_PROMPT = `You are a senior SOC analyst. Analyse the provided log strictly.
Return a JSON with fields:
{
  "summary": string,
  "classification": { "mitre": string[], "kill_chain": string },
  "ioc": { "ip": string[], "domain": string[], "hash": string[] },
  "risk": { "level": "low"|"medium"|"high", "rationale": string },
  "recommended_actions": string[]
}
Rules:
- If unsure, say so.
- Do not invent IOCs. Extract only exact values.
- No preamble, output valid JSON only.`;

const MAX_TOKENS = Number(process.env.OPENROUTER_MAX_TOKENS ?? 600);
const DEFAULT_MODEL =
  process.env.OPENROUTER_SIEM_MODEL || "mistralai/mistral-large";
const CHEAP_MODEL =
  process.env.OPENROUTER_CHEAP_MODEL || "mistralai/mistral-small-latest";

// Normalise string | ContentItem[] -> string
type ContentItem =
  | string
  | { type: "text"; text: string }
  | { type: string; [k: string]: unknown };

function contentToString(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    const parts: string[] = [];
    for (const it of content as ContentItem[]) {
      if (typeof it === "string") parts.push(it);
      else if (
        (it as any)?.type === "text" &&
        typeof (it as any)?.text === "string"
      ) {
        parts.push((it as any).text);
      } else if (typeof (it as any)?.text === "string") {
        parts.push((it as any).text as string);
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

export async function OPTIONS() {
  return NextResponse.json({}, { headers: { ...corsHeaders() } });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anon";
  if (!rateLimit(ip).allowed) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: corsHeaders() }
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_body" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const { raw, source, model } = parsed.data;
  const cleaned = sanitizeInput(raw, 6000);
  if (looksSuspicious(cleaned)) {
    return NextResponse.json(
      { error: "input_blocked" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const client = getOpenRouter();
  const chosenModel = model || DEFAULT_MODEL;

  // ✅ Typage strict requis par le SDK
  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: `SOURCE=${source}\nLOG:\n${cleaned}` },
  ];

  try {
    // ✅ Paramètre correct: maxTokens (camelCase)
    const res = await client.chat.send({
      model: chosenModel,
      messages,
      maxTokens: MAX_TOKENS,
    });
    const rawContent: unknown = res.choices?.[0]?.message?.content ?? "{}";
    const text = contentToString(rawContent).trim() || "{}";

    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { summary: text };
    }

    return NextResponse.json(
      { model: chosenModel, data },
      { headers: corsHeaders() }
    );
  } catch (e: any) {
    if (e?.statusCode === 402) {
      // Fallback crédits: modèle moins cher + tokens réduits
      const res2 = await client.chat.send({
        model: CHEAP_MODEL,
        messages,
        maxTokens: Math.max(256, Math.floor(MAX_TOKENS / 2)),
      });
      const raw2: unknown = res2.choices?.[0]?.message?.content ?? "{}";
      const text2 = contentToString(raw2).trim() || "{}";
      let data2: unknown;
      try {
        data2 = JSON.parse(text2);
      } catch {
        data2 = { summary: text2 };
      }
      return NextResponse.json(
        { model: CHEAP_MODEL, data: data2 },
        { headers: corsHeaders() }
      );
    }

    const code = e?.statusCode ?? 500;
    const msg =
      (typeof e?.body === "string" ? e.body : undefined) ||
      e?.message ||
      "unexpected_error";
    return NextResponse.json(
      { error: msg },
      { status: code, headers: corsHeaders() }
    );
  }
}
