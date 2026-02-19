import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  // REQUIRED for Netlify static hosting
  output: "export",

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true, // REQUIRED for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
