import type { ExperienceItem, PressItem, Project } from "./types";

export const site = {
  name: "Viraj Bhanage",
  wordmark: "VB",
  title: "Viraj Bhanage — iOS & on-device AI",
  // Meta description is the one place a short summary is allowed.
  description:
    "CS student at BITS Pilani and Junior Developer at the Apple Developer Academy. On-device AI/ML and native Apple projects: Coralyst, Revenants, Who's Out, Rush Hour, Sema, and RealityAudio.",
};

export const hero = {
  headline: "I build the intelligence that runs on-device, and the iOS app around it.",
  // TODO: confirm official job title — still using "Junior Developer" as a placeholder for "IS developer."
  subhead:
    "3rd-year BS Computer Science student at BITS Pilani, currently a Junior Developer at the Apple Developer Academy — building native iOS apps powered by on-device AI/ML.",
};

export const about = [
  "I'm Viraj — an iOS developer who builds on-device AI/ML, which is a specific, stubborn kind of engineering: no cloud to lean on, no server to quietly offload the hard part to, just Swift, Core ML, and whatever the phone in someone's hand can actually do in real time.",
  "That constraint is the thing I keep choosing to work inside. Whether it's a model, a spatial-computing session, or a signal being interpreted live, I care about the moment it actually has to run on hardware someone's holding — where latency, battery, and privacy aren't abstractions, they're the whole design problem.",
  "I'm drawn to native Apple engineering with real intelligence built in, not bolted on from a server somewhere else.",
];

export const projects: Project[] = [
  {
    slug: "coralyst",
    caseId: "01 · CORALYST",
    title: "Coralyst",
    category: "AI / Conservation",
    cardSubheading: "On-device bioacoustic monitoring for coral reef conservation",
    cardTeaser:
      "An AI/ML pipeline that listens for illegal blast fishing on a Balinese reef — and runs fully offline, on-device, with no dependency on a network connection.",
    logo: {
      src: "/logos/coralyst.png",
      alt: "Coralyst",
      icon: true,
    },
    tech: ["Python", "Core ML", "Swift/SwiftUI"],
    media: {
      type: "image",
      src: "/work/coralyst-poster.jpg",
      alt: "Coralyst concept poster — hydrophone on a reef, listening for blast fishing.",
    },
    images: [],
    narrative: [
      {
        heading: "The situation",
        body: "Biorock Indonesia is a coral preservation community in Bali. Their reefs get hit by blast fishing — homemade explosives thrown into the water that kill everything in a 10–30 meter radius and can leave a reef as rubble for decades. It's illegal almost everywhere it happens, but oceans are vast, patrols are thin, and most blasts go unwitnessed. The community didn't need another dashboard — they needed a way to actually catch this happening, at sites with no reliable connectivity.",
      },
      {
        heading: "Thought process",
        body: "A reef makes a sound — fish, shrimp, ambient reef noise — and so does a bomb going off. That gave us a signal to build on: a hydrophone doesn't need to be in the right place at the right moment the way a patrol boat does, and a timestamped recording is a lot harder to dismiss than a secondhand report. The hard constraint was that this had to work at the edge, where connectivity can't be assumed. That ruled out anything that depended on streaming audio to a server for inference — the detection had to happen on the device itself.",
      },
      {
        heading: "Engineering decisions",
        body: "I built the AI/ML pipeline end-to-end: collecting and preparing hydrophone recordings from ReefSet v1.0 (Williams et al., 2024), training a 2-layer bidirectional LSTM on 40-band log-mel spectrograms from ~1.92s clips to pick out blast-fishing signatures against the ambient noise floor of a healthy vs. degraded reef, and — the part that mattered most — getting that model small and efficient enough to run locally, on-device, with no dependency on a live connection. The system logs each detection with a timestamp and estimated location, and separately tracks reef health cues (a healthy reef crackles with life; a damaged one goes quiet) as a side signal. The held-out field set is the actual failure mode: the model almost never mistakes real reef life for a bomb, but a confidence threshold calibrated on ReefSet doesn't fully transfer to a new recorder or site. Ranking stays strong (ROC-AUC ~0.95–0.98); each training iteration has been closing that domain-shift gap.",
      },
      {
        heading: "My contribution",
        body: "The AI/ML pipeline was mine, start to finish — model training, and the on-device deployment work to make sure something meant for a remote Balinese reef didn't quietly stop working the moment it lost signal.",
      },
    ],
    numbers: {
      heading: "By the numbers",
      facts: [
        {
          label: "Data",
          value:
            "ReefSet v1.0 (Williams et al., 2024) — 57,074 hand-labeled hydrophone clips across 16 sites worldwide.",
        },
        {
          label: "Positive class",
          value: "203 confirmed Indonesia blast clips (anthrop_bomb).",
        },
        {
          label: "External test",
          value:
            "38 independent field recordings (\"Drive\"), held out — never touched during training, different recorder and gain than ReefSet.",
        },
        {
          label: "Model",
          value:
            "2-layer bidirectional LSTM, hidden size 64, dropout 0.3, mean-pool + linear head, trained on 40-band log-mel spectrograms from ~1.92s clips.",
        },
      ],
      experiments: [
        {
          setup: "A — Indonesia bombs vs. Indonesia ambient",
          recall: "41/42 (98%), F1 0.94",
          fpr: "not tested",
          field: "not tested",
        },
        {
          setup: "B — + every shrimp/reef-sound class in training",
          recall: "42/42 (100%)",
          fpr: "0.12% false-positive rate",
          field: "7/38 (18%)",
        },
        {
          setup: "C — balanced slice of all 37 ReefSet label types",
          recall: "5/5 (small n)",
          fpr: "0.57% false-positive rate",
          field: "12/38 (32%)",
        },
      ],
      takeaway:
        "The model reliably tells a blast from reef background noise, and it almost never mistakes real reef life — snapping shrimp, fish knocks, waves — for a bomb. What it hasn't solved yet is transferring that threshold to a totally new recorder or site: ranking stays strong (ROC-AUC ~0.95–0.98), but the confidence threshold calibrated on ReefSet doesn't fully carry over to real field audio yet. Each iteration (B→C) measurably closes that gap (18%→32% field recall).",
    },
    // TODO: Coralyst — no TestFlight or App Store link; live prototype stays as the sole reference unless one exists.
    links: [
      { label: "GitHub", href: "https://github.com/Gleenryan/CH5_Biorocks" },
      { label: "Live prototype", href: "https://coralyst.vercel.app" },
    ],
  },
  {
    slug: "revenants",
    caseId: "02 · REVENANTS",
    title: "Revenants",
    category: "AR / Game",
    cardSubheading: "Asymmetrical co-op AR horror game",
    cardTeaser:
      "Two phones, one shared haunted room — LiDAR world-scanning, ARKit collaborative sessions, and a spatial audio engine I built and open-sourced along the way.",
    logo: {
      src: "/logos/revenants.png",
      alt: "Revenants",
      icon: true,
    },
    tech: [
      "Swift 6",
      "SwiftUI",
      "ARKit",
      "RealityKit",
      "RoomPlan",
      "Core Haptics",
      "Network.framework",
      "VIPER",
    ],
    media: {
      type: "video",
      src: "/work/revenants.mp4",
      poster: "/work/revenants-poster.jpg",
      previewSrc: "/work/revenants-preview.mp4",
    },
    images: [],
    narrative: [
      {
        heading: "The situation",
        body: "This was a co-op AR game project: two players in the same physical room, one experience, built to be genuinely playable together rather than side-by-side. The concept was an asymmetrical horror escape room — a curse splits the two players' senses, and neither can get through it alone.",
      },
      {
        heading: "Thought process",
        body: "The interesting problem wasn't the horror theming, it was the coordination problem underneath it: two phones that have never met need to agree, to the centimeter, on where a doll is sitting on a real rug. One phone has LiDAR and can build an accurate model of the room; the other doesn't. Rather than treat that as a limitation, we turned it into the plot — the LiDAR phone becomes the Host and builds the map, the other becomes the Guest and joins that shared coordinate space through ARKit's collaborative session. Once the curse hits, one player goes deaf and gains sight (hidden clues, glowing locks); the other goes blind and gains spatial hearing and haptic guidance. Neither piece of information is useful alone, so the only way through a puzzle is two people standing in the same room, talking out loud.",
      },
      {
        heading: "Engineering decisions",
        body: "Under the horror skin it's a disciplined **VIPER + SwiftUI** app on Swift 6 / iOS 18+: Views never talk to ARKit or the network directly, an Interactor owns proximity checks and role logic, and two long-lived services (`ARService`, `NetworkService`) sit beneath every screen. Every random decision — frequencies, spawn points, puzzle answers — is computed once on the Host and replicated to the Guest, so two players can never end up seeing two different curses. Transport is a custom wire protocol over `Network.framework` and Bonjour (deliberately not MultipeerConnectivity): every message carries a 1-byte header saying whether it's a JSON gameplay event or a chunk of binary ARKit collaboration data, with non-critical AR frames dropped once the send queue backs up — a call made specifically so a network hiccup doesn't turn into a broken jump-scare.",
      },
      {
        heading: "My contribution",
        body: "While building the letter/clue system — a hidden object that the Listener finds by ear before the Seer finds it by sight — I needed spatial audio in RealityKit that respected the actual walls of the room, so a whisper wouldn't just leak cleanly through drywall. There wasn't a simple way to do that. So I built it myself, and open-sourced it as **RealityAudio** (see below) — that's the piece of this project that exists independently of the game.",
      },
    ],
    links: [
      { label: "GitHub — Revenants", href: "https://github.com/bhanage-viraj/Split-Mechanics" },
      { label: "TestFlight", href: "https://testflight.apple.com/join/bxqH2nP9" },
    ],
  },
  {
    slug: "whos-out",
    caseId: "03 · WHO'S OUT",
    title: "Who's Out",
    category: "iOS / AI",
    cardSubheading: "Privacy-first friend availability app, built on iOS 27",
    cardTeaser:
      "See who's nearby and actually free — on-device AI reasoning over calendar and location, end-to-end encrypted friend sync, and a new Siri integration. Built at IndeHub WWDC26.",
    logo: {
      src: "/logos/whos-out.png",
      alt: "Who's Out",
      icon: true,
    },
    tech: [
      "Swift/SwiftUI",
      "Spring Boot",
      "App Intents",
      "Foundation Models",
      "EventKit",
      "Core Location",
    ],
    media: {
      type: "image",
      src: "/work/whos-out-poster.jpg",
      alt: "Who's Out poster — three iPhone screens for nearby friends, sending a pulse, and live suggestions.",
    },
    images: [],
    narrative: [
      {
        heading: "The situation",
        body: "Built at the IndeHub WWDC26 hackathon, where the challenge was to build something around brand-new iOS 27 platform features. The idea: friends lose track of each other's actual availability — everyone's on their phone, nobody knows who's actually free right now.",
      },
      {
        heading: "Thought process",
        body: "Most \"social\" apps solve this by adding a feed, which is exactly the wrong instinct — more content isn't the fix for \"I don't know who's around.\" I scoped it down hard: no posting, no feed, no content, just coordination. The app learns a friend's real availability by reasoning over their calendar, location, and Focus sessions, and nudges you when someone nearby is actually free. It also had to justify constant location/calendar access, which meant privacy couldn't be an afterthought bolted on later — it had to be the architecture.",
      },
      {
        heading: "Engineering decisions",
        body: "The AI reasoning over calendar, location, and Focus data runs on-device — that data never needs to leave the phone to produce a suggestion. Friend-to-friend location updates are end-to-end encrypted, so the server only ever relays ciphertext, never plaintext location. Sign-in is Apple-only, friend pairing is opt-in via invite codes rather than a public graph, and the whole thing ships with a Siri integration built on the new iOS 27 App Intents / Foundation Models stack — you can ask Siri \"who's free nearby?\" and get a real, on-device-reasoned answer. It's an iOS app + Spring Boot backend monorepo under the hood.",
      },
      {
        heading: "My contribution",
        body: "Built as part of the hackathon team under real time pressure — the call to scope this down to pure coordination (no feed) rather than a broader social app, and the privacy-first architecture (on-device reasoning, encrypted friend sync) were the product and engineering decisions I'd point to first.",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/bhanage-viraj/Whos-Out" },
      { label: "TestFlight", href: "https://testflight.apple.com/join/avevSG7f" },
    ],
  },
  {
    slug: "rush-hour",
    caseId: "04 · RUSH HOUR",
    title: "Rush Hour",
    category: "iOS / Productivity",
    cardSubheading: "A focus app built around timelapse accountability",
    cardTeaser:
      "Records your focus sessions on camera and blocks distracting apps while you work — already through its first public exhibition and a round of real user feedback.",
    logo: {
      src: "/logos/rush-hour.png",
      alt: "Rush Hour",
    },
    tech: [
      "Swift/SwiftUI",
      "FamilyControls",
      "DeviceActivity",
      "Shield",
      "WidgetKit",
      "AVFoundation",
    ],
    media: {
      type: "video",
      src: "/work/rush-hour.mp4",
      poster: "/work/rush-hour-poster.jpg",
      previewSrc: "/work/rush-hour-preview.mp4",
    },
    images: [],
    narrative: [
      {
        heading: "The situation",
        body: "The starting observation was simple: even small tasks get hard when you're constantly pulled away, and ambition without focus doesn't actually get you anywhere. Most focus apps respond to that by just tracking numbers — minutes focused, streaks kept.",
      },
      {
        heading: "Thought process",
        body: "Tracking a number doesn't make someone feel like they showed up for themselves. What does is being able to look back at a session and actually see it — how many times did I get distracted, how did I spend the time, did I really show up for what I said I wanted to do. So instead of a leaderboard, Rush Hour records a timelapse of the session itself, something to reflect on afterward and something you can genuinely share, which builds in accountability without turning focus into a competition.",
      },
      {
        heading: "Engineering decisions",
        body: "App blocking runs on Apple's Screen Time APIs — `FamilyControls`/`DeviceActivity` — with a dedicated Shield Action and Shield Configuration extension, plus a jailbreak-detection monitor so the block can't just be quietly bypassed. A WidgetKit extension gives at-a-glance session status from the home screen.",
      },
      {
        heading: "My contribution",
        body: "Rush Hour had its first public exhibition last month, at the Apple Developer Academy's own showcase — the first time real users incorporated it into actual work sessions and gave feedback on what helped and what to fix. That feedback is currently shaping the pre–App Store refinement pass.",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/bhanage-viraj/RushHour" },
      { label: "TestFlight", href: "https://testflight.apple.com/join/JX8RE59Q" },
      { label: "Live site", href: "https://rush-hour-rho.vercel.app" },
    ],
  },
  {
    slug: "sema",
    caseId: "05 · SEMA",
    title: "Sema",
    category: "AI / Accessibility",
    cardSubheading: "Offline, on-device Kenyan Sign Language interpreter",
    cardTeaser:
      "A bidirectional KSL ↔ English/Swahili interpreter that runs fully offline on iPhone, built on Gemma 4 via llama.cpp for the Gemma for Good Hackathon.",
    tech: ["Gemma 4", "llama.cpp", "MediaPipe", "Swift/SwiftUI"],
    media: {
      type: "image",
      src: "/work/sema-poster.jpg",
      alt: "Sema poster — avatar-based Kenyan Sign Language interpreter on iPhone, with live camera-to-avatar translation.",
    },
    images: [],
    narrative: [
      {
        heading: "The situation",
        body: "Built for the Gemma for Good Hackathon. The challenge: Kenyan Sign Language (KSL) interpretation is a real, unmet need, but most translation tooling assumes reliable connectivity and cloud inference — both of which are real barriers for a lot of the communities that would actually use this.",
      },
      {
        heading: "Thought process",
        body: "\"Fully offline, runs on a phone people already own\" wasn't a technical flex here — it was the actual product requirement. If it needs the cloud, it doesn't work for the people it's meant for. And it had to be two-way: sign to the app and have it interpreted for a hearing person, or have a hearing person's speech signed back — a real conversation, not a one-directional lookup tool.",
      },
      {
        heading: "Engineering decisions",
        body: "Sema is a bidirectional KSL ↔ English/Swahili interpreter running fully offline, on-device, on iPhone, built on Gemma 4 (E2B) via llama.cpp — small enough to run on-device, capable enough to hold up both directions of a real conversation.",
      },
      {
        heading: "My contribution",
        body: "Full build for the hackathon submission — the on-device Gemma integration and the bidirectional interpretation flow.",
      },
    ],
    links: [
      { label: "TestFlight", href: "https://testflight.apple.com/join/h9gftDva" },
      {
        label: "Kaggle writeup",
        href: "https://www.kaggle.com/competitions/gemma-4-good-hackathon/writeups/new-writeup-1779016365972",
      },
    ],
  },
  {
    slug: "realityaudio",
    caseId: "OS · REALITYAUDIO",
    title: "RealityAudio",
    cardSubheading: "I built this and open-sourced it",
    cardTeaser:
      "RealityAudio is a RealityKit spatial audio package I wrote for Revenants and released on GitHub — one line of code for LiDAR-aware 3D sound in AR. Later featured by DevBytes.",
    tech: ["Swift", "RealityKit", "ARKit", "Swift Package Manager"],
    media: { type: "placeholder", intended: "image" },
    images: [],
    openSource: true,
    narrative: [
      {
        heading: "The situation",
        body: "Born directly out of Revenants: I needed spatial audio in RealityKit that could realistically muffle or block when a real wall or piece of furniture was between the listener and the sound source. RealityKit didn't have a simple way to do that — it meant hand-rolling matrix math and manual `AnchorEntity` setup every time.",
      },
      {
        heading: "Thought process",
        body: "This felt like a gap worth fixing properly rather than a one-off hack buried in the game's codebase, so I pulled it out into its own package.",
      },
      {
        heading: "Engineering decisions",
        body: "RealityAudio wraps spatial audio setup into a single function call — drop a 3D sound into a scene with one line — with native LiDAR-based occlusion built in, so sound realistically attenuates or blocks based on real-world geometry when the host app enables ARKit scene understanding. It ships with its own test suite and supports iOS 17+ and visionOS 1+.",
      },
      {
        heading: "Recognition",
        body: "Covered by [DevBytes](https://devbytes.co.in/news/viraj-bhanages-realityaudio-package-brings-spatial-audio-to-ar-apps-on-ios).",
      },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/bhanage-viraj/RealityAudio" },
      {
        label: "DevBytes coverage",
        href: "https://devbytes.co.in/news/viraj-bhanages-realityaudio-package-brings-spatial-audio-to-ar-apps-on-ios",
      },
    ],
  },
];

export const press: PressItem[] = [
  {
    outlet: "DevBytes",
    subheading: "RealityAudio: spatial audio for RealityKit on iOS / visionOS",
    href: "https://devbytes.co.in/news/viraj-bhanages-realityaudio-package-brings-spatial-audio-to-ar-apps-on-ios",
    date: "Jul 2026",
  },
  {
    outlet: "Jagran Josh",
    subheading: "Profiled for Apple Developer Academy, Bali",
    href: "https://www.jagranjosh.com/articles/from-bengaluru-to-bali-how-scaler-school-of-technology-is-shaping-global-ready-tech-innovators-1800005539-1",
    date: "Nov 2025",
    // TODO: Jagran Josh excerpt — site blocked automated fetches. Paste the paragraph that mentions Viraj and replace this placeholder framing with a real one-line teaser.
    excerptTodo: true,
  },
];

export const achievements = {
  cursorBali: {
    title: "1st Place — Cursor Bali Hackathon",
    body: "Built a posture-tracking macOS app in the time box of the hackathon — tracks a person's posture in real time and flags it back to them.",
  },
  geoAi: {
    title: "Finalist — National Geo AI Hackathon, IIT Bombay Techfest",
    body: "Trained a model to develop AI-based solutions using drone imagery and point-cloud data under the SVAMITVA Scheme.",
  },
  algoUtsav: {
    title: "AIR 3 — AlgoUtsav 2025, NIT Rourkela",
    body: "Placed 3rd (All India Rank) in NIT Rourkela's national competitive programming contest, hosted by their Algorithmic and Programming Society.",
    certificate: {
      src: "/certificates/algoutsav.jpg",
      alt: "Certificate of Appreciation for Viraj Bhanage, rank 3 in the AlgoUtsav 2025 team contest at NIT Rourkela.",
    },
  },
  metaHackerCup: {
    title: "Meta Hacker Cup 2025 — Global Rank 1623",
    body: "Placed 1,623rd worldwide in Round 2 of Meta's 2025 competitive programming contest.",
    certificate: {
      src: "/certificates/meta-hacker-cup.png",
      alt: "2025 Meta Hacker Cup certificate recognizing Viraj Bhanage for progressing to Round 2, global rank 1,623.",
    },
  },
  unicornBharat: {
    title: "3rd Place — Unicorn Bharat Hackathon",
    body: "Built a marketplace for farmers to sell their goods.",
  },
  schoolOfSolana: {
    title: "School of Solana (Ackee Blockchain)",
    body: "Certified in Rust & Solana program development; built a functional on-chain Solana program with Anchor as the capstone.",
    certificate: {
      src: "/certificates/school-of-solana.jpg",
      alt: "School of Solana Season 8 graduation certificate from Ackee Blockchain Security.",
      contain: true,
    },
  },
  kaggle: {
    title: "Kaggle — Dataset Expert & Notebook Expert",
    body: "Expert tier on Kaggle.",
    profileUrl: "https://www.kaggle.com/bhanageviraj",
    username: "bhanageviraj",
    staticAsOf: "4 September 2026",
    snapshot: {
      datasets: {
        name: "Datasets" as const,
        tier: "Expert",
        gold: 0,
        silver: 4,
        bronze: 3,
        rank: 153,
        of: 11379,
        highest: 143,
      },
      notebooks: {
        name: "Notebooks" as const,
        tier: "Expert",
        gold: 0,
        silver: 0,
        bronze: 6,
        rank: 1935,
        of: 61108,
        highest: 1920,
      },
    },
  },
};

export const experience: ExperienceItem[] = [
  {
    org: "Apple Developer Academy",
    // TODO: confirm exact official title — still using "Junior Developer" as a placeholder for "IS developer."
    title: "Junior Developer",
    dates: "March 2026 – Present",
    body: "Challenge-based learning program, building shipped iOS products end-to-end. Projects: Coralyst, Revenants, Who's Out, Rush Hour.",
    titleTodo: true,
  },
];

export const education = {
  school: "BITS Pilani",
  program: "BS Computer Science, 3rd Year",
  cgpa: "8.54",
  // TODO: add expected graduation
};

export const contact = {
  // TODO: add email address
  email: null as string | null,
  // TODO: add LinkedIn URL
  linkedin: null as string | null,
  github: "https://github.com/bhanage-viraj",
  // TODO: add resume PDF (e.g. public/viraj-bhanage-resume.pdf)
  resume: null as string | null,
};

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const shippedProjects = projects.filter((project) => !project.openSource);
export const openSourceProjects = projects.filter((project) => project.openSource);
