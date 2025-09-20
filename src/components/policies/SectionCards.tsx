"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Database,
  FileSignature,
  Clock4,
  Mail,
  Globe2,
  Cookie,
  Lock,
  FileText,
  Server,
  Scale,
  Hammer,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PolicyDoc, PolicySection } from "@/data/policies/types";

const ICONS = {
  ShieldCheck,
  Database,
  FileSignature,
  Clock4,
  Mail,
  Globe2,
  Cookie,
  Lock,
  FileText,
  Server,
  Scale,
  Hammer,
  Sparkles,
} as const;

export function SectionCards({ doc }: { doc: PolicyDoc }) {
  return (
    <>
      {doc.sections.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <Card key={s.id} id={s.id} className="scroll-mt-28">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                {s.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              {s.body?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {s.bullets && (
                <ul className="list-disc pl-5">
                  {s.bullets.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              )}
              {s.links && s.links.length > 0 && (
                <p className="pt-1">
                  {s.links.map((l, i) => (
                    <a
                      key={i}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-3 inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground"
                    >
                      {l.label} <ExternalLink size={14} />
                    </a>
                  ))}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}

export function Toc({ doc }: { doc: PolicyDoc }) {
  return (
    <Card className="sticky top-28">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Sommaire</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2 text-sm">
          {doc.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block text-muted-foreground hover:text-foreground"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
