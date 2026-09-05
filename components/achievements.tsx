"use client";

import { useState } from "react";
import { achievements } from "@/lib/content";
import { Card, CardList, Section } from "@/lib/ui";
import { CursorGlyph } from "./cursor-glyph";
import { KaggleAchievementItem } from "./kaggle-achievements";
import { Lightbox } from "./lightbox";
import { MetaGlyph } from "./meta-glyph";

type AchievementId = "cursor" | "geoai" | "algo" | "meta" | "solana";

type AchievementItem = {
  id: AchievementId;
  title: string;
  body: string;
  glyph?: "cursor" | "meta";
  certificate?: { src: string; alt: string; contain?: boolean };
};

const items: AchievementItem[] = [
  {
    id: "cursor",
    title: achievements.cursorBali.title,
    body: achievements.cursorBali.body,
    glyph: "cursor",
  },
  {
    id: "geoai",
    title: achievements.geoAi.title,
    body: achievements.geoAi.body,
  },
  {
    id: "algo",
    title: achievements.algoUtsav.title,
    body: achievements.algoUtsav.body,
    certificate: achievements.algoUtsav.certificate,
  },
  {
    id: "meta",
    title: achievements.metaHackerCup.title,
    body: achievements.metaHackerCup.body,
    glyph: "meta",
    certificate: achievements.metaHackerCup.certificate,
  },
];

const lastItem: AchievementItem = {
  id: "solana",
  title: achievements.schoolOfSolana.title,
  body: achievements.schoolOfSolana.body,
  certificate: achievements.schoolOfSolana.certificate,
};

const allItems = [...items, lastItem];

function AchievementCard({
  item,
  onOpen,
}: {
  item: AchievementItem;
  onOpen: (id: AchievementId) => void;
}) {
  const contain = item.certificate?.contain;

  return (
    <Card as="button" type="button" onClick={() => onOpen(item.id)}>
      <div
        className={`flex flex-col gap-6 ${
          item.certificate ? "lg:flex-row lg:items-start lg:gap-12" : ""
        }`}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2.5">
            {item.glyph === "cursor" ? (
              <span className="mt-1 shrink-0">
                <CursorGlyph />
              </span>
            ) : null}
            {item.glyph === "meta" ? (
              <span className="mt-1 shrink-0">
                <MetaGlyph />
              </span>
            ) : null}
            <h3 className="font-display text-card font-medium text-ink">
              {item.title}
            </h3>
          </div>
          <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.65] text-ink-muted sm:text-body">
            {item.body}
          </p>
        </div>
        {item.certificate ? (
          <div className="w-full overflow-hidden border border-line/80 lg:w-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.certificate.src}
              alt=""
              className={
                contain
                  ? "aspect-[16/10] w-full bg-paper object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] lg:w-[260px] xl:w-[328px]"
                  : "aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] lg:w-[260px] xl:w-[328px]"
              }
            />
          </div>
        ) : null}
      </div>
    </Card>
  );
}

export function Achievements() {
  const [open, setOpen] = useState<AchievementId | null>(null);
  const active = allItems.find((item) => item.id === open) ?? null;

  return (
    <Section id="achievements" title="Achievements">
      <CardList>
        {items.map((item) => (
          <li key={item.id}>
            <AchievementCard item={item} onOpen={setOpen} />
          </li>
        ))}
        <KaggleAchievementItem />
        <li>
          <AchievementCard item={lastItem} onOpen={setOpen} />
        </li>
      </CardList>

      <Lightbox
        open={active !== null}
        title={active?.title ?? "Achievement"}
        onClose={() => setOpen(null)}
      >
        {active?.certificate ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={active.certificate.src}
            alt={active.certificate.alt}
            className={
              active.certificate.contain ? "mx-auto w-full max-w-md" : "w-full"
            }
          />
        ) : null}
        <p className={`max-w-prose font-display text-card font-medium text-ink ${active?.certificate ? "mt-5" : ""}`}>
          {active?.title}
        </p>
        <p className="mt-3 max-w-prose text-ink-muted">{active?.body}</p>
      </Lightbox>
    </Section>
  );
}
