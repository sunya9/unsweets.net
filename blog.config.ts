import pkg from "./package.json";
const baseUrl = "https://unsweets.net";

const title = "<unsweets />";

export const config = {
  title: (pageTitle?: string) =>
    pageTitle ? `${pageTitle} - ${title}` : title,
  description: pkg.description,
  baseUrl,
  author: "@ephemeralMocha",
} as const;
