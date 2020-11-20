import Head from "next/head";
import { useConfig } from "../hooks/useConfig";

const NotFound = () => {
  const config = useConfig();
  return (
    <>
      <Head>
        <title>{config.title("404 - Page not found")}</title>
      </Head>
      <div className="text-center">
        <h1 className="mt-10">404</h1>
        <p>Page not found.</p>
      </div>
    </>
  );
};

export default NotFound;
