import { ImgHTMLAttributes, MouseEventHandler, useCallback } from "react";
import Head from "next/head";
import { useConfig } from "../hooks/useConfig";
import { AbsDate } from "./AbsDate";
import { NextLinkIfInternalAnchor } from "./NextLinkIfAnchor";
import { Page } from "../lib/page";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Facebook, Twitter, Share2, MoreVertical } from "react-feather";
import { useRouter } from "next/router";
import unified from "unified";
import rehype2react, { ComponentPropsWithoutNode } from "rehype-react";
import * as React from "react";
import rehypeParse from "rehype-parse";
import { Link as LinkIcon } from "react-feather";

interface Props {
  entry: Page;
  shareButton?: boolean;
}

const Heading: React.FC<
  { level: 1 | 2 | 3 | 4 | 5 | 6 } & React.HTMLAttributes<HTMLHeadingElement>
> = ({ level, children, id, ...rest }) => {
  return React.createElement(
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
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      a(props: ComponentPropsWithoutNode) {
        return <NextLinkIfInternalAnchor {...props} />;
      },
      img(props: ComponentPropsWithoutNode) {
        return <Img {...props} />;
      },
      h1(props: ComponentPropsWithoutNode) {
        return <Heading level={1} {...props} />;
      },
      h2(props: ComponentPropsWithoutNode) {
        return <Heading level={2} {...props} />;
      },
      h3(props: ComponentPropsWithoutNode) {
        return <Heading level={3} {...props} />;
      },
      h4(props: ComponentPropsWithoutNode) {
        return <Heading level={4} {...props} />;
      },
      h5(props: ComponentPropsWithoutNode) {
        return <Heading level={5} {...props} />;
      },
      h6(props: ComponentPropsWithoutNode) {
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
      <Zoom wrapElement="span" zoomMargin={16}>
        <img
          src={fixedSrc}
          {...rest}
          className="border shadow-lg max-h-64 my-0"
        />
      </Zoom>
    </span>
  );
};

const useEntryView = (page: Page) => {
  const config = useConfig();
  const router = useRouter();
  const pathWithoutHash = React.useMemo(
    () => router.asPath.split("#").shift(),
    [router.asPath]
  );
  const url = React.useMemo(
    () => config.baseUrl + pathWithoutHash,
    [config.baseUrl, pathWithoutHash]
  );
  const [nativeShare, setNativeShare] = React.useState(false);
  React.useEffect(() => {
    setNativeShare(!!window.navigator.share);
  }, []);

  const onShowNativeShare = React.useCallback(() => {
    window.navigator.share({
      title: config.title(page.title),
      url: `${config.baseUrl}${router.asPath}`,
    });
  }, [config, page.title, router.asPath]);
  const openDialog: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      window.open(
        url,
        e.currentTarget.target,
        "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600"
      );
    },
    [url]
  );
  return {
    config,
    openDialog,
    url,
    nativeShare,
    onShowNativeShare,
  };
};

export const EntryView = ({ entry, shareButton }: Props) => {
  const { config, openDialog, url, nativeShare, onShowNativeShare } =
    useEntryView(entry);
  return (
    <article>
      <Head>
        <title>{config.title(entry.title)}</title>
      </Head>
      <h1>{entry.title}</h1>
      {entry.date && (
        <span className="text-gray-500">
          Published <AbsDate date={entry.date} />
        </span>
      )}
      <div>{processor.processSync(entry.body).result as React.ReactNode}</div>
      <footer>
        {shareButton && (
          <div className="bg-gray-100 inline-flex justify-center flex-row rounded-full shadow-md items-center hover:shadow-lg transition-all pr-3 my-2">
            <h3
              className="text-white rounded-full bg-gray-300 p-2 shadow-lg -my-1 ml-0 mr-1.5 border-4 border-gray-100"
              title="Share"
            >
              <Share2 strokeWidth="1.2" aria-label="Share" />
            </h3>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `${config.title(entry.title)} ${url}`
              )}`}
              onClick={openDialog}
              target="_new"
              rel="noopener noreferrer"
              className="block p-1.5 rounded-full text-gray-900"
              aria-label="Share on Twitter"
              title="Share on Twitter"
            >
              <Twitter
                strokeWidth="1"
                size="1.3rem"
                className="stroke-current hover:fill-current"
              />
            </a>

            <a
              className="block p-1.5 rounded-full text-gray-900"
              aria-label="Share on Facebook"
              title="Share on Facebook"
              onClick={openDialog}
              target="_new"
              rel="noopener noreferrer"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url
              )}`}
            >
              <Facebook
                strokeWidth="1"
                size="1.3rem"
                className="stroke-current hover:fill-current"
              />
            </a>
            {nativeShare && (
              <button
                onClick={onShowNativeShare}
                className="block p-1.5 rounded-full text-gray-900"
              >
                <MoreVertical
                  strokeWidth="1"
                  size="1.3rem"
                  className="hover:fill-current"
                />
              </button>
            )}
          </div>
        )}
      </footer>
    </article>
  );
};
