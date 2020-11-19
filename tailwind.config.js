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
    extend: {
      backgroundColor: {
        background: "#fdfdfd",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
