const prod = process.env.NODE_ENV === "production";

const config = {
  plugins: [
    // 'postcss-import',
    // [
    //   "postcss-preset-env",
    //   {
    //     stage: 0,
    //     features: {
    //       "color-mod-function": true,
    //     },
    //   },
    // ],
    // "postcss-color-gray",
    // 'postcss-color-function'
  ],
};

if (prod)
  config.plugins.push([
    "cssnano",
    {
      preset: [
        "default",
        {
          autoprefixer: false,
        },
      ],
    },
  ]);

module.exports = config;
