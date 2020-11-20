import { config } from "../../blog.config";
import * as path from "path";
import { promises as fs } from "fs";
import { Entry } from "./entry";
import matter from "gray-matter";

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
