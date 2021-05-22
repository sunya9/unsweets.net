import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "../css/global.scss";
import smoothscroll from "smoothscroll-polyfill";
import { useRouter } from "next/router";

if (process.browser) {
  smoothscroll.polyfill();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_VERCEL_URL || ""}${router.route}`;
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=0.25"
        />
        <meta name="theme-color" content="#e74c3c" />
        <link rel="canonical" href={url} />
        <title>&lt;unsweets/&gt;</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
