import { config } from "../../blog.config";
import { promises as fs } from "fs";
import { Entry } from "./entry";
import { getEntry } from "./getEntry";
import * as path from "path";

const { blogDir } = config;

export const getEntries = async (
  limit?: number
): Promise<Omit<Entry, "body">[]> => {
  const slugs = await fs.readdir(blogDir);
  const entryPromises = slugs.map((filename) =>
    getEntry(path.basename(filename, ".md"))
  );
  return Promise.all(entryPromises).then((entries) =>
    entries
      .slice()
      .map(({ date, slug, title }) => ({ date, slug, title }))
      .sort((a, b) => b.date - a.date)
      .slice(0, limit || entries.length)
  );
};
