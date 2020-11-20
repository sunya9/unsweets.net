import { useRouter } from "next/router";
import Link from "next/link";
import { useConfig } from "../hooks/useConfig";

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
            <Link href="/">
              <a style={{ fontWeight: "inherit" }}>{config.title()}</a>
            </Link>
          )}
        </h1>
        <p className="mt-0 mb-8">{config.description}</p>
        <nav>
          <ul className="inline-flex my-0 list-none">
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/archives">
                <a>Archives</a>
              </Link>
            </li>
            <li>
              <a href="/rss.xml">RSS</a>
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
        `}</style>
    </header>
  );
};
