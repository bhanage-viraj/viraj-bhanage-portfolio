"use client";

import { useState, type ReactNode } from "react";
import {
  AchievementCard,
  ChipGlyph,
  MarketGlyph,
  MedalGlyph,
  TrophyGlyph,
  type AchievementTone,
} from "@/components/achievement-card";
import { CursorGlyph } from "@/components/cursor-glyph";
import { KaggleAchievementItem } from "@/components/kaggle-achievements";
import { Lightbox } from "@/components/lightbox";
import { MetaGlyph } from "@/components/meta-glyph";
import { achievements } from "@/lib/content";
import { CardList, Section } from "@/lib/ui";

type AchievementId = "cursor" | "geoai" | "algo" | "meta" | "solana" | "unicorn";

type ListedAchievement = {
  id: AchievementId;
  tone: AchievementTone;
  category: string;
  date?: string;
  title: string;
  body: string;
  icon: ReactNode;
  certificate?: { src: string; alt: string; contain?: boolean };
};

const items: ListedAchievement[] = [
  {
    id: "cursor",
    tone: "cursor",
    category: "Hackathon",
    title: achievements.cursorBali.title,
    body: achievements.cursorBali.body,
    icon: <CursorGlyph />,
  },
  {
    id: "geoai",
    tone: "geo",
    category: "Hackathon",
    title: achievements.geoAi.title,
    body: achievements.geoAi.body,
    icon: <ChipGlyph />,
  },
  {
    id: "algo",
    tone: "algo",
    category: "Competition",
    date: "2025",
    title: achievements.algoUtsav.title,
    body: achievements.algoUtsav.body,
    icon: <MedalGlyph />,
    certificate: achievements.algoUtsav.certificate,
  },
  {
    id: "meta",
    tone: "meta",
    category: "Competition",
    date: "2025",
    title: achievements.metaHackerCup.title,
    body: achievements.metaHackerCup.body,
    icon: <MetaGlyph />,
    certificate: achievements.metaHackerCup.certificate,
  },
];

const trailingItems: ListedAchievement[] = [
  {
    id: "solana",
    tone: "solana",
    category: "Certification",
    title: achievements.schoolOfSolana.title,
    body: achievements.schoolOfSolana.body,
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={achievements.schoolOfSolana.certificate.src}
        alt=""
        className="h-full w-full object-cover"
      />
    ),
    certificate: achievements.schoolOfSolana.certificate,
  },
  {
    id: "unicorn",
    tone: "farm",
    category: "Hackathon",
    date: "2024",
    title: achievements.unicornBharat.title,
    body: achievements.unicornBharat.body,
    icon: <MarketGlyph />,
  },
];

const allItems = [...items, ...trailingItems];
const achievementCount = allItems.length + 1;

function CertificateThumb({ src }: { src: string }) {
  return (
    <div className="w-[148px] overflow-hidden border border-line/80">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}

export function Achievements() {
  const [open, setOpen] = useState<AchievementId | null>(null);
  const active = allItems.find((item) => item.id === open) ?? null;

  return (
    <Section
      id="achievements"
      title="Achievements"
      lede="Competitions, certifications and milestones along the way."
      icon={
        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-paper">
          <TrophyGlyph />
        </span>
      }
      aside={
        <p className="shrink-0 font-mono text-data uppercase text-ink-muted">
          {achievementCount} achievements
        </p>
      }
    >
      <CardList>
        {items.map((item) => (
          <li key={item.id}>
            <AchievementCard
              tone={item.tone}
              category={item.category}
              date={item.date}
              title={item.title}
              body={item.body}
              icon={item.icon}
              aside={
                item.certificate ? (
                  <CertificateThumb src={item.certificate.src} />
                ) : undefined
              }
              onClick={() => setOpen(item.id)}
            />
          </li>
        ))}
        <KaggleAchievementItem />
        {trailingItems.map((item) => (
          <li key={item.id}>
            <AchievementCard
              tone={item.tone}
              category={item.category}
              date={item.date}
              title={item.title}
              body={item.body}
              icon={item.icon}
              onClick={() => setOpen(item.id)}
            />
          </li>
        ))}
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
        <p
          className={`max-w-prose font-display text-card font-medium text-ink ${
            active?.certificate ? "mt-5" : ""
          }`}
        >
          {active?.title}
        </p>
        <p className="mt-3 max-w-prose text-ink-muted">{active?.body}</p>
      </Lightbox>
    </Section>
  );
}
