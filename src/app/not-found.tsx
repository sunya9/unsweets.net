import { Metadata } from "next";
import { AppLayout } from "../components/AppLayout";
import { config } from "../../blog.config";

export const metadata: Metadata = {
  title: config.title("404 - Page not found"),
};

const NotFound = () => {
  return (
    <AppLayout>
      <div className="text-center">
        <h1 className="mt-10">404</h1>
        <p>Page not found.</p>
      </div>
    </AppLayout>
  );
};

export default NotFound;
