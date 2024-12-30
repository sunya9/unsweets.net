import * as path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { Page } from "./page";
import { blogDir } from "./constants";

export const revalidate = 3600;

export interface Entry extends Page {
  date: number;
}

const getEntryPath = (slug: string) =>
  path.join(blogDir, slug, "/", "index.md");

export const getEntry = async (slug: string): Promise<Entry> => {
  const mdPath = getEntryPath(slug);
  const md = await fs.readFile(mdPath, "utf-8");
  const { data, content } = matter(md);
  const body = content;
  return {
    title: data.title,
    body,
    date: new Date(data.date).getTime(),
    slug,
  };
};

export const getEntries = async (limit?: number): Promise<Entry[]> => {
  const dirents = await fs.readdir(blogDir, { withFileTypes: true });
  const slugs = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  const entries = await Promise.all(slugs.map(getEntry));
  return entries.toSorted((a, b) => b.date - a.date).slice(0, limit);
};
