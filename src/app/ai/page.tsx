import SIEMLogExplainer from "@/components/AI/SIEMLogExplainer";
import PersonalCopilot from "@/components/AI/PersonalCopilot";
import AgentLabPage from "@/components/agent-lab/Agent-lab-page";

export default function AIShowcasePage() {
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8">
      <h1
        className={[
          "mb-3 font-extrabold leading-tight",
          "[font-size:clamp(28px,4.2vw,40px)]",
          "bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] text-center to-[#0ea5e9] bg-clip-text text-transparent",
        ].join(" ")}
      >
        AI SOLUTIONS
      </h1>
      <p className="text-neutral-600">DEMO : AGENT IA & CHATBOT PERSONEL</p>
      <AgentLabPage />
      {/* <SIEMLogExplainer /> */}
      <PersonalCopilot />
    </main>
  );
}
