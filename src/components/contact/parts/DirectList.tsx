"use client";

import * as React from "react";
import { Mail, Linkedin, Github, MapPin, Globe } from "lucide-react"; // 👈 ajout de Globe ici
import { CONTACT_ITEMS } from "@/data/contacts/contact";

export function DirectList() {
  // 🧭 Map des icônes disponibles
  const icons = {
    Mail,
    LinkedIn: Linkedin,
    GitHub: Github,
    MapPin,
    Portfolio: Globe, // 👈 nouvelle icône Globe
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {CONTACT_ITEMS.map((c, idx) => {
        const Icon = icons[c.icon]; // sélectionne dynamiquement l’icône
        return (
          <a
            key={idx}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-transparent bg-white/5 p-4 transition hover:bg-white/10"
          >
            {/* Cercle coloré avec icône */}
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-full transition",
                c.toneBg,
              ].join(" ")}
            >
              <Icon className={c.tone} size={18} />{" "}
              {/* 👈 Correction ligne 40 */}
            </div>

            {/* Texte à droite */}
            <div className="min-w-0">
              <p className="font-medium text-[color:var(--color-foreground,#0b1324)]">
                {c.title}
              </p>
              <p className="truncate text-sm text-[color:var(--color-muted,#6b7280)]">
                {c.value}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
