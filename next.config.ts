import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ This tells Vercel to ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

