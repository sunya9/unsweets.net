import * as path from "node:path";
const blogDirname = "blog";

const rootPath = process.cwd();

const contentDirPath = path.resolve(rootPath, "content");
export const blogDir = path.resolve(contentDirPath, blogDirname);
