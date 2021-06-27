import Markdown from "markdown-to-jsx";
import { ImgHTMLAttributes, MouseEventHandler, useCallback } from "react";
import Head from "next/head";
import { useConfig } from "../hooks/useConfig";
import { AbsDate } from "./AbsDate";
import { NextLinkIfInternalAnchor } from "./NextLinkIfAnchor";
import { Page } from "../lib/page";
import dynamic from "next/dynamic";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Facebook, Twitter, Share2 } from "react-feather";
import { useRouter } from "next/router";

const Pre = dynamic<unknown>(
  import("../components/Pre").then((res) => res.Pre)
);

interface Props {
  entry: Page;
  shareButton?: boolean;
}

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

export const EntryView = ({ entry, shareButton }: Props) => {
  const config = useConfig();
  const router = useRouter();
  const url = config.baseUrl + router.asPath;
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
  return (
    <article>
      <Head>
        <title>{config.title(entry.title)}</title>
      </Head>
      <h1>{entry.title}</h1>
      {entry.date && (
        <span className="text-gray-500">
          Published at <AbsDate date={entry.date} />
        </span>
      )}
      <Markdown
        options={{
          overrides: {
            img: Img,
            pre: {
              component(props: {
                children: { props: { className?: string; children: string } };
              }) {
                return <Pre {...props.children.props} />;
              },
            },
            a: {
              component: NextLinkIfInternalAnchor,
            },
          },
        }}
      >
        {entry.body}
      </Markdown>
      <footer>
        {shareButton && (
          <div className="bg-gray-100 inline-flex justify-center flex-row rounded-full shadow-md items-center hover:shadow-lg transition-all pr-3 my-2">
            <h3
              className="text-white rounded-full bg-gray-600 p-2 shadow-lg -my-1 ml-0 mr-1.5 border-4 border-gray-100"
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
          </div>
        )}
      </footer>
    </article>
  );
};
