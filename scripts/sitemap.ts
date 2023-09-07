import * as path from "node:path";
import { promises as fs } from "node:fs";
import { mkdirp } from "mkdirp";
import { config } from "../blog.config.js";
import { getEntries } from "../src/lib/entry.js";
import { getPages } from "../src/lib/page.js";
import { __dirname } from "./util.js";

const generateSitemap = async () => {
  const [entries, pages] = await Promise.all([getEntries(), getPages()]);
  const urls = [
    "/",
    "/archives",
    ...entries.map((entries) => `/entries/${entries.slug}`),
    ...pages.map((slug) => `/${slug}`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(generateUrlTag).join("\n")}
</urlset>
`;
};

const generateUrlTag = (url: string) => `
<url>
  <loc>${config.baseUrl}${url}</loc>
</url>
`;

const main = async () => {
  const sitemapXml = await generateSitemap();
  const publicDir = path.resolve(__dirname(import.meta.url), "../", "public");
  await mkdirp(publicDir);
  return fs.writeFile(
    path.resolve(publicDir, "sitemap.xml"),
    sitemapXml,
    "utf-8"
  );
};

main();
