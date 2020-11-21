import Markdown from "markdown-to-jsx";
import { ImgHTMLAttributes } from "react";
import Head from "next/head";
import { useConfig } from "../hooks/useConfig";
import { AbsDate } from "./AbsDate";
import { NextLinkIfInternalAnchor } from "./NextLinkIfAnchor";
import { Page } from "../lib/page";
import dynamic from "next/dynamic";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Pre = dynamic<unknown>(
  import("../components/Pre").then((res) => res.Pre)
);

interface Props {
  entry: Page;
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

export const EntryView = ({ entry }: Props) => {
  const config = useConfig();
  return (
    <>
      <Head>
        <title>{config.title(entry.title)}</title>
      </Head>
      <h1>{entry.title}</h1>
      {entry.date && (
        <>
          Published at <AbsDate date={entry.date} />
        </>
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
    </>
  );
};
