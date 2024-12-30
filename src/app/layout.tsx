import { Inter } from "next/font/google";
import Script from "next/script";
import { Metadata, Viewport } from "next";
import { config } from "../../blog.config";
import "./../styles/styles.css";
import { AppFooter } from "../components/AppFooter";
import { AppHeader } from "../components/AppHeader";
import pkg from "../../package.json";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: pkg.name,
    template: `%s - ${pkg.name}`,
  },
  description: config.description,
  icons: "/favicon.ico",
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
      </head>
      <body className="bg-neutral-50 dark:bg-neutral-800">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <div className="flex min-h-screen flex-col">
            <AppHeader />
            <main className="flex-1">
              <div className="container">{children}</div>
            </main>
            <AppFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
