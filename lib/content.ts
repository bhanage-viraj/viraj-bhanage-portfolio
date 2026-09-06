import type { ExperienceItem, PressItem, Project } from "./types";

export const site = {
  name: "Viraj Bhanage",
  wordmark: "VB",
  title: "Viraj Bhanage — iOS & on-device AI",
  // Meta description is the one place a short summary is allowed.
  description:
    "CS student at BITS Pilani and Junior Developer at the Apple Developer Academy. Native iOS: on-device Core ML / Foundation Models, Swift 6 concurrency, a published Swift package, ARKit/RealityKit, and TestFlight apps.",
};

export const hero = {
  eyebrow: "iOS · On-device AI · Swift packages · Spatial",
  headline: "I build intelligence that runs on-device.",
  headlineLead: "I build intelligence",
  headlineEnd: "that runs on-device.",
  // TODO: confirm official job title — still using "Junior Developer" as a placeholder for "IS developer."
  subhead:
    "3rd-year BS Computer Science student at BITS Pilani, currently a Junior Developer at the Apple Developer Academy — shipping native iOS, a public Swift package, and on-device inference. No cloud for the hard part.",
};

export const about = [
  "I'm Viraj — an iOS developer who builds on-device AI/ML, which is a specific, stubborn kind of engineering: no cloud to lean on, no server to quietly offload the hard part to, just Swift, Core ML, and whatever the phone in someone's hand can actually do in real time.",
  "That constraint is the thing I keep choosing to work inside. Whether it's a Core ML classifier, a Foundation Models suggestion, a llama.cpp session, or two phones agreeing on one AR room over Network.framework, I care about the moment it has to run on hardware someone's holding — where latency, battery, isolation, and privacy aren't abstractions, they're the design problem.",
  "I've published that work as a Swift package with a public API and tests, written Swift 6 concurrency so network and AR callbacks stay on the right actor, and kept UI in SwiftUI — VIPER where the session is long-lived (Revenants), MVVM where the screens are discrete (Rush Hour).",
];

export const projects: Project[] = [
  {
    slug: "coralyst",
    caseId: "01 · CORALYST",
    title: "Coralyst",
    category: "AI / Conservation",
    cardSubheading: "On-device bioacoustic monitoring for coral reef conservation",
    cardTeaser:
      "On-device inference: a bundled Core ML classifier listens for blast fishing on a Balinese reef — AVFoundation audio in, local prediction out, no network.",
    logo: {
      src: "/logos/coralyst.png",
      alt: "Coralyst",
      icon: true,
    },
    tech: ["Python", "Core ML", "Swift/SwiftUI", "AVFoundation"],
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
        body: "I built the AI/ML pipeline end-to-end: collecting and preparing hydrophone recordings from ReefSet v1.0 (Williams et al., 2024), training a 2-layer bidirectional LSTM on 40-band log-mel spectrograms from ~1.92s clips to pick out blast-fishing signatures against the ambient noise floor of a healthy vs. degraded reef, and — the part that mattered most — getting that model small and efficient enough to run locally. On-device inference is a bundled Core ML `BlastEventClassifier.mlpackage` loaded with `MLModel`; `BlastClassifier` is `Sendable` and runs prediction on extracted audio features with no live connection. Hydrophone playback and capture sit on `AVFoundation` (`AVAudioEngine` / player nodes). The system logs each detection with a timestamp and estimated location, and separately tracks reef health cues. The held-out field set is the actual failure mode: the model almost never mistakes real reef life for a bomb, but a confidence threshold calibrated on ReefSet doesn't fully transfer to a new recorder or site. Ranking stays strong (ROC-AUC ~0.95–0.98); each training iteration has been closing that domain-shift gap.",
      },
      {
        heading: "My contribution",
        body: "The AI/ML pipeline was mine, start to finish — model training, and getting a bundled Core ML `BlastEventClassifier` running on-device so a remote Balinese reef doesn't quietly stop working the moment it loses signal.",
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
      "Swift 6 concurrency + a custom Network.framework / Bonjour protocol: two phones, one LiDAR-scanned room, ARKit collaboration, Core Haptics, and a Swift package spun out for spatial audio.",
    logo: {
      src: "/logos/revenants.png",
      alt: "Revenants",
      icon: true,
    },
    tech: [
      "Swift 6 concurrency",
      "SwiftUI",
      "VIPER",
      "ARKit",
      "RealityKit",
      "RoomPlan",
      "Core Haptics",
      "Network.framework",
      "Combine",
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
        body: "Under the horror skin it's a disciplined **VIPER + SwiftUI** app on Swift 6 / iOS 18+ — not MVVM; Views never talk to ARKit or the network directly, an Interactor owns proximity checks and role logic, and two long-lived `@MainActor` services (`ARService`, `NetworkService`) sit beneath every screen. `NetworkService` is an `ObservableObject` (Combine) isolated to the main actor: `Network.framework` callbacks hop back with `Task { @MainActor in … }` so UI state and the send queue stay thread-safe. Every random decision — frequencies, spawn points, puzzle answers — is computed once on the Host and replicated to the Guest. Transport is a custom wire protocol over `Network.framework` and Bonjour `_arcurse._tcp` (deliberately not MultipeerConnectivity): frame layout `[kind: 1 byte][length: 4 bytes][payload]`, JSON gameplay events vs binary ARKit collaboration data. Non-critical AR frames are dropped once `pendingSends.count > 6` so a backed-up queue can't stall world-merge. Host room capture is **RoomPlan** (`ScanningInteractor` / `RoomScanService`); gameplay uses ARKit collaborative sessions, RealityKit, LiDAR, and Core Haptics on a 60 fps proximity loop (`CADisplayLink`). Peer names on the wire come from UIKit's `UIDevice`; the UI itself is SwiftUI.",
      },
      {
        heading: "My contribution",
        body: "While building the letter/clue system — a hidden object that the Listener finds by ear before the Seer finds it by sight — I needed spatial audio in RealityKit that respected the actual walls of the room, so a whisper wouldn't just leak cleanly through drywall. There wasn't a simple way to do that. So I built it myself, packaged it as a Swift package, and open-sourced it as **RealityAudio** — the SDK-shaped piece of this project that exists independently of the game.",
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
    cardSubheading: "Privacy-first friend availability — coordination, not a feed",
    cardTeaser:
      "Friend graph, E2E location sync, REST + CryptoKit, on-device Foundation Models, Siri / App Intents. Built at IndeHub WWDC26; the product is coordination, not a social feed.",
    logo: {
      src: "/logos/whos-out.png",
      alt: "Who's Out",
      icon: true,
    },
    tech: [
      "Swift/SwiftUI",
      "Foundation Models",
      "App Intents",
      "URLSession",
      "CryptoKit",
      "Keychain",
      "Spring Boot",
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
        body: "Friends lose track of each other's actual availability — everyone's on their phone, nobody knows who's actually free right now. Built at IndeHub WWDC26 around new iOS 27 platform features, but the product problem is older than the hackathon: coordination, not content.",
      },
      {
        heading: "Thought process",
        body: "Most \"social\" apps solve this by adding a feed, which is exactly the wrong instinct — more content isn't the fix for \"I don't know who's around.\" I scoped it down hard: no posting, no feed, no content, just a friend graph and availability. The app reasons over calendar (EventKit), location (Core Location), and Focus sessions, then nudges you when someone nearby is actually free. Constant location/calendar access meant privacy had to be the architecture, not a settings toggle.",
      },
      {
        heading: "Engineering decisions",
        body: "On-device inference first: Foundation Models run on the phone over calendar / location / Focus — that data never needs to leave the device to produce a suggestion. Friend-to-friend location is end-to-end encrypted with **CryptoKit** (`CryptoBox`: X25519 key agreement, ChaCha20-Poly1305 sealed blobs); the Spring Boot API only stores and relays ciphertext (`EncryptedBlob`). Networking is a Swift `actor` `APIClient` over `URLSession` — JSON REST, Bearer auth, token refresh, retries on cold-start — not a custom socket. Tokens and identity keys live in the **Keychain**. Pairing is opt-in (invite codes / QR), Apple-only sign-in, no public graph. Siri is App Intents (`HowAreMyFriendsDoingIntent`, pulse actions) plus a WidgetKit / Live Activity surface. The app has a `KismetTests` unit-test target. Architecture is SwiftUI + feature stores — not MVVM, not VIPER.",
      },
      {
        heading: "My contribution",
        body: "Built as part of the hackathon team under time pressure — the call to ship pure coordination (friend graph, encrypted sync, Siri) rather than a broader social app, and the privacy-first split (on-device reasoning, ciphertext-only backend) are the decisions I'd point to first.",
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
      "MVVM + SwiftUI: AVFoundation timelapse capture (`AVCaptureSession`), Screen Time blocking, WidgetKit — exhibited, then iterated from real users.",
    logo: {
      src: "/logos/rush-hour.png",
      alt: "Rush Hour",
    },
    tech: [
      "Swift/SwiftUI",
      "MVVM",
      "AVFoundation",
      "UIKit",
      "FamilyControls",
      "DeviceActivity",
      "WidgetKit",
      "Combine",
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
        body: "This one **is MVVM + SwiftUI**: discrete screens own a `*ViewModel` (`SessionRecordingViewModel`, `FocusViewModel`, …) as `@MainActor` `ObservableObject`s (Combine). Session video is **AVFoundation** — `AVCaptureSession` for camera capture, export, and a timelapse you can replay or share — with UIKit `UIImage` frames for the in-session preview. App blocking runs on Screen Time (`FamilyControls` / `DeviceActivity`) plus Shield Action and Shield Configuration extensions, and a jailbreak-detection monitor so the block can't be quietly walked around. WidgetKit (and an App Intent on the widget) shows whether a session is actually running from the home screen.",
      },
      {
        heading: "My contribution",
        body: "The Screen Time stack was mine, and so was the camera path: `FamilyControls` / `DeviceActivity`, the Shield extensions, the jailbreak monitor, the `AVFoundation` timelapse, and the WidgetKit surface. After the Academy showcase, real users put it in actual work sessions; that feedback is the pre–App Store pass.",
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
      "On-device inference: bidirectional KSL ↔ English/Swahili on iPhone — Gemma 4 via llama.cpp, camera in through MediaPipe, no cloud.",
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
        body: "Sema is a bidirectional KSL ↔ English/Swahili interpreter running fully offline, on-device, on iPhone. Sign language hits the camera through MediaPipe; speech/text is handled by Gemma 4 (E2B) via llama.cpp — small enough for on-device inference, capable enough for both directions of a real conversation. If it needs the cloud, it doesn't work for the people it's meant for, so there is no server-side model.",
      },
      {
        heading: "My contribution",
        body: "Full build for the hackathon submission — the on-device Gemma / llama.cpp integration and the bidirectional interpretation flow.",
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
    cardSubheading: "Published Swift package — spatial audio SDK for RealityKit",
    cardTeaser:
      "SPM library with a public API (`RealityAudio.play`), Swift 6, AVFoundation + RealityKit, unit tests — extracted from Revenants so any AR app can import it. Featured by DevBytes.",
    tech: [
      "Swift Package Manager",
      "Swift 6",
      "RealityKit",
      "ARKit",
      "AVFoundation",
      "Swift Testing",
    ],
    media: { type: "placeholder", intended: "image" },
    images: [],
    openSource: true,
    narrative: [
      {
        heading: "The situation",
        body: "Born directly out of Revenants: I needed spatial audio in RealityKit that could realistically muffle or block when a real wall or piece of furniture was between the listener and the sound source. RealityKit didn't have a simple way to do that — it meant hand-rolling matrix math and manual `AnchorEntity` setup every time. That's an SDK problem, not a game-only hack.",
      },
      {
        heading: "Thought process",
        body: "If I was going to fix it, it had to be importable: a Swift package with a public API, explicit framework links, and tests — extracted from the game so another AR app can add it the same way.",
      },
      {
        heading: "Engineering decisions",
        body: "RealityAudio is a **Swift Package** (`Package.swift`, Swift tools 6.3, `swiftLanguageModes: [.v6]`). The product is a library target that links **RealityKit** and **AVFoundation**. The public API is one `@MainActor` entry point: `RealityAudio.play(_:in:at:occluded:)` — load an audio file, attach a `SpatialAudioComponent` at a world position, return the emitter `Entity` so the host can stop playback. LiDAR occlusion is opt-in (`occluded: true`) and pairs with the host `ARView`'s scene-understanding `.occlusion` flag. Platforms: iOS 17+ and visionOS 1+ (README / `@available`). Tests live in `RealityAudioTests` (Swift Testing) for the spatial math; `play()` is documented as device-only. Extracted from Revenants' letter/clue whisper so the occlusion math wouldn't stay buried in the game.",
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
    result: "1st Place",
    detail: "Cursor Bali Hackathon",
    date: "2026",
    body: "Built a posture-tracking macOS app in the time box of the hackathon — tracks a person's posture in real time and flags it back to them.",
  },
  geoAi: {
    title: "Finalist — National Geo AI Hackathon, IIT Bombay Techfest",
    result: "Finalist",
    detail: "National Geo AI Hackathon, IIT Bombay Techfest",
    date: "2025",
    body: "Trained a model to develop AI-based solutions using drone imagery and point-cloud data under the SVAMITVA Scheme.",
  },
  algoUtsav: {
    title: "AIR 3 — AlgoUtsav 2025, NIT Rourkela",
    result: "AIR 3",
    detail: "AlgoUtsav · NIT Rourkela",
    date: "2025",
    body: "Placed 3rd (All India Rank) in NIT Rourkela's national competitive programming contest, hosted by their Algorithmic and Programming Society.",
    certificate: {
      src: "/certificates/algoutsav.jpg",
      alt: "Certificate of Appreciation for Viraj Bhanage, rank 3 in the AlgoUtsav 2025 team contest at NIT Rourkela.",
    },
  },
  metaHackerCup: {
    title: "Meta Hacker Cup 2025 — Global Rank 1623",
    result: "Global Rank 1623",
    detail: "Meta Hacker Cup",
    date: "2025",
    body: "Placed 1,623rd worldwide in Round 2 of Meta's 2025 competitive programming contest.",
    certificate: {
      src: "/certificates/meta-hacker-cup.png",
      alt: "2025 Meta Hacker Cup certificate recognizing Viraj Bhanage for progressing to Round 2, global rank 1,623.",
    },
  },
  unicornBharat: {
    title: "3rd Place — Unicorn Bharat Hackathon",
    result: "3rd Place",
    detail: "Unicorn Bharat Hackathon",
    date: "2024",
    body: "Built a marketplace for farmers to sell their goods.",
  },
  schoolOfSolana: {
    title: "School of Solana (Ackee Blockchain)",
    result: "Certified",
    detail: "School of Solana (Ackee Blockchain)",
    body: "Certified in Rust & Solana program development; built a functional on-chain Solana program with Anchor as the capstone.",
    certificate: {
      src: "/certificates/school-of-solana.jpg",
      alt: "School of Solana Season 8 graduation certificate from Ackee Blockchain Security.",
      contain: true,
    },
  },
  kaggle: {
    title: "Kaggle — Dataset Expert & Notebook Expert",
    result: "Expert",
    detail: "Kaggle — Dataset Expert & Notebook Expert",
    date: "Present",
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
    body: "Challenge-based program shipping native iOS end-to-end: on-device Core ML and Foundation Models, Swift 6 concurrency around Network.framework / ARKit, a published Swift package, and TestFlight apps (Coralyst, Revenants, Who's Out, Rush Hour).",
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
  email: "virajbhanage00@gmail.com",
  linkedin: "https://www.linkedin.com/in/bhanageviraj/",
  x: "https://x.com/viraj_Bhanage_",
  github: "https://github.com/bhanage-viraj",
  resume: "/viraj-bhanage-resume.pdf",
};

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const shippedProjects = projects.filter((project) => !project.openSource);
export const openSourceProjects = projects.filter((project) => project.openSource);
