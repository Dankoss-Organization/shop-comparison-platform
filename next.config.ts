import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:3000/api/v1/:path*",
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "src.zakaz.atbmarket.com",
      },
      {
        protocol: "https",
        hostname: "*.zakaz.ua",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.silpo.ua",
      },
      {
        protocol: "https",
        hostname: "*.fora.ua",
      },
      {
        protocol: "https",
        hostname: "*.novus.ua",
      },
      {
        protocol: "https",
        hostname: "*.varus.ua",
      },
      {
        protocol: "https",
        hostname: "*.metro.ua",
      },
      {
        protocol: "https",
        hostname: "assets.dankoss.ua",
      },
    ],
  },
};

export default nextConfig;