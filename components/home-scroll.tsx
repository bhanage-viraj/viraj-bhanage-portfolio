"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Smooth anchor scrolling plus a thin reading-progress line at the top. */
export function HomeScroll({ children }: { children: ReactNode }) {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("home-smooth-scroll");
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      document.documentElement.classList.remove("home-smooth-scroll");
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
      >
        <span
          ref={barRef}
          className="block h-full w-full origin-left bg-signal will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </span>
      {children}
    </>
  );
}
