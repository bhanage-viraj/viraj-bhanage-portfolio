"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ChipGlyph,
  MarketGlyph,
  MedalGlyph,
  TrophyGlyph,
  type AchievementTone,
} from "@/components/achievement-card";
import { CursorGlyph } from "@/components/cursor-glyph";
import { KaggleGlyph } from "@/components/kaggle-glyph";
import { MetaGlyph } from "@/components/meta-glyph";
import { Reveal } from "@/components/reveal";
import { achievements } from "@/lib/content";
import type { KaggleStats } from "@/lib/types";
import { PageCol } from "@/lib/ui";

const SCRAMBLE_CHARS = "0123456789!<>-_\\/[]{}—=+*^?#$%&";
const SLIDE_VH = 1.3;

const tones: Record<
  AchievementTone,
  { well: string; mark: string; pill: string; glow: string }
> = {
  cursor: {
    well: "bg-[#E4EEF8]",
    mark: "text-[#2B6CB0]",
    pill: "bg-[#E4EEF8] text-[#2B6CB0]",
    glow: "from-[#E4EEF8] to-[#F7F7F5]",
  },
  geo: {
    well: "bg-[#E6F3EA]",
    mark: "text-[#2F7D4A]",
    pill: "bg-[#E6F3EA] text-[#2F7D4A]",
    glow: "from-[#E6F3EA] to-[#F7F7F5]",
  },
  algo: {
    well: "bg-[#F6EBE3]",
    mark: "text-[#C45C2A]",
    pill: "bg-[#F6EBE3] text-[#C45C2A]",
    glow: "from-[#F6EBE3] to-[#F7F7F5]",
  },
  meta: {
    well: "bg-[#EEE8F6]",
    mark: "text-[#6B4EA0]",
    pill: "bg-[#EEE8F6] text-[#6B4EA0]",
    glow: "from-[#EEE8F6] to-[#F7F7F5]",
  },
  kaggle: {
    well: "bg-[#ECEBE8]",
    mark: "text-ink",
    pill: "bg-[#ECEBE8] text-ink-muted",
    glow: "from-[#ECEBE8] to-[#F7F7F5]",
  },
  solana: {
    well: "bg-[#EDE8F6]",
    mark: "text-[#7B4FC4]",
    pill: "bg-[#EDE8F6] text-[#7B4FC4]",
    glow: "from-[#EDE8F6] to-[#F7F7F5]",
  },
  farm: {
    well: "bg-[#EEF3E4]",
    mark: "text-[#5B7A2F]",
    pill: "bg-[#EEF3E4] text-[#5B7A2F]",
    glow: "from-[#EEF3E4] to-[#F7F7F5]",
  },
};

type Win = {
  id: string;
  tone: AchievementTone;
  label: string;
  result: string;
  title: string;
  body: string;
  date?: string;
  icon: ReactNode;
  thumb?: { src: string; alt: string; small?: boolean };
  kind?: "kaggle";
};

type AchievementGroup = {
  id: string;
  title: string;
  lede: string;
  wins: Win[];
};

const groups: AchievementGroup[] = [
  {
    id: "hackathons",
    title: "Hackathons",
    lede: "Timed builds — posture tracking, Geo AI, and a farmers’ marketplace.",
    wins: [
      {
        id: "cursor",
        tone: "cursor",
        label: "Cursor Bali",
        result: achievements.cursorBali.result,
        title: achievements.cursorBali.title,
        body: achievements.cursorBali.body,
        date: achievements.cursorBali.date,
        icon: <CursorGlyph />,
      },
      {
        id: "geoai",
        tone: "geo",
        label: "Geo AI · IIT Bombay",
        result: achievements.geoAi.result,
        title: achievements.geoAi.title,
        body: achievements.geoAi.body,
        date: achievements.geoAi.date,
        icon: <ChipGlyph />,
      },
      {
        id: "unicorn",
        tone: "farm",
        label: "Unicorn Bharat",
        result: achievements.unicornBharat.result,
        title: achievements.unicornBharat.title,
        body: achievements.unicornBharat.body,
        date: achievements.unicornBharat.date,
        icon: <MarketGlyph />,
      },
    ],
  },
  {
    id: "competitions",
    title: "Coding competitions",
    lede: "National and global contest rankings — algorithms under a clock.",
    wins: [
      {
        id: "algo",
        tone: "algo",
        label: "AlgoUtsav",
        result: achievements.algoUtsav.result,
        title: achievements.algoUtsav.title,
        body: achievements.algoUtsav.body,
        date: achievements.algoUtsav.date,
        icon: <MedalGlyph />,
        thumb: {
          src: achievements.algoUtsav.certificate.src,
          alt: achievements.algoUtsav.certificate.alt,
          small: true,
        },
      },
      {
        id: "meta",
        tone: "meta",
        label: "Meta Hacker Cup",
        result: achievements.metaHackerCup.result,
        title: achievements.metaHackerCup.title,
        body: achievements.metaHackerCup.body,
        date: achievements.metaHackerCup.date,
        icon: <MetaGlyph />,
        thumb: {
          src: achievements.metaHackerCup.certificate.src,
          alt: achievements.metaHackerCup.certificate.alt,
          small: true,
        },
      },
    ],
  },
  {
    id: "platform",
    title: "Platform & certs",
    lede: "Expert-tier Kaggle standing and on-chain Solana certification.",
    wins: [
      {
        id: "kaggle",
        tone: "kaggle",
        label: "Kaggle",
        result: achievements.kaggle.result,
        title: achievements.kaggle.title,
        body: achievements.kaggle.body,
        date: achievements.kaggle.date,
        icon: <KaggleGlyph />,
        kind: "kaggle",
      },
      {
        id: "solana",
        tone: "solana",
        label: "School of Solana",
        result: achievements.schoolOfSolana.result,
        title: achievements.schoolOfSolana.title,
        body: achievements.schoolOfSolana.body,
        icon: (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 8.5h11.5L19 11H7.5L5 8.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M5 12.5h11.5L19 15H7.5L5 12.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M5 16.5h11.5L19 19H7.5L5 16.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        ),
        thumb: {
          src: achievements.schoolOfSolana.certificate.src,
          alt: achievements.schoolOfSolana.certificate.alt,
          small: true,
        },
      },
    ],
  },
];

const N = groups.length;

function snapshotStats(): KaggleStats {
  return {
    live: false,
    label: "Dataset Expert & Notebook Expert",
    profileUrl: achievements.kaggle.profileUrl,
    datasets: achievements.kaggle.snapshot.datasets,
    notebooks: achievements.kaggle.snapshot.notebooks,
    asOf: achievements.kaggle.staticAsOf,
  };
}

function formatCount(value: number): string {
  return value.toLocaleString("en-US");
}

function WinTile({
  win,
  kaggle,
  featured,
}: {
  win: Win;
  kaggle: KaggleStats;
  featured?: boolean;
}) {
  const palette = tones[win.tone];

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-[1.25rem] border border-ink/8 bg-gradient-to-br p-5 transition-transform duration-500 ${palette.glow} ${
        featured ? "min-h-[220px] sm:p-6" : "min-h-[180px]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-paper/80 ${palette.mark} [&>svg]:h-5 [&>svg]:w-5`}
        >
          {win.icon}
        </span>
        {win.date ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
            {win.date}
          </span>
        ) : null}
      </div>

      <div className="mt-auto pt-6">
        <p className={`font-mono text-[11px] uppercase tracking-[0.12em] ${palette.mark}`}>
          {win.result}
        </p>
        <h3 className="mt-1.5 font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.03em] text-ink">
          {win.label}
        </h3>
        {win.kind === "kaggle" ? (
          <div className="mt-3 flex gap-4 border-t border-ink/10 pt-3">
            <p className="font-mono text-[13px] text-ink">
              {formatCount(kaggle.datasets.rank)}
              <span className="mt-0.5 block text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                Datasets
              </span>
            </p>
            <p className="font-mono text-[13px] text-ink">
              {formatCount(kaggle.notebooks.rank)}
              <span className="mt-0.5 block text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                Notebooks
              </span>
            </p>
          </div>
        ) : null}
      </div>

      {win.thumb ? (
        <div
          className={`absolute bottom-4 right-4 overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-sm ${
            win.thumb.small ? "w-[72px]" : "w-[110px]"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={win.thumb.src}
            alt=""
            className="aspect-[4/3] w-full object-cover object-top"
          />
        </div>
      ) : null}
    </article>
  );
}

function GroupStage({
  group,
  kaggle,
}: {
  group: AchievementGroup;
  kaggle: KaggleStats;
}) {
  const count = group.wins.length;

  return (
    <div className="mx-auto w-full max-w-[860px]">
      <div
        className={`grid gap-3 ${
          count === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {group.wins.map((win, i) => (
          <WinTile
            key={win.id}
            win={win}
            kaggle={kaggle}
            featured={count === 2 || i === 0}
          />
        ))}
      </div>
    </div>
  );
}

export function Achievements() {
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
  const [desc, setDesc] = useState(groups[0]?.lede ?? "");
  const [scrambling, setScrambling] = useState(false);
  const [copyVisible, setCopyVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [kaggle, setKaggle] = useState<KaggleStats>(snapshotStats);

  const setWrap = useCallback((node: HTMLDivElement | null) => {
    wrapRef.current = node;
    if (node && trackRef.current) setReady(true);
  }, []);

  const setTrack = useCallback((node: HTMLDivElement | null) => {
    trackRef.current = node;
    if (node && wrapRef.current) setReady(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/kaggle-stats", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: KaggleStats) => {
        if (!cancelled) setKaggle(data);
      })
      .catch(() => {
        if (!cancelled) setKaggle(snapshotStats());
      });
    return () => {
      cancelled = true;
    };
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
      const text = groups[idx]?.lede ?? "";
      if (isFirst || opts?.scramble === false) {
        setDesc(text);
        setCopyVisible(true);
      } else runScramble(text);

      const sync = () => syncTrackToIndex(idx, opts?.instant || isFirst);
      sync();
      requestAnimationFrame(sync);
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

  const activeGroup = groups[active];
  const lastClone = groups[groups.length - 1];
  const achievementCount = groups.reduce((n, g) => n + g.wins.length, 0);

  return (
    <section id="achievements" className="scroll-mt-24 border-t border-line">
      <PageCol className="pt-section-sm sm:pt-section md:hidden">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-paper">
                <TrophyGlyph />
              </span>
              <div>
                <h2 className="font-display text-section font-semibold tracking-[-0.038em] text-ink">
                  Achievements
                </h2>
                <p className="mt-3 max-w-[42ch] text-[17px] leading-snug text-ink-muted">
                  Competitions, certifications and milestones along the way.
                </p>
              </div>
            </div>
            <p className="shrink-0 font-mono text-data uppercase text-ink-muted">
              {achievementCount} achievements
            </p>
          </div>
        </Reveal>
      </PageCol>

      <div
        ref={setWrap}
        className="relative mt-0 hidden md:block"
        style={{ height: `${N * SLIDE_VH * 100}vh` }}
      >
        {groups.map((group, idx) => (
          <div
            key={`snap-${group.id}`}
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
              Achievements
            </h2>
            <p className="hidden max-w-[36ch] text-right text-[13px] leading-snug text-ink-muted sm:block">
              Competitions, certifications and milestones along the way.
            </p>
          </div>
          <div className="mx-auto grid min-h-0 w-full max-w-[1760px] flex-1 grid-cols-[220px_minmax(0,1fr)_280px] items-center gap-8 px-8 lg:grid-cols-[240px_minmax(0,1fr)_300px] lg:gap-10 lg:px-12 xl:px-16">
          <div
            className="flex flex-col justify-center"
            role="listbox"
            aria-label="Achievement groups"
          >
            {groups.map((group, idx) => (
              <button
                key={group.id}
                type="button"
                role="option"
                aria-selected={active === idx}
                onClick={() => onListClick(idx)}
                className={`flex w-full flex-col items-start gap-1 border-0 bg-transparent py-4 text-left transition-colors duration-400 ${
                  active === idx
                    ? "text-signal"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                  {String(idx + 1).padStart(2, "0")} · {group.wins.length}
                </span>
                <span
                  className={`font-display tracking-[-0.02em] transition-all duration-500 ${
                    active === idx
                      ? "text-[1.25rem] font-semibold"
                      : "text-[1.1rem] font-medium"
                  }`}
                >
                  {group.title}
                </span>
              </button>
            ))}
          </div>

          <div className="work-pin-media relative h-full min-h-0 w-full overflow-hidden">
            <div
              ref={setTrack}
              className="absolute left-0 top-1/2 w-full will-change-transform"
            >
              <div className="pointer-events-none relative mb-14 px-2 opacity-20" aria-hidden="true">
                <GroupStage group={lastClone} kaggle={kaggle} />
              </div>
              {groups.map((group, idx) => {
                const dist = Math.abs(active - idx);
                return (
                  <div
                    key={group.id}
                    ref={(node) => {
                      mediaItemRefs.current[idx] = node;
                    }}
                    aria-hidden={dist !== 0}
                    className="relative mb-14 px-2 transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
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
                    <GroupStage group={group} kaggle={kaggle} />
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
            <p className="site-meta">
              {String(active + 1).padStart(2, "0")} · {activeGroup.title}
            </p>
            <p className="mt-4 font-display text-[1.4rem] font-semibold leading-snug tracking-[-0.03em] text-ink">
              {activeGroup.title}
            </p>
            <p
              className={`mt-4 text-[14px] leading-[1.7] ${
                scrambling ? "text-signal" : "text-ink-muted"
              }`}
            >
              {desc}
            </p>
            <ul className="mt-6 space-y-3">
              {activeGroup.wins.map((win) => (
                <li key={win.id} className="flex items-baseline gap-3">
                  <span
                    className={`shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] ${tones[win.tone].mark}`}
                  >
                    {win.result}
                  </span>
                  <span className="text-[14px] text-ink">{win.label}</span>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-10 px-6 pb-section-sm md:hidden sm:px-10">
        {groups.map((group) => (
          <div key={group.id}>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              {group.title}
            </p>
            <p className="mb-4 text-[15px] text-ink-muted">{group.lede}</p>
            <ul className="space-y-3">
              {group.wins.map((win, index) => (
                <li key={win.id}>
                  <Reveal delay={index * 50}>
                    <div
                      className={`rounded-[1.15rem] border border-line/70 p-4 ${tones[win.tone].well}`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper/80 ${tones[win.tone].mark}`}
                        >
                          {win.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                            {win.result}
                            {win.date ? ` · ${win.date}` : ""}
                          </p>
                          <h3 className="mt-1 font-display text-[1.05rem] font-semibold text-ink">
                            {win.title}
                          </h3>
                          <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-muted">
                            {win.body}
                          </p>
                        </div>
                        {win.thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={win.thumb.src}
                            alt=""
                            className="h-14 w-16 shrink-0 rounded-md object-cover object-top"
                          />
                        ) : null}
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
