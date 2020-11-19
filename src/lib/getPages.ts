import { config } from "../../blog.config";
import { Entry } from "./entry";
import * as path from "path";
import recursiveReaddir from "recursive-readdir";
import { getPage } from "./getPage";

const { pagesDir } = config;

export const getPages = async (limit?: number): Promise<Entry[]> => {
  const slugs = await recursiveReaddir(pagesDir);
  console.log("slugs", slugs);
  const entryPromises = slugs.map((filepath) =>
    getPage(
      path
        .format({
          dir: path.dirname(filepath),
          base: path.basename(filepath, ".md"),
        })
        .replace(`${pagesDir}/`, "")
    )
  );
  return Promise.all(entryPromises).then((entries) =>
    entries
      .slice()
      .sort((a, b) => b.date - a.date)
      .slice(0, limit || entries.length)
  );
};
