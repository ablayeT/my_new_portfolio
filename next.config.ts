import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    turbopack: { root: "." },
    esModuleInterop: true,
  },
};
module.exports = nextConfig;
