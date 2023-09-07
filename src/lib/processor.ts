import { unified } from "unified";
import remarkParse from "remark-parse";
import slug from "remark-slug";
import remarkRehype from "remark-rehype";
import * as shiki from "shiki";
import rehypeShiki from "@leafac/rehype-shiki";
import html from "rehype-stringify";

const highlighter = (async () => {
  return await shiki.getHighlighter({ theme: "material-theme-darker" });
})();
export const processor = async (markdown: string): Promise<string> => {
  const res = await unified()
    .use(remarkParse)
    .use(slug)
    .use(remarkRehype)
    .use(rehypeShiki, {
      highlighter: await highlighter,
    })
    .use(html)
    .process(markdown);
  return String(res);
};
