import { Link } from "next-view-transitions";
import type NextLink from "next/link";
import { type ComponentProps } from "react";

type Props = ComponentProps<typeof NextLink>;

export const AppLink = (props: Props) => {
  const { href, children, ...rest } = props;
  if (!href) return <a {...rest}>{children}</a>;
  const url = typeof href === "string" ? href : href.toString();
  if (url.startsWith("http") || url.startsWith("#")) {
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  } else {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
};
