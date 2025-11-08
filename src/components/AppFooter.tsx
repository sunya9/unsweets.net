import { GitHub, Twitter } from "react-feather";
import { config } from "../../blog.config";

export const AppFooter = () => {
  return (
    <footer className="container my-16 flex flex-row items-center justify-start gap-x-4">
      <p className="my-0 text-sm">Created by {config.author}.</p>
      <div className="flex flex-row items-center justify-start gap-x-2">
        <a
          href="https://twitter.com/ephemeralMocha"
          className="text-current"
          aria-label="Twitter"
          rel="nofollow"
          title="Twitter"
        >
          <Twitter
            strokeWidth="1"
            size="1.2rem"
            className="hover:fill-current"
          />
        </a>
        <a
          href="https://github.com/sunya9"
          className="text-current"
          aria-label="GitHub"
          rel="nofollow"
          title="GitHub"
        >
          <GitHub
            strokeWidth="1"
            size="1.2rem"
            className="hover:fill-current"
          />
        </a>
      </div>
    </footer>
  );
};
