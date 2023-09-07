import { Inter } from "next/font/google";
import Script from "next/script";
import { config } from "../../blog.config";
import "./../styles/styles.css";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html id="app" lang="ja" className={inter.className}>
      <head>
        <link key="icon" rel="icon" href="/favicon.ico" />
        <meta
          key="description"
          name="description"
          content={config.description}
        />
        <link
          key="rss"
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
        />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#f9fafb" />
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
      </head>
      <body className="bg-neutral-50 dark:bg-neutral-800">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {children}
        </div>
      </body>
    </html>
  );
}
