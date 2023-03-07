// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
const withOffline = require("next-offline");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withOffline({
  trailingSlash: true,
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /\.woff2$/,
        handler: "CacheFirst",
      },
    ],
  },
  reactStrictMode: true,
});
