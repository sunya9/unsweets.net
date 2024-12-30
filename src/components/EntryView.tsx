import nodepath from "node:path";
import { ImgHTMLAttributes, createElement } from "react";
import { Share2, Link as LinkIcon } from "react-feather";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeImgSize from "rehype-img-size";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { config } from "../../blog.config";
import { buildFullPath } from "../lib/util";
import { blogDir } from "../lib/constants";
import { Entry } from "../lib/entry";
import { NextLinkIfInternalAnchor } from "./NextLinkIfAnchor";
import { AbsDate } from "./AbsDate";
import { NativeShareButton } from "./NativeShareButton";
import { ShareButtons } from "./ShareButtons";
import { ZoomWrapper } from "./ZoomWrapper";
import { EntryImage } from "./EntryImage";
interface Props {
  entry: Entry;
  shareButton?: boolean;
  path: string;
}

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
} & React.HTMLAttributes<HTMLHeadingElement>;

const Heading = ({ level, children, id, ...rest }: HeadingProps) => {
  return createElement(
    `h${level}`,
    { className: `${rest.className} relative group`, ...rest, id },
    [
      <a
        href={`#${id}`}
        key="linkIcon"
        className="linkIcon absolute bottom-0 right-full top-0 flex flex-row items-center pr-1.5 text-transparent transition-all hover:text-current group-hover:text-current"
      >
        <LinkIcon size="0.75em" strokeWidth="1.5" />
      </a>,
      children,
    ],
  );
};

const Img = ({
  src,
  alt,
  width,
  height,
  slug,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { slug: string }) => {
  const nonNullableSrc = src || "";
  const fixedSrc = nonNullableSrc.startsWith("/")
    ? nonNullableSrc
    : nonNullableSrc.replace(/^\.\.\/\.\.\/public/, "");
  if (!width || !height) throw new Error("Cannot get width or height");
  return (
    <div className="my-8">
      <ZoomWrapper>
        <EntryImage
          src={fixedSrc}
          className="max-h-1/3 my-0 w-auto border shadow-lg"
          alt={alt || ""}
          width={+width}
          height={+height}
          slug={slug}
          {...rest}
        />
      </ZoomWrapper>
    </div>
  );
};

export const EntryView = async ({ entry, shareButton, path }: Props) => {
  const url = buildFullPath(path);
  const entryTitleWithBlogName = config.title(entry.title);
  return (
    <article>
      <h1>{entry.title}</h1>
      {entry.date && (
        <div className="text-[color:var(--tw-prose-lead)]">
          Published at <AbsDate date={entry.date} />
        </div>
      )}
      <MDXRemote
        source={entry.body}
        options={{
          mdxOptions: {
            format: "md",
            rehypePlugins: [
              rehypeSlug,
              [rehypeImgSize, { dir: nodepath.join(blogDir, entry.slug) }],
              rehypeUnwrapImages,
              [rehypePrettyCode, { theme: "material-theme-darker" }],
            ],
          },
        }}
        components={{
          a: (props) => <NextLinkIfInternalAnchor {...props} />,
          img: (props) => <Img {...props} slug={entry.slug} />,
          h1: (props) => <Heading level={1} {...props} />,
          h2: (props) => <Heading level={2} {...props} />,
          h3: (props) => <Heading level={3} {...props} />,
          h4: (props) => <Heading level={4} {...props} />,
          h5: (props) => <Heading level={5} {...props} />,
          h6: (props) => <Heading level={6} {...props} />,
        }}
      />
      <footer>
        {shareButton && (
          <div className="my-2 inline-flex flex-row items-center justify-center rounded-full bg-neutral-100 pr-3 shadow-md transition-all hover:shadow-lg dark:bg-neutral-900">
            <h3
              className="-my-1 ml-0 mr-1.5 rounded-full bg-neutral-100 p-3 shadow-lg dark:bg-neutral-900"
              title="Share"
            >
              <Share2 strokeWidth="1.2" aria-label="Share" />
            </h3>

            <ShareButtons
              entryTitleWithBlogName={entryTitleWithBlogName}
              url={url}
            />
            <NativeShareButton
              entryTitleWithBlogName={entryTitleWithBlogName}
              url={url}
            />
          </div>
        )}
      </footer>
    </article>
  );
};
