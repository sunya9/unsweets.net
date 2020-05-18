const withSass = require("@zeit/next-sass");
const withImages = require("next-images");

module.exports = withImages(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      localIdentName: "[name]-[local]-[hash:base64:5]",
    },
  })
);
