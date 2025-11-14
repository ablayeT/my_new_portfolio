"use client";

import { useState } from "react";

const SUGGESTIONS = [
  "Présente Abdoulaye en 30 secondes pour un recruteur.",
  "Liste ses projets les plus pertinents pour un poste SOC / Threat Hunting.",
  "Explique sa double compétence développement + infrastructures sécurisées.",
  "Comment Abdoulaye utilise l’IA dans ses projets de cybersécurité ?",
];

export default function PersonalCopilot() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function ask(prompt?: string) {
    const query = (prompt ?? q).trim();
    if (!query) return;

    setLoading(true);
    setErr(null);
    setA("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ q: query }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Erreur serveur");
      }

      setA(String(data.content || ""));
    } catch (e: any) {
      setErr(e.message || "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void ask();
  }

  return (
    <section className="space-y-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-800 uppercase tracking-wide dark:text-slate-100">
              ASK ME QUESTIONS
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-md">
              Posez des questions libres sur mon profil, mes expériences, mes
              projets, ma vision ou l’IA en cybersécurité. L’agent répond en
              s’appuyant strictement sur mes données de profil.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-500 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
            Mode conversationnel
          </span>
        </div>

        {/* Suggestions rapides */}
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQ(s);
                void ask(s);
              }}
              className="text-[11px] rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Formulaire */}
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Votre question
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700 dark:placeholder:text-slate-500"
              placeholder="Ex : Résume son parcours pour un poste d’Analyste SOC junior."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Les réponses restent dans ce navigateur et ne sont pas stockées
              côté serveur.
            </p>
            <button
              type="submit"
              disabled={loading || !q.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  Réflexion…
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Demander
                </>
              )}
            </button>
          </div>

          {err && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 dark:bg-red-950/40 dark:border-red-800 dark:text-red-300">
              {err}
            </p>
          )}
        </form>

        {/* Réponse */}
        {a && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1 dark:text-slate-400">
              Réponse de l’agent
            </p>
            <p className="whitespace-pre-line leading-relaxed">{a}</p>
          </div>
        )}
      </div>

      <p className="text-[10px] text-slate-500 dark:text-slate-400">
        Ce copilot illustre comment j’intègre un agent IA personnalisé dans une
        application web (profil structuré, API sécurisée, réponses
        contextualisées).
      </p>

      <p className="text-xs text-neutral-500">
        Respecte le cadre RGPD : aucune donnée sensible n’est stockée.
      </p>
    </section>
  );
}
