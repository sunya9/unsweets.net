import { GitHub, Twitter } from "react-feather";

export const AppFooter = () => {
  return (
    <footer>
      <div className="text-center container">
        <hr />
        <div className="flex justify-center">
          <div className="mx-3">
            <a href="https://twitter.com/_X_y_z_">
              <Twitter strokeWidth="1" size="1.6rem" />
            </a>
          </div>
          <div className="mx-3">
            <a href="https://github.com/sunya9">
              <GitHub strokeWidth="1" size="1.6rem" />
            </a>
          </div>
        </div>
        <p>Created by _X_y_z_.</p>
      </div>
    </footer>
  );
};
