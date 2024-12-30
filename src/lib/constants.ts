import * as path from "path";
const blogDirname = "blog";

const rootPath = process.cwd();

const contentDirPath = path.resolve(rootPath, "content");
export const blogDir = path.resolve(contentDirPath, blogDirname);
