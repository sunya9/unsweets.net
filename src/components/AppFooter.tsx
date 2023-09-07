import { GitHub, Twitter } from "react-feather";
import styles from "./../styles/footer.module.css";

export const AppFooter = () => {
  return (
    <footer className={`${styles.wave} mt-24`}>
      <div className={`${styles.inner} pt-16 pb-8`}>
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
