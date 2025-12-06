/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // En prod, on ne bloque pas le build à cause d'ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript : On bloque le build si erreur (car on veut du code propre)
  // Mais le serveur n'a plus besoin de lire ce fichier de config en TS
  typescript: {
    ignoreBuildErrors: false,
  },

  // Optionnel (utile pour déploiement Node sur VPS)
  // output: "standalone",
};

export default nextConfig;
