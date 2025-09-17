import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    turbopack: { root: "." },
  },
};
module.exports = nextConfig;
