import { config } from "../../blog.config";
import * as path from "path";
import { promises as fs } from "fs";
import { Entry } from "./entry";
import matter from "gray-matter";

const { pagesDir } = config;

export const getPage = async (slug: string): Promise<Entry> => {
  const filename = `${slug}.md`;
  const mdPath = path.resolve(pagesDir, filename);
  const md = await fs.readFile(mdPath, "utf-8");
  const { data, content } = matter(md);
  return {
    title: data.title,
    body: content,
    date: new Date(data.date).getTime(),
    slug,
  };
};
