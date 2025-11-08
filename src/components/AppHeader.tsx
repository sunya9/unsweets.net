"use client";

import { usePathname } from "next/navigation";
import { type AnchorHTMLAttributes } from "react";
import { config } from "../../blog.config";
import { cn } from "../lib/util";
import { rubik } from "../app/fonts";
import { AppLink } from "./AppLink";

export const NavLink = ({
  children,
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const path = usePathname();
  const isActive = path === href;
  if (isActive || !href) {
    return <span {...props}>{children}</span>;
  } else {
    return (
      <AppLink href={href} {...props}>
        {children}
      </AppLink>
    );
  }
};

const Title = config
  .title()
  .split("")
  .map((char, index) => <span key={index}>{char}</span>);

export const AppHeader = () => {
  const path = usePathname();
  const isIndex = path === "/";
  return (
    <header className="not-prose container mt-20 mb-12">
      <h1 className={`text-4xl ${rubik.className}`}>
        <NavLink
          href="/"
          className={cn(
            { "no-underline": isIndex },
            "[&>span:nth-last-child(2)]:text-accent-500",
            "decoration-2 -underline-offset-2",
          )}
        >
          {Title}
        </NavLink>
      </h1>
      <p className="mt-2 text-base">{config.description}</p>
      <nav>
        <ul className="mt-4 flex gap-x-4">
          <li>
            <NavLink href="/entries">Archives</NavLink>
          </li>
          <li>
            <NavLink href="/rss.xml">RSS</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
