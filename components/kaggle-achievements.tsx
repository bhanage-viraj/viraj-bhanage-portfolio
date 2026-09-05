"use client";

import { useEffect, useState } from "react";
import { AchievementCard } from "@/components/achievement-card";
import { achievements } from "@/lib/content";
import type { KaggleCategory, KaggleStats } from "@/lib/types";
import { KaggleGlyph } from "./kaggle-glyph";
import { Lightbox } from "./lightbox";

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

function ExpertBadge() {
  return (
    <span className="inline-flex items-center gap-1.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logos/kaggle-expert.png"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 shrink-0"
      />
      <span className="font-mono text-data text-signal">Expert</span>
    </span>
  );
}

function MedalLine({ category }: { category: KaggleCategory }) {
  const parts: string[] = [];
  if (category.gold) parts.push(`${category.gold} gold`);
  if (category.silver) parts.push(`${category.silver} silver`);
  if (category.bronze) parts.push(`${category.bronze} bronze`);
  if (parts.length === 0) parts.push("no medals");
  return <span>{parts.join(" · ")}</span>;
}

function CategoryCard({ category }: { category: KaggleCategory }) {
  return (
    <article className="flex flex-col border border-line p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-[18px] font-semibold text-ink">{category.name}</h3>
        {category.tier === "Expert" ? (
          <ExpertBadge />
        ) : (
          <span className="font-mono text-data text-signal">{category.tier}</span>
        )}
      </div>
      <p className="mt-4 font-mono text-data text-ink-muted">Medals</p>
      <p className="mt-1 text-[16px] text-ink">
        <MedalLine category={category} />
      </p>
      <p className="mt-4 font-mono text-data text-ink-muted">Rank</p>
      <p className="mt-1 font-mono text-[22px] leading-none text-ink">
        {formatCount(category.rank)}
        <span className="ml-1 text-data text-ink-muted">of {formatCount(category.of)}</span>
      </p>
      <p className="mt-2 font-mono text-data text-ink-muted">
        {formatCount(category.highest)} highest ever
      </p>
    </article>
  );
}

export function KaggleAchievementItem() {
  const [stats, setStats] = useState<KaggleStats | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/kaggle-stats", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: KaggleStats) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setStats(snapshotStats());
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const data = stats ?? snapshotStats();

  return (
    <li>
      <AchievementCard
        tone="kaggle"
        category="Platform"
        title={achievements.kaggle.title}
        body={achievements.kaggle.body}
        icon={<KaggleGlyph />}
        aside={
          <div className="border border-line px-3 py-2.5">
            <div className="flex items-center gap-2">
              {data.live ? (
                <span
                  className="inline-block h-2 w-2 rounded-full bg-coral"
                  aria-hidden="true"
                />
              ) : null}
              <ExpertBadge />
            </div>
            <div className="mt-2 flex gap-3 border-t border-line pt-2">
              <p className="font-mono text-[13px] leading-tight tracking-normal text-ink">
                {formatCount(data.datasets.rank)}
                <span className="mt-0.5 block text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                  Datasets
                </span>
              </p>
              <span className="self-stretch border-l border-line" aria-hidden="true" />
              <p className="font-mono text-[13px] leading-tight tracking-normal text-ink">
                {formatCount(data.notebooks.rank)}
                <span className="mt-0.5 block text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                  Notebooks
                </span>
              </p>
            </div>
          </div>
        }
        onClick={() => setOpen(true)}
      />

      <Lightbox open={open} title={achievements.kaggle.title} onClose={() => setOpen(false)}>
        <p className="max-w-prose text-body text-ink">{achievements.kaggle.title}</p>
        <p className="mt-2 max-w-prose text-ink-muted">{achievements.kaggle.body}</p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CategoryCard category={data.datasets} />
          <CategoryCard category={data.notebooks} />
        </div>
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block text-[15px] text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
        >
          kaggle.com/{achievements.kaggle.username}
        </a>
      </Lightbox>
    </li>
  );
}
