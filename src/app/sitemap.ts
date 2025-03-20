import { MetadataRoute } from "next";
import { getEntries } from "../lib/entry";
import { config } from "../../blog.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getEntries();
  return [
    "/",
    "/entries",
    ...entries.map((entries) => `/entries/${entries.slug}`),
  ].map((path) => ({
    url: `${config.baseUrl}${path}`,
  }));
}
