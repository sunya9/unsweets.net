import Rss from "rss";
import { config } from "../../../blog.config";
import { getEntries } from "../../lib/entry";

const { baseUrl } = config;

export async function GET() {
  const entries = await getEntries(20);
  const feed = new Rss({
    title: config.title(),
    description: config.description,
    feed_url: `${baseUrl}/rss.xml`,
    site_url: baseUrl,
    language: "ja",
    pubDate: new Date(entries[0].date),
  });
  entries.forEach((entry) => {
    feed.item({
      title: entry.title,
      description: entry.body,
      date: new Date(entry.date),
      url: `${baseUrl}/entries/${entry.slug}`,
      guid: entry.slug,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
