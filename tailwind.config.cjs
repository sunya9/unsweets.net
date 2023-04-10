/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
