import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { ConfigProvider } from "../components/ConfigProvider";
import { useConfig } from "../hooks/useConfig";
import { AppLayout } from "../components/AppLayout";
import "../styles/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-10104011-7"
        strategy="afterInteractive"
      ></Script>
      <Script strategy="afterInteractive" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-10104011-7');
        `}
      </Script>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
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
  return (
    <>
      <Head>
        <title>{config.title()}</title>
        <link key="icon" rel="icon" href="/favicon.ico" />

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
