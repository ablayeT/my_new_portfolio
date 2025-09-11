"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { PurpleTeamProject } from "@/components/portfolio/Purple-team-project";

export default function PurpleTeamPage() {
  const router = useRouter();
  return <PurpleTeamProject onBack={() => router.push("/projects")} />;
}
