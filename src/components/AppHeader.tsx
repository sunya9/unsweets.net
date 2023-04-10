import { useRouter } from "next/router";
import Link from "next/link";
import { useConfig } from "../hooks/useConfig";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

const NavLink = ({ children, href }: NavLinkProps) => {
  const router = useRouter();
  if (router.asPath.startsWith(href)) {
    return <>{children}</>;
  } else {
    return <Link href={href}>{children}</Link>;
  }
};

export const AppHeader = () => {
  const config = useConfig();
  const router = useRouter();
  const isIndex = router.asPath === "/";
  return (
    <header className="header overflow-visible h-auto">
      <div className="container pt-20 pb-10">
        <h1 className="mb-2">
          {isIndex ? (
            config.title()
          ) : (
            <Link href="/" style={{ fontWeight: "inherit" }}>
              {config.title()}
            </Link>
          )}
        </h1>
        <p className="mt-0 mb-8 lead">{config.description}</p>
        <nav>
          <ul className="inline-flex list-none p-0 m-0">
            <li>
              <NavLink href="/about">About</NavLink>
            </li>
            <li>
              <NavLink href="/archives">Archives</NavLink>
            </li>
            <li>
              {
                // eslint-disable-next-line @next/next/no-html-link-for-pages
                <a href="/rss.xml">RSS</a>
              }
            </li>
          </ul>
        </nav>
      </div>
      <style jsx>{`
        .list-none > li {
          padding-left: 0;
        }
        .list-none > li + li {
          padding-left: 1rem;
        }
        .list-none > li::before {
          display: none;
        }
      `}</style>
    </header>
  );
};
