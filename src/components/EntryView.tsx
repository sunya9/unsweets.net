import Markdown from "markdown-to-jsx";
import { Entry } from "../lib/entry";
import { ImgHTMLAttributes } from "react";

interface Props {
  entry: Entry;
}

const Img = ({ src, ...rest }: ImgHTMLAttributes<HTMLImageElement>) => (
  <img src={`/assets${src}`} {...rest} />
);

export const EntryView = ({ entry }: Props) => {
  return (
    <>
      <h1>{entry.title}</h1>
      <Markdown
        options={{
          overrides: {
            img: Img,
          },
        }}
      >
        {entry.body}
      </Markdown>
    </>
  );
};
