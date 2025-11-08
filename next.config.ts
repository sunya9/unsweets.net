import type { NextConfig } from "next";

const config: NextConfig = {
  redirects: async () => [
    {
      source: "/:year(\\d{4,})/:month(\\d{2,})/:slug",
      destination: "/entries/:slug",
      permanent: true,
    },
    {
      source: "/archives",
      destination: "/entries",
      permanent: true,
    },
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Referrer-Policy",
          value: "no-referrer-when-downgrade",
        },
      ],
    },
  ],
  transpilePackages: ["next-mdx-remote"],
};

export default config;
