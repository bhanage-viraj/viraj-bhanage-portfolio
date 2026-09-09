"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Soft homepage scroll polish only — no wheel hijacking.
 * Lets the browser scroll naturally; Work/Achievements pins still
 * animate from scroll position.
 */
export function HomeScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    document.documentElement.classList.add("home-smooth-scroll");
    return () => {
      document.documentElement.classList.remove("home-smooth-scroll");
    };
  }, []);

  return children;
}
