"use client";

import {
  MouseEventHandler,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import { Facebook, MoreVertical, Twitter } from "react-feather";

interface Props {
  text: string;
  url: string;
}

export const ShareButtons = ({ url, text }: Props) => {
  const openDialog: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      window.open(
        url,
        e.currentTarget.target,
        "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600",
      );
    },
    [url],
  );
  const shareData = useMemo(
    (): ShareData => ({
      title: text,
      url,
    }),
    [text, url],
  );
  const nativeShare = useSyncExternalStore(
    () => () => {},
    () => navigator.canShare && navigator.canShare(shareData),
    () => false,
  );

  const onShowNativeShare = useCallback(async () => {
    try {
      await window.navigator.share(shareData);
    } catch (e) {
      console.warn(e);
    }
  }, [shareData]);

  return (
    <>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `${text} ${url}`,
        )}`}
        onClick={openDialog}
        target="_new"
        className="block p-1.5"
        title="Xで共有する"
      >
        <Twitter
          strokeWidth="1"
          size="1.3rem"
          className="stroke-current hover:fill-current"
        />
      </a>

      <a
        className="block p-1.5"
        title="Facebookで共有する"
        onClick={openDialog}
        target="_new"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url,
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
          className="block p-1.5"
          title="共有…"
        >
          <MoreVertical
            strokeWidth="1"
            size="1.3rem"
            className="hover:fill-current"
          />
        </button>
      )}
    </>
  );
};
