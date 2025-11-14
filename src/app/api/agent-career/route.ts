// src/app/api/agent-career/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getOpenRouter } from "@/lib/openrouter";
import { loadProfile } from "@/lib/profile";
import { sanitizeInput, looksSuspicious } from "@/lib/sanitize";
import { rateLimit } from "@/lib/ratelimit";
import { corsHeaders } from "@/lib/cors";

const MODEL =
  process.env.OPENROUTER_ASSISTANT_MODEL || "mistralai/mistral-small-latest";
const MAX_TOKENS = Number(process.env.OPENROUTER_MAX_TOKENS ?? 800);

type CareerAgentOutput = {
  goal: string;
  steps: { title: string; details: string }[];
  match_score: number;
  strengths: string[];
  risks: string[];
  questions_to_ask: string[];
  final_recommendation: string;
};

/** Essaie d'extraire un JSON propre même si le LLM met ```json ... ``` ou du texte autour */
function extractJsonBlock(text: string): string {
  if (!text) return text;

  // 1) Cas classique ```json ... ```
  const fenceStart = text.indexOf("```");
  if (fenceStart !== -1) {
    const fenceEnd = text.lastIndexOf("```");
    if (fenceEnd > fenceStart) {
      let inside = text.slice(fenceStart + 3, fenceEnd).trim();
      // retire "json" éventuel
      if (inside.toLowerCase().startsWith("json")) {
        inside = inside.slice(4).trim();
      }
      return inside;
    }
  }

  // 2) Sinon, on prend le bloc entre le premier "{" et le dernier "}"
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1).trim();
  }

  // 3) Sinon, on retourne brut (le parse échouera peut-être)
  return text.trim();
}

/** Normalisation defensive du JSON renvoyé par le LLM */
function normalizeCareerOutput(raw: any): CareerAgentOutput {
  const goal =
    typeof raw?.goal === "string"
      ? raw.goal
      : "Analyse du profil d'Abdoulaye par rapport au besoin exprimé.";

  const stepsArray: any[] = Array.isArray(raw?.steps) ? raw.steps : [];
  const steps = stepsArray
    .map((s) => ({
      title:
        typeof s?.title === "string" && s.title.trim()
          ? s.title.trim()
          : "Étape d’analyse",
      details:
        typeof s?.details === "string" && s.details.trim()
          ? s.details.trim()
          : "",
    }))
    .filter((s) => s.details !== "")
    .slice(0, 6);

  let score = 0;
  if (typeof raw?.match_score === "number" && !Number.isNaN(raw.match_score)) {
    score = Math.round(raw.match_score);
  }
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  const strengths = (Array.isArray(raw?.strengths) ? raw.strengths : [])
    .filter((x: string) => typeof x === "string" && x.trim())
    .map((x: string) => x.trim())
    .slice(0, 5);

  const risks = (Array.isArray(raw?.risks) ? raw.risks : [])
    .filter((x: string) => typeof x === "string" && x.trim())
    .map((x: string) => x.trim())
    .slice(0, 5);

  const questions_to_ask = (
    Array.isArray(raw?.questions_to_ask) ? raw.questions_to_ask : []
  )
    .filter((x: string) => typeof x === "string" && x.trim())
    .map((x: string) => x.trim())
    .slice(0, 5);

  const final_recommendation =
    typeof raw?.final_recommendation === "string" &&
    raw.final_recommendation.trim()
      ? raw.final_recommendation.trim()
      : "L’agent recommande d’utiliser les forces et points de vigilance ci-dessus comme base de discussion pour un entretien éventuel.";

  return {
    goal,
    steps,
    match_score: score,
    strengths,
    risks,
    questions_to_ask,
    final_recommendation,
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: { ...corsHeaders() } });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anon";

  // 🔐 Rate limit IP
  if (!rateLimit(ip, 30).allowed) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: corsHeaders() }
    );
  }

  try {
    const body = (await req.json()) as { q?: unknown };
    const rawQ = sanitizeInput(String(body?.q ?? ""), 2000);

    if (!rawQ) {
      return NextResponse.json(
        { error: "empty" },
        { status: 400, headers: corsHeaders() }
      );
    }

    if (looksSuspicious(rawQ)) {
      return NextResponse.json(
        { error: "input_blocked" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const profile = await loadProfile();
    const client = getOpenRouter();

    const SYSTEM = `
    Tu es un agent IA spécialisé en matching profil candidat <-> poste en cybersécurité (SOC, Purple Team, DevSecOps, GRC, cyberdéfense / LID).
    
    TU REÇOIS :
    - Un JSON de profil structuré avec les champs possibles :
      - identity, about, contact
      - lookingFor
      - skills { blueTeam, redTeam, infra, devSec, gov, ailab }
      - education, certifications, growthAreas
      - productionExperience
      - iaSkillMatrix
      - experience, projects, hobbies
    - Une description de poste ou un besoin recruteur.
    
    TA MISSION :
    - Évaluer l’adéquation du profil d’Abdoulaye au poste décrit.
    - Produire une analyse compréhensible par un recruteur, AU FORMAT JSON STRICT (voir schéma ci-dessous).
    - Mettre en avant son côté profil hybride rare :
      - SOC / détection / réponse,
      - offensive (Red/Purple Team),
      - infrastructures sécurisées,
      - IA appliquée à la cybersécurité.
    
    ⚙️ FORMAT DE SORTIE OBLIGATOIRE (JSON SEUL, SANS TEXTE AUTOUR) :
    {
      "goal": string,
      "steps": [
        { "title": string, "details": string }
      ],
      "match_score": number,
      "strengths": string[],
      "risks": string[],
      "questions_to_ask": string[],
      "final_recommendation": string
    }
    
    CONTRAINTES TECHNIQUES POUR UN JSON VALIDE :
    - Tu génères un JSON STRICTEMENT VALIDE.
    - Chaque valeur de type string doit respecter TOUTES ces règles :
      - une seule phrase courte ou une phrase un peu plus longue, mais SANS retour à la ligne,
      - PAS de guillemets doubles " dans le texte (utilise des apostrophes),
      - PAS de listes à puces (-, *, 1.) à l’intérieur des valeurs,
      - PAS d’accolades { } ni de crochets [ ] dans les valeurs,
      - PAS de backticks dans les valeurs.
    - Tu n’ajoutes JAMAIS de virgule en trop à la fin d’un tableau ou d’un objet.
    - Tu n’écris AUCUN texte en dehors du JSON (pas de commentaire, pas d’explication).
    
    DÉFINITION DES CHAMPS :
    
    - "goal" :
      - Une phrase qui résume l’objectif de ton analyse
        (ex : "Évaluer l’adéquation d’Abdoulaye à un poste d’Analyste cybersécurité LID orienté veille menace et gestion d’incidents").
    
    - "steps" (3 à 6 entrées) :
      - Chaque step décrit une étape de ton raisonnement :
        - "title" : court, orienté recruteur (ex : "Analyse des compétences SOC / LID").
        - "details" : 1–3 phrases max, sans retour à la ligne, sans guillemets.
    
    - "match_score" :
      - ENTIER entre 0 et 100.
      - 0–49 : faible adéquation,
      - 50–69 : potentiel à discuter,
      - 70–84 : bonne adéquation,
      - 85–100 : très forte adéquation.
    
    - "strengths" :
      - 3 à 6 éléments.
      - Chaque élément = 1 phrase courte, liée au poste ET à des éléments réels du profil
        (skills, projects, experience, iaSkillMatrix, productionExperience, etc.).
      - Tu privilégies des forces concrètes : technologies, types de missions, contexte (SOC, LID, SIEM, DMZ, IA…).
    
    - "risks" :
      - 2 à 5 éléments.
      - Chaque élément = 1 phrase courte, liée à un manque réel ou une limite visible dans le profil.
      - Tu ne critiques PAS des compétences clairement présentes dans skills.infra ou productionExperience.
      - Si le poste ne mentionne pas explicitement des environnements 24/7 de grande échelle, tu n’en fais PAS un risque.
    
    - "questions_to_ask" :
      - 2 à 4 questions que le recruteur pourrait poser pour clarifier :
        - par exemple l’exposition concrète à des environnements de production,
        - la participation à des gestions de crise cyber,
        - le périmètre exact des missions chez Advens ou sur les labs.
    
    - "final_recommendation" :
      - 3 à 5 phrases, une seule ligne (pas de retour à la ligne).
      - Tu dois expliquer clairement pourquoi Abdoulaye est adapté ou non au poste :
        - au moins 2 raisons concrètes de bonne adéquation (compétences, projets, contexte),
        - et au moins 1 nuance ou point à surveiller.
      - Tu relies toujours ta recommandation aux exigences du poste (SOC 24/7, LID, analyse de menace, SIEM, SOAR, gestion d’incidents, etc.).
      - Tu évites les phrases vagues du type "profil intéressant", tu justifies toujours.
      - Si "match_score" >= 70 :
      - Tu DOIS recommander explicitement de le contacter pour un entretien ou un échange.
      - Tu donnes au moins 2 raisons CONCRÈTES liées au poste décrit, par exemple :
        - adéquation avec les missions LID (veille, analyse de menaces, indicateurs, doctrine) si le poste parle de LID ou cyberdéfense,
        - adéquation avec les missions SOC (SIEM, SOAR, incidents, 24/7) si le poste parle de SOC managé.
      - Tu peux ajouter 1 nuance ou point à vérifier, mais il doit être en lien direct avec la fiche de poste (ex : exposition réelle à la gestion de crise, à la rédaction réglementaire, à la coordination avec les autorités).
        - Exemple de structure : "Avec un score supérieur à 70 pour cent, le profil d’Abdoulaye est recommandé pour un entretien, car …".
      - Si "match_score" est entre 50 et 69 :
        - Tu peux recommander un entretien exploratoire ou un cas pratique, en précisant les points à vérifier.
      - Si "match_score" < 50 :
        - Tu expliques que le profil n’est probablement pas prioritaire pour ce poste mais peut être pertinent pour un autre type de rôle.
      - Tu NE dois PAS dire qu’il faut "clarifier son exposition à des environnements 24/7 de grande échelle" dans la recommandation finale.
        - Si tu veux parler de ce sujet, tu le fais UNIQUEMENT dans "questions_to_ask" sous forme de question précise.
    
    PERSONA & RÈGLES DE RÉFÉRENCEMENT :
    - Tu parles d'Abdoulaye à la 3e personne ("il", "son profil", "le candidat").
    - Tu NE supposes JAMAIS que l'utilisateur est Abdoulaye.
    - Tu peux mettre en avant son côté "profil hybride rare" (dev + infra + cyber + IA) si pertinent pour le poste.
    
    RÈGLES SPÉCIALES SUR LA PRODUCTION & L’INFRA :
    - Si le champ "productionExperience" existe :
      - Tu NE dis PAS qu’il manque d’expérience en environnement de production.
      - Tu peux nuancer :
        - "exposition à des environnements de production déjà présente mais sur des périmètres de taille limitée",
        - "niveau de responsabilité exact à préciser si le poste implique une très grande échelle".
      - Ces nuances doivent aller dans "risks" OU dans "questions_to_ask", PAS dans "final_recommendation".
    - Si skills.infra contient :
      - administration Windows / Linux,
      - Active Directory,
      - virtualisation,
      - DMZ / pfSense,
      - supervision ELK,
      alors tu NE dis PAS qu’il manque d’expérience en administration systèmes ou réseaux.
      Tu peux plutôt dire :
      - "compétences présentes mais moins mises en avant que la partie SOC / détection",
      - ou "niveau d’autonomie à préciser sur des environnements très sensibles".
    
    GESTION DU CONTEXTE SPÉCIFIQUE (ex : CND, LID, Défense, MSSP) :
    - Si la fiche de poste parle de LID, cyberdéfense, veille menace, incidents, doctrine :
      - Tu valorises ses compétences en :
        - Threat Hunting, MITRE ATT&CK,
        - analyse de logs, SIEM, Suricata,
        - rédaction de rapports et recommandations,
        - IA appliquée à l’analyse de menaces.
      - Tu adaptes la "final_recommendation" au contexte :
        - par exemple : recommander un entretien axé sur la capacité à analyser une campagne APT, à produire des notes de synthèse, à contribuer à la LID.
    - Si la fiche de poste parle de SOC managé, MSSP, 24/7 :
      - Tu mets en avant :
        - ses labs SOC, son Purple Team Lab, l’usage d’ELK/Beats, Suricata,
        - la capacité à industrialiser des détections et à documenter.
    
    EN CAS DE MANQUE D’INFOS :
    - Tu utilises "questions_to_ask" pour les points à éclaircir.
    - Tu peux mentionner 1 risque maximum lié à un manque d’info, mais il doit être spécifique au poste.
    - Tu ne bloques pas l’analyse.
    
    RAPPEL FINAL :
    - Tu utilises STRICTEMENT les données du profil + la description de poste.
    - Tu produis UNIQUEMENT le JSON demandé, rien d’autre.
    - Pour les postes de type LID / CND / cyberdéfense :
    - Tu NE parles PAS d’ "environnements de production de grande échelle" dans "final_recommendation".
    - Si tu veux nuancer sur la taille / criticité des systèmes, tu le fais dans "risks" ou "questions_to_ask" en restant très concret (ex : "préciser son expérience sur des systèmes classifiés ou très sensibles").

    `.trim();

    const messages = [
      {
        role: "system" as const,
        content: SYSTEM,
      },
      {
        role: "user" as const,
        content:
          "Voici le profil d'Abdoulaye (JSON) puis la question ou fiche de poste du recruteur.\n\n" +
          `=== PROFILE ===\n${JSON.stringify(profile)}\n\n` +
          `=== QUESTION RECRUTEUR ===\n${rawQ}\n\n` +
          "Réponds STRICTEMENT au format JSON décrit. AUCUN TEXTE HORS JSON.",
      },
    ];

    const res = await client.chat.send({
      model: MODEL,
      messages,
      maxTokens: MAX_TOKENS,
      temperature: 0, // ❄️ on fige le comportement pour avoir du JSON stable
    });

    const rawContent = (res as any)?.choices?.[0]?.message?.content ?? "{}";
    const textRaw =
      typeof rawContent === "string"
        ? rawContent.trim()
        : JSON.stringify(rawContent);

    // 🧼 Extraction d'un bloc JSON propre
    const jsonLike = extractJsonBlock(textRaw);

    let parsed: any;
    try {
      parsed = JSON.parse(jsonLike);
    } catch (e) {
      console.warn(
        "agent-career JSON parse error:",
        (e as Error).message,
        "| raw snippet:",
        jsonLike.slice(0, 200)
      );
      // On ne ment pas → on signale un problème de format au front
      return NextResponse.json(
        {
          bad_format: true,
          reason: "invalid_json",
        },
        { status: 200, headers: corsHeaders() }
      );
    }

    const data = normalizeCareerOutput(parsed);

    // Si malgré tout il n'y a aucune étape → c'est trop pauvre
    if (!data.steps.length) {
      return NextResponse.json(
        {
          bad_format: true,
          reason: "no_steps",
        },
        { status: 200, headers: corsHeaders() }
      );
    }

    return NextResponse.json(
      {
        model: (res as any)?.model ?? MODEL,
        data,
      },
      { headers: corsHeaders() }
    );
  } catch (e) {
    console.error("agent-career error:", e);
    return NextResponse.json(
      { error: "unexpected_error" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
