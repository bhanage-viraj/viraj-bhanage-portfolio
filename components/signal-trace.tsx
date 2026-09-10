"use client";

import { useEffect, useRef } from "react";

const SIGNAL = "#0F6E6E";
const INK = "#141414";

/**
 * The site's one continuous motion: a slow, low-amplitude signal trace —
 * a sonar readout, not a music visualiser. A single ping travels the line
 * every few seconds. Frozen to a static trace under prefers-reduced-motion.
 */
export function SignalTrace({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const trace = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const mid = height * 0.5;
      const amp = Math.min(14, height * 0.16);

      // Faint baseline + tick marks: the graph paper the signal sits on.
      ctx.strokeStyle = INK;
      ctx.globalAlpha = 0.1;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid + 0.5);
      ctx.lineTo(width, mid + 0.5);
      ctx.stroke();
      ctx.globalAlpha = 0.16;
      for (let x = 0; x <= width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, mid - 3);
        ctx.lineTo(x + 0.5, mid + 3);
        ctx.stroke();
      }

      // The ping: a gaussian bump that travels left → right on a ~7s period.
      const period = 7000;
      const phase = ((t % period) / period) * (width + 240) - 120;

      const y = (x: number) => {
        const s =
          Math.sin(x * 0.012 + t * 0.00045) * 0.55 +
          Math.sin(x * 0.031 - t * 0.0007) * 0.3 +
          Math.sin(x * 0.007 + t * 0.00022) * 0.45;
        const d = (x - phase) / 46;
        const ping = Math.exp(-d * d) * Math.sin((x - phase) * 0.22) * 4.2;
        return mid + s * amp * 0.4 + ping * amp * 0.5;
      };

      ctx.globalAlpha = 1;
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = SIGNAL;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const v = y(x);
        if (x === 0) ctx.moveTo(x, v);
        else ctx.lineTo(x, v);
      }
      ctx.stroke();

      // Echo trace, slightly behind and fainter.
      ctx.globalAlpha = 0.22;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const v = y(x - 26) + 1.5;
        if (x === 0) ctx.moveTo(x, v);
        else ctx.lineTo(x, v);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      trace(now - start);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    resize();
    if (reduced) {
      trace(2600);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduced) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    const onResize = () => {
      resize();
      if (reduced) trace(2600);
    };
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
    />
  );
}
