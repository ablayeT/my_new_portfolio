// src/app/agent-lab/page.tsx
"use client";

import { useState } from "react";

export default function AgentLabPage() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function runAgent() {
    setLoading(true);
    setErr(null);
    setRes(null);
    try {
      const r = await fetch("/api/agent-career", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ q }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Erreur agent");
      setRes(data.data);
    } catch (e: any) {
      setErr(e.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-10 space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">
          AI Agent Lab — Career Matching Agent
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Cet agent IA lit mon profil complet (expériences, projets,
          compétences) et analyse votre besoin pour mesurer l’adéquation
          d’Abdoulaye à un poste en cybersécurité (SOC, Purple Team, DevSecOps,
          GRC).
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <label className="text-sm font-medium">
            Votre description de poste ou votre question
          </label>
          <textarea
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full min-h-[160px] rounded-lg border px-3 py-2 text-sm"
            placeholder="Ex: Nous recherchons un analyste SOC L2 avec expérience ELK, détection MITRE ATT&CK, Purple Team..."
          />
          <button
            onClick={runAgent}
            disabled={loading || !q.trim()}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold disabled:opacity-40"
          >
            {loading ? "Analyse en cours..." : "Lancer l’agent"}
          </button>
          {err && <p className="text-xs text-red-600 mt-2">{err}</p>}
        </div>

        <div className="space-y-3">
          {res ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    Score d’adéquation
                  </p>
                  <p className="text-3xl font-bold">
                    {Math.round(res.match_score)}%
                  </p>
                </div>
                <div className="text-xs text-neutral-500 max-w-[60%]">
                  {res.goal}
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-sm font-semibold">Étapes de l’analyse</h2>
                <ol className="space-y-1 text-xs">
                  {res.steps?.map((s: any, i: number) => (
                    <li key={i} className="border-l pl-2">
                      <p className="font-semibold">{s.title}</p>
                      <p className="text-neutral-600 dark:text-neutral-300">
                        {s.details}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="grid gap-3 md:grid-cols-2 text-xs">
                <div>
                  <h3 className="font-semibold">Forces d’Abdoulaye</h3>
                  <ul className="list-disc pl-4 space-y-1">
                    {res.strengths?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Points de vigilance</h3>
                  <ul className="list-disc pl-4 space-y-1">
                    {res.risks?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-xs">
                <h3 className="font-semibold">Recommandation finale</h3>
                <p>{res.final_recommendation}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-neutral-500">
              Lance une analyse pour voir comment l’agent IA évalue l’adéquation
              de mon profil à votre besoin.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
