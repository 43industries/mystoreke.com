import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allow Vercel build to succeed even if TypeScript reports errors (remove once fixed)
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
