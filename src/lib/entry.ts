import { config } from "../../blog.config";
import * as path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { Page } from "./page";

export interface Entry extends Page {
  date: number;
}

const { blogDir } = config;

export const getEntry = async (slug: string): Promise<Entry> => {
  const filename = `${slug}.md`;
  const mdPath = path.resolve(blogDir, filename);
  const md = await fs.readFile(mdPath, "utf-8");
  const { data, content } = matter(md);
  return {
    title: data.title,
    body: content,
    date: new Date(data.date).getTime(),
    slug,
  };
};

export const getEntries = async (limit?: number): Promise<Entry[]> => {
  const slugs = await fs.readdir(blogDir);
  const entryPromises = slugs.map((filename) =>
    getEntry(path.basename(filename, ".md"))
  );
  return Promise.all(entryPromises).then((entries) =>
    entries
      .slice()
      .sort((a, b) => b.date - a.date)
      .slice(0, limit || entries.length)
  );
};
