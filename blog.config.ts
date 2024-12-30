import pkg from "./package.json";
const baseUrl = "https://blog.unsweets.net";

export const config = {
  title: (pageTitle?: string) =>
    pageTitle ? `${pageTitle} - ${pkg.name}` : pkg.name,
  description: pkg.description,
  baseUrl,
} as const;
