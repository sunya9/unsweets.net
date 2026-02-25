import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  nextVitals,
  nextTs,
  {
    settings: {
      react: { version: "19" },
    },
    rules: {
      "import/order": "error",
      "@next/next/no-img-element": "off",
    },
  },
  eslintConfigPrettier,
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
