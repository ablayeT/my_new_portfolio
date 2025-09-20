"use client";

import { MapPin } from "@/components/portfolio/Icons";
import { CONTACT_COPY } from "@/data/contacts/contact";

export function LocationAvailability() {
  return (
    <div className="space-y-5">
      <h3 className="font-semibold text-[color:var(--color-foreground,#0b1324)]">
        Localisation & Disponibilité
      </h3>

      <div className="flex items-start gap-3 rounded-2xl border border-[color:var(--color-border,#e5e7eb)] bg-transparent p-3 shadow-[0_2px_10px_rgba(2,6,23,0.04)] dark:bg-white/5">
        <div className="rounded-xl bg-[#0ea5e9]/15 p-2">
          <MapPin className="text-[#0ea5e9]" size={18} />
        </div>
        <div>
          <p className="font-medium text-[color:var(--color-foreground,#0b1324)]">
            {CONTACT_COPY.location.city}
          </p>
          <p className="text-sm text-[color:var(--color-muted-foreground,#6b7280)]">
            {CONTACT_COPY.location.note}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-300/40 bg-emerald-50/80 px-3 py-2 text-emerald-700 shadow-[0_2px_10px_rgba(2,6,23,0.04)] dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-900/40">
        {CONTACT_COPY.availability}
      </div>
    </div>
  );
}
