"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ChipGlyph,
  MarketGlyph,
  MedalGlyph,
} from "@/components/achievement-card";
import { CursorGlyph } from "@/components/cursor-glyph";
import { KaggleGlyph } from "@/components/kaggle-glyph";
import { MetaGlyph } from "@/components/meta-glyph";
import { ScrollStage } from "@/components/scroll-stage";
import { achievements } from "@/lib/content";
import type { KaggleStats } from "@/lib/types";

type Win = {
  id: string;
  label: string;
  result: string;
  title: string;
  body: string;
  date?: string;
  icon: ReactNode;
  thumb?: { src: string; alt: string; contain?: boolean };
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
        label: "Cursor Bali",
        result: achievements.cursorBali.result,
        title: achievements.cursorBali.title,
        body: achievements.cursorBali.body,
        date: achievements.cursorBali.date,
        icon: <CursorGlyph />,
      },
      {
        id: "geoai",
        label: "Geo AI · IIT Bombay",
        result: achievements.geoAi.result,
        title: achievements.geoAi.title,
        body: achievements.geoAi.body,
        date: achievements.geoAi.date,
        icon: <ChipGlyph />,
      },
      {
        id: "unicorn",
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

function KaggleStrip({ kaggle }: { kaggle: KaggleStats }) {
  return (
    <div className="mt-5 flex flex-wrap items-end gap-x-10 gap-y-4 border-t border-line pt-4">
      {[kaggle.datasets, kaggle.notebooks].map((cat) => (
        <p key={cat.name} className="font-mono text-ink">
          <span className="text-[1.35rem] leading-none">{formatCount(cat.rank)}</span>
          <span className="ml-1.5 text-[11px] text-ink-muted">/ {formatCount(cat.of)}</span>
          <span className="mt-1.5 block text-[10px] uppercase tracking-[0.12em] text-ink-muted">
            {cat.name} rank · {cat.tier}
          </span>
        </p>
      ))}
      <p className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
        {kaggle.live ? (
          <span className="inline-flex items-center gap-2">
            <span className="live-dot" />
            Live
          </span>
        ) : (
          <>As of {kaggle.asOf}</>
        )}
      </p>
    </div>
  );
}

function WinRow({ win, kaggle }: { win: Win; kaggle: KaggleStats }) {
  const inner = (
    <div className="ledger-row grid-cols-1 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_88px]">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 sm:block">
        <p className="font-display text-[1.9rem] leading-[1] tracking-[-0.01em] text-ink sm:text-[2.1rem]">
          {win.result}
        </p>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted sm:mt-4">
          <span className="text-signal [&>svg]:h-4 [&>svg]:w-4">{win.icon}</span>
          <span className="whitespace-nowrap">{win.label}</span>
          {win.date ? <span className="opacity-60">· {win.date}</span> : null}
        </p>
      </div>

      <div className="min-w-0">
        <h4 className="text-[17px] font-medium leading-snug text-ink">{win.title}</h4>
        <p className="mt-2 max-w-[58ch] text-[15px] leading-[1.65] text-ink-muted">
          {win.body}
        </p>
        {win.kind === "kaggle" ? <KaggleStrip kaggle={kaggle} /> : null}
      </div>

      {win.thumb ? (
        <div className="hidden overflow-hidden border border-line bg-surface lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={win.thumb.src}
            alt={win.thumb.alt}
            className={`aspect-[4/3] w-full ${
              win.thumb.contain ? "object-contain p-1.5" : "object-cover object-top"
            }`}
          />
        </div>
      ) : (
        <div className="hidden lg:block" aria-hidden="true" />
      )}
    </div>
  );

  if (win.kind === "kaggle") {
    return (
      <a
        href={achievements.kaggle.profileUrl}
        target="_blank"
        rel="noreferrer"
        className="block transition-colors hover:bg-surface/60"
      >
        {inner}
      </a>
    );
  }
  return inner;
}

function GroupPlate({
  group,
  index,
  kaggle,
}: {
  group: AchievementGroup;
  index: number;
  kaggle: KaggleStats;
}) {
  return (
    <article className="plate">
      <div className="flex items-baseline justify-between gap-4 px-5 py-3 sm:px-6">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
          {String(index + 1).padStart(2, "0")} · {group.title}
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
          {group.wins.length} results
        </span>
      </div>
      <div className="px-5 sm:px-6">
        {group.wins.map((win) => (
          <WinRow key={win.id} win={win} kaggle={kaggle} />
        ))}
      </div>
      <p className="px-5 py-4 text-[14px] leading-snug text-ink-muted sm:px-6 xl:hidden">
        {group.lede}
      </p>
    </article>
  );
}

export function Achievements() {
  const kaggle = useKaggle();

  return (
    <ScrollStage
      id="achievements"
      index="04"
      title="Achievements"
      lede="Competitions, certifications and milestones along the way."
      aside={`${String(achievementCount).padStart(2, "0")} achievements`}
      listLabel="Achievement groups"
      items={groups}
      getId={(group) => group.id}
      renderList={(group, i) => (
        <>
          <span className="stage-list-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="stage-list-label">{group.title}</span>
        </>
      )}
      renderCard={(group, i) => <GroupPlate group={group} index={i} kaggle={kaggle} />}
      renderCopy={(group, i) => (
        <>
          <p className="eyebrow">
            <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
            <span className="mx-2 opacity-40">/</span>
            {group.wins.length} results
          </p>
          <p className="mt-6 font-display text-[1.55rem] leading-[1.15] tracking-[-0.01em] text-ink">
            {group.title}
          </p>
          <p className="mt-5 text-[14.5px] leading-[1.7] text-ink-muted">{group.lede}</p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {group.wins.map((win) => (
              <li key={win.id} className="flex items-baseline justify-between gap-3 py-2.5">
                <span className="text-[14px] text-ink">{win.label}</span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-signal">
                  {win.result}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    />
  );
}
