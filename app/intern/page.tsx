import type { Metadata } from "next";
import { InternDesk } from "./desk";

export const metadata: Metadata = {
  title: "Desk",
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

export default function InternPage() {
  return <InternDesk />;
}
