import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import nodepath from "node:path";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import sharp from "sharp";
import { unified } from "unified";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { rehypeImageSize } from "./rehypeImageSize";

let dir: string;

beforeAll(async () => {
  dir = await mkdtemp(nodepath.join(tmpdir(), "rehype-image-size-"));
  await sharp({
    create: {
      width: 3,
      height: 2,
      channels: 3,
      background: { r: 0, g: 0, b: 0 },
    },
  })
    .png()
    .toFile(nodepath.join(dir, "test.png"));
});

afterAll(async () => {
  await rm(dir, { recursive: true, force: true });
});

async function processMarkdown(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeImageSize, { dir })
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

describe("rehypeImageSize", () => {
  it("adds width and height to local images", async () => {
    const html = await processMarkdown("![alt](test.png)");
    expect(html).toContain('width="3"');
    expect(html).toContain('height="2"');
  });

  it("leaves absolute URLs untouched", async () => {
    const html = await processMarkdown("![alt](https://example.com/a.png)");
    expect(html).not.toContain("width=");
    expect(html).not.toContain("height=");
  });

  it("fails on missing image files", async () => {
    await expect(processMarkdown("![alt](missing.png)")).rejects.toThrow();
  });
});
