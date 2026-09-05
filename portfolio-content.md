# Portfolio Content — Viraj Bhanage

Rewritten as case-study narratives — each project follows the same arc: the situation I walked into, how I thought about it, the calls I made while building it, and what I specifically contributed. Grounded in your actual repos, TestFlight listings, and the DevBytes piece (got the full article text this time). A couple of things still need your input — flagged at the bottom, kept short.

---

## Hero

**Headline:**
> I build the intelligence that runs on-device, and the iOS app around it.

**Subhead:**
> 3rd-year BS Computer Science student at BITS Pilani, currently a Junior Developer at the Apple Developer Academy — building native iOS apps powered by on-device AI/ML.

---

## About

I'm Viraj — an iOS developer who builds on-device AI/ML, which is a specific, stubborn kind of engineering: no cloud to lean on, no server to quietly offload the hard part to, just Swift, Core ML, and whatever the phone in someone's hand can actually do in real time.

That constraint is the thing I keep choosing to work inside. Whether it's a model, a spatial-computing session, or a signal being interpreted live, I care about the moment it actually has to run on hardware someone's holding — where latency, battery, and privacy aren't abstractions, they're the whole design problem.

I'm drawn to native Apple engineering with real intelligence built in, not bolted on from a server somewhere else.

---

## Project 1 — Coralyst

**Card subheading:** On-device bioacoustic monitoring for coral reef conservation
**Card teaser:** An AI/ML pipeline that listens for illegal blast fishing on a Balinese reef — and runs fully offline, on-device, with no dependency on a network connection.

**The situation.**
Biorock Indonesia is a coral preservation community in Bali. Their reefs get hit by blast fishing — homemade explosives thrown into the water that kill everything in a 10–30 meter radius and can leave a reef as rubble for decades. It's illegal almost everywhere it happens, but oceans are vast, patrols are thin, and most blasts go unwitnessed. The community didn't need another dashboard — they needed a way to actually catch this happening, at sites with no reliable connectivity.

**How I thought about it.**
A reef makes a sound — fish, shrimp, ambient reef noise — and so does a bomb going off. That gave us a signal to build on: a hydrophone doesn't need to be in the right place at the right moment the way a patrol boat does, and a timestamped recording is a lot harder to dismiss than a secondhand report. The hard constraint was that this had to work at the edge, where connectivity can't be assumed. That ruled out anything that depended on streaming audio to a server for inference — the detection had to happen on the device itself.

**Engineering decisions.**
I built the AI/ML pipeline end-to-end: collecting and preparing hydrophone recordings, training a model to pick out blast-fishing signatures against the ambient noise floor of a healthy vs. degraded reef, and — the part that mattered most — getting that model small and efficient enough to run locally, on-device, with no dependency on a live connection. The system logs each detection with a timestamp and estimated location, and separately tracks reef health cues (a healthy reef crackles with life; a damaged one goes quiet) as a side signal.

**My contribution.**
The AI/ML pipeline was mine, start to finish — model training, and the on-device deployment work to make sure something meant for a remote Balinese reef didn't quietly stop working the moment it lost signal.

**Links:** [GitHub](https://github.com/Gleenryan/CH5_Biorocks) · [Live prototype](https://coralyst.vercel.app)

---

## Project 2 — Revenants

**Card subheading:** Asymmetrical co-op AR horror game
**Card teaser:** Two phones, one shared haunted room — LiDAR world-scanning, ARKit collaborative sessions, and a spatial audio engine I built and open-sourced along the way.

**The situation.**
This was a co-op AR game project: two players in the same physical room, one experience, built to be genuinely playable together rather than side-by-side. The concept was an asymmetrical horror escape room — a curse splits the two players' senses, and neither can get through it alone.

**How I thought about it.**
The interesting problem wasn't the horror theming, it was the coordination problem underneath it: two phones that have never met need to agree, to the centimeter, on where a doll is sitting on a real rug. One phone has LiDAR and can build an accurate model of the room; the other doesn't. Rather than treat that as a limitation, we turned it into the plot — the LiDAR phone becomes the Host and builds the map, the other becomes the Guest and joins that shared coordinate space through ARKit's collaborative session. Once the curse hits, one player goes deaf and gains sight (hidden clues, glowing locks); the other goes blind and gains spatial hearing and haptic guidance. Neither piece of information is useful alone, so the only way through a puzzle is two people standing in the same room, talking out loud.

**Engineering decisions.**
Under the horror skin it's a disciplined **VIPER + SwiftUI** app on Swift 6 / iOS 18+: Views never talk to ARKit or the network directly, an Interactor owns proximity checks and role logic, and two long-lived services (`ARService`, `NetworkService`) sit beneath every screen. Every random decision — frequencies, spawn points, puzzle answers — is computed once on the Host and replicated to the Guest, so two players can never end up seeing two different curses. Transport is a custom wire protocol over `Network.framework` and Bonjour (deliberately not MultipeerConnectivity): every message carries a 1-byte header saying whether it's a JSON gameplay event or a chunk of binary ARKit collaboration data, with non-critical AR frames dropped once the send queue backs up — a call made specifically so a network hiccup doesn't turn into a broken jump-scare.

**My contribution.**
While building the letter/clue system — a hidden object that the Listener finds by ear before the Seer finds it by sight — I needed spatial audio in RealityKit that respected the actual walls of the room, so a whisper wouldn't just leak cleanly through drywall. There wasn't a simple way to do that. So I built it myself, and open-sourced it as **RealityAudio** (see below) — that's the piece of this project that exists independently of the game.

**Links:** [GitHub — Revenants](https://github.com/bhanage-viraj/Split-Mechanics) · [TestFlight](https://testflight.apple.com/join/bxqH2nP9)

---

## Project 3 — Who's Out

**Card subheading:** Privacy-first friend availability app, built on iOS 27
**Card teaser:** See who's nearby and actually free — on-device AI reasoning over calendar and location, end-to-end encrypted friend sync, and a new Siri integration. Built at HUB WDC 2026.

**The situation.**
Built at the HUB WDC 2026 hackathon, where the challenge was to build something around brand-new iOS 27 platform features. The idea: friends lose track of each other's actual availability — everyone's on their phone, nobody knows who's actually free right now.

**How I thought about it.**
Most "social" apps solve this by adding a feed, which is exactly the wrong instinct — more content isn't the fix for "I don't know who's around." I scoped it down hard: no posting, no feed, no content, just coordination. The app learns a friend's real availability by reasoning over their calendar, location, and Focus sessions, and nudges you when someone nearby is actually free. It also had to justify constant location/calendar access, which meant privacy couldn't be an afterthought bolted on later — it had to be the architecture.

**Engineering decisions.**
The AI reasoning over calendar, location, and Focus data runs on-device — that data never needs to leave the phone to produce a suggestion. Friend-to-friend location updates are end-to-end encrypted, so the server only ever relays ciphertext, never plaintext location. Sign-in is Apple-only, friend pairing is opt-in via invite codes rather than a public graph, and the whole thing ships with a Siri integration built on the new iOS 27 App Intents / Foundation Models stack — you can ask Siri "who's free nearby?" and get a real, on-device-reasoned answer. It's an iOS app + Spring Boot backend monorepo under the hood.

**My contribution.**
Built as part of the hackathon team under real time pressure — the call to scope this down to pure coordination (no feed) rather than a broader social app, and the privacy-first architecture (on-device reasoning, encrypted friend sync) were the product and engineering decisions I'd point to first.

**Links:** [GitHub](https://github.com/bhanage-viraj/Whos-Out) · [TestFlight](https://testflight.apple.com/join/avevSG7f)

---

## Project 4 — Rush Hour

**Card subheading:** A focus app built around timelapse accountability
**Card teaser:** Records your focus sessions on camera and blocks distracting apps while you work — already through its first public exhibition and a round of real user feedback.

**The situation.**
The starting observation was simple: even small tasks get hard when you're constantly pulled away, and ambition without focus doesn't actually get you anywhere. Most focus apps respond to that by just tracking numbers — minutes focused, streaks kept.

**How I thought about it.**
Tracking a number doesn't make someone feel like they showed up for themselves. What does is being able to look back at a session and actually see it — how many times did I get distracted, how did I spend the time, did I really show up for what I said I wanted to do. So instead of a leaderboard, Rush Hour records a timelapse of the session itself, something to reflect on afterward and something you can genuinely share, which builds in accountability without turning focus into a competition.

**Engineering decisions.**
App blocking runs on Apple's Screen Time APIs — `FamilyControls`/`DeviceActivity` — with a dedicated Shield Action and Shield Configuration extension, plus a jailbreak-detection monitor so the block can't just be quietly bypassed. A WidgetKit extension gives at-a-glance session status from the home screen. It's the most actively iterated of the four projects — 139 commits in — which tracks with it being the one that's already been through a real public exhibition and a round of user feedback.

**My contribution.**
Rush Hour had its first public exhibition last month, at the Apple Developer Academy's own showcase — the first time real users incorporated it into actual work sessions and gave feedback on what helped and what to fix. That feedback is currently shaping the pre–App Store refinement pass.

**Links:** [GitHub](https://github.com/bhanage-viraj/RushHour) · [Live site](https://rush-hour-rho.vercel.app) · [TestFlight — link to confirm, see notes]

---

## Project 5 — Sema

**Card subheading:** Offline, on-device Kenyan Sign Language interpreter
**Card teaser:** A bidirectional KSL ↔ English/Swahili interpreter that runs fully offline on iPhone, built on Gemma 4 via llama.cpp for the Gemma for Good Hackathon.

**The situation.**
Built for the Gemma for Good Hackathon. The challenge: Kenyan Sign Language (KSL) interpretation is a real, unmet need, but most translation tooling assumes reliable connectivity and cloud inference — both of which are real barriers for a lot of the communities that would actually use this.

**How I thought about it.**
"Fully offline, runs on a phone people already own" wasn't a technical flex here — it was the actual product requirement. If it needs the cloud, it doesn't work for the people it's meant for. And it had to be two-way: sign to the app and have it interpreted for a hearing person, or have a hearing person's speech signed back — a real conversation, not a one-directional lookup tool.

**Engineering decisions.**
Sema is a bidirectional KSL ↔ English/Swahili interpreter running fully offline, on-device, on iPhone, built on Gemma 4 (E2B) via llama.cpp — small enough to run on-device, capable enough to hold up both directions of a real conversation.

**My contribution.**
Full build for the hackathon submission — the on-device Gemma integration and the bidirectional interpretation flow.

**Links:** [Kaggle writeup](https://www.kaggle.com/competitions/gemma-4-good-hackathon/writeups/new-writeup-1779016365972)

---

## Open Source — RealityAudio

**Card subheading:** Open-source spatial audio package for RealityKit
**Card teaser:** One line of code for LiDAR-aware spatial audio in AR — built out of a real need while making Revenants, published free on GitHub, and featured by DevBytes.

**The situation.**
Born directly out of Revenants: I needed spatial audio in RealityKit that could realistically muffle or block when a real wall or piece of furniture was between the listener and the sound source. RealityKit didn't have a simple way to do that — it meant hand-rolling matrix math and manual `AnchorEntity` setup every time.

**How I thought about it.**
This felt like a gap worth fixing properly rather than a one-off hack buried in the game's codebase, so I pulled it out into its own package.

**Engineering decisions.**
RealityAudio wraps spatial audio setup into a single function call — drop a 3D sound into a scene with one line — with native LiDAR-based occlusion built in, so sound realistically attenuates or blocks based on real-world geometry when the host app enables ARKit scene understanding. It ships with its own test suite and supports iOS 17+ and visionOS 1+.

**Recognition.**
DevBytes covered the release directly: *"Apple Developer Academy graduate Viraj Bhanage has open-sourced RealityAudio, a Swift package that simplifies the implementation of spatial audio in AR apps."* Their piece specifically calls out that it eliminates the need for complex matrix math and manual `AnchorEntity` setup, letting developers create immersive 3D sound with one line of code — and that it comes with native occlusion and a testing suite, free on GitHub. (Published July 15, 2026.)

**Links:** [GitHub](https://github.com/bhanage-viraj/RealityAudio) · [DevBytes coverage](https://devbytes.co.in/news/viraj-bhanages-realityaudio-package-brings-spatial-audio-to-ar-apps-on-ios)

---

## Featured

*(Same card format as Projects — one-line subheading per card, click through to the piece.)*

- **DevBytes** — *RealityAudio: spatial audio for RealityKit on iOS / visionOS* (Jul 2026). [Read it](https://devbytes.co.in/news/viraj-bhanages-realityaudio-package-brings-spatial-audio-to-ar-apps-on-ios)
- **Jagran Josh** — *Profiled for Apple Developer Academy, Bali* (Nov 2025). [Read it](https://www.jagranjosh.com/articles/from-bengaluru-to-bali-how-scaler-school-of-technology-is-shaping-global-ready-tech-innovators-1800005539-1) — the site still blocks automated fetches, so I couldn't pull the actual excerpt that mentions you. Paste the paragraph and I'll write a real one-line teaser for the card instead of this placeholder.

**What else is missing here?** This is the spot to stack any other press, hackathon write-ups, or shout-outs I don't know about — anyone covering Coralyst, Who's Out, Rush Hour, or Sema? Any Apple Developer Academy showcase press for Rush Hour's exhibition? A LinkedIn post from Biorock Indonesia about Coralyst? Send me links/titles/dates and I'll slot each one in as its own card, same format as the two above.

---

## Achievements

- **1st Place — Cursor Bali Hackathon.** Built a posture-tracking macOS app in the time box of the hackathon — tracks a person's posture in real time and flags it back to them.
- **AIR 3 — AlgoUtsav, NIT Rourkela.** Placed 3rd (All India Rank) in NIT Rourkela's national competitive programming contest, hosted by their Algorithmic and Programming Society. *(Confirm this is the right contest name — see notes.)*
- **Kaggle — Dataset Expert & Notebook Expert.** Expert tier on Kaggle.
- **Meta Hacker Cup — Global Rank 1623.** Placed 1,623rd worldwide in Meta's annual competitive programming contest.

---

## Experience

**Apple Developer Academy — Junior Developer**
*March 2026 – Present*
Challenge-based learning program, building shipped iOS products end-to-end. Projects: Coralyst, Revenants, Who's Out, Rush Hour.

## Education

**BITS Pilani** — BS Computer Science, 3rd Year *(add expected graduation)*

## Contact

`Email` · `LinkedIn` · `GitHub` · `Resume (PDF)`

---

## Notes — still need from you

1. **Job title** — still using "Junior Developer" as a placeholder for "IS developer." Confirm the exact official title.
2. **Rush Hour TestFlight** (`JX8RE59Q`) still won't load for me — paste the "What to Test" text from that listing if you want it written up with the same real-language detail as Revenants and Who's Out.
3. **Jagran Josh article** — still blocked from fetching, so the Featured card above is running on your framing (Apple Developer Academy, Bali, Nov 2025) rather than the actual article text. Paste the paragraph that mentions you and I'll turn it into a real teaser line instead of a placeholder.
4. **Coralyst / Sema** — no TestFlight or App Store link for either; send one if it exists, otherwise the site/Kaggle writeup stays as the sole reference.
5. **AlgoUtsav name check** — I couldn't find a contest called "Algoth" at NIT Rourkela, but they run an annual national competitive-programming contest called **AlgoUtsav** through their Algorithmic and Programming Society, which matches an "AIR 3" framing. I've written it up as AlgoUtsav — correct me if it was a different contest (or a different name entirely) and I'll fix it.
6. ~~Cursor Bali Hackathon — name confirmed.~~
7. **Kaggle profile link** — send your Kaggle username/profile URL so I can link "Dataset Expert & Notebook Expert" directly to your profile instead of leaving it as text-only.
8. **Meta Hacker Cup** — which year/round was the 1,623 global rank from? Worth naming the year so it reads as a specific result rather than a vague number.
