import appRootPath from "app-root-path";
import * as path from "path";
const rootPath = appRootPath.toString();
import * as pkg from "./package.json";

const title = pkg.name;
const description = pkg.description;
const baseUrl = "https://blog.unsweets.net";
const blogDirname = "blog";
const pagesDirname = "pages";
const contentDirPath = path.resolve(rootPath, "content");
const blogDir = path.resolve(contentDirPath, blogDirname);
const pagesDir = path.resolve(contentDirPath, pagesDirname);

export const config = {
  title: (pageTitle?: string) =>
    pageTitle ? `${pageTitle} - ${title}` : title,
  description,
  blogDir,
  pagesDir,
  baseUrl,
} as const;
