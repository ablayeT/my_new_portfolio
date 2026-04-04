"use client";
import { useState } from "react";
import { Shield, Terminal, AlertTriangle, CheckCircle } from "lucide-react";

const SAMPLE_LOG = `Jan 15 03:42:17 server01 sshd[1234]: Failed password for invalid user admin from 192.168.1.105 port 52341 ssh2`;

export default function SIEMLogExplainer() {
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function onExplain() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/siem-explain", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ raw, source: "manual" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "unexpected_error");
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b bg-muted/30 px-5 py-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Analyseur de logs SIEM</span>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
          IA temps réel
        </span>
      </div>

      <div className="p-5 space-y-4">

        {/* Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Log brut
          </label>
          <textarea
            className="w-full h-36 rounded-xl border bg-muted/20 px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            placeholder={`Colle ici un log brut…\n\nEx : ${SAMPLE_LOG}`}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setRaw(SAMPLE_LOG)}
            className="text-[11px] text-primary hover:underline"
          >
            Utiliser un exemple →
          </button>
        </div>

        {/* Action */}
        <button
          onClick={onExplain}
          disabled={loading || !raw.trim()}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              Analyse en cours…
            </>
          ) : (
            <>
              <Shield className="h-4 w-4" />
              Analyser le log
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
            <AlertTriangle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
            <p className="text-xs text-destructive">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">
                Analyse terminée
              </span>
            </div>
            <pre className="overflow-auto rounded-xl border bg-muted/30 p-4 text-xs font-mono text-foreground leading-relaxed">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}

        <p className="text-[11px] text-muted-foreground">
          Les données restent côté navigateur/API. Extraction stricte — aucun IOC inventé.
        </p>
      </div>
    </div>
  );
}