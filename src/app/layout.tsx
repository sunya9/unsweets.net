import Script from "next/script";
import { Metadata, Viewport } from "next";
import { unstable_ViewTransition as ViewTransition } from "react";
import { config } from "../../blog.config";
import "./styles/styles.css";
import { AppFooter } from "../components/AppFooter";
import { AppHeader } from "../components/AppHeader";
import { commonOpenGraph } from "../lib/ogUtil";
import { inter } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl),
  title: {
    default: config.title(),
    template: `%s - ${config.title()}`,
  },
  description: config.description,
  icons: "/icon.svg",
  authors: [{ name: config.author, url: config.xLink }],
  creator: config.author,
  publisher: config.author,
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "/rss.xml",
          title: "RSS",
        },
      ],
    },
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: commonOpenGraph,
};

export const viewport: Viewport = {
  themeColor: "#f9fafb",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransition>
      <html id="app" lang="ja" className={inter.className}>
        <head>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-XEVMD8V0LK"
          />
          <Script strategy="afterInteractive" id="google-analytics">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XEVMD8V0LK');
          `}
          </Script>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,minimum-scale=0.25"
          />
          <meta property="og:site_name" content={config.title()} />
        </head>
        <body className="prose prose-neutral dark:prose-invert prose-a:underline-offset-4 relative flex min-h-screen max-w-none flex-col bg-stone-100 dark:bg-stone-700">
          <AppHeader />
          <main className="container flex-1">{children}</main>
          <AppFooter />
        </body>
      </html>
    </ViewTransition>
  );
}
