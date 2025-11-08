import SIEMLogExplainer from "@/components/AI/SIEMLogExplainer";
import PersonalCopilot from "@/components/AI/PersonalCopilot";
export default function AIShowcasePage() {
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8">
      <h1 className="text-2xl font-bold">AI Showcase</h1>
      <p className="text-neutral-600">
        Deux démos : analyse de logs (SOC) et copilot personnel.
      </p>
      <SIEMLogExplainer />
      <PersonalCopilot />
    </main>
  );
}
