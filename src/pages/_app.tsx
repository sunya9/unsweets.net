import { AppProps } from "next/app";
import { ConfigProvider } from "../components/ConfigProvider";
import Head from "next/head";
import { useConfig } from "../hooks/useConfig";
import { AppLayout } from "../components/AppLayout";
import "../styles/styles.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

declare global {
  interface Window {
    gtag(s1: string, s2: string, options?: { page_path: string }): void;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag("config", "G-XEVMD8V0LK", {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
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
  const router = useRouter();
  const [stylesheet, setStylesheet] = useState("");
  useEffect(() => {
    setStylesheet("stylesheet");
  }, []);
  return (
    <>
      <Head>
        <title>{config.title()}</title>
        <link key="icon" rel="icon" href="/favicon.ico" />
        <link
          key="preconnect"
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
          rel={stylesheet}
          key="google-fonts"
        />
        <link
          key="canonical"
          rel="canonical"
          href={`${config.baseUrl}${router.asPath}`}
        />
        <meta
          key="description"
          name="description"
          content={config.description}
        />
        <meta key="charSet" charSet="utf-8" />
        <link
          key="rss"
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
        />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#f9fafb" />
      </Head>
      {children}
    </>
  );
};

export default MyApp;
