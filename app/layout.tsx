import type { Metadata } from "next";
import { Nav } from "@/components/nav";
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-[60] focus:bg-paper focus:px-3 focus:py-2 focus:text-signal"
        >
          Skip to content
        </a>
        <Nav />
        {children}
      </body>
    </html>
  );
}
