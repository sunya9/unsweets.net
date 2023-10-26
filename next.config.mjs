/**
 * @type {import('next').NextConfig}
 **/
const config = {
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
  webpack: (webpackConfig) => {
    // https://github.com/vercel/next.js/issues/41961
    webpackConfig.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    return webpackConfig;
  },
};

export default config;
