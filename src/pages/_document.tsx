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
        <Head />
        <body className="bg-background">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
