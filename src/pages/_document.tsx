import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html id="app" lang="ja">
        <Head>
          <link
            key="preconnect"
            rel="preconnect"
            href="https://fonts.gstatic.com"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
            rel="stylesheet"
            key="google-fonts"
          />
        </Head>
        <body className="bg-gray-50 dark:bg-trueGray-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
