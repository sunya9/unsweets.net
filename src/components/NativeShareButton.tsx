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

  const onShowNativeShare = useCallback(() => {
    window.navigator.share({
      title: entryTitleWithBlogName,
      url,
    });
  }, [entryTitleWithBlogName, url]);
  return (
    nativeShare && (
      <button onClick={onShowNativeShare} className="block p-1.5 rounded-full">
        <MoreVertical
          strokeWidth="1"
          size="1.3rem"
          className="hover:fill-current"
        />
      </button>
    )
  );
};
