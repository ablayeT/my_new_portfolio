/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // On garde ça pour éviter que TypeScript ne bloque le build sur le VPS
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
