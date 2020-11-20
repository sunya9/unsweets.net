import { config } from "../../blog.config";
import * as path from "path";
import recursiveReaddir from "recursive-readdir";
import { getPage } from "./getPage";

const { pagesDir } = config;

export const getPages = async (): Promise<string[]> => {
  const slugs = await recursiveReaddir(pagesDir);
  const pagePromises = slugs.map((filepath) =>
    getPage(
      path
        .format({
          dir: path.dirname(filepath),
          base: path.basename(filepath, ".md"),
        })
        .replace(`${pagesDir}/`, "")
    )
  );
  return Promise.all(pagePromises).then((pages) =>
    pages.map((page) => page.slug)
  );
};
