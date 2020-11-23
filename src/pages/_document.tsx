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
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-XEVMD8V0LK"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-XEVMD8V0LK', {
                  page_path: window.location.pathname
                });`,
            }}
          ></script>
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
