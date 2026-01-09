import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Enable experimental features if needed
  // experimental: {
  //   optimizePackageImports: ['lucide-react'],
  // },
};

export default nextConfig;
