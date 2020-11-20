import { AppProps } from "next/app";
import { ConfigProvider } from "../components/ConfigProvider";
import Head from "next/head";
import { useConfig } from "../hooks/useConfig";
import { AppLayout } from "../components/AppLayout";
import "../styles/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <div className="prose max-w-none">
        <App>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </App>
      </div>
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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </>
  );
};

export default MyApp;
