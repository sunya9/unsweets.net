import * as path from "path";
import appRootPath from "app-root-path";
const blogDirname = "blog";
const pagesDirname = "pages";

const rootPath = appRootPath.path;
const contentDirPath = path.resolve(rootPath, "content");
export const blogDir = path.resolve(contentDirPath, blogDirname);
export const pagesDir = path.resolve(contentDirPath, pagesDirname);
