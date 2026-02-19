import type { NextConfig } from "next";

const adminBase =
  process.env.NEXT_PUBLIC_ADMIN_BASE_PATH ??
  process.env.ADMIN_BASE_PATH ??
  "x7k9p2";
const adminPath = adminBase.startsWith("/") ? adminBase : `/${adminBase}`;

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    if (adminBase === "x7k9p2") return [];
    return [
      { source: `${adminPath}`, destination: "/x7k9p2" },
      { source: `${adminPath}/:path*`, destination: "/x7k9p2/:path*" },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;