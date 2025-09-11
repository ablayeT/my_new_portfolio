import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purple Team Simulator - Abdoulaye Touré",
  description:
    "Simulateur Purple Team interactif : architecture, scénarios RED/BLUE, KPIs et ressources.",
};

export default function PurpleTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
