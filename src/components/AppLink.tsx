import { Link } from "next-view-transitions";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const AppLink = (props: Props) => {
  const { href, children, ...rest } = props;
  if (!href) return <a {...rest}>{children}</a>;
  if (href.startsWith("http") || href.startsWith("#")) {
    return (
      <a href={href} {...rest}>
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
