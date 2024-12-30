import path from "path";
import Image, { ImageProps } from "next/image";

interface Props extends ImageProps {
  slug: string;
}

export const EntryImage = ({ src, alt, slug, ...rest }: Props) => {
  if (typeof src !== "string")
    throw new Error("EntyImage does not support StaticImport.");
  return (
    <Image
      priority
      alt={alt}
      src={path.join("/entries", slug, src)}
      {...rest}
    />
  );
};
