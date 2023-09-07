"use client";

import { MouseEventHandler, useCallback } from "react";
import { Facebook, Twitter } from "react-feather";

interface Props {
  entryTitleWithBlogName: string;
  url: string;
}

export const ShareButtons = ({ url, entryTitleWithBlogName }: Props) => {
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
    <>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `${entryTitleWithBlogName} ${url}`
        )}`}
        onClick={openDialog}
        target="_new"
        rel="noopener noreferrer"
        className="block p-1.5 rounded-full"
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
        className="block p-1.5 rounded-full"
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
    </>
  );
};
