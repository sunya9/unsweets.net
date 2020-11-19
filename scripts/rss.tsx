import dayjs from "dayjs";
import { promises as fs } from "fs";
import Markdown from "markdown-to-jsx";
import mkdirp from "mkdirp";
import * as path from "path";
import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { config } from "../blog.config";
import { Entry } from "../src/lib/entry";
import { getEntries } from "../src/lib/getEntries";

const { baseUrl } = config;

const formatDate = (date: number) =>
  dayjs(date).format("ddd, DD MMM YYYY HH:mm:ss ZZ");

const main = async () => {
  const entries = await getEntries(20);
  const rssXml = generateRss(entries);
  const publicDir = path.resolve(__dirname, "../", "public");
  await mkdirp(publicDir);
  return fs.writeFile(path.resolve(publicDir, "rss.xml"), rssXml, "utf-8");
};

const formatEntry = (entry: Entry) => `
  <item>
    <title>${entry.title}</title>
    <link>${baseUrl}/entries/${entry.slug}</link>
    <pubDate>${formatDate(entry.date)}</pubDate>
    <description>
      <![CDATA[${md2html(entry.body)} ]]>
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

const md2html = (markdown: string) =>
  ReactDOMServer.renderToString(<Markdown>{markdown}</Markdown>);

main();
