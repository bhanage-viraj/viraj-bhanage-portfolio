"use client";

import { useEffect, useState } from "react";
import { AchievementCard } from "@/components/achievement-card";
import { achievements } from "@/lib/content";
import type { KaggleStats } from "@/lib/types";
import { KaggleGlyph } from "./kaggle-glyph";

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

export function KaggleAchievementItem() {
  const [stats, setStats] = useState<KaggleStats | null>(null);

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
    <AchievementCard
        tone="kaggle"
        category="Platform"
        title={achievements.kaggle.title}
        body={achievements.kaggle.body}
        icon={<KaggleGlyph />}
        aside={
          <div className="rounded-[1.15rem] border border-line/70 bg-paper px-3 py-2.5">
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
      />
  );
}
