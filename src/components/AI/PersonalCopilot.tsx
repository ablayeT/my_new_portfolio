"use client";
import { useState } from "react";

export default function PersonalCopilot() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    setLoading(true);
    setA("");
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const data = await res.json();
    setA(data.content || "");
    setLoading(false);
  }

  return (
    <div className="grid gap-4 p-4 rounded-2xl border shadow-sm">
      <h2 className="text-xl font-semibold">Personal Copilot</h2>
      <input
        className="w-full p-3 rounded-md border outline-none"
        placeholder="Pose une question sur mon profil, mes projets, ma vision…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button
        onClick={ask}
        disabled={loading || !q.trim()}
        className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-40"
      >
        {loading ? "Réflexion…" : "Demander"}
      </button>
      {a && (
        <div className="prose max-w-none">
          <p>{a}</p>
        </div>
      )}
      <p className="text-xs text-neutral-500">
        Respecte le cadre RGPD : aucune donnée sensible n’est stockée.
      </p>
    </div>
  );
}
