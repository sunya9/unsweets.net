import { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: [
        "Helvetica Neue",
        "Arial",
        "Hiragino Kaku Gothic ProN",
        "Hiragino Sans",
        "Meiryo",
      ],
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        DEFAULT: "100%",
        md: "65ch",
      },
    },
  },
  plugins: [typography],
};

export default config;
