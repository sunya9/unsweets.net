import { MetadataRoute } from "next";
import { getEntries } from "../lib/entry";
import { getPages } from "../lib/page";
import { config } from "../../blog.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [entries, pages] = await Promise.all([getEntries(), getPages()]);
  return [
    "/",
    "/archives",
    ...entries.map((entries) => `/entries/${entries.slug}`),
    ...pages.map((slug) => `/${slug}`),
  ].map((path) => ({
    url: `${config.baseUrl}${path}`,
  }));
}
