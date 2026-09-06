"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/content";
import { PageCol } from "@/lib/ui";
import { BackButton } from "./back-button";

const links = [
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#achievements", id: "achievements", label: "Achievements" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, on: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.15, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const place = () => {
      const index = links.findIndex((link) => link.id === active);
      const item = itemRefs.current[index];
      if (!item || pathname !== "/") {
        setIndicator((current) => ({ ...current, on: false }));
        return;
      }
      setIndicator({
        x: item.offsetLeft + 12,
        w: Math.max(item.offsetWidth - 24, 12),
        on: true,
      });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active, pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/95 transition-[border-color] duration-300 ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <PageCol className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <div className="flex min-w-0 items-center gap-5">
          {pathname !== "/" ? <BackButton /> : null}
          <Link
            href="/"
            className="inline-flex min-h-11 shrink-0 items-center text-[15px] font-semibold tracking-[-0.03em] text-ink transition-opacity duration-200 hover:opacity-55"
          >
            {site.wordmark}
          </Link>
        </div>
        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative flex min-w-0 items-center gap-1 sm:gap-2"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 left-0 h-px bg-signal transition-[transform,width,opacity] duration-300 ease-out"
            style={{
              width: indicator.w,
              opacity: indicator.on ? 1 : 0,
              transform: `translateX(${indicator.x}px)`,
            }}
          />
          {links.map((link, index) => {
            const isActive = pathname === "/" && active === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3 text-[14px] transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </PageCol>
    </header>
  );
}
