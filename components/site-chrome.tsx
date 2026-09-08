"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Nav } from "./nav";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const intern = pathname.startsWith("/intern");

  return (
    <>
      {intern ? null : (
        <a
          id="skip-to-content"
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-[60] focus:bg-paper focus:px-3 focus:py-2 focus:text-signal"
        >
          Skip to content
        </a>
      )}
      {intern ? null : <Nav />}
      {children}
    </>
  );
}
