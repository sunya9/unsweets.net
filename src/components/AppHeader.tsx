"use client";

import { usePathname } from "next/navigation";
import { config } from "../../blog.config";
import { cn } from "../lib/util";
import { rubik } from "../app/fonts";
import { AppLink } from "./AppLink";

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
    return <AppLink href={href}>{children}</AppLink>;
  }
};

export const AppHeader = () => {
  const path = usePathname();
  const isIndex = path === "/";
  return (
    <header>
      <div className="container pt-20 pb-10">
        <h1 className={`mb-0 ${rubik.className}`}>
          <AppLink
            href={isIndex ? undefined : "/"}
            tabIndex={isIndex ? -1 : undefined}
            className={cn(
              { "no-underline": isIndex },
              "[&>span:nth-last-child(2)]:text-accent-500",
            )}
          >
            {config
              .title()
              .split("")
              .map((char, index) => (
                <span key={index}>{char}</span>
              ))}
          </AppLink>
        </h1>
        <p className="lead mt-2 mb-8">{config.description}</p>
        <nav>
          <ul className="m-0 flex list-none space-x-3 p-0">
            <li className="pl-0">
              <NavLink href="/entries">Archives</NavLink>
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
