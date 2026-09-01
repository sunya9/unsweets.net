import nodepath from "node:path";
import type { Element, Root } from "hast";
import sharp from "sharp";
import { visit } from "unist-util-visit";

interface Options {
  dir: string;
}

// Replacement for rehype-img-size, which depends on a vulnerable image-size
export function rehypeImageSize({ dir }: Options) {
  return async (tree: Root) => {
    const images: [Element, string][] = [];
    visit(tree, "element", (node: Element) => {
      const src = node.properties.src;
      if (node.tagName === "img" && typeof src === "string" && !URL.canParse(src)) {
        images.push([node, src]);
      }
    });
    await Promise.all(
      images.map(async ([node, src]) => {
        const { width, height } = await sharp(nodepath.join(dir, src)).metadata();
        node.properties.width = width;
        node.properties.height = height;
      }),
    );
  };
}
