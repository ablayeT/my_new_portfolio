"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSessionStorage } from "@/hooks/useSessionStorage";

type Msg = { role: "user" | "assistant"; content: string; ts: number };
type Pos = { x: number; y: number };

const WELCOME =
  "Bienvenue dans l’univers d’Abdou ! Mon profil vous intéresse — que puis-je faire pour vous ?";

const SUGGESTIONS = [
  "Présentez-moi Abdoulaye en 30 secondes.",
  "Quelles sont ses expériences clés en Purple Team ?",
  "Montrez ses projets marquants (ELK, Suricata, Pentest).",
  "Pourquoi Abdou en alternance / CDI ?",
  "Comment le contacter rapidement ?",
];

// UI sizing
const BTN_W = 72; // bouton: ~px (h-14 px-5)
const BTN_H = 56;
const MARGIN = 12;
const PANEL_W_MIN = 320;
const PANEL_W_MAX = 440;

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useSessionStorage<boolean>("ai:widget:open", false);
  const [msgs, setMsgs] = useSessionStorage<Msg[]>("ai:widget:history", []);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [chips, setChips] = useState<string[]>([]);

  // Positions persistées
  const [btnPos, setBtnPos] = useSessionStorage<Pos>("ai:widget:btnpos", {
    x: -1,
    y: -1,
  });
  const [panelPos, setPanelPos] = useSessionStorage<Pos>("ai:widget:panelpos", {
    x: -1,
    y: -1,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const draggingRef = useRef<{
    type: "button" | "panel" | null;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  }>({ type: null, startX: 0, startY: 0, origX: 0, origY: 0 });

  useEffect(() => setMounted(true), []);

  // Ctrl/Cmd + K : open/close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      // Alt + R : reset positions
      if (e.altKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        resetPositions();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  // Init positions visibles
  useEffect(() => {
    if (!mounted) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Bouton: bottom-right par défaut
    if (btnPos.x < 0 || btnPos.y < 0) {
      const x = vw - BTN_W - MARGIN;
      const y = vh - BTN_H - MARGIN;
      setBtnPos({ x, y });
    } else {
      // Clamp si viewport a changé
      setBtnPos((p) => clampBtn(p));
    }

    // Panneau: proche du bouton à l’ouverture
    if (open && (panelPos.x < 0 || panelPos.y < 0)) {
      const panelW = panelWidth(vw);
      const panelH = panelHeight(vh);
      const x = clamp(
        btnPos.x - (panelW - BTN_W),
        MARGIN,
        vw - panelW - MARGIN
      );
      const y = clamp(
        btnPos.y - panelH - 16,
        MARGIN,
        vh - panelH - MARGIN - (isMobile() ? 18 : 0)
      );
      setPanelPos({ x, y });
    } else if (open) {
      setPanelPos((p) => clampPanel(p));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, open]);

  // Recalage au resize
  useEffect(() => {
    if (!mounted) return;
    const onResize = () => {
      setBtnPos((p) => clampBtn(p));
      setPanelPos((p) => clampPanel(p));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mounted]);

  // Welcome + focus
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
      if (msgs.length === 0) {
        setMsgs([{ role: "assistant", content: WELCOME, ts: Date.now() }]);
      }
      if (panelPos.x < 0 || panelPos.y < 0) {
        // recalcule si pas encore positionné
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const panelW = panelWidth(vw);
        const panelH = panelHeight(vh);
        const x = clamp(
          btnPos.x - (panelW - BTN_W),
          MARGIN,
          vw - panelW - MARGIN
        );
        const y = clamp(
          btnPos.y - panelH - 16,
          MARGIN,
          vh - panelH - MARGIN - (isMobile() ? 18 : 0)
        );
        setPanelPos({ x, y });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function resetPositions() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setBtnPos({ x: vw - BTN_W - MARGIN, y: vh - BTN_H - MARGIN });
    if (open) {
      const panelW = panelWidth(vw);
      const panelH = panelHeight(vh);
      setPanelPos({
        x: clamp(vw - panelW - MARGIN, MARGIN, vw - panelW - MARGIN),
        y: clamp(vh - panelH - BTN_H - 24, MARGIN, vh - panelH - MARGIN),
      });
    } else {
      setPanelPos({ x: -1, y: -1 }); // recalculera à l’ouverture
    }
  }

  async function askText(prompt: string) {
    if (!prompt || busy) return;
    setBusy(true);
    setErr(null);

    const userMsg: Msg = { role: "user", content: prompt, ts: Date.now() };
    setMsgs((m) => [...m, userMsg]);
    setQ("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ q: prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur serveur");
      const a: Msg = {
        role: "assistant",
        content: String(data.content || "").trim(),
        ts: Date.now(),
      };
      setMsgs((m) => {
        const next = [...m, a];
        const c: string[] = [];
        if (/projet|project/i.test(a.content))
          c.push("Voir mes projets marquants");
        if (/compétence|skills?/i.test(a.content))
          c.push("Lister mes compétences par domaine");
        if (/contact|email|linkedin|github/i.test(a.content))
          c.push("Comment me contacter ?");
        if (/alternance|CDI|CDD|poste/i.test(a.content))
          c.push("Ce que je recherche actuellement");
        setChips(c);
        return next;
      });
    } catch (e: any) {
      setErr(e.message || "Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const prompt = q.trim();
    if (!prompt) return;
    void askText(prompt);
  }

  /** ===== Drag (button + panel) ===== */
  const onPointerDownBtn = (e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {}
    draggingRef.current = {
      type: "button",
      startX: e.clientX,
      startY: e.clientY,
      origX: btnPos.x,
      origY: btnPos.y,
    };
  };
  const onPointerDownHeader = (e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {}
    draggingRef.current = {
      type: "panel",
      startX: e.clientX,
      startY: e.clientY,
      origX: panelPos.x,
      origY: panelPos.y,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = draggingRef.current;
    if (!d.type) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (d.type === "button")
      setBtnPos(clampBtn({ x: d.origX + dx, y: d.origY + dy }));
    if (d.type === "panel")
      setPanelPos(clampPanel({ x: d.origX + dx, y: d.origY + dy }));
  };
  const onPointerUp = () => {
    draggingRef.current.type = null;
  };

  // Styles explicites top/left (pas de transform)
  const btnStyle = useMemo<React.CSSProperties>(
    () => ({
      left: Math.round(btnPos.x),
      top: Math.round(btnPos.y),
      touchAction: "none" as any,
    }),
    [btnPos]
  );

  const panelStyle = useMemo<React.CSSProperties>(
    () => ({
      left: Math.round(panelPos.x),
      top: Math.round(panelPos.y),
      width: "min(440px, 92vw)",
      maxHeight: "75dvh",
      touchAction: "none" as any,
    }),
    [panelPos]
  );

  const portalTarget = typeof document !== "undefined" ? document.body : null;
  if (!mounted || !portalTarget) return null;

  return createPortal(
    <>
      {/* Bouton flottant DRAGGABLE */}
      <button
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        onClick={(e) => {
          // si on est en drag (mouvement) ne pas toggle
          const d = draggingRef.current;
          if (d.type === "button") return;
          setOpen((v) => !v);
        }}
        onPointerDown={onPointerDownBtn}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="fixed z-[2147483000] h-14 px-5 rounded-full shadow-lg bg-purple-600 text-white flex items-center gap-2 justify-center hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700"
        style={btnStyle}
        title="Chat"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse" />
        <span className="text-sm font-semibold">Chat</span>
      </button>

      {/* Panneau DRAGGABLE */}
      {open && (
        <div
          role="dialog"
          aria-label="Chatbot"
          className="fixed z-[2147483646] rounded-2xl border shadow-xl bg-white dark:bg-neutral-900 flex flex-col overflow-hidden"
          style={panelStyle}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <header
            className="px-4 py-3 border-b flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
            onPointerDown={onPointerDownHeader}
          >
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-black text-white flex items-center justify-center text-xs">
                A
              </div>
              <div className="text-sm font-semibold">Personal Copilot</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMsgs([]);
                  setChips([]);
                }}
                className="rounded-md px-2 py-1 text-xs border hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                Réinitialiser
              </button>
              <button
                onClick={resetPositions}
                className="rounded-md px-2 py-1 text-xs border hover:bg-neutral-50 dark:hover:bg-neutral-800"
                title="Alt+R"
              >
                Recentrer
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1 text-xs border hover:bg-neutral-50 dark:hover:bg-neutral-800"
                aria-label="Fermer"
              >
                Fermer
              </button>
            </div>
          </header>

          {/* Messages */}
          <div className="p-3 overflow-auto flex-1 space-y-2">
            {msgs.filter((m) => m.role === "user").length === 0 && (
              <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => void askText(s)}
                    className="text-left text-xs rounded-xl border px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    aria-label={`Suggestion: ${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl px-3 py-2 bg-black text-white text-sm"
                    : "mr-auto max-w-[85%] rounded-2xl px-3 py-2 bg-neutral-100 dark:bg-neutral-800 text-sm"
                }
              >
                {m.content}
              </div>
            ))}

            {busy && (
              <div
                role="status"
                aria-live="polite"
                className="mr-auto max-w-[85%] rounded-2xl px-3 py-2 bg-neutral-100 dark:bg-neutral-800 text-sm"
              >
                <span className="inline-block w-2 h-2 rounded-full animate-bounce mr-1" />
                <span className="inline-block w-2 h-2 rounded-full animate-bounce mr-1 [animation-delay:120ms]" />
                <span className="inline-block w-2 h-2 rounded-full animate-bounce [animation-delay:240ms]" />
              </div>
            )}

            {err && <div className="text-xs text-red-600">{err}</div>}
          </div>

          {/* Input + chips */}
          <form onSubmit={onSubmit} className="p-3 border-t">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Écrire un message…"
                className="flex-1 rounded-xl border px-3 py-2 outline-none"
                aria-label="Message"
                inputMode="text"
              />
              <button
                type="submit"
                disabled={busy || !q.trim()}
                className="px-3 py-2 rounded-xl bg-black text-white disabled:opacity-40"
              >
                Envoyer
              </button>
            </div>

            {chips.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {chips.map((c) => (
                  <button
                    key={c}
                    onClick={() => void askText(c)}
                    type="button"
                    className="text-xs rounded-full border px-3 py-1 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      )}
    </>,
    portalTarget
  );
}

/** ===== Utils ===== */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
function panelWidth(vw: number) {
  return Math.min(PANEL_W_MAX, Math.max(PANEL_W_MIN, Math.floor(vw * 0.92)));
}
function panelHeight(vh: number) {
  return Math.floor(vh * 0.75);
}
function clampBtn(p: Pos): Pos {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  return {
    x: clamp(p.x, MARGIN, vw - BTN_W - MARGIN),
    y: clamp(p.y, MARGIN, vh - BTN_H - MARGIN),
  };
}
function clampPanel(p: Pos): Pos {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const w = panelWidth(vw);
  const h = panelHeight(vh);
  return {
    x: clamp(p.x, MARGIN, vw - w - MARGIN),
    y: clamp(p.y, MARGIN, vh - h - MARGIN),
  };
}
