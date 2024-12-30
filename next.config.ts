import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/:year(\\d{4,})/:month(\\d{2,})/:slug",
      destination: "/entries/:slug",
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
};

export default config;
