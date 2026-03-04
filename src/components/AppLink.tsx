import { Link } from "next-view-transitions";
import type NextLink from "next/link";
import { type ComponentProps } from "react";
import { cn } from "../lib/util";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> &
  Pick<ComponentProps<"a">, "href">;

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
  if (href.startsWith("http") || href.startsWith("#")) {
    return (
      <a href={href} className={linkClassName} {...rest}>
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
