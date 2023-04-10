/**
 * @type {import('next').NextConfig}
 **/
const config = {
  trailingSlash: true,
  reactStrictMode: true,
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
