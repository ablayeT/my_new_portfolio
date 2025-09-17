"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { PhishingDemoPage } from "@/components/Phising-demo-page";

export default function PhishingSimulationPage() {
  const router = useRouter();
  return <PhishingDemoPage onBack={() => router.push("/projects")} />;
}
