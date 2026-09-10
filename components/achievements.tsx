"use client";

import { useEffect, useState, type ReactNode } from "react";
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
import { ScrollStage } from "@/components/scroll-stage";
import { achievements } from "@/lib/content";
import type { KaggleStats } from "@/lib/types";

const tones: Record<
  AchievementTone,
  { mark: string; glow: string }
> = {
  cursor: { mark: "text-[#2B6CB0]", glow: "from-[#E4EEF8] to-[#F7F7F5]" },
  geo: { mark: "text-[#2F7D4A]", glow: "from-[#E6F3EA] to-[#F7F7F5]" },
  algo: { mark: "text-[#C45C2A]", glow: "from-[#F6EBE3] to-[#F7F7F5]" },
  meta: { mark: "text-[#6B4EA0]", glow: "from-[#EEE8F6] to-[#F7F7F5]" },
  kaggle: { mark: "text-ink", glow: "from-[#ECEBE8] to-[#F7F7F5]" },
  solana: { mark: "text-[#7B4FC4]", glow: "from-[#EDE8F6] to-[#F7F7F5]" },
  farm: { mark: "text-[#5B7A2F]", glow: "from-[#EEF3E4] to-[#F7F7F5]" },
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
  thumb?: { src: string; alt: string };
  kind?: "kaggle";
};

type AchievementGroup = {
  id: string;
  title: string;
  lede: string;
  wins: Win[];
};

function SolanaGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 8.5h11.5L19 11H7.5L5 8.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 12.5h11.5L19 15H7.5L5 12.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 16.5h11.5L19 19H7.5L5 16.5Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

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
        thumb: achievements.algoUtsav.certificate,
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
        thumb: achievements.metaHackerCup.certificate,
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
        icon: <SolanaGlyph />,
        thumb: achievements.schoolOfSolana.certificate,
      },
    ],
  },
];

const achievementCount = groups.reduce((n, g) => n + g.wins.length, 0);

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

function useKaggle() {
  const [kaggle, setKaggle] = useState<KaggleStats>(snapshotStats);
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
  return kaggle;
}

function WinTile({ win, kaggle }: { win: Win; kaggle: KaggleStats }) {
  const palette = tones[win.tone];
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className={`tint-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-paper/80 shadow-sm ${palette.mark} [&>svg]:h-5 [&>svg]:w-5`}
        >
          {win.icon}
        </span>
        {win.date ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
            {win.date}
          </span>
        ) : null}
      </div>

      <div className="mt-8">
        <p className={`font-mono text-[11px] uppercase tracking-[0.12em] ${palette.mark}`}>
          {win.result}
        </p>
        <h3 className="mt-1.5 font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.03em] text-ink">
          {win.title}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-muted">{win.body}</p>
      </div>

      {win.kind === "kaggle" ? (
        <div className="mt-5 flex gap-6 border-t border-ink/10 pt-4">
          <p className="font-mono text-[15px] text-ink">
            {formatCount(kaggle.datasets.rank)}
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.1em] text-ink-muted">
              Datasets rank
            </span>
          </p>
          <p className="font-mono text-[15px] text-ink">
            {formatCount(kaggle.notebooks.rank)}
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.1em] text-ink-muted">
              Notebooks rank
            </span>
          </p>
        </div>
      ) : null}

      {win.thumb ? (
        <div className="mt-5 w-[112px] overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={win.thumb.src}
            alt={win.thumb.alt}
            className="aspect-[4/3] w-full object-cover object-top"
          />
        </div>
      ) : null}
    </>
  );

  const className = `tint-card flex h-full flex-col rounded-[1.4rem] p-5 sm:p-6 ${palette.glow}`;

  if (win.kind === "kaggle") {
    return (
      <a
        href={achievements.kaggle.profileUrl}
        target="_blank"
        rel="noreferrer"
        className={`${className} group`}
      >
        {inner}
      </a>
    );
  }
  return <article className={className}>{inner}</article>;
}

function GroupCard({
  group,
  index,
  kaggle,
}: {
  group: AchievementGroup;
  index: number;
  kaggle: KaggleStats;
}) {
  return (
    <div className="rounded-[1.6rem] border border-line/70 bg-surface/50 p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3 px-1">
        <div>
          <p className="site-meta">
            {String(index + 1).padStart(2, "0")} · {group.wins.length}
          </p>
          <h3 className="mt-1.5 font-display text-[1.3rem] font-semibold tracking-[-0.03em] text-ink">
            {group.title}
          </h3>
        </div>
        <p className="max-w-[40ch] text-[14px] leading-snug text-ink-muted lg:hidden">
          {group.lede}
        </p>
      </div>
      <div
        className={`grid gap-3 sm:grid-cols-2 ${
          group.wins.length === 3 ? "xl:grid-cols-3" : ""
        }`}
      >
        {group.wins.map((win) => (
          <WinTile key={win.id} win={win} kaggle={kaggle} />
        ))}
      </div>
    </div>
  );
}

export function Achievements() {
  const kaggle = useKaggle();

  return (
    <ScrollStage
      id="achievements"
      listLabel="Achievement groups"
      items={groups}
      getId={(group) => group.id}
      getTeaser={(group) => group.lede}
      header={
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-paper">
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
      }
      renderList={(group, i) => (
        <span className="flex w-full flex-col items-start gap-0.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
            {String(i + 1).padStart(2, "0")} · {group.wins.length}
          </span>
          <span className="stage-list-label font-display tracking-[-0.02em]">
            {group.title}
          </span>
        </span>
      )}
      renderCard={(group, i) => (
        <GroupCard group={group} index={i} kaggle={kaggle} />
      )}
      renderCopy={(group, _i, { desc, scrambling }) => (
        <>
          <p className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.03em] text-ink">
            {group.title}
          </p>
          <p
            className={`mt-3 text-[14px] leading-[1.7] transition-colors duration-300 ${
              scrambling ? "text-signal" : "text-ink-muted"
            }`}
          >
            {desc}
          </p>
          <ul className="mt-4 space-y-2.5">
            {group.wins.map((win) => (
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
        </>
      )}
    />
  );
}
