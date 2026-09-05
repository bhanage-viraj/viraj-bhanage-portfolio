import type { ReactNode } from "react";
import { Card } from "@/lib/ui";

export type AchievementTone =
  | "cursor"
  | "geo"
  | "algo"
  | "meta"
  | "kaggle"
  | "solana";

const tones: Record<
  AchievementTone,
  { well: string; mark: string; pill: string }
> = {
  cursor: {
    well: "bg-[#E4EEF8]",
    mark: "text-[#2B6CB0]",
    pill: "bg-[#E4EEF8] text-[#2B6CB0]",
  },
  geo: {
    well: "bg-[#E6F3EA]",
    mark: "text-[#2F7D4A]",
    pill: "bg-[#E6F3EA] text-[#2F7D4A]",
  },
  algo: {
    well: "bg-[#F6EBE3]",
    mark: "text-[#C45C2A]",
    pill: "bg-[#F6EBE3] text-[#C45C2A]",
  },
  meta: {
    well: "bg-[#EEE8F6]",
    mark: "text-[#6B4EA0]",
    pill: "bg-[#EEE8F6] text-[#6B4EA0]",
  },
  kaggle: {
    well: "bg-[#ECEBE8]",
    mark: "text-ink",
    pill: "bg-[#ECEBE8] text-ink-muted",
  },
  solana: {
    well: "bg-[#EDE8F6]",
    mark: "text-[#7B4FC4]",
    pill: "bg-[#EDE8F6] text-[#7B4FC4]",
  },
};

export function AchievementCard({
  tone,
  category,
  date,
  title,
  body,
  icon,
  aside,
  onClick,
}: {
  tone: AchievementTone;
  category: string;
  date?: string;
  title: string;
  body: string;
  icon: ReactNode;
  aside?: ReactNode;
  onClick: () => void;
}) {
  const palette = tones[tone];

  return (
    <Card as="button" type="button" onClick={onClick}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-5">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden ${palette.well} ${palette.mark} [&>svg]:mt-0 [&>svg]:text-current`}
        >
          {icon}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <span
              className={`inline-block px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${palette.pill}`}
            >
              {category}
            </span>
            {date ? (
              <span className="font-mono text-data text-ink-muted">{date}</span>
            ) : null}
          </div>
          <h3 className="mt-2.5 font-display text-card font-medium text-ink">
            {title}
          </h3>
          <p className="mt-2 max-w-[46ch] text-[15px] leading-[1.65] text-ink-muted">
            {body}
          </p>
        </div>

        {aside ? <div className="shrink-0 sm:self-center">{aside}</div> : null}
      </div>
    </Card>
  );
}

export function ChipGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" stroke="currentColor" strokeWidth="1.6" />
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"
      />
    </svg>
  );
}

export function MedalGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="14" r="5.2" stroke="currentColor" strokeWidth="1.6" />
      <path stroke="currentColor" strokeWidth="1.6" d="M9 4.5 12 9l3-4.5" />
    </svg>
  );
}

export function TrophyGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="1.7"
        d="M8 4h8v5.5a4 4 0 0 1-8 0V4Z"
      />
      <path stroke="currentColor" strokeWidth="1.7" d="M8 6.5H5.5A2.5 2.5 0 0 0 8 9M16 6.5h2.5A2.5 2.5 0 0 1 16 9" />
      <path stroke="currentColor" strokeWidth="1.7" d="M12 13.5V17M9 20h6M10 17h4" />
    </svg>
  );
}
