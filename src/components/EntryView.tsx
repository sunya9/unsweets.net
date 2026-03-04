import nodepath from "node:path";
import { ImgHTMLAttributes, createElement } from "react";
import { Share2 } from "react-feather";
import { config } from "../../blog.config";
import { buildFullPath, cn } from "../lib/util";
import { Entry } from "../lib/entry";
import { AbsDate } from "./AbsDate";
import { ShareButtons } from "./ShareButtons";
import { ZoomWrapper } from "./ZoomWrapper";
import { EntryImage } from "./EntryImage";
import { AppLink } from "./AppLink";
import { CodeBlock } from "./CodeBlock";
import { MarkdownAsync } from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeImgSize from "rehype-img-size";
import { blogDir } from "../lib/constants";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypePrettyCode from "rehype-pretty-code";

interface Props {
  entry: Entry;
  shareButton?: boolean;
  path: string;
}

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
} & React.HTMLAttributes<HTMLHeadingElement>;

const levelMarker = {
  1: "before:content-['#_']",
  2: "before:content-['##_']",
  3: "before:content-['###_']",
  4: "before:content-['####_']",
  5: "before:content-['#####_']",
  6: "before:content-['######_']",
};

function Heading({ level, children, id, ...rest }: HeadingProps) {
  return createElement(
    `h${level}`,
    {
      "data-level": levelMarker[level],
      className: cn(
        rest.className,
        levelMarker[level],
        "before:text-current/50",
        "before:font-extralight",
      ),
      ...rest,
      id,
    },
    [
      <a
        href={`#${id}`}
        key={`linkIcon-${id}`}
        className="no-underline hover:underline"
      >
        {children}
      </a>,
    ],
  );
}

function Img({
  src,
  alt,
  width,
  height,
  slug,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { slug: string }) {
  if (!width || !height) throw new Error("Cannot get width or height");
  if (typeof src !== "string") throw new Error("Don't use srcObject");
  const nonNullableSrc = src || "";
  const fixedSrc = nonNullableSrc.startsWith("/")
    ? nonNullableSrc
    : nonNullableSrc.replace(/^\.\.\/\.\.\/public/, "");
  return (
    <div className="my-8">
      <ZoomWrapper>
        <EntryImage
          src={fixedSrc}
          className="my-0 max-h-1/3 w-auto border shadow-lg"
          alt={alt || ""}
          width={+width}
          height={+height}
          slug={slug}
          {...rest}
        />
      </ZoomWrapper>
    </div>
  );
}

export async function EntryView({ entry, shareButton, path }: Props) {
  const url = buildFullPath(path);
  const entryTitleWithBlogName = config.title(entry.title);
  return (
    <article
      className={cn(
        "overflow-visible",
        "prose-pre:bg-unset prose-pre:py-4 prose-pre:px-0 prose-pre:shadow-xs",
      )}
    >
      <header>
        <div role="contentinfo" aria-label="記事のメタ情報">
          {entry.date && (
            <div className="text-(--tw-prose-lead)">
              <AbsDate
                date={entry.date}
                style={{
                  viewTransitionName: `entry-date-${entry.slug}`,
                }}
              />
            </div>
          )}
        </div>
        <h1 className="contain-paint before:content-['#_']">
          <span
            style={{
              viewTransitionName: `entry-title-${entry.slug}`,
            }}
          >
            {entry.title}
          </span>
        </h1>
      </header>

      {/* Using react-markdown instead of rehype-react/hast-util-to-jsx-runtime, which break unified's type chain */}
      <MarkdownAsync
        components={{
          a: ({ node, ...props }) => <AppLink {...props} />,
          img: ({ node, ...props }) => <Img {...props} slug={entry.slug} />,
          h1: ({ node, ...props }) => <Heading level={1} {...props} />,
          h2: ({ node, ...props }) => <Heading level={2} {...props} />,
          h3: ({ node, ...props }) => <Heading level={3} {...props} />,
          h4: ({ node, ...props }) => <Heading level={4} {...props} />,
          h5: ({ node, ...props }) => <Heading level={5} {...props} />,
          h6: ({ node, ...props }) => <Heading level={6} {...props} />,
          pre: ({ node, ...props }) => <CodeBlock {...props} />,
        }}
        rehypePlugins={[
          rehypeSlug,
          [rehypeImgSize, { dir: nodepath.join(blogDir, entry.slug) }],
          rehypeUnwrapImages,
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "material-theme-darker",
                light: "material-theme-lighter",
              },
            },
          ],
        ]}
      >
        {entry.body}
      </MarkdownAsync>
      {shareButton && (
        <footer>
          <div
            className="my-2 inline-flex flex-row items-center justify-center rounded-full bg-neutral-100 pr-3 shadow-md transition-all hover:shadow-lg dark:bg-neutral-900/70"
            role="region"
            aria-label="この記事を共有する"
          >
            <div className="-my-1 mr-1.5 ml-0 rounded-full bg-neutral-100 p-3 shadow-lg dark:bg-neutral-900/70">
              <Share2 strokeWidth="1.2" />
            </div>

            <ShareButtons text={entryTitleWithBlogName} url={url} />
          </div>
        </footer>
      )}
    </article>
  );
}
