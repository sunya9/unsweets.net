import { AppProps } from "next/app";
import { ConfigProvider } from "../components/ConfigProvider";
import Head from "next/head";
import { useConfig } from "../hooks/useConfig";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <App>
        <Component {...pageProps} />
      </App>
    </ConfigProvider>
  );
}

const App: React.FC = ({ children }) => {
  const config = useConfig();
  return (
    <>
      <Head>
        <title>{config.title()}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default MyApp;
