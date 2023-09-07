import * as path from "path";
const blogDirname = "blog";
const pagesDirname = "pages";

const rootPath = process.cwd();

const contentDirPath = path.resolve(rootPath, "content");
export const blogDir = path.resolve(contentDirPath, blogDirname);
export const pagesDir = path.resolve(contentDirPath, pagesDirname);
