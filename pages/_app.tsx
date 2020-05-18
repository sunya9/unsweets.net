import React from "react";
import App from "next/app";
import Head from "next/head";
import "../css/global.scss";
import smoothscroll from "smoothscroll-polyfill";

if (process.browser) {
  smoothscroll.polyfill();
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,minimum-scale=0.25"
          />
          <title>&lt;unsweets/&gt;</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
export default MyApp;
