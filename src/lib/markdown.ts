import nodepath from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeImgSize from "rehype-img-size";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";
import { config } from "../../blog.config";
import { blogDir } from "./constants";

function isAbsoluteURL(url: string): boolean {
  return URL.canParse(url);
}

export function rehypeResolveImagePaths(slug: string) {
  const base = `${config.baseUrl}/entries/${slug}/`;
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img" && typeof node.properties.src === "string") {
        if (!isAbsoluteURL(node.properties.src)) {
          node.properties.src = new URL(node.properties.src, base).pathname;
        }
      }
    });
  };
}

// for RSS
export async function markdownToHtml(
  markdown: string,
  slug: string,
): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeImgSize, { dir: nodepath.join(blogDir, slug) })
    .use(rehypeResolveImagePaths, slug)
    .use(rehypeUnwrapImages)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}
