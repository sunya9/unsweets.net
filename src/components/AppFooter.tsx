import { GitHub, Twitter } from "react-feather";

const wave = `'data:image/svg+xml;utf8,
<svg viewBox="0 0 1600 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>
    path {
      fill: #777;
    }
    @media (preferes-color-scheme: dark) {
      path {
        fill: #ccc;
      }
    }
  </style>
  <g transform="rotate(180,800,25)">
    <path d="M 0 0 C 405.5 0 405.5 50 811 50 L 811 50 L 811 0 L 0 0 Z" stroke-width="0"></path>
    <path d="M 810 50 C 1205 50 1205 0 1600 0 L 1600 0 L 1600 0 L 810 0 Z" stroke-width="0"></path>
  </g>
</svg>'`
  .replace(/\n/g, "")
  .replace(/#/g, "%23");

export const AppFooter = () => {
  return (
    <footer className="wave mt-24">
      <style jsx>
        {`
          .wave,
          .wave::after,
          .wave::before {
            background-image: url(${wave});
            background-position: top;
            background-repeat: repeat-x;
            background-size: 1600px 50px;
          }
          .wave {
            animation: wave 30s linear infinite;
            padding-top: 50px;
            position: relative;
          }
          .wave::after,
          .wave::before {
            opacity: 0.5;
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          .wave::after {
            animation: wave 40s linear infinite;
            z-index: -1;
          }
          .wave::before {
            animation: wave-reverse 50s linear infinite;
            z-index: -2;
          }
          .wave-inner {
            background: #777;
          }
          @keyframes wave {
            from {
              background-position-x: 0;
            }
            to {
              background-position-x: -1600px;
            }
          }
          @keyframes wave-reverse {
            from {
              background-position-x: 0;
            }
            to {
              background-position-x: 1600px;
            }
          }
        `}
      </style>
      <div className="wave-inner pt-16 pb-8">
        <div className="container text-white">
          <div className="flex justify-start items-center -ml-2 pb-16">
            <p className="my-0 mx-2">Created by _X_y_z_.</p>
            <div className="mx-1.5">
              <a
                href="https://twitter.com/ephemeralMocha"
                className="text-current"
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
                className="text-current"
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
      </div>
    </footer>
  );
};
