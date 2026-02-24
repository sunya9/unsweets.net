"use client";

import { useCallback, useState } from "react";
import { Copy, Check } from "react-feather";

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Copy code"
      className="absolute top-2 right-2 cursor-pointer rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-neutral-200"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
};
