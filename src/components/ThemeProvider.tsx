// src/components/ThemeProvider.tsx
"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

// ✅ Ré-export du hook pour que `import { useTheme } from "@/components/ThemeProvider"` fonctionne
export const useTheme = useNextTheme;
