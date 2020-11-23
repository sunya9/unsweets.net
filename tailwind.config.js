/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");

module.exports = {
  important: "#app",
  purge: ["./src/components/**/*.tsx", "./src/pages/**/*.tsx"],
  darkMode: "media",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "960px",
        xl: "960px",
      },
    },
    colors: {
      gray: {
        50: "var(--colors-50)",
        100: "var(--colors-100)",
        200: "var(--colors-200)",
        300: "var(--colors-300)",
        400: "var(--colors-400)",
        500: "var(--colors-500)",
        600: "var(--colors-600)",
        700: "var(--colors-700)",
        800: "var(--colors-800)",
        900: "var(--colors-900)",
      },
      originalGray: colors.coolGray,
      trueGray: colors.trueGray,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
