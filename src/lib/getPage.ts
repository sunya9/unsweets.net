import { config } from "../../blog.config";
import * as path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { Page } from "./page";

const { pagesDir } = config;

export const getPage = async (slug: string): Promise<Page> => {
  const filename = `${slug}.md`;
  const mdPath = path.resolve(pagesDir, filename);
  const md = await fs.readFile(mdPath, "utf-8");
  if (matter.test(md)) {
    const { data, content } = matter(md);
    return {
      title: data.title,
      body: content,
      date: new Date(data.date).getTime(),
      slug,
    };
  } else {
    const [titleWithSharp, ...contentsAry] = md.trim().split("\n");
    const title = titleWithSharp.replace(/^#\s/, "");
    const body = contentsAry.join("\n");
    return {
      title,
      body,
      slug,
    };
  }
};
