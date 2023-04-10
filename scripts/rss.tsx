import { promises as fs } from "node:fs";
import * as path from "node:path";
import dayjs from "dayjs";
import mkdirp from "mkdirp";
import { config } from "../blog.config.js";
import { Entry, getEntries } from "../src/lib/entry.js";
import { __dirname } from "./util.js";

const { baseUrl } = config;

const formatDate = (date: number) =>
  dayjs(date).format("ddd, DD MMM YYYY HH:mm:ss ZZ");

const main = async () => {
  const entries = await getEntries(20);
  const rssXml = generateRss(entries);
  const publicDir = path.resolve(__dirname(import.meta.url), "../", "public");
  await mkdirp(publicDir);
  return fs.writeFile(path.resolve(publicDir, "rss.xml"), rssXml, "utf-8");
};

const formatEntry = (entry: Entry) => `
  <item>
    <title>${entry.title}</title>
    <link>${baseUrl}/entries/${entry.slug}/</link>
    <pubDate>${formatDate(entry.date)}</pubDate>
    <description>
      <![CDATA[${entry.body} ]]>
    </description>
  </item>
  `;

const generateRss = (entries: Entry[]) => {
  const latestEntryDate = formatDate(entries[0].date);
  return `<?xml version="1.0" ?>
  <rss version="2.0">
    <channel>
      <title><![CDATA[${config.title()}]]></title>
      <link>${baseUrl}</link>
      <description><![CDATA[${config.description}]]></description>
      <language>ja</language>
      <lastBuildDate>${latestEntryDate}</lastBuildDate>
      ${entries.map(formatEntry).join("")}
    </channel>
  </rss>`;
};

main();
