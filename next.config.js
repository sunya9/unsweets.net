const withImages = require("next-images");

module.exports = withImages({
  future: {
    webpack5: true,
  },
  cssLoaderOptions: {
    localIdentName: "[name]-[local]-[hash:base64:5]",
  },
});
