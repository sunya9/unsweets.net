import Markdown from "markdown-to-jsx";
import { Entry } from "../lib/entry";
import { ImgHTMLAttributes } from "react";
import { Pre } from "./Pre";
import Head from "next/head";
import { useConfig } from "../hooks/useConfig";
import { AbsDate } from "./AbsDate";

interface Props {
  entry: Entry;
}

const Img = ({ src, ...rest }: ImgHTMLAttributes<HTMLImageElement>) => (
  <img src={`/assets${src}`} {...rest} />
);

export const EntryView = ({ entry }: Props) => {
  const config = useConfig();
  return (
    <>
      <Head>
        <title>{config.title(entry.title)}</title>
      </Head>
      <h1>{entry.title}</h1>
      <AbsDate date={entry.date} />
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
          },
        }}
      >
        {entry.body}
      </Markdown>
    </>
  );
};
