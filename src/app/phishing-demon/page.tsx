"use client";

import { useRouter } from "next/navigation";
import PhishingDemoPage from "@/components/Phising-demo-page";

export default function PhishingDemo() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/projects");
  };

  return <PhishingDemoPage onBack={handleBack} />;
}
