import path from "path";
import { readFile } from "fs/promises";
import { createHash } from "crypto";
import Image, { ImageProps } from "next/image";
import { blogDir } from "../lib/constants";

interface Props extends ImageProps {
  slug: string;
}

export const EntryImage = async ({ src, alt, slug, ...rest }: Props) => {
  if (typeof src !== "string")
    throw new Error("EntyImage does not support StaticImport.");

  const imagePath = path.join(blogDir, slug, src);
  const buffer = await readFile(imagePath);
  const sha1Hash = createHash("sha1").update(buffer).digest("hex");
  const hash = `?v=${sha1Hash.slice(0, 8)}`;
  return (
    <Image
      priority
      alt={alt}
      src={path.join("/entries", slug, src) + hash}
      unoptimized
      {...rest}
    />
  );
};
