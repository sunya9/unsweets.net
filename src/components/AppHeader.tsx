"use client";

import { usePathname } from "next/navigation";
import { Rubik } from "next/font/google";
import { config } from "../../blog.config";
import styles from "../styles/header.module.css";
import { cn } from "../lib/util";
import { AppLink } from "./AppLink";

const rubik = Rubik({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

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
    <header
      className={cn(styles.wave, "h-auto overflow-visible")}
      key="appHeader"
    >
      <div className="container pb-10 pt-20">
        <h1 className={`mb-2 ${rubik.className}`}>
          {isIndex ? (
            config.title()
          ) : (
            <AppLink href="/" style={{ fontWeight: "inherit" }}>
              {config.title()}
            </AppLink>
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
