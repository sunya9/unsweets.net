import { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const fontScaleFactor = 8;
const calcFontSize = (scale: number) =>
  `calc(1rem * ${fontScaleFactor} / ${fontScaleFactor - scale})`;

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
    fontSize: {
      xs: calcFontSize(-2),
      sm: calcFontSize(-1),
      base: calcFontSize(0),
      lg: calcFontSize(1),
      xl: calcFontSize(2),
      "2xl": calcFontSize(3),
      "3xl": calcFontSize(4),
      "4xl": calcFontSize(5),
      "5xl": calcFontSize(6),
    },
    container: {
      padding: {
        DEFAULT: "clamp(1rem, calc(100vw - 75rch + 5rem), 5rem)",
      },
      screens: {
        DEFAULT: "75rch",
      },
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: calcFontSize(4),
            },
            h2: {
              fontSize: calcFontSize(3),
            },
            h3: {
              fontSize: calcFontSize(2),
            },
            h4: {
              fontSize: calcFontSize(1),
            },
          },
        },
      },
      colors: {
        accent: {
          "50": "#fdf4f3",
          "100": "#fce6e4",
          "200": "#fad2ce",
          "300": "#f6b2ab",
          "400": "#ef857a",
          "500": "#e35e50",
          "600": "#cf4233",
          "700": "#c0392b",
          "800": "#902e24",
          "900": "#782c24",
          "950": "#41130e",
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
