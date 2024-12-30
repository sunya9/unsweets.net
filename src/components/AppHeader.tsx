"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { config } from "../../blog.config";

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

export const NavLink = ({ children, href }: NavLinkProps) => {
  const path = usePathname();
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
    <header className="header h-auto overflow-visible" key="appHeader">
      <div className="container pb-10 pt-20">
        <h1 className="mb-2">
          {isIndex ? (
            config.title()
          ) : (
            <Link href="/" style={{ fontWeight: "inherit" }}>
              {config.title()}
            </Link>
          )}
        </h1>
        <p className="lead mb-8 mt-0">{config.description}</p>
        <nav>
          <ul className="m-0 flex list-none space-x-3 p-0">
            <li className="pl-0">
              <NavLink href="/archives">Archives</NavLink>
            </li>
            <li className="pl-0">
              <a href="/rss.xml">RSS</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
