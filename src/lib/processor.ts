import unified from "unified";
import remarkParse from "remark-parse";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import slug from "remark-slug";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import remark2rehype from "remark-rehype";
import * as shiki from "shiki";
import rehypeShiki from "@leafac/rehype-shiki";
import html from "rehype-stringify";

const highlighter = (async () => {
  return await shiki.getHighlighter({ theme: "material-darker" });
})();
export const processor = async (markdown: string): Promise<string> => {
  const res = await unified()
    .use(remarkParse)
    .use(slug)
    .use(remark2rehype)
    .use(rehypeShiki, {
      highlighter: await highlighter,
    })
    .use(html)
    .process(markdown);
  return String(res);
};
