import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";

class MyDocument extends Document {
  render() {
    const styles = process.env.NODE_ENV === "production" ? flush() : null;
    return (
      <Html lang="ja">
        <Head>{styles}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
