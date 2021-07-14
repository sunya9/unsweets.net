import { description, name as title } from "./package.json";

const baseUrl = "https://blog.unsweets.net";

export const config = {
  title: (pageTitle?: string) =>
    pageTitle ? `${pageTitle} - ${title}` : title,
  description,
  baseUrl,
} as const;
