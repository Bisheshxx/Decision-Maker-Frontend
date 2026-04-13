import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        {
          // Keep Next.js route handlers under /api/auth/* local.
          source: "/api/:path((?!auth/).*)",
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path`,
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
