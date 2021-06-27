import * as React from "react";
import Link from "next/link";

export const NextLinkIfInternalAnchor: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = (props) => {
  const { href, children, ...rest } = props;
  if (!href) return <a {...rest}>{children}</a>;
  if (href.startsWith("http")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  } else {
    return (
      <Link href={href} passHref>
        <a {...rest}>{children}</a>
      </Link>
    );
  }
};
