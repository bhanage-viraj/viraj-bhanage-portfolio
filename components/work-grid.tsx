"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MediaSlot } from "@/components/media-slot";
import { Reveal } from "@/components/reveal";
import { shippedProjects } from "@/lib/content";
import type { Project } from "@/lib/types";
import { PageCol } from "@/lib/ui";

const SCRAMBLE_CHARS = "0123456789!<>-_\\/[]{}—=+*^?#$%&";
const projects = shippedProjects;
const N = projects.length;
const SLIDE_VH = 1.15;

function cardMeta(project: Project) {
  if (!project.category) return project.caseId;
  const index = project.caseId.split("·")[0].trim();
  return `${index}  ${project.category}`;
}

export function WorkGrid() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const mediaItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const currentRef = useRef(-1);
  const trackY = useRef(0);
  const trackTargetY = useRef(0);
  const trackInit = useRef(false);
  const lerpRef = useRef(0.1);
  const snapping = useRef(false);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrambleRaf = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [desc, setDesc] = useState(projects[0]?.cardTeaser ?? "");
  const [scrambling, setScrambling] = useState(false);
  const [copyVisible, setCopyVisible] = useState(true);
  const [ready, setReady] = useState(false);

  const setWrap = useCallback((node: HTMLDivElement | null) => {
    wrapRef.current = node;
    if (node && trackRef.current) setReady(true);
  }, []);

  const setTrack = useCallback((node: HTMLDivElement | null) => {
    trackRef.current = node;
    if (node && wrapRef.current) setReady(true);
  }, []);

  const snapTarget = useCallback((idx: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return window.scrollY;
    const total = Math.max(wrap.offsetHeight - window.innerHeight, 1);
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    return top + total * ((idx + 0.5) / N);
  }, []);

  const runScramble = useCallback((text: string) => {
    if (scrambleRaf.current) cancelAnimationFrame(scrambleRaf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDesc(text);
      setScrambling(false);
      setCopyVisible(true);
      return;
    }
    setCopyVisible(false);
    setScrambling(true);
    window.setTimeout(() => {
      setDesc(text);
      setCopyVisible(true);
      const scrambleDur = 240;
      const revealDur = 200;
      const total = scrambleDur + revealDur;
      const start = performance.now();
      let lastFrame = 0;
      const frame = (now: number) => {
        const elapsed = now - start;
        if (elapsed - lastFrame >= 50 || elapsed >= total) {
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
        if (elapsed < total) scrambleRaf.current = requestAnimationFrame(frame);
        else {
          setDesc(text);
          setScrambling(false);
          scrambleRaf.current = null;
        }
      };
      scrambleRaf.current = requestAnimationFrame(frame);
    }, 120);
  }, []);

  const syncTrackToIndex = useCallback((idx: number, instant?: boolean) => {
    const activeMedia = mediaItemRefs.current[idx];
    if (!activeMedia) return;
    const height = activeMedia.offsetHeight;
    if (height <= 0) return;
    const center = activeMedia.offsetTop + height / 2;
    trackTargetY.current = -center;
    if (instant || !trackInit.current) {
      trackY.current = trackTargetY.current;
      trackInit.current = true;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(0, ${trackY.current}px, 0)`;
      }
    } else {
      lerpRef.current = 0.18;
      window.setTimeout(() => {
        lerpRef.current = 0.1;
      }, 480);
    }
  }, []);

  const setActiveIndex = useCallback(
    (idx: number, opts?: { scramble?: boolean; instant?: boolean }) => {
      if (idx === currentRef.current) {
        syncTrackToIndex(idx, opts?.instant);
        return;
      }
      const isFirst = currentRef.current === -1;
      currentRef.current = idx;
      setActive(idx);
      const text = projects[idx]?.cardTeaser ?? "";
      if (isFirst || opts?.scramble === false) {
        setDesc(text);
        setCopyVisible(true);
      } else runScramble(text);

      const sync = () => syncTrackToIndex(idx, opts?.instant || isFirst);
      sync();
      requestAnimationFrame(sync);
      const mediaEl = mediaItemRefs.current[idx]?.querySelector("img, video");
      if (mediaEl) {
        mediaEl.addEventListener("load", sync, { once: true });
        mediaEl.addEventListener("loadedmetadata", sync, { once: true });
      }
    },
    [runScramble, syncTrackToIndex],
  );

  useEffect(() => {
    if (!ready) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let raf = 0;
    const animate = () => {
      trackY.current +=
        (trackTargetY.current - trackY.current) * lerpRef.current;
      if (Math.abs(trackTargetY.current - trackY.current) < 0.04) {
        trackY.current = trackTargetY.current;
      }
      track.style.transform = `translate3d(0, ${trackY.current}px, 0)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const scheduleSnap = () => {
      if (snapping.current) return;
      if (snapTimer.current) clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => {
        const rect = wrap.getBoundingClientRect();
        const isPinned =
          rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
        if (!isPinned) return;
        const idx = currentRef.current < 0 ? 0 : currentRef.current;
        const targetY = snapTarget(idx);
        if (Math.abs(window.scrollY - targetY) < 4) return;
        snapping.current = true;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        setTimeout(() => {
          snapping.current = false;
        }, 720);
      }, 100);
    };

    const onScroll = () => {
      if (window.matchMedia("(max-width: 767px)").matches) return;
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setActiveIndex(0, { scramble: false });
        return;
      }
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / total),
      );
      setActiveIndex(Math.min(N - 1, Math.floor(progress * N)));
      scheduleSnap();
    };

    requestAnimationFrame(() => {
      trackInit.current = false;
      currentRef.current = -1;
      setActiveIndex(0, { scramble: false, instant: true });
      onScroll();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      if (snapTimer.current) clearTimeout(snapTimer.current);
      if (scrambleRaf.current) cancelAnimationFrame(scrambleRaf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ready, setActiveIndex, snapTarget]);

  const onListClick = (idx: number) => {
    setActiveIndex(idx);
    if (window.matchMedia("(max-width: 767px)").matches) return;
    snapping.current = true;
    window.scrollTo({ top: snapTarget(idx), behavior: "smooth" });
    setTimeout(() => {
      snapping.current = false;
    }, 720);
  };

  const lastClone = projects[projects.length - 1];
  const activeProject = projects[active];

  return (
    <section id="work" className="scroll-mt-24 border-t border-line">
      <PageCol className="pt-section-sm sm:pt-section">
        <Reveal>
          <h2 className="font-display text-section font-semibold tracking-[-0.038em] text-ink">
            Work
          </h2>
          <p className="mt-3 max-w-[42ch] text-[17px] leading-snug text-ink-muted">
            On-device inference, a published Swift package, Swift 6 concurrency,
            AR/networking, and TestFlight apps.
          </p>
        </Reveal>
      </PageCol>

      <div
        ref={setWrap}
        className="relative mt-8 hidden md:block"
        style={{ height: `${N * SLIDE_VH * 100}vh` }}
      >
        <div className="sticky top-16 z-10 grid h-[calc(100dvh-4rem)] w-full grid-cols-[220px_minmax(0,1fr)_280px] items-center gap-8 bg-paper px-8 sm:top-[4.5rem] sm:h-[calc(100dvh-4.5rem)] lg:grid-cols-[240px_minmax(0,1fr)_300px] lg:gap-10 lg:px-12 xl:px-16">
          {/* List */}
          <div
            className="flex flex-col justify-center"
            role="listbox"
            aria-label="Projects"
          >
            {projects.map((project, idx) => (
              <button
                key={project.slug}
                type="button"
                role="option"
                aria-selected={active === idx}
                onClick={() => onListClick(idx)}
                className={`flex w-full items-baseline justify-between gap-3 border-0 bg-transparent py-3 text-left transition-colors duration-400 ${
                  active === idx
                    ? "text-signal"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <span
                  className={`font-display tracking-[-0.02em] transition-all duration-500 ${
                    active === idx
                      ? "text-[1.15rem] font-semibold"
                      : "text-[1.05rem] font-medium"
                  }`}
                >
                  {project.title}
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
                  {project.caseId.split("·")[0].trim()}
                </span>
              </button>
            ))}
          </div>

          {/* Media — own column only, original ratios */}
          <div className="work-pin-media relative h-full min-h-0 w-full overflow-hidden">
            <div
              ref={setTrack}
              className="absolute left-0 top-1/2 w-full will-change-transform"
            >
              <div className="pointer-events-none relative mb-10 px-2 opacity-25">
                <div className="site-media-frame mx-auto w-fit max-w-full overflow-hidden shadow-[0_28px_70px_-34px_rgba(17,17,17,0.45)]">
                  <MediaSlot
                    media={lastClone.media}
                    title={lastClone.title}
                    variant="pin"
                  />
                </div>
              </div>

              {projects.map((project, idx) => {
                const dist = Math.abs(active - idx);
                return (
                  <div
                    key={project.slug}
                    ref={(node) => {
                      mediaItemRefs.current[idx] = node;
                    }}
                    className="group relative mb-10 px-2 transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      opacity: dist === 0 ? 1 : dist === 1 ? 0.22 : 0.08,
                      transform:
                        dist === 0
                          ? "scale(1)"
                          : dist === 1
                            ? "scale(0.95)"
                            : "scale(0.9)",
                      filter: dist === 0 ? "none" : "saturate(0.8)",
                    }}
                  >
                    <div className="site-media-frame relative mx-auto w-fit max-w-full overflow-hidden shadow-[0_32px_80px_-36px_rgba(17,17,17,0.5)]">
                      <MediaSlot
                        media={project.media}
                        title={project.title}
                        variant="pin"
                      />
                      <Link
                        href={`/work/${project.slug}`}
                        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 bg-signal px-5 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Copy — own column, never over media */}
          <div
            className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              copyVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
          >
            <p className="site-meta">{cardMeta(activeProject)}</p>
            <p className="mt-4 font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] text-ink">
              {activeProject?.cardSubheading}
            </p>
            <p
              className={`mt-4 text-[14px] leading-[1.7] ${
                scrambling ? "text-signal" : "text-ink-muted"
              }`}
            >
              {desc}
            </p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {activeProject?.tech.slice(0, 4).map((item) => (
                <li key={item} className="site-tag">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/work/${activeProject?.slug}`}
              className="mt-8 inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-ink/25 underline-offset-[5px] transition-colors hover:decoration-ink"
            >
              View work
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-5 px-6 pb-section-sm md:hidden sm:space-y-6 sm:px-10">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 70}>
            <Link
              href={`/work/${project.slug}`}
              className="project-card group block w-full text-left"
            >
              <p className="site-meta">{cardMeta(project)}</p>
              <h3 className="mt-3 font-display text-[1.35rem] font-semibold text-ink">
                {project.title}
              </h3>
              <p className="mt-1 text-[16px] text-ink-muted">
                {project.cardSubheading}
              </p>
              <div className="site-media-frame mt-4">
                <MediaSlot
                  media={project.media}
                  title={project.title}
                  variant="card"
                />
              </div>
              <p className="mt-4 text-[15px] leading-[1.55] text-ink-muted">
                {project.cardTeaser}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
