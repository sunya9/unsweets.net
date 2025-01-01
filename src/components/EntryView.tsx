import nodepath from "node:path";
import { ImgHTMLAttributes, createElement } from "react";
import { Share2 } from "react-feather";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeImgSize from "rehype-img-size";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { config } from "../../blog.config";
import { buildFullPath } from "../lib/util";
import { blogDir } from "../lib/constants";
import { Entry } from "../lib/entry";
import { AbsDate } from "./AbsDate";
import { ShareButtons } from "./ShareButtons";
import { ZoomWrapper } from "./ZoomWrapper";
import { EntryImage } from "./EntryImage";
import { AppLink } from "./AppLink";
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
    {
      className: `${rest.className}`,
      ...rest,
      id,
    },
    [
      <a
        href={`#${id}`}
        key={`linkIcon-${id}`}
        className="no-underline after:ml-2 after:inline-block after:opacity-0 after:transition-all after:content-['#'] hover:underline after:hover:no-underline hover:after:opacity-70"
      >
        {children}
      </a>,
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
    <article className="[word-break:auto-phrase]">
      <div role="contentinfo" aria-label="記事のメタ情報">
        {entry.date && (
          <div className="text-[--tw-prose-lead]">
            <AbsDate
              date={entry.date}
              style={{
                viewTransitionName: `entry-date-${entry.slug}`,
              }}
            />
          </div>
        )}
      </div>
      <h1 className="contain-paint">
        <span
          style={{
            viewTransitionName: `entry-title-${entry.slug}`,
          }}
        >
          {entry.title}
        </span>
      </h1>

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
          a: (props) => <AppLink {...props} />,
          img: (props) => <Img {...props} slug={entry.slug} />,
          h1: (props) => <Heading level={1} {...props} />,
          h2: (props) => <Heading level={2} {...props} />,
          h3: (props) => <Heading level={3} {...props} />,
          h4: (props) => <Heading level={4} {...props} />,
          h5: (props) => <Heading level={5} {...props} />,
          h6: (props) => <Heading level={6} {...props} />,
        }}
      />
      {shareButton && (
        <footer>
          <div
            className="my-2 inline-flex flex-row items-center justify-center rounded-full bg-neutral-100 pr-3 shadow-md transition-all hover:shadow-lg dark:bg-neutral-900"
            role="region"
            aria-label="この記事を共有する"
          >
            <div className="-my-1 ml-0 mr-1.5 rounded-full bg-neutral-100 p-3 shadow-lg dark:bg-neutral-900">
              <Share2 strokeWidth="1.2" />
            </div>

            <ShareButtons text={entryTitleWithBlogName} url={url} />
          </div>
        </footer>
      )}
    </article>
  );
};
