import SIEMLogExplainer from "@/components/AI/SIEMLogExplainer";
import PersonalCopilot from "@/components/AI/PersonalCopilot";
import AgentLabPage from "@/components/agent-lab/Agent-lab-page";
import { Brain, Shield, Bot } from "lucide-react";

export default function AIShowcasePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-12">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-10 text-center">
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--border)) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />

        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Intelligence Artificielle & Cybersécurité
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            AI Solutions
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
            Démonstrations concrètes d'agents IA appliqués à la cybersécurité —
            analyse de logs, chatbot contextuel et laboratoire d'automatisation.
          </p>

          {/* Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { icon: <Bot className="h-3.5 w-3.5" />, label: "Agent conversationnel" },
              { icon: <Shield className="h-3.5 w-3.5" />, label: "Analyse SIEM" },
              { icon: <Brain className="h-3.5 w-3.5" />, label: "LLM contextuel" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
              >
                {icon} {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Agent Lab ───────────────────────────────────────────── */}
      <section>
        <SectionLabel
          icon={<Brain className="h-4 w-4" />}
          label="Agent Lab"
          description="Laboratoire d'agents autonomes et d'automatisation"
        />
        <AgentLabPage />
      </section>

      {/* ── SIEM Explainer ──────────────────────────────────────── */}
      <section>
        <SectionLabel
          icon={<Shield className="h-4 w-4" />}
          label="SIEM Log Explainer"
          description="Analyse et interprétation de logs bruts par l'IA"
        />
        <SIEMLogExplainer />
      </section>

      {/* ── Personal Copilot ────────────────────────────────────── */}
      <section>
        <SectionLabel
          icon={<Bot className="h-4 w-4" />}
          label="Copilot Personnel"
          description="Agent contextuel entraîné sur mon profil professionnel"
        />
        <PersonalCopilot />
      </section>

    </main>
  );
}

function SectionLabel({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div>
        <h2 className="text-sm font-semibold">{label}</h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}