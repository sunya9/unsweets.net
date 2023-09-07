import * as path from "path";
import { promises as fs } from "fs";
import recursiveReaddir from "recursive-readdir";
import matter from "gray-matter";
import { pagesDir } from "./constants.js";

export interface Page {
  slug: string;
  title: string;
  body: string;
  date?: number;
}

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

export const getPages = async (): Promise<string[]> => {
  const slugs = await recursiveReaddir(pagesDir);
  const pagePromises = slugs.map((filepath) =>
    getPage(
      path
        .format({
          dir: path.dirname(filepath),
          base: path.basename(filepath, ".md"),
        })
        .replace(`${pagesDir}/`, ""),
    ),
  );
  return Promise.all(pagePromises).then((pages) =>
    pages.map((page) => page.slug),
  );
};
