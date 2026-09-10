"use client";

import { useEffect, useRef } from "react";

/** Soft ambient glow behind the hero that drifts and leans toward the pointer. */
export function HeroAmbient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (event: PointerEvent) => {
      tx = (event.clientX / window.innerWidth) * 2 - 1;
      ty = (event.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      node.style.transform = `translate3d(${x * 28}px, ${y * 20}px, 0)`;
      raf =
        Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001
          ? requestAnimationFrame(tick)
          : 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 z-0 will-change-transform" aria-hidden="true">
      <div className="hero-ambient" />
      <div className="hero-ambient hero-ambient-2" />
    </div>
  );
}
