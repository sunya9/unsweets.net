module.exports = {
  important: "#app",
  content: ["./src/components/**/*.tsx", "./src/pages/**/*.tsx"],
  darkMode: "media",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        lg: 0,
      },
      screens: {
        DEFAULT: "100%",
        lg: "960px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
