"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { config } from "../../blog.config";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  path?: string;
}

export const NavLink = ({ children, href, path }: NavLinkProps) => {
  const isActive = path === href;
  if (isActive) {
    return <>{children}</>;
  } else {
    return <Link href={href}>{children}</Link>;
  }
};

export const AppHeader = () => {
  const path = usePathname();
  const isIndex = path === "/";
  return (
    <header className="header overflow-visible h-auto" key="appHeader">
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
          <ul className="flex list-none p-0 m-0 space-x-3">
            <li className="pl-0">
              <NavLink path={path} href="/about">
                About
              </NavLink>
            </li>
            <li className="pl-0">
              <NavLink path={path} href="/archives">
                Archives
              </NavLink>
            </li>
            <li className="pl-0">
              {
                // eslint-disable-next-line @next/next/no-html-link-for-pages
              }
              <a href="/rss.xml">RSS</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
