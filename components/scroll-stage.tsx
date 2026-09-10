"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Reveal } from "@/components/reveal";
import { PageCol } from "@/lib/ui";

const SCRAMBLE_CHARS = "0123456789!<>-_\\/[]{}—=+*^?#$%&";

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
  header: ReactNode;
  listLabel: string;
  items: readonly T[];
  getId: (item: T) => string;
  getTeaser: (item: T) => string;
  renderList: (item: T, index: number, active: boolean) => ReactNode;
  renderCard: (item: T, index: number) => ReactNode;
  renderCopy: (
    item: T,
    index: number,
    ctx: { desc: string; scrambling: boolean },
  ) => ReactNode;
};

/**
 * Cards scroll normally in the document. A sticky rail on the left follows
 * along: list highlight, progress marker, rolling counter and live copy all
 * react to which card is nearest the reading line. Nothing hijacks scroll.
 */
export function ScrollStage<T>({
  id,
  header,
  listLabel,
  items,
  getId,
  getTeaser,
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
  const scrambleRaf = useRef<number | null>(null);
  const teaserRef = useRef(getTeaser);
  const itemsRef = useRef(items);
  teaserRef.current = getTeaser;
  itemsRef.current = items;

  const [active, setActive] = useState(0);
  const [desc, setDesc] = useState(() => getTeaser(items[0]));
  const [scrambling, setScrambling] = useState(false);

  const runScramble = useCallback((text: string) => {
    if (scrambleRaf.current) cancelAnimationFrame(scrambleRaf.current);
    if (reducedMotion()) {
      setDesc(text);
      setScrambling(false);
      return;
    }
    setScrambling(true);
    const scrambleDur = 180;
    const revealDur = 320;
    const total = scrambleDur + revealDur;
    const start = performance.now();
    let lastFrame = -100;
    const frame = (now: number) => {
      const elapsed = now - start;
      if (elapsed - lastFrame >= 45) {
        lastFrame = elapsed;
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " " || ch === "\n") {
            out += ch;
            continue;
          }
          out +=
            (elapsed - scrambleDur) / revealDur > i / text.length
              ? ch
              : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
        }
        setDesc(out);
      }
      if (elapsed < total) {
        scrambleRaf.current = requestAnimationFrame(frame);
      } else {
        setDesc(text);
        setScrambling(false);
        scrambleRaf.current = null;
      }
    };
    scrambleRaf.current = requestAnimationFrame(frame);
  }, []);

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
      const range = window.innerHeight * 0.75;

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
          el.style.transform = "";
          return;
        }
        const focus = clamp(1 - dist / range, 0, 1);
        el.style.opacity = String(0.55 + 0.45 * focus);
        el.style.transform = `scale(${0.975 + 0.025 * focus})`;
      });

      if (nearest !== activeRef.current) {
        activeRef.current = nearest;
        setActive(nearest);
        const text = teaserRef.current(itemsRef.current[nearest]);
        if (initialised) runScramble(text);
        else setDesc(text);
      }

      // Continuous position between the two cards straddling the reading line
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

      const ease = reduced || !initialised ? 1 : 1 - Math.exp(-dt / 110);
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
        counterRef.current.style.transform = `translate3d(0, ${-displayPos}em, 0)`;
      }
    };

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (scrambleRaf.current) cancelAnimationFrame(scrambleRaf.current);
    };
  }, [N, runScramble]);

  const onListClick = (idx: number) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.42 + el.offsetHeight / 2;
    window.scrollTo({ top, behavior: reducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="scroll-mt-24 border-t border-line py-section-sm sm:py-section"
    >
      <PageCol>
        <Reveal>{header}</Reveal>

        <div className="mt-12 sm:mt-14 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-8">
              <p
                className="stage-counter font-mono text-[12px] uppercase tracking-[0.1em] text-ink-muted"
                aria-live="polite"
              >
                <span className="stage-counter-win">
                  <span ref={counterRef} className="stage-counter-col">
                    {items.map((item, i) => (
                      <span key={getId(item)} className="text-signal">
                        {pad(i + 1)}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="mx-1.5 opacity-50">/</span>
                <span>{pad(N)}</span>
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
                    className={`stage-list-item w-full border-0 bg-transparent text-left ${
                      active === i ? "is-active" : ""
                    }`}
                  >
                    {renderList(item, i, active === i)}
                  </button>
                ))}
              </div>

              <div key={active} className="stage-copy border-t border-line pt-6">
                {renderCopy(items[active], active, { desc, scrambling })}
              </div>
            </div>
          </aside>

          <div className="flex flex-col gap-6 sm:gap-8">
            {items.map((item, i) => (
              <div
                key={getId(item)}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                className="stage-card will-change-transform"
              >
                {renderCard(item, i)}
              </div>
            ))}
          </div>
        </div>
      </PageCol>
    </section>
  );
}
