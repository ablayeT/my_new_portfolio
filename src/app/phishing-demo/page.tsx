"use client";

import { useRouter } from "next/navigation";
import PhishingDemoPage from "@/components/phishing/PhisingDemoPage";

export default function PhishingDemo() {
  const router = useRouter();
  return <PhishingDemoPage onBack={() => router.push("/projects")} />;
}
