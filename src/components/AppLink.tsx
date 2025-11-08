import { Link } from "next-view-transitions";
import type NextLink from "next/link";
import { type ComponentProps } from "react";
import { cn } from "../lib/util";

type Props = ComponentProps<typeof NextLink>;

export const AppLink = (props: Props) => {
  const { href, children, className, ...rest } = props;

  const linkClassName = cn(
    "underline underline-offset-4 decoration-from-font decoration-current/40 hover:decoration-current/70 transition-all",
    className,
  );
  if (!href)
    return (
      <a className={linkClassName} {...rest}>
        {children}
      </a>
    );
  const url = typeof href === "string" ? href : href.toString();
  if (url.startsWith("http") || url.startsWith("#")) {
    return (
      <a href={url} className={linkClassName} {...rest}>
        {children}
      </a>
    );
  } else {
    return (
      <Link href={href} className={linkClassName} {...rest}>
        {children}
      </Link>
    );
  }
};
