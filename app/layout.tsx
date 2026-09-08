import type { Metadata } from "next";
import Script from "next/script";
import { SiteChrome } from "@/components/site-chrome";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script id="vd" strategy="beforeInteractive">
          {`try{if(document.cookie.indexOf("vd_ui=")!==-1)document.documentElement.dataset.vd="1"}catch(e){}`}
        </Script>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
