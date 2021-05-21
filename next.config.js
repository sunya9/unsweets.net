const withImages = require("next-images");

module.exports = withImages({
  cssLoaderOptions: {
    localIdentName: "[name]-[local]-[hash:base64:5]",
  },
});
