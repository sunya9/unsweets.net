import Link from "next/link";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const NextLinkIfInternalAnchor = (props: Props) => {
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
