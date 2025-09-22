"use client";

import { useRouter } from "next/navigation";
import { THHeader } from "@/components/projects/thunting/THHeader";
import { THKPIs } from "@/components/projects/thunting/THKPIs";
import { THTabs } from "@/components/projects/thunting/THTabs";
import {
  KPI_BASE,
  HUNTS,
} from "@/data/projects/threatHuntingData/theatHunting";

export default function ThreatHuntingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background">
      <THHeader onBack={() => router.push("/projects")} />
      <div className="container py-6">
        <THKPIs base={KPI_BASE} hunts={HUNTS} />
      </div>
      <THTabs />
    </div>
  );
}
