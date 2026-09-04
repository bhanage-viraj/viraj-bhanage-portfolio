# Design Guideline + Cursor Build Prompt — Viraj Bhanage Portfolio

Two parts. Part 1 is the design system itself — read it once so you know why things look the way they do, and so you can push back on anything. Part 2 is the literal prompt: copy it into Cursor as-is, alongside `portfolio-content.md`, and it has enough detail to build from.

---

# Part 1 — Design System

## The concept

Every project you've built runs on some form of **signal**: a hydrophone listening for a blast under the water, two phones agreeing on a haunted room through spatial audio, an on-device model reading a sign and turning it into speech. The thread across all five projects is *detecting and interpreting a signal, on-device, without depending on a big central server.* That's the idea the whole site is built around — not "here's a grid of app icons," but a site that itself feels like it's reading a signal: precise, quiet, high-contrast, nothing decorative.

Explicitly avoiding: dark mode (you said no), the cream-background-plus-clay-orange look that's become the generic "AI-generated site" tell, rounded SaaS cards with identical soft shadows on everything, and centered hero text with a gradient blob behind it. This should read like a well-kept lab notebook, not a startup landing page.

## Color

| Token | Hex | Use |
|---|---|---|
| `paper` | `#FAFAF8` | Page background. Warm off-white, not stark `#FFFFFF` — softer on the eyes, still unambiguously light. |
| `ink` | `#14181A` | Primary text, near-black with a slight cool cast. |
| `ink-muted` | `#63696B` | Secondary text, captions, metadata. |
| `line` | `#E3E0D9` | Hairline borders, dividers, card outlines. Thin, never a drop shadow. |
| `signal` (primary accent) | `#0E6B6B` | Deep teal — the "water/sonar" color. Links, active states, the waveform motif, card hover borders. |
| `coral` (secondary accent) | `#FF6B4A` | Reserved for exactly two things: the "live" badge on the Kaggle stats, and small marks that mean *this is happening right now* (e.g. a pulse dot). Never used decoratively. Named `coral` deliberately — it's your first project, not an accident. |

Only ever two accent colors on screen at once. If `coral` is on screen, `signal` should be doing the structural work (borders, links) and `coral` should be doing the one "alive" thing.

## Type

Two families, clearly distinct roles — no third face, no italics-for-emphasis, no all-caps labels.

- **Display / headings — Space Grotesk** (500–700 weight). Geometric, slightly technical, reads as "spatial computing" without being a cliché tech font like Orbitron. Used for the hero line, section titles, and project card titles only.
- **Body — Public Sans** (400–500 weight). Clean, legible, government/infrastructure heritage — quietly confident, not a startup font. Used for every paragraph, nav item, and button.
- **Data / labels — JetBrains Mono** (400–500 weight), used *only* for: stats and numbers (Meta Hacker Cup rank, Kaggle tier, commit counts), timestamps, and the small case-ID tag on each project card (see layout). This is what gives the site its "engineering notebook" texture — a reef-conservation nonprofit site wouldn't have this, a lab would.

Type scale (desktop): hero 56–64px / section titles 32px / card titles 22px / body 17px / mono data 13–14px, all at 1.4–1.6 line-height for body, 1.1 for display.

Line length: cap body paragraphs around 65–72 characters. Your case-study prose (the "situation / how I thought about it / decisions / contribution" narrative) is genuinely long-form — don't let it stretch edge-to-edge on desktop.

## Layout

**Left-aligned, not centered.** A centered hero with a centered paragraph under it is the single most common "generated site" tell. Set a left margin/column and keep the hero, nav, and section intros anchored to it. Numbers and mono data can right-align within their own row for a technical-sheet feel.

```
┌──────────────────────────────────────────────┐
│ VB                    Work  Achievements  →   │
│                                                │
│ I build the thing                             │
│ that thinks, and the                          │
│ thing people actually                         │
│ touch.                                         │
│ ── 3rd-yr CS, BITS Pilani · Jr Dev, ADA ──    │
│ [ thin animated waveform line, full-width ]   │
└──────────────────────────────────────────────┘
```

**Project grid:** 2 columns desktop, 1 column mobile/tablet. Each card gets a small mono "case ID" — `01 · CORALYST`, `02 · REVENANTS`, etc. — this is one of the legitimate uses of numbering the design-principles guidance warns about, because your projects genuinely are a numbered case-file set, not decoration.

```
┌────────────────────────┐ ┌────────────────────────┐
│ 01 · CORALYST           │ │ 02 · REVENANTS          │
│ [ image/video thumb ]   │ │ [ image/video thumb ]   │
│ On-device bioacoustic   │ │ Asymmetrical co-op      │
│ monitoring for coral    │ │ AR horror game           │
│ reef conservation       │ │                          │
│ An AI/ML pipeline that  │ │ Two phones, one shared   │
│ listens for illegal...  │ │ haunted room...          │
└────────────────────────┘ └────────────────────────┘
```

**Card → full case study:** clicking a card opens an expanded view (a route/page transition is cleaner than a modal here, given how long your case-study text is — a modal makes 800 words of prose feel cramped). The expanded view leads with the video if you have one, then image(s), then the situation → how I thought about it → engineering decisions → my contribution flow exactly as written in `portfolio-content.md`, then the links row.

**Achievements:** a horizontal row of four items, each a simple bordered tile — no card shadow, just a `line`-colored 1px border. Cursor Bali Hackathon gets a small cursor-arrow glyph/logo mark; AlgoUtsav and Meta Hacker Cup get their certificate images as a click-to-enlarge lightbox (plain, no fancy zoom animation — one click, one enlarge, one click to close); Kaggle gets the live-fetched tier badges with the `coral` pulse dot next to "Live" (see Part 2 for the technical honesty on this one).

## Motion

One deliberate moment, not motion sprinkled on every hover. The single animated element is the waveform line under the hero — a slow, continuous, subtle signal trace (like a sonar readout, not a music visualizer — restrained amplitude, slow period). Everything else is static except:
- Card hover: border color shifts from `line` to `signal`. No lift, no shadow, no scale.
- Card-to-case-study transition: a simple fade/cross-fade, under 250ms.
- Respect `prefers-reduced-motion` — freeze the waveform to a static trace if set.

## Accessibility & quality floor

- All text meets WCAG AA contrast against `paper` (ink and ink-muted both pass; verify `signal` on `paper` for link text — it does, but check any smaller/lighter uses).
- Visible keyboard focus rings on every interactive element (cards, links, lightbox triggers) — use `signal` as the focus ring color, 2px, offset.
- Fully responsive down to a 360px mobile viewport; the project grid collapses to 1 column, the achievements row wraps to 2×2.
- Every image and video needs real alt text / captions — not filler.

---

# Part 2 — The Cursor Prompt

Copy everything below into Cursor. Keep `portfolio-content.md` in the project root (or paste its contents into the same message) so Cursor treats it as the actual source of truth for copy.

```
Build a personal portfolio website for Viraj Bhanage, a CS student and iOS/AI developer.
Use `portfolio-content.md` (attached in this repo) as the single source of truth for all
text content — bios, project case studies, achievements, links, and press. Do not invent,
summarize away, or alter any of the writing in that file; it is already final copy. Where
that file leaves a placeholder or asks a question (look for the "Notes" section at the
bottom), leave a clearly marked TODO comment in the code rather than inventing an answer.

STACK
- Next.js (App Router) + TypeScript + Tailwind CSS.
- Deploy target: Vercel.
- No dark mode. Light theme only, ever — do not add a theme toggle or a `dark:` variant.

DESIGN SYSTEM — implement exactly these tokens in `tailwind.config.ts`:
Colors:
  paper:      #FAFAF8   (page background)
  ink:        #14181A   (primary text)
  ink-muted:  #63696B   (secondary text)
  line:       #E3E0D9   (borders/dividers — 1px hairlines only, no box-shadow cards)
  signal:     #0E6B6B   (primary accent — links, hover borders, focus rings, waveform)
  coral:      #FF6B4A   (secondary accent — used ONLY for "live" indicators, e.g. the
              Kaggle live-stats pulse dot. Never decorative, never more than one
              coral element on screen at a time.)

Fonts (load via next/font/google):
  - Space Grotesk (weights 500,600,700) — hero line, section titles, project card titles only.
  - Public Sans (weights 400,500) — all body copy, nav, buttons.
  - JetBrains Mono (weights 400,500) — stats/numbers only: achievement numbers, case IDs
    on project cards (e.g. "01 · CORALYST"), timestamps, ranks.
  Do not use any font besides these three. Do not use italics for emphasis. Do not use
  all-caps text anywhere except the mono case-ID tags, which read naturally in caps.

Layout: left-aligned, not centered. Hero headline, nav, and section intros all sit on a
consistent left margin/column — do not center the hero text or hero paragraph. Numbers/
mono data may right-align within their own row.

Motion: exactly one continuous animated element — a slow, low-amplitude waveform/sonar
trace under the hero (SVG or canvas, looping, subtle — think sonar readout, not a music
visualizer). Everything else is static except: (a) card borders shift from `line` to
`signal` on hover, no lift/scale/shadow, and (b) a simple sub-250ms fade transition when
a project card opens into its full case study. Respect `prefers-reduced-motion`: freeze
the waveform to a static trace when set. Do not add fade-up-on-scroll animations to
every section — that is exactly the generic pattern to avoid.

PAGE STRUCTURE

1. Nav — "VB" wordmark left, "Work / Achievements / Contact" right, on the paper
   background, no shadow, thin bottom hairline in `line` on scroll.

2. Hero — headline + subhead from portfolio-content.md's Hero section, left-aligned,
   the waveform animation running full-width beneath it.

3. About — the About section text from portfolio-content.md, single left-aligned
   column, max-width ~65ch.

4. Featured Work — a responsive grid (2 columns desktop, 1 column mobile) of project
   cards. Each card:
   - Mono case-ID tag top-left: "01 · CORALYST", "02 · REVENANTS", "03 · WHO'S OUT",
     "04 · RUSH HOUR", "05 · SEMA" (also include the RealityAudio open-source project
     as a 6th card, tagged "OS · REALITYAUDIO", visually slightly distinguished — e.g.
     a small "open source" label — since it's a package, not an app).
   - A media slot at the top of the card: if a video exists for that project, show a
     silent, looping, muted autoplay preview clip (no controls) as the card thumbnail;
     otherwise show the project image. Leave this wired to a `media: { type: 'video'
     | 'image', src: string }` field per project so images/videos can be dropped in
     later — do not hardcode filenames that don't exist yet, use placeholder gray
     boxes with a labeled TODO until real assets are added.
   - Card subheading (bold, Space Grotesk) + card teaser (Public Sans) — pull these
     verbatim from the "Card subheading" / "Card teaser" lines in portfolio-content.md.
   - On click/tap, navigate to a dedicated case-study route (e.g. `/work/coralyst`),
     NOT a modal — the case-study text is long-form and deserves a full page.

5. Case study page (dynamic route per project) — in this order:
   - Back link to Work grid.
   - Case ID + project title.
   - If a video exists: embed it near the top, with controls, NOT autoplay, and a
     real poster frame.
   - Image(s) if provided.
   - The four-part narrative from portfolio-content.md verbatim, in order: "The
     situation" → "How I thought about it" → "Engineering decisions" → "My
     contribution" (Sema/RealityAudio use the same four-part structure as written
     in the file). Use Space Grotesk for the four subheadings, Public Sans for body,
     max-width ~68ch.
   - Links row at the bottom (GitHub, TestFlight, live site, etc.) as plain
     underlined text links in `signal`, not buttons — this is a portfolio, not a
     SaaS product, don't over-button it.

6. Achievements — a row of 4 bordered tiles (1px `line` border, no shadow, no
   rounded-card-kit look):
   a. Cursor Bali Hackathon — 1st place. Include a small cursor-arrow glyph/logo
      mark (placeholder SVG, swap in the real one later) next to the achievement
      text.
   b. AlgoUtsav, NIT Rourkela — AIR 3. Include the certificate image as a
      click-to-enlarge lightbox (plain overlay + close button, no fancy zoom).
   c. Meta Hacker Cup — Global Rank 1623. Same certificate lightbox pattern.
   d. Kaggle — Dataset Expert & Notebook Expert. See "KAGGLE LIVE STATS" below —
      this one needs a live data fetch, not a static certificate image.

   KAGGLE LIVE STATS — be honest about the constraint here rather than faking it:
   Kaggle does not expose a public, unauthenticated REST endpoint for a user's
   Expert-tier badges or rank. Implement this as a Next.js Route Handler
   (`/api/kaggle-stats`) that runs server-side (not client-side, to avoid CORS and
   to keep any credentials off the client) and does ONE of the following, in this
   order of preference:
     1. If a Kaggle API key/token is provided via environment variables, use the
        official `kaggle` API client server-side to pull whatever profile/rank
        data it actually exposes for the given username, and cache the response
        (revalidate every few hours — this data does not change minute to minute,
        don't over-fetch).
     2. If no API key is configured, fall back to a clearly-labeled static value
        pulled from portfolio-content.md, with a small "as of [date]" caption
        instead of a "Live" badge — do NOT show a "Live" pulse dot next to data
        that isn't actually live.
   Only show the `coral` pulse "Live" dot when data is confirmed freshly fetched
   in that request, never on the static fallback. Leave a comment explaining this
   fallback logic clearly, since Kaggle's public API surface may change.

7. Press / Featured — the two (or more) press cards from portfolio-content.md's
   Featured section, same bordered-tile treatment as Achievements, each linking
   out to the original piece in a new tab.

8. Footer / Contact — Email, LinkedIn, GitHub, Resume PDF link, on `paper`, simple,
   left-aligned, no social icon soup — plain text links is fine and matches the
   rest of the site's restraint.

CONTENT SOURCING RULES
- Every headline, bio line, case-study paragraph, achievement description, and
  press blurb must come from portfolio-content.md. Do not paraphrase or shorten it
  unless a container is genuinely too small (e.g. a meta description tag) — in
  that one case, write a short summary but keep the full text in the actual page.
- Anywhere portfolio-content.md has an open question in its "Notes" section
  (job title wording, missing TestFlight link, Jagran Josh excerpt, Meta Hacker
  Cup year, etc.), add a `{/* TODO: */}` comment at that exact spot in the code
  instead of guessing.

QUALITY BAR
- Fully responsive to 360px width.
- Visible focus rings (2px `signal`, offset) on every interactive element.
- Real alt text on every image, real captions/tracks consideration for video.
- No dark mode, no theme toggle, no additional accent colors beyond `signal` and
  `coral`.
- No box-shadow "card kit" styling anywhere — hairline borders only.
- No centered hero text, no gradient blobs, no all-caps labels outside the mono
  case-ID tags.
```

---

## Notes for you

1. **Videos/images** — the prompt wires up a `media` slot per project that gracefully falls back to a placeholder if you haven't dropped the file in yet, so you can hand this to Cursor before your assets are ready and fill them in after.
2. **Kaggle live stats** — I want to flag this clearly rather than let it slide: Kaggle doesn't have a clean public API for tier/rank badges the way, say, GitHub does for follower counts. The prompt handles this honestly (real fetch if you provide an API key, clearly-labeled static fallback if not) instead of pretending it's trivial — worth reading that section before you hand this off.
3. **Cursor Bali Hackathon logo** — I used a generic placeholder cursor-arrow glyph in the spec since I don't have your actual hackathon's logo. Swap in the real one, or send it to me and I'll describe exactly how to place it.
4. Everything else — colors, fonts, layout, the whole "signal" concept — is a genuine design decision built off your actual project set, not a generic template. If any part of it doesn't feel like you, tell me which part and I'll revise just that.
