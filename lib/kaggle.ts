import { achievements } from "./content";
import type { KaggleCategory, KaggleStats } from "./types";

const PROFILE_URL = achievements.kaggle.profileUrl;

export function fallbackKaggleStats(): KaggleStats {
  return {
    live: false,
    label: "Dataset Expert & Notebook Expert",
    profileUrl: PROFILE_URL,
    datasets: achievements.kaggle.snapshot.datasets,
    notebooks: achievements.kaggle.snapshot.notebooks,
    asOf: achievements.kaggle.staticAsOf,
  };
}

export function parseKaggleProfile(html: string): KaggleStats | null {
  if (!html.includes("Kaggle Achievements")) return null;

  const datasets = parseCategory(html, "Datasets");
  const notebooks = parseCategory(html, "Notebooks");
  if (!datasets || !notebooks) return null;

  return {
    live: true,
    label: `${datasets.name} ${datasets.tier} & ${notebooks.name} ${notebooks.tier}`,
    profileUrl: PROFILE_URL,
    datasets,
    notebooks,
    fetchedAt: new Date().toISOString(),
  };
}

function parseCategory(html: string, name: "Datasets" | "Notebooks"): KaggleCategory | null {
  const marker = `View ${name} rankings history`;
  const start = html.indexOf(marker);
  if (start === -1) return null;
  const chunk = html.slice(start, start + 3500);

  const tierMatch = chunk.match(/>(Expert|Master|Grandmaster|Contributor|Novice)</i);
  if (!tierMatch) return null;

  return {
    name,
    tier: capitalize(tierMatch[1]),
    gold: medalCount(chunk, "gold"),
    silver: medalCount(chunk, "silver"),
    bronze: medalCount(chunk, "bronze"),
    rank: numberAfter(chunk, />([\d,]+)<\/p>\s*<span[^>]*>\s*of\s*([\d,]+)/i, 1),
    of: numberAfter(chunk, />([\d,]+)<\/p>\s*<span[^>]*>\s*of\s*([\d,]+)/i, 2),
    highest: numberAfter(chunk, />([\d,]+)<\/p>\s*<span[^>]*>highest ever/i, 1),
  };
}

function medalCount(chunk: string, kind: "gold" | "silver" | "bronze"): number {
  const match = chunk.match(
    new RegExp(`alt="${kind} medal"[\\s\\S]{0,200}>(\\d+)<`, "i"),
  );
  return match ? Number(match[1]) : 0;
}

function numberAfter(chunk: string, pattern: RegExp, group: number): number {
  const match = chunk.match(pattern);
  if (!match?.[group]) return 0;
  return Number(match[group].replace(/,/g, ""));
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export async function scrapeKaggleProfile(): Promise<KaggleStats> {
  /**
   * Kaggle's public profile is a JS app and often serves a recaptcha
   * challenge to datacenter IPs / non-browser clients. We still try on
   * every request (no cache) because the user asked for a live scrape.
   * Only mark `live: true` when the HTML actually contains both Expert
   * cards. Otherwise return the snapshot from the profile, never a Live
   * badge on fallback data.
   */
  try {
    const res = await fetch(PROFILE_URL, {
      cache: "no-store",
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      },
    });
    if (!res.ok) return fallbackKaggleStats();
    const html = await res.text();
    if (html.includes("recaptcha") && !html.includes("Kaggle Achievements")) {
      return fallbackKaggleStats();
    }
    return parseKaggleProfile(html) ?? fallbackKaggleStats();
  } catch {
    return fallbackKaggleStats();
  }
}
