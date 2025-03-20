import path from "path";
import type { NextConfig } from "next";
import CopyFilePlugin from "copy-webpack-plugin";
import WriteFilePlugin from "write-file-webpack-plugin";

const config: NextConfig = {
  reactStrictMode: true,
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
  webpack(config) {
    config.plugins.push(
      new CopyFilePlugin({
        patterns: [
          {
            context: "content/blog",
            from: "**/*.{jpg,png}",
            to: path.resolve(__dirname, "public/entries/"),
          },
        ],
      }),
      new WriteFilePlugin(),
    );
    return config;
  },
  transpilePackages: ["next-mdx-remote"],
};

export default config;
