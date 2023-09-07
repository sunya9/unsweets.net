import { ImgHTMLAttributes, createElement, Fragment } from "react";
import { Share2, Link as LinkIcon } from "react-feather";
import { unified } from "unified";
import rehype2react from "rehype-react";
import rehypeParse from "rehype-parse";
import { Page } from "../lib/page";
import { config } from "../../blog.config";
import { buildFullPath } from "../lib/util";
import { NextLinkIfInternalAnchor } from "./NextLinkIfAnchor";
import { AbsDate } from "./AbsDate";
import { NativeShareButton } from "./NativeShareButton";
import { ShareButtons } from "./ShareButtons";
import { ZoomWrapper } from "./ZoomWrapper";

interface Props {
  entry: Page;
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
        className="transition-all absolute right-full top-0 bottom-0 pr-1.5 text-transparent hover:text-current group-hover:text-current linkIcon flex flex-row items-center"
      >
        <LinkIcon size="0.75em" strokeWidth="1.5" />
      </a>,
      children,
    ]
  );
};

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehype2react, {
    createElement: createElement,
    Fragment,
    components: {
      a(
        props: React.DetailedHTMLProps<
          React.AnchorHTMLAttributes<HTMLAnchorElement>,
          HTMLAnchorElement
        >
      ) {
        return <NextLinkIfInternalAnchor {...props} />;
      },
      img(
        props: React.DetailedHTMLProps<
          React.ImgHTMLAttributes<HTMLImageElement>,
          HTMLImageElement
        >
      ) {
        return <Img {...props} />;
      },
      h1(
        props: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLHeadingElement>,
          HTMLHeadingElement
        >
      ) {
        return <Heading level={1} {...props} />;
      },
      h2(
        props: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLHeadingElement>,
          HTMLHeadingElement
        >
      ) {
        return <Heading level={2} {...props} />;
      },
      h3(
        props: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLHeadingElement>,
          HTMLHeadingElement
        >
      ) {
        return <Heading level={3} {...props} />;
      },
      h4(
        props: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLHeadingElement>,
          HTMLHeadingElement
        >
      ) {
        return <Heading level={4} {...props} />;
      },
      h5(
        props: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLHeadingElement>,
          HTMLHeadingElement
        >
      ) {
        return <Heading level={5} {...props} />;
      },
      h6(
        props: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLHeadingElement>,
          HTMLHeadingElement
        >
      ) {
        return <Heading level={6} {...props} />;
      },
    },
  });

const Img = ({ src, ...rest }: ImgHTMLAttributes<HTMLImageElement>) => {
  const nonNullableSrc = src || "";
  const fixedSrc = nonNullableSrc.startsWith("/")
    ? nonNullableSrc
    : nonNullableSrc.replace(/^\.\.\/\.\.\/public/, "");
  return (
    <span className="block text-center my-8">
      <ZoomWrapper fixedSrc={fixedSrc} {...rest} />
    </span>
  );
};

export const EntryView = ({ entry, shareButton, path }: Props) => {
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
      <div>{processor.processSync(entry.body).result as React.ReactNode}</div>
      <footer>
        {shareButton && (
          <div className="bg-neutral-100 dark:bg-neutral-900 inline-flex justify-center flex-row rounded-full shadow-md items-center hover:shadow-lg transition-all pr-3 my-2">
            <h3
              className="rounded-full p-3 shadow-lg -my-1 ml-0 mr-1.5 bg-neutral-100 dark:bg-neutral-900"
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
