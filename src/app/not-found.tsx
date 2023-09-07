import { Metadata } from "next";
import { config } from "../../blog.config";

export const metadata: Metadata = {
  title: config.title("404 - Page not found"),
};

const NotFound = () => {
  return (
    <div className="text-center">
      <h1 className="mt-10">404</h1>
      <p>Page not found.</p>
    </div>
  );
};

export default NotFound;
