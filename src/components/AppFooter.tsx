import { GitHub, Twitter } from "react-feather";

export const AppFooter = () => {
  return (
    <footer>
      <div className="container">
        <hr />
        <div className="flex justify-start items-center -ml-2 my-16">
          <p className="my-0 mx-2">Created by _X_y_z_.</p>
          <div className="mx-1.5">
            <a
              href="https://twitter.com/ephemeralMocha"
              className="text-gray-800"
              aria-label="Twitter"
              rel="nofollow"
              title="Twitter"
            >
              <Twitter
                strokeWidth="1"
                size="1.5rem"
                className="hover:fill-current"
              />
            </a>
          </div>
          <div className="mx-1.5">
            <a
              href="https://github.com/sunya9"
              className="text-gray-800"
              aria-label="GitHub"
              rel="nofollow"
              title="GitHub"
            >
              <GitHub
                strokeWidth="1"
                size="1.5rem"
                className="hover:fill-current"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
