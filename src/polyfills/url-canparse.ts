// Polyfill safe pour URL.canParse — SSR & client
declare global {
  // on étend le constructeur global URL si besoin
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface URLConstructor {
    canParse?: (input: string, base?: string) => boolean;
  }
}

(() => {
  try {
    const g = globalThis as any; // on évite l’augmentation de type de URL
    if (!g?.URL) return;

    if (typeof g.URL.canParse !== "function") {
      g.URL.canParse = (input: string, base?: string) => {
        try {
          // Utilise une base locale pour supporter les chemins relatifs
          // sans nécessiter window.location en SSR.
          new g.URL(input, base ?? "http://localhost");
          return true;
        } catch {
          return false;
        }
      };
    }
  } catch {
    // no-op
  }
})();

export {}; // pour que TS traite ce fichier comme un module
