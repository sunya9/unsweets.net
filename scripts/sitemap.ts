import { config } from "../blog.config";
import { getEntries } from "../src/lib/getEntries";
import { getPages } from "../src/lib/getPages";
import * as path from "path";
import mkdirp from "mkdirp";
import { promises as fs } from "fs";

const generateSitemap = async () => {
  const [entries, pages] = await Promise.all([getEntries(), getPages()]);
  const urls = [
    "/",
    "/archives",
    ...entries.map((entries) => `/entries/${entries.slug}/`),
    ...pages.map((slug) => `/${slug}/`),
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
  <changeFreq>daily</changeFreq>
  <priority>0.7</priority>
</url>
`;

const main = async () => {
  const sitemapXml = await generateSitemap();
  const publicDir = path.resolve(__dirname, "../", "public");
  await mkdirp(publicDir);
  return fs.writeFile(
    path.resolve(publicDir, "sitemap.xml"),
    sitemapXml,
    "utf-8"
  );
};

main();
