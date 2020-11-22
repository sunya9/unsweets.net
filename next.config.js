/* eslint-disable @typescript-eslint/no-var-requires */
const withOffline = require("next-offline");
const { promises: fs } = require("fs");
const path = require("path");
const matter = require("gray-matter");
module.exports = withOffline({
  trailingSlash: true,
  async redirects() {
    // workaround
    const blogDir = path.resolve(__dirname, "content", "blog");
    const entryNames = await fs.readdir(blogDir);
    const entryPathPromises = entryNames.map(async (name) => {
      const mdFilename = path.resolve(blogDir, name);
      const md = await fs.readFile(mdFilename, "utf-8");
      const { data } = matter(md);
      const date = new Date(data.date);
      const year = zeroPad(date.getFullYear());
      const month = zeroPad(date.getMonth() + 1);
      const slug = path.basename(name, ".md");
      return {
        oldPath: `/${year}/${month}/${slug}/`,
        newPath: `/entries/${slug}/`,
      };
    });
    const entryPaths = await Promise.all(entryPathPromises);
    const redirectOldEntryPaths = entryPaths.map((entryPath) => ({
      source: entryPath.oldPath,
      destination: entryPath.newPath,
      permanent: true,
    }));
    return [...redirectOldEntryPaths];
  },
});

const zeroPad = (num) => num.toString().padStart(2, "0");
