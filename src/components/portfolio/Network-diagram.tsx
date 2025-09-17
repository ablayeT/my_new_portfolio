"use client";

import * as React from "react";
import {
  Plus,
  Minus,
  RotateCcw,
  X,
  Terminal,
  Server,
  Mail,
  Radar,
  Shield,
} from "lucide-react";
import { Button } from "@/components/comp/Button";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const NetworkDiagram: React.FC<Props> = ({ open, onClose }) => {
  const [scale, setScale] = React.useState(1);
  const [tx, setTx] = React.useState(0);
  const [ty, setTy] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [start, setStart] = React.useState<{ x: number; y: number } | null>(
    null
  );
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setScale(1);
    setTx(0);
    setTy(0);
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    // lock scroll derrière le modal
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const zoom = (dir: "in" | "out") => {
    setScale((s) => {
      const next =
        dir === "in" ? Math.min(2.2, s + 0.15) : Math.max(0.6, s - 0.15);
      return Number(next.toFixed(2));
    });
  };
  const reset = () => {
    setScale(1);
    setTx(0);
    setTy(0);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setStart({ x: e.clientX - tx, y: e.clientY - ty });
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !start) return;
    setTx(e.clientX - start.x);
    setTy(e.clientY - start.y);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };
  const onWheel: React.WheelEventHandler = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoom("in");
    else zoom("out");
  };

  // Tokens/couleurs
  const violet = "var(--tokens-color-brand-purple, #7c3aed)";
  const indigo = "var(--tokens-color-brand-primary, #6d28d9)";
  const border = "var(--color-border, hsl(215 16% 84%))";
  const bg = "var(--color-background, #fff)";
  const fgMuted = "var(--color-muted-foreground, #6b7280)";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex h-dvh w-dvw items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative mx-3 w-full max-w-6xl overflow-hidden rounded-2xl border bg-background shadow-2xl">
        {/* Header sombre + texte blanc */}
        {/* Header sombre + actions (blanc) */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-neutral-900/95 px-4 py-3 text-white">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold">
              Diagramme réseau — Purple Team Lab
            </h2>
            <p className="truncate text-xs">
              Public / DMZ / Private • Flows Red & Blue • Zoom & Pan
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              intent="ghost"
              size="sm"
              aria-label="Zoom out"
              onClick={() => zoom("out")}
              className="!text-white hover:!bg-white/10 focus-visible:ring-white/30"
            >
              <Minus size={16} className="text-white" />
            </Button>

            <Button
              type="button"
              intent="ghost"
              size="sm"
              aria-label="Zoom in"
              onClick={() => zoom("in")}
              className="!text-white hover:!bg-white/10 focus-visible:ring-white/30"
            >
              <Plus size={16} className="text-white" />
            </Button>

            <Button
              type="button"
              intent="ghost"
              size="sm"
              aria-label="Réinitialiser"
              onClick={reset}
              className="!text-white hover:!bg-white/10 focus-visible:ring-white/30"
            >
              <RotateCcw size={16} className="text-white" />
            </Button>

            <Button
              ref={closeBtnRef}
              type="button"
              intent="ghost"
              size="sm"
              aria-label="Fermer"
              onClick={onClose}
              className="ml-1 !text-white hover:!bg-white/10 focus-visible:ring-white/30"
            >
              <X size={16} className="text-white" />
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative h-[70vh] w-full overflow-hidden">
          <svg
            ref={svgRef}
            className="h-full w-full touch-pan-y"
            viewBox="0 0 1200 720"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onWheel={onWheel}
            style={{ background: `linear-gradient(180deg, ${bg}, ${bg})` }}
          >
            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={indigo} />
              </marker>
              <marker
                id="arrow-red"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="#ef4444" />
              </marker>
              <marker
                id="arrow-blue"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="#0ea5e9" />
              </marker>
              <linearGradient id="subnet" x1="0" x2="1">
                <stop offset="0%" stopColor={`${violet}`} stopOpacity="0.10" />
                <stop
                  offset="100%"
                  stopColor={`${indigo}`}
                  stopOpacity="0.10"
                />
              </linearGradient>
            </defs>

            {/* monde transformé */}
            <g transform={`translate(${tx}, ${ty}) scale(${scale})`}>
              {/* Subnets */}
              <g>
                <rect
                  x="40"
                  y="60"
                  width="340"
                  height="560"
                  rx="16"
                  fill="url(#subnet)"
                  stroke={border}
                />
                <text x="60" y="90" fontSize="18" fill={fgMuted}>
                  Public Subnet
                </text>

                <rect
                  x="430"
                  y="60"
                  width="340"
                  height="560"
                  rx="16"
                  fill="url(#subnet)"
                  stroke={border}
                />
                <text x="450" y="90" fontSize="18" fill={fgMuted}>
                  DMZ Subnet
                </text>

                <rect
                  x="820"
                  y="60"
                  width="340"
                  height="560"
                  rx="16"
                  fill="url(#subnet)"
                  stroke={border}
                />
                <text x="840" y="90" fontSize="18" fill={fgMuted}>
                  Private Subnet
                </text>
              </g>

              {/* Nodes */}
              {renderNode(
                100,
                150,
                "VM Attaquant",
                "Kali Linux",
                <Terminal size={18} className="text-red-500" />
              )}
              {renderNode(
                100,
                340,
                "VM Portfolio",
                "Nginx + Next.js",
                <Server size={18} className="text-violet-600" />
              )}
              {renderNode(
                500,
                180,
                "VM Phishing",
                "GoPhish + SMTP",
                <Mail size={18} className="text-amber-500" />
              )}
              {renderNode(
                500,
                380,
                "VM Surveillance",
                "ELK + Suricata",
                <Radar size={18} className="text-sky-600" />
              )}
              {renderNode(
                900,
                300,
                "VM Victime",
                "Ubuntu + DVWA",
                <Shield size={18} className="text-slate-500" />
              )}

              {/* Flows — Red Team */}
              <g stroke="#ef4444" strokeWidth="3">
                <line
                  x1="210"
                  y1="200"
                  x2="500"
                  y2="220"
                  markerEnd="url(#arrow-red)"
                />
                <line
                  x1="670"
                  y1="220"
                  x2="900"
                  y2="330"
                  markerEnd="url(#arrow-red)"
                />
                <line
                  x1="210"
                  y1="200"
                  x2="900"
                  y2="330"
                  markerEnd="url(#arrow-red)"
                  strokeDasharray="6 6"
                />
              </g>

              {/* Flows — Blue Team */}
              <g stroke="#0ea5e9" strokeWidth="3">
                <line
                  x1="1020"
                  y1="360"
                  x2="670"
                  y2="420"
                  markerEnd="url(#arrow-blue)"
                />
                <line
                  x1="670"
                  y1="420"
                  x2="210"
                  y2="380"
                  markerEnd="url(#arrow-blue)"
                  strokeDasharray="6 6"
                />
              </g>
            </g>
          </svg>

          {/* Légende */}
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border bg-background/90 px-3 py-2 text-xs shadow">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-4 rounded-full bg-red-500" /> Flows Red
                Team
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-4 rounded-full bg-sky-500" /> Flows Blue
                Team
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** renderer de carte nœud (⛔️ pas de xmlns ici) */
function renderNode(
  x: number,
  y: number,
  title: string,
  subtitle: string,
  icon: React.ReactNode
) {
  const border = "var(--color-border, hsl(215 16% 84%))";
  const fg = "var(--color-foreground, #0b1324)";
  const muted = "var(--color-muted-foreground, #6b7280)";
  return (
    <g>
      <foreignObject x={x} y={y} width={260} height={110}>
        <div
          // ⬇️ supprimé: xmlns="http://www.w3.org/1999/xhtml"
          style={{
            border: `1px solid ${border}`,
            borderRadius: 12,
            padding: 12,
            background: "var(--color-card, rgba(255,255,255,.9))",
            boxShadow: "0 2px 10px rgba(2,6,23,.06)",
            backdropFilter: "saturate(120%) blur(2px)",
          }}
          className="flex items-start gap-10"
        >
          <div className="grid place-items-center rounded-md bg-neutral-100 p-2 dark:bg-neutral-800">
            {icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                color: fg,
                fontWeight: 600,
                fontSize: 14,
                lineHeight: 1.3,
              }}
            >
              {title}
            </div>
            <div style={{ color: muted, fontSize: 12 }}>{subtitle}</div>
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

export default NetworkDiagram;
