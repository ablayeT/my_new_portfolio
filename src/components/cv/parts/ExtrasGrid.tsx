"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

export function ExtrasGrid({
  languages,
  softSkills,
  interests,
}: {
  languages: string[];
  softSkills: string[];
  interests: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="rounded-lg border p-4">
        <h3 className="mb-2 text-sm font-semibold">Langues</h3>
        <div className="flex flex-wrap gap-2">
          {languages.map((s) => (
            <Badge key={s} variant="secondary">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-2 text-sm font-semibold">Soft skills</h3>
        <div className="flex flex-wrap gap-2">
          {softSkills.map((s) => (
            <Badge key={s} variant="secondary">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-2 text-sm font-semibold">Centres d’intérêt</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((h) => (
            <Badge key={h} variant="outline">
              {h}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
