"use client";

import { useCallback, useEffect, useState } from "react";
import { MoreVertical } from "react-feather";

interface Props {
  entryTitleWithBlogName: string;
  url: string;
}

export const NativeShareButton = ({ entryTitleWithBlogName, url }: Props) => {
  const [nativeShare, setNativeShare] = useState(false);
  useEffect(() => {
    setNativeShare(!!window.navigator.share);
  }, []);

  const onShowNativeShare = useCallback(async () => {
    try {
      await window.navigator.share({
        title: entryTitleWithBlogName,
        url,
      });
    } catch (e) {
      console.warn(e);
    }
  }, [entryTitleWithBlogName, url]);
  return (
    nativeShare && (
      <button onClick={onShowNativeShare} className="block rounded-full p-1.5">
        <MoreVertical
          strokeWidth="1"
          size="1.3rem"
          className="hover:fill-current"
        />
      </button>
    )
  );
};
