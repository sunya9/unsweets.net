import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "../css/global.scss";
import smoothscroll from "smoothscroll-polyfill";

if (process.browser) {
  smoothscroll.polyfill();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=0.25"
        />
        <meta name="theme-color" content="#e74c3c" />
        <title>&lt;unsweets/&gt;</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
