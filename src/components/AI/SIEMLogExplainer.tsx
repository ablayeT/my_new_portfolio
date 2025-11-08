"use client";
import { useState } from "react";

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
    <div className="grid gap-4 p-4 rounded-2xl border shadow-sm">
      <h2 className="text-xl font-semibold">SIEM Log Explainer</h2>
      <textarea
        className="w-full h-40 p-3 rounded-md border outline-none"
        placeholder="Colle ici un log brut (auth.log, Nginx, Windows Event, Suricata…)"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
      />
      <button
        onClick={onExplain}
        disabled={loading || !raw.trim()}
        className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-40"
      >
        {loading ? "Analyse…" : "Analyser"}
      </button>

      {error && <p className="text-red-600">Erreur: {error}</p>}
      {result && (
        <pre className="bg-neutral-100 p-3 rounded-md overflow-auto text-sm">
          {JSON.stringify(result.data, null, 2)}
        </pre>
      )}

      <p className="text-xs text-neutral-500">
        Les données restent côté navigateur/API. Pas d’IOCs inventés —
        extraction stricte.
      </p>
    </div>
  );
}
