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
const SLIDE_VH = 1.2;

const projectTone: Record<
  string,
  { glow: string; mark: string; pill: string }
> = {
  coralyst: {
    glow: "from-[#DCECF5] to-[#F7F7F5]",
    mark: "text-[#2B6CB0]",
    pill: "bg-[#E4EEF8] text-[#2B6CB0]",
  },
  revenants: {
    glow: "from-[#E8E2F2] to-[#F7F7F5]",
    mark: "text-[#5B4578]",
    pill: "bg-[#EEE8F6] text-[#5B4578]",
  },
  "whos-out": {
    glow: "from-[#E2EEF8] to-[#F7F7F5]",
    mark: "text-[#3A6EA5]",
    pill: "bg-[#E4EEF8] text-[#3A6EA5]",
  },
  "rush-hour": {
    glow: "from-[#F3E8DE] to-[#F7F7F5]",
    mark: "text-[#B5673A]",
    pill: "bg-[#F6EBE3] text-[#B5673A]",
  },
  sema: {
    glow: "from-[#E5F0E8] to-[#F7F7F5]",
    mark: "text-[#3F7A55]",
    pill: "bg-[#E6F3EA] text-[#3F7A55]",
  },
};

const fallbackTone = {
  glow: "from-[#ECEBE8] to-[#F7F7F5]",
  mark: "text-ink",
  pill: "bg-[#ECEBE8] text-ink-muted",
};

function cardMeta(project: Project) {
  if (!project.category) return project.caseId;
  const index = project.caseId.split("·")[0].trim();
  return `${index}  ${project.category}`;
}

function ProjectCard({ project }: { project: Project }) {
  const tone = projectTone[project.slug] ?? fallbackTone;
  const index = project.caseId.split("·")[0].trim();

  return (
    <article className="group relative mx-auto w-full max-w-[820px] overflow-hidden rounded-[1.35rem] border border-ink/8 bg-gradient-to-br shadow-[0_28px_70px_-40px_rgba(17,17,17,0.4)] transition-transform duration-500">
      <div className={`bg-gradient-to-br p-4 sm:p-5 ${tone.glow}`}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {project.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.logo.src}
                alt=""
                className="h-10 w-10 shrink-0 rounded-2xl bg-paper/80 object-contain p-1.5"
              />
            ) : (
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-paper/80 font-mono text-[11px] ${tone.mark}`}
              >
                {index}
              </span>
            )}
            <div className="min-w-0">
              <p className={`font-mono text-[10px] uppercase tracking-[0.12em] ${tone.mark}`}>
                {project.category ?? "Project"}
              </p>
              <h3 className="truncate font-display text-[1.2rem] font-semibold tracking-[-0.03em] text-ink">
                {project.title}
              </h3>
            </div>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ${tone.pill}`}>
            {index}
          </span>
        </div>

        <div className="overflow-hidden rounded-[1rem] border border-ink/8 bg-paper/40">
          <MediaSlot media={project.media} title={project.title} variant="pin" />
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <p className="max-w-[42ch] text-[14px] leading-snug text-ink-muted">
            {project.cardSubheading}
          </p>
          <Link
            href={`/work/${project.slug}`}
            className="shrink-0 bg-signal px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

export function WorkGrid() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const mediaItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const currentRef = useRef(-1);
  const trackY = useRef(0);
  const trackTargetY = useRef(0);
  const trackInit = useRef(false);
  const lerpRef = useRef(0.065);
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
      lerpRef.current = 0.11;
      window.setTimeout(() => {
        lerpRef.current = 0.065;
      }, 640);
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

    const settleSnap = () => {
      if (snapping.current) return;
      if (snapTimer.current) clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return;
        }
        const rect = wrap.getBoundingClientRect();
        const pinned =
          rect.top <= 2 && rect.bottom >= window.innerHeight - 2;
        if (!pinned) return;
        const idx = currentRef.current < 0 ? 0 : currentRef.current;
        const targetY = snapTarget(idx);
        if (Math.abs(window.scrollY - targetY) < 12) return;
        snapping.current = true;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        window.setTimeout(() => {
          snapping.current = false;
        }, 700);
      }, 140);
    };

    const onScroll = () => {
      if (window.matchMedia("(max-width: 767px)").matches) return;
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setActiveIndex(0, { scramble: false });
        return;
      }
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      setActiveIndex(Math.min(N - 1, Math.floor(progress * N)));
      settleSnap();
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
    }, 1100);
  };

  const lastClone = projects[projects.length - 1];
  const activeProject = projects[active];
  const activeTone = projectTone[activeProject?.slug ?? ""] ?? fallbackTone;

  return (
    <section id="work" className="scroll-mt-24 border-t border-line">
      <PageCol className="pt-section-sm sm:pt-section md:hidden">
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
        className="relative mt-0 hidden md:block"
        style={{ height: `${N * SLIDE_VH * 100}vh` }}
      >
        {projects.map((project, idx) => (
          <div
            key={`snap-${project.slug}`}
            data-scroll-stop
            className="pin-snap absolute left-0 w-full"
            style={{
              top: `${(idx / N) * 100}%`,
              height: `${(1 / N) * 100}%`,
            }}
            aria-hidden="true"
          />
        ))}
        <div className="sticky top-16 z-10 flex h-[calc(100dvh-4rem)] w-full flex-col bg-paper sm:top-[4.5rem] sm:h-[calc(100dvh-4.5rem)]">
          <div className="mx-auto flex w-full max-w-[1760px] shrink-0 items-end justify-between gap-4 px-8 pt-5 lg:px-12 xl:px-16">
            <h2 className="font-display text-[1.65rem] font-semibold tracking-[-0.038em] text-ink sm:text-[1.85rem]">
              Work
            </h2>
            <p className="hidden max-w-[36ch] text-right text-[13px] leading-snug text-ink-muted sm:block">
              On-device inference, Swift packages, AR/networking, TestFlight apps.
            </p>
          </div>
          <div className="mx-auto grid min-h-0 w-full max-w-[1760px] flex-1 grid-cols-[220px_minmax(0,1fr)_280px] items-center gap-8 px-8 lg:grid-cols-[240px_minmax(0,1fr)_300px] lg:gap-10 lg:px-12 xl:px-16">
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

          <div className="work-pin-media relative h-full min-h-0 w-full overflow-hidden">
            <div
              ref={setTrack}
              className="absolute left-0 top-1/2 w-full will-change-transform"
            >
              <div className="pointer-events-none relative mb-10 px-2 opacity-25" aria-hidden="true">
                <ProjectCard project={lastClone} />
              </div>

              {projects.map((project, idx) => {
                const dist = Math.abs(active - idx);
                return (
                  <div
                    key={project.slug}
                    ref={(node) => {
                      mediaItemRefs.current[idx] = node;
                    }}
                    aria-hidden={dist !== 0}
                    className="relative mb-10 px-2 transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      opacity: dist === 0 ? 1 : dist === 1 ? 0.18 : 0.05,
                      transform:
                        dist === 0
                          ? "scale(1) translateY(0)"
                          : dist === 1
                            ? "scale(0.96) translateY(8px)"
                            : "scale(0.92) translateY(16px)",
                      filter: dist === 0 ? "none" : "saturate(0.75)",
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              copyVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
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
                <li key={item} className={`site-tag ${activeTone.pill}`}>
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
      </div>

      <div className="mt-12 space-y-5 px-6 pb-section-sm md:hidden sm:space-y-6 sm:px-10">
        {projects.map((project, index) => {
          const tone = projectTone[project.slug] ?? fallbackTone;
          return (
            <Reveal key={project.slug} delay={index * 70}>
              <Link
                href={`/work/${project.slug}`}
                className={`group block w-full overflow-hidden rounded-[1.25rem] border border-ink/8 bg-gradient-to-br text-left ${tone.glow}`}
              >
                <div className="p-4">
                  <p className="site-meta">{cardMeta(project)}</p>
                  <h3 className="mt-2 font-display text-[1.25rem] font-semibold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[15px] text-ink-muted">
                    {project.cardSubheading}
                  </p>
                  <div className="mt-4 overflow-hidden rounded-[1rem] border border-ink/8 bg-paper/50">
                    <MediaSlot
                      media={project.media}
                      title={project.title}
                      variant="card"
                    />
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.55] text-ink-muted">
                    {project.cardTeaser}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
