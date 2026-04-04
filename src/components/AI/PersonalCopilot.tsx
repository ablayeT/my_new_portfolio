"use client";
import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "Présente Abdoulaye en 30 secondes pour un recruteur.",
  "Ses projets les plus pertinents pour un poste SOC / Threat Hunting.",
  "Sa double compétence dev + infrastructures sécurisées.",
  "Comment il intègre l'IA dans ses projets cybersécurité ?",
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
      if (!res.ok) throw new Error(data?.error || "Erreur serveur");
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
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b bg-muted/30 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-primary/30">
            <img
              src="/cv/photo.jpeg"
              alt="Abdoulaye Touré"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Copilot d'Abdoulaye</p>
            <p className="text-[11px] text-muted-foreground">
              Agent contextuel — profil professionnel
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            En ligne
          </span>
        </div>
      </div>

      <div className="p-5 space-y-5">

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          Posez des questions libres sur mon profil, mes expériences, mes projets ou ma vision.
          L'agent répond en s'appuyant strictement sur mes données de profil.
        </p>

        {/* Suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { setQ(s); void ask(s); }}
              className="text-left rounded-xl border bg-muted/20 px-3 py-2.5 text-xs text-foreground hover:bg-muted/50 transition-colors leading-snug"
            >
              <Sparkles className="h-3 w-3 text-primary mb-1" />
              {s}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-xl border bg-muted/20 px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Posez votre question…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading || !q.trim()}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>

          {err && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {err}
            </p>
          )}
        </form>

        {/* Response */}
        {a && (
          <div className="rounded-xl border bg-muted/20 px-4 py-4 space-y-2">
            <div className="flex items-center gap-2">
              <Bot className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Réponse de l'agent
              </span>
            </div>
            <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{a}</p>
          </div>
        )}

        <p className="text-[11px] text-muted-foreground">
          Conforme RGPD — aucune donnée sensible stockée côté serveur.
          Ce copilot illustre l'intégration d'un agent IA dans une application web.
        </p>
      </div>
    </div>
  );
}