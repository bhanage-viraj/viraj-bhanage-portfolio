import type { ReactNode } from "react";
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
import { MetaGlyph } from "@/components/meta-glyph";
import { achievements } from "@/lib/content";
import { CardList, Section } from "@/lib/ui";

type ListedAchievement = {
  id: string;
  tone: AchievementTone;
  category: string;
  date?: string;
  title: string;
  body: string;
  icon: ReactNode;
  certificate?: { src: string; alt: string };
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

const achievementCount = items.length + trailingItems.length + 1;

function CertificateThumb({ src }: { src: string }) {
  return (
    <div className="w-[148px] overflow-hidden rounded-[1.15rem] border border-line/70">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="aspect-[16/10] w-full object-cover object-top"
      />
    </div>
  );
}

export function Achievements() {
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
            />
          </li>
        ))}
      </CardList>
    </Section>
  );
}
