"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHead, WideCol } from "@/lib/ui";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export type ScrollStageProps<T> = {
  id: string;
  index: string;
  title: string;
  lede?: ReactNode;
  aside?: ReactNode;
  listLabel: string;
  items: readonly T[];
  getId: (item: T) => string;
  renderList: (item: T, index: number, active: boolean) => ReactNode;
  renderCard: (item: T, index: number) => ReactNode;
  /** Optional sticky reading panel on the right (xl+) for the active item. */
  renderCopy?: (item: T, index: number) => ReactNode;
};

/**
 * Chapter layout. Plates scroll normally in the document; a sticky index on the
 * left follows along (rolling counter, rail marker, list highlight) and an
 * optional sticky copy panel on the right reads out the active plate. Nothing
 * hijacks scroll.
 */
export function ScrollStage<T>({
  id,
  index,
  title,
  lede,
  aside,
  listLabel,
  items,
  getId,
  renderList,
  renderCard,
  renderCopy,
}: ScrollStageProps<T>) {
  const N = items.length;
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const listRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const railRef = useRef<HTMLSpanElement | null>(null);
  const railFillRef = useRef<HTMLSpanElement | null>(null);
  const markerRef = useRef<HTMLSpanElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    let inView = false;
    let displayPos = 0;
    let initialised = false;
    let last = performance.now();

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !raf) raf = requestAnimationFrame(loop);
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(section);

    const centerOf = (el: HTMLElement | null) =>
      el ? el.offsetTop + el.offsetHeight / 2 : 0;

    const loop = (now: number) => {
      raf = inView ? requestAnimationFrame(loop) : 0;
      const dt = Math.min(64, now - last);
      last = now;
      const reduced = reducedMotion();
      const desktop = window.matchMedia("(min-width: 1024px)").matches;

      // Reading line sits a bit above centre — where the eye naturally rests.
      const focusLine = window.innerHeight * 0.42;
      const range = window.innerHeight * 0.9;

      let nearest = 0;
      let nearestDist = Number.POSITIVE_INFINITY;
      const offsets: number[] = [];

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const offset = r.top + r.height / 2 - focusLine;
        offsets[i] = offset;
        const dist = Math.abs(offset);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = i;
        }
        if (reduced || !desktop) {
          el.style.opacity = "";
          return;
        }
        const focus = clamp(1 - dist / range, 0, 1);
        el.style.opacity = String(0.62 + 0.38 * focus);
      });

      if (nearest !== activeRef.current) {
        activeRef.current = nearest;
        setActive(nearest);
      }

      // Continuous position between the two plates straddling the reading line
      let pos = nearest;
      const o = offsets[nearest] ?? 0;
      if (o > 0 && nearest > 0 && offsets[nearest - 1] !== undefined) {
        const prev = offsets[nearest - 1];
        pos = nearest - clamp(o / (o - prev), 0, 1);
      } else if (o < 0 && nearest < N - 1 && offsets[nearest + 1] !== undefined) {
        const next = offsets[nearest + 1];
        pos = nearest + clamp(-o / (next - o), 0, 1);
      }
      pos = clamp(pos, 0, N - 1);

      const ease = reduced || !initialised ? 1 : 1 - Math.exp(-dt / 120);
      displayPos += (pos - displayPos) * ease;
      initialised = true;

      const btns = listRefs.current;
      const i0 = Math.floor(displayPos);
      const i1 = Math.min(N - 1, i0 + 1);
      const f = displayPos - i0;
      const b0 = centerOf(btns[i0]);
      const b1 = centerOf(btns[i1]);
      const markerY = b0 + (b1 - b0) * f;
      const railStart = centerOf(btns[0]);
      const railEnd = centerOf(btns[N - 1]);

      if (railRef.current) {
        railRef.current.style.top = `${railStart}px`;
        railRef.current.style.height = `${Math.max(0, railEnd - railStart)}px`;
      }
      if (railFillRef.current) {
        railFillRef.current.style.top = `${railStart}px`;
        railFillRef.current.style.height = `${Math.max(0, markerY - railStart)}px`;
      }
      if (markerRef.current) {
        markerRef.current.style.transform = `translate3d(0, ${markerY}px, 0)`;
      }
      if (counterRef.current) {
        counterRef.current.style.transform = `translate3d(0, ${-displayPos * 1.2}em, 0)`;
      }
    };

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [N]);

  const onListClick = (idx: number) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      window.innerHeight * 0.42 +
      el.offsetHeight / 2;
    window.scrollTo({ top, behavior: reducedMotion() ? "auto" : "smooth" });
  };

  const hasCopy = Boolean(renderCopy);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="scroll-mt-24 py-section-sm sm:py-section"
    >
      <WideCol>
        <Reveal>
          <SectionHead index={index} title={title} lede={lede} aside={aside} />
        </Reveal>

        <div
          className={`mt-14 sm:mt-20 lg:grid lg:gap-10 xl:gap-14 ${
            hasCopy
              ? "lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_300px]"
              : "lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]"
          }`}
        >
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-10">
              <p
                className="flex items-baseline font-display text-[4.5rem] leading-none text-ink"
                aria-live="polite"
              >
                <span className="stage-counter-win">
                  <span ref={counterRef} className="stage-counter-col">
                    {items.map((item, i) => (
                      <span key={getId(item)}>{pad(i + 1)}</span>
                    ))}
                  </span>
                </span>
                <span className="ml-3 font-mono text-[12px] tracking-[0.1em] text-ink-muted">
                  / {pad(N)}
                </span>
              </p>

              <div
                className="relative flex flex-col pl-6"
                role="listbox"
                aria-label={listLabel}
              >
                <span ref={railRef} className="stage-rail" aria-hidden="true" />
                <span ref={railFillRef} className="stage-rail-fill" aria-hidden="true" />
                <span ref={markerRef} className="stage-marker" aria-hidden="true" />
                {items.map((item, i) => (
                  <button
                    key={getId(item)}
                    ref={(node) => {
                      listRefs.current[i] = node;
                    }}
                    type="button"
                    role="option"
                    aria-selected={active === i}
                    onClick={() => onListClick(i)}
                    className={`stage-list-item ${active === i ? "is-active" : ""}`}
                  >
                    {renderList(item, i, active === i)}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex flex-col gap-10 sm:gap-14">
            {items.map((item, i) => (
              <div
                key={getId(item)}
                id={getId(item)}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                className="stage-card scroll-mt-28"
              >
                {renderCard(item, i)}
              </div>
            ))}
          </div>

          {renderCopy ? (
            <aside className="hidden xl:block">
              <div
                key={active}
                className="stage-copy sticky top-28 border-t border-ink pt-5"
              >
                {renderCopy(items[active], active)}
              </div>
            </aside>
          ) : null}
        </div>
      </WideCol>
    </section>
  );
}
