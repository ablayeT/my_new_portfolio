// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // En prod, on ne bloque pas le build à cause d'ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript bloquer si erreurs de typage (true pour débloquer temporairement)
  typescript: {
    ignoreBuildErrors: false,
  },

  // Optionnel (utile pour déploiement Node sur VPS)
  // output: "standalone",
};

export default nextConfig;
