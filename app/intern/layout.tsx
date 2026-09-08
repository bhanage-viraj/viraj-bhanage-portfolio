import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DeskChrome } from "./chrome";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function InternLayout({ children }: { children: ReactNode }) {
  return <DeskChrome>{children}</DeskChrome>;
}
