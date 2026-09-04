"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { PageCol } from "@/lib/ui";
import { BackButton } from "./back-button";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <PageCol className="flex h-16 items-center justify-between gap-6 sm:h-[4.25rem]">
        <div className="flex min-w-0 items-center gap-5">
          {pathname !== "/" ? <BackButton /> : null}
          <Link
            href="/"
            className="shrink-0 font-body text-[14px] font-medium tracking-[-0.02em] text-ink transition-opacity duration-200 hover:opacity-60"
          >
            {site.wordmark}
          </Link>
        </div>
        <nav aria-label="Primary" className="flex min-w-0 items-center gap-5 sm:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-body text-[13px] text-ink-muted transition-colors duration-200 hover:text-ink sm:text-[14px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </PageCol>
    </header>
  );
}
