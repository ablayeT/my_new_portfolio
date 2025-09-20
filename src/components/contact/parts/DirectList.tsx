"use client";

import { CONTACT_ITEMS } from "@/data/contacts/contact";
import { Mail, LinkedIn, GitHub, MapPin } from "@/components/portfolio/Icons";

const ICONS = { Mail, LinkedIn, GitHub, MapPin } as const;

export function DirectList() {
  return (
    <div className="space-y-6">
      <h2 className="[font-size:var(--tokens-text-h3-22,22px)] font-semibold text-[color:var(--color-foreground,#0b1324)]">
        Contact direct
      </h2>

      <div className="space-y-4">
        {CONTACT_ITEMS.map((c) => {
          const Icon = ICONS[c.icon];
          return (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={
                c.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className={[
                "group flex items-center gap-3 rounded-2xl border",
                "border-[color:var(--color-border,#e5e7eb)] bg-transparent",
                "px-3 py-3 transition-all hover:shadow-[0_10px_28px_rgba(2,6,23,0.08)]",
                "dark:bg-white/5",
              ].join(" ")}
            >
              <div
                className={[
                  "rounded-xl p-2 transition-transform",
                  c.toneBg,
                  "group-hover:scale-105",
                ].join(" ")}
              >
                <Icon className={c.tone} size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-[color:var(--color-foreground,#0b1324)]">
                  {c.title}
                </p>
                <p className="truncate text-sm text-[color:var(--color-muted-foreground,#6b7280)]">
                  {c.value}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
