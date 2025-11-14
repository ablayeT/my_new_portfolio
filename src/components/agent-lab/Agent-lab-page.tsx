// src/app/agent-lab/page.tsx
"use client";

import { useState } from "react";

type AgentResult = {
  goal: string;
  steps: { title: string; details: string }[];
  match_score: number;
  strengths: string[];
  risks: string[];
  questions_to_ask: string[];
  final_recommendation: string;
};

export default function AgentLabPage() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<AgentResult | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [showPipeline, setShowPipeline] = useState(false);

  async function runAgent() {
    setLoading(true);
    setErr(null);
    setRes(null);
    setShowPipeline(false);
    try {
      const r = await fetch("/api/agent-career", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ q }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Erreur agent");

      if (data?.bad_format) {
        if (data?.bad_format && data?.data) {
          console.warn("J'ai dû réparer un JSON mal formaté.");
        }
      }

      setRes(data.data as AgentResult);
    } catch (e: any) {
      setErr(e.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  const score = res ? Math.round(res.match_score ?? 0) : null;
  const scoreColor =
    score == null
      ? "bg-neutral-200 text-neutral-800"
      : score >= 80
        ? "bg-emerald-100 text-emerald-800"
        : score >= 60
          ? "bg-amber-100 text-amber-800"
          : "bg-red-100 text-red-800";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="container mx-auto px-4 py-10 md:py-14 space-y-10">
        {/* Hero */}
        <section className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-purple-700 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-100">
            AI Agent Lab
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Career Matching Agent
          </h1>
          <p className="text-sm md:text-base text-slate-700 dark:text-slate-200">
            Cet agent IA lit mon profil (expériences, projets, compétences) et
            mesure en quelques secondes l’adéquation d’Abdoulaye à{" "}
            <span className="font-semibold text-purple-700 dark:text-purple-200">
              un poste précis en cybersécurité
            </span>{" "}
            (SOC, Purple Team, DevSecOps,Audit/Pentest GRC, admin Systèmes
            réseaux & securité).
          </p>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
            Idée simple : vous collez une description de poste ou un besoin, et
            l’agent vous renvoie un score synthétique, les forces, les points de
            vigilance et une recommandation exploitable immédiatement.
          </p>
        </section>

        {/* Layout 2 colonnes */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* Colonne gauche : input */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-3 gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide dark:text-slate-200">
                    Votre besoin
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Fiche de poste, contexte d’équipe, attentes clés, etc.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Temps de réponse moyen : ~5–10 sec
                </span>
              </div>

              <textarea
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full min-h-[180px] rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/70 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                placeholder={`Ex : Nous recherchons un analyste SOC L2 avec expérience ELK, corrélation MITRE ATT&CK, automatisation de détection, et appétence Purple Team...`}
              />

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">
                    Tip : collez une vraie fiche de poste
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">
                    Les données saisies ne sont pas stockées
                  </span>
                </div>
                <button
                  onClick={runAgent}
                  disabled={loading || !q.trim()}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-40 hover:bg-purple-500 transition-colors"
                >
                  {loading ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                      Analyse en cours…
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      Lancer l’agent
                    </>
                  )}
                </button>
              </div>

              {err && (
                <p className="mt-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 dark:bg-red-950/40 dark:border-red-700/60 dark:text-red-200">
                  {err}
                </p>
              )}
            </div>

            {/* Bloc d’explication pour les recruteurs */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-[11px] text-slate-700 space-y-2 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <p className="font-semibold text-slate-800 text-xs dark:text-slate-100">
                Comment utiliser cet agent en tant que recruteur ?
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Collez la description de votre poste (ou un extrait
                  représentatif).
                </li>
                <li>
                  L’agent croise votre besoin avec mon vrai parcours (profil,
                  projets, stack, Purple Team Lab).
                </li>
                <li>
                  Utilisez le score, les forces et les risques comme complément
                  à votre propre analyse, jamais comme décision automatique.
                </li>
                <li>
                  Pour le mode conversationnel : Voir mon chatbot au dessous de
                  ce lab !
                </li>
              </ul>
            </div>
          </div>

          {/* Colonne droite : output agent */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-4 gap-3">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Résultat de l’agent
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    Voici ma synthèse : score d’adéquation, forces, risques et
                    verdict argumenté :
                  </p>
                </div>
                <div
                  className={`flex flex-col items-end text-right text-xs rounded-xl px-3 py-2 ${scoreColor}`}
                >
                  <span className="uppercase tracking-wide">Score global</span>
                  <span className="text-xl font-semibold">
                    {score != null ? `${score}%` : "--"}
                  </span>
                </div>
              </div>

              {!res ? (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Lancez l’agent pour générer une analyse structurée de
                  l’adéquation d’Abdoulaye à votre besoin.
                </p>
              ) : (
                <div className="space-y-4 text-xs">
                  {/* Forces / risques en premier, avec titres plus discrets */}
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <h3 className="text-[11px] font-semibold text-slate-700 flex items-center gap-2 dark:text-slate-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Forces d’Abdoulaye
                      </h3>
                      <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                        {res.strengths?.length ? (
                          res.strengths.map((s, i) => <li key={i}>{s}</li>)
                        ) : (
                          <li>Pas de forces spécifiques remontées.</li>
                        )}
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[11px] font-semibold text-slate-700 flex items-center gap-2 dark:text-slate-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Points de vigilance
                      </h3>
                      <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                        {res.risks?.length ? (
                          res.risks.map((s, i) => <li key={i}>{s}</li>)
                        ) : (
                          <li>Pas de risques majeurs identifiés.</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Pipeline d’analyse : replié par défaut */}
                  {res.steps?.length > 0 && (
                    <div className="border-t border-slate-200 pt-3 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => setShowPipeline((v) => !v)}
                        className="flex w-full items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        aria-expanded={showPipeline}
                      >
                        <span className="font-semibold">
                          Pipeline d’analyse de l’agent
                        </span>
                        <span className="text-xs">
                          {showPipeline ? "Masquer" : "Afficher"}
                        </span>
                      </button>

                      {showPipeline && (
                        <ol className="mt-2 space-y-1 text-slate-700 dark:text-slate-300">
                          {res.steps.map((s, i) => (
                            <li
                              key={i}
                              className="border-l border-slate-300 pl-3 dark:border-slate-600"
                            >
                              <p className="font-semibold text-[11px]">
                                {s.title}
                              </p>
                              <p className="text-[11px] text-slate-700 dark:text-slate-300/90">
                                {s.details}
                              </p>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}

                  {/* Questions complémentaires */}
                  {res.questions_to_ask?.length > 0 && (
                    <div className="space-y-1">
                      <h3 className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                        Questions complémentaires à clarifier
                      </h3>
                      <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                        {res.questions_to_ask.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Reco finale */}
                  <div className="border-t border-slate-200 pt-3 dark:border-slate-700">
                    <h3 className="text-[11px] font-semibold text-slate-700 mb-1 dark:text-slate-200">
                      Recommandation finale
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      {res.final_recommendation || "—"}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-800/40 border border-slate-700/50 px-3 py-2 text-[11px] text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                    <span>
                      Aucune donnée n’est stockée. Sauvegardez le rapport si
                      vous souhaitez le conserver.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-slate-500 dark:text-slate-500">
              Cet agent n’est pas un filtre automatique ni un outil de décision.
              Il illustre ma capacité à concevoir, sécuriser et intégrer des
              agents IA orientés métier dans un contexte de recrutement en
              cybersécurité.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
