import nodepath from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeImgSize from "rehype-img-size";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";
import { config } from "../../blog.config";
import { blogDir } from "./constants";

function createBaseProcessor() {
  return unified().use(remarkParse).use(remarkRehype);
}

function rehypeResolveImagePaths(slug: string) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img" && typeof node.properties.src === "string") {
        const src = node.properties.src;
        if (src.startsWith("./")) {
          node.properties.src = `${config.baseUrl}/entries/${slug}/${src.slice(2)}`;
        } else if (!src.startsWith("http") && !src.startsWith("/")) {
          node.properties.src = `${config.baseUrl}/entries/${slug}/${src}`;
        }
      }
    });
  };
}

export async function markdownToHast(
  markdown: string,
  slug: string,
): Promise<Root> {
  const processor = createBaseProcessor()
    .use(rehypeSlug)
    .use(rehypeImgSize, { dir: nodepath.join(blogDir, slug) })
    .use(rehypeUnwrapImages)
    .use(rehypePrettyCode, {
      theme: {
        dark: "material-theme-darker",
        light: "material-theme-lighter",
      },
    });
  const mdast = processor.parse(markdown);
  const hast = await processor.run(mdast);
  return hast;
}

export async function markdownToHtml(
  markdown: string,
  slug: string,
): Promise<string> {
  const result = await createBaseProcessor()
    .use(rehypeResolveImagePaths, slug)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}
