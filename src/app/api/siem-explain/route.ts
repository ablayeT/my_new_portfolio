import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getOpenRouter } from "@/lib/openrouter";
import { sanitizeInput, looksSuspicious } from "@/lib/sanitize";
import { rateLimit } from "@/lib/ratelimit";
import { corsHeaders } from "@/lib/cors";

const BodySchema = z.object({
  raw: z.string().min(1),
  source: z.string().default("unknown"),
  model: z.string().optional(),
});

const SYSTEM_PROMPT = `You are a senior SOC analyst. Analyse the provided log strictly.
Return a JSON with fields: {\n \"summary\": string,\n \"classification\": {\n \"mitre\": string[],\n \"kill_chain\": string\n },\n \"ioc\": {\n \"ip\": string[], \"domain\": string[], \"hash\": string[]\n },\n \"risk\": {\n \"level\": \"low\"|\"medium\"|\"high\", \"rationale\": string\n },\n \"recommended_actions\": string[]\n}\n
Rules:\n- If unsure, say so.\n- Do not invent IOCs. Extract only exact values.\n- No preamble, output valid JSON only.`;

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
  const cleaned = sanitizeInput(raw);
  if (looksSuspicious(cleaned)) {
    return NextResponse.json(
      { error: "input_blocked" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const client = getOpenRouter();
  const chosenModel =
    model || process.env.OPENROUTER_SIEM_MODEL || "mistralai/mistral-large";

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: `SOURCE=${source}\nLOG:\n${cleaned}` },
  ];

  const res = await client.chat.send({ model: chosenModel, messages });
  const content = res.choices?.[0]?.message?.content ?? "{}";

  // tenter JSON.parse, mais ne pas planter si léger écart
  let data: unknown = {};
  try {
    data = JSON.parse(content);
  } catch {
    data = { summary: content };
  }

  return NextResponse.json(
    { model: chosenModel, data },
    { headers: corsHeaders() }
  );
}
