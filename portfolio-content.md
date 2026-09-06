# Portfolio Content — Viraj Bhanage

Rewritten as case-study narratives — each project follows the same arc: the situation I walked into, how I thought about it, the calls I made while building it, and what I specifically contributed. Grounded in your actual repos, TestFlight listings, and the DevBytes piece (got the full article text this time). A couple of things still need your input — flagged at the bottom, kept short.

---

## Hero

**Eyebrow:** iOS · On-device AI · Swift packages · Spatial

**Headline:**
> I build intelligence that runs on-device.

**Subhead:**
> 3rd-year BS Computer Science student at BITS Pilani, currently a Junior Developer at the Apple Developer Academy — shipping native iOS, a public Swift package, and on-device inference. No cloud for the hard part.

---

## About

I'm Viraj — an iOS developer who builds on-device AI/ML, which is a specific, stubborn kind of engineering: no cloud to lean on, no server to quietly offload the hard part to, just Swift, Core ML, and whatever the phone in someone's hand can actually do in real time.

That constraint is the thing I keep choosing to work inside. Whether it's a Core ML classifier, a Foundation Models suggestion, a llama.cpp session, or two phones agreeing on one AR room over Network.framework, I care about the moment it has to run on hardware someone's holding — where latency, battery, isolation, and privacy aren't abstractions, they're the design problem.

I've published that work as a Swift package with a public API and tests, written Swift 6 concurrency so network and AR callbacks stay on the right actor, and kept UI in SwiftUI — VIPER where the session is long-lived (Revenants), MVVM where the screens are discrete (Rush Hour).

---

## Project 1 — Coralyst

**Card subheading:** On-device bioacoustic monitoring for coral reef conservation
**Card teaser:** On-device inference: a bundled Core ML classifier listens for blast fishing on a Balinese reef — AVFoundation audio in, local prediction out, no network.
**Stack:** Python, Core ML, Swift/SwiftUI, AVFoundation

**The situation.**
Biorock Indonesia is a coral preservation community in Bali. Their reefs get hit by blast fishing — homemade explosives thrown into the water that kill everything in a 10–30 meter radius and can leave a reef as rubble for decades. It's illegal almost everywhere it happens, but oceans are vast, patrols are thin, and most blasts go unwitnessed. The community didn't need another dashboard — they needed a way to actually catch this happening, at sites with no reliable connectivity.

**How I thought about it.**
A reef makes a sound — fish, shrimp, ambient reef noise — and so does a bomb going off. That gave us a signal to build on: a hydrophone doesn't need to be in the right place at the right moment the way a patrol boat does, and a timestamped recording is a lot harder to dismiss than a secondhand report. The hard constraint was that this had to work at the edge, where connectivity can't be assumed. That ruled out anything that depended on streaming audio to a server for inference — the detection had to happen on the device itself.

**Engineering decisions.**
I built the AI/ML pipeline end-to-end: collecting and preparing hydrophone recordings from ReefSet v1.0 (Williams et al., 2024), training a 2-layer bidirectional LSTM on 40-band log-mel spectrograms from ~1.92s clips to pick out blast-fishing signatures against the ambient noise floor of a healthy vs. degraded reef, and — the part that mattered most — getting that model small and efficient enough to run locally. On-device inference is a bundled Core ML `BlastEventClassifier.mlpackage` loaded with `MLModel`; `BlastClassifier` is `Sendable` and runs prediction on extracted audio features with no live connection. Hydrophone playback and capture sit on `AVFoundation` (`AVAudioEngine` / player nodes). The system logs each detection with a timestamp and estimated location, and separately tracks reef health cues. The held-out field set is the actual failure mode: the model almost never mistakes real reef life for a bomb, but a confidence threshold calibrated on ReefSet doesn't fully transfer to a new recorder or site. Ranking stays strong (ROC-AUC ~0.95–0.98); each training iteration has been closing that domain-shift gap.

**My contribution.**
The AI/ML pipeline was mine, start to finish — model training, and getting a bundled Core ML `BlastEventClassifier` running on-device so a remote Balinese reef doesn't quietly stop working the moment it loses signal.

**By the numbers.**
- **Data.** ReefSet v1.0 (Williams et al., 2024) — 57,074 hand-labeled hydrophone clips across 16 sites worldwide.
- **Positive class.** 203 confirmed Indonesia blast clips (`anthrop_bomb`).
- **External test.** 38 independent field recordings ("Drive"), held out — never touched during training, different recorder and gain than ReefSet.
- **Model.** 2-layer bidirectional LSTM, hidden size 64, dropout 0.3, mean-pool + linear head, trained on 40-band log-mel spectrograms from ~1.92s clips.

| Setup | ReefSet held-out recall | Confuses real reef sounds? | Unseen field recordings |
| --- | --- | --- | --- |
| A — Indonesia bombs vs. Indonesia ambient | 41/42 (98%), F1 0.94 | not tested | not tested |
| B — + every shrimp/reef-sound class in training | 42/42 (100%) | 0.12% false-positive rate | 7/38 (18%) |
| C — balanced slice of all 37 ReefSet label types | 5/5 (small n) | 0.57% false-positive rate | 12/38 (32%) |

The model reliably tells a blast from reef background noise, and it almost never mistakes real reef life — snapping shrimp, fish knocks, waves — for a bomb. What it hasn't solved yet is transferring that threshold to a totally new recorder or site: ranking stays strong (ROC-AUC ~0.95–0.98), but the confidence threshold calibrated on ReefSet doesn't fully carry over to real field audio yet. Each iteration (B→C) measurably closes that gap (18%→32% field recall).

**Links:** [GitHub](https://github.com/Gleenryan/CH5_Biorocks) · [Live prototype](https://coralyst.vercel.app)

---

## Project 2 — Revenants

**Card subheading:** Asymmetrical co-op AR horror game
**Card teaser:** Swift 6 concurrency + a custom Network.framework / Bonjour protocol: two phones, one LiDAR-scanned room, ARKit collaboration, Core Haptics, and a Swift package spun out for spatial audio.
**Stack:** Swift 6 concurrency, SwiftUI, VIPER, ARKit, RealityKit, RoomPlan, Core Haptics, Network.framework, Combine

**The situation.**
This was a co-op AR game project: two players in the same physical room, one experience, built to be genuinely playable together rather than side-by-side. The concept was an asymmetrical horror escape room — a curse splits the two players' senses, and neither can get through it alone.

**How I thought about it.**
The interesting problem wasn't the horror theming, it was the coordination problem underneath it: two phones that have never met need to agree, to the centimeter, on where a doll is sitting on a real rug. One phone has LiDAR and can build an accurate model of the room; the other doesn't. Rather than treat that as a limitation, we turned it into the plot — the LiDAR phone becomes the Host and builds the map, the other becomes the Guest and joins that shared coordinate space through ARKit's collaborative session. Once the curse hits, one player goes deaf and gains sight (hidden clues, glowing locks); the other goes blind and gains spatial hearing and haptic guidance. Neither piece of information is useful alone, so the only way through a puzzle is two people standing in the same room, talking out loud.

**Engineering decisions.**
Under the horror skin it's a disciplined **VIPER + SwiftUI** app on Swift 6 / iOS 18+ — not MVVM; Views never talk to ARKit or the network directly, an Interactor owns proximity checks and role logic, and two long-lived `@MainActor` services (`ARService`, `NetworkService`) sit beneath every screen. `NetworkService` is an `ObservableObject` (Combine) isolated to the main actor: `Network.framework` callbacks hop back with `Task { @MainActor in … }` so UI state and the send queue stay thread-safe. Every random decision — frequencies, spawn points, puzzle answers — is computed once on the Host and replicated to the Guest. Transport is a custom wire protocol over `Network.framework` and Bonjour `_arcurse._tcp` (deliberately not MultipeerConnectivity): frame layout `[kind: 1 byte][length: 4 bytes][payload]`, JSON gameplay events vs binary ARKit collaboration data. Non-critical AR frames are dropped once `pendingSends.count > 6` so a backed-up queue can't stall world-merge. Host room capture is **RoomPlan**; gameplay uses ARKit collaborative sessions, RealityKit, LiDAR, and Core Haptics on a 60 fps proximity loop. Peer names on the wire come from UIKit's `UIDevice`; the UI itself is SwiftUI.

**My contribution.**
While building the letter/clue system — a hidden object that the Listener finds by ear before the Seer finds it by sight — I needed spatial audio in RealityKit that respected the actual walls of the room, so a whisper wouldn't just leak cleanly through drywall. There wasn't a simple way to do that. So I built it myself, packaged it as a Swift package, and open-sourced it as **RealityAudio**.

**Links:** [GitHub — Revenants](https://github.com/bhanage-viraj/Split-Mechanics) · [TestFlight](https://testflight.apple.com/join/bxqH2nP9)

---

## Project 3 — Who's Out

**Card subheading:** Privacy-first friend availability — coordination, not a feed
**Card teaser:** Friend graph, E2E location sync, REST + CryptoKit, on-device Foundation Models, Siri / App Intents. Built at IndeHub WWDC26; the product is coordination, not a social feed.
**Stack:** Swift/SwiftUI, Foundation Models, App Intents, URLSession, CryptoKit, Keychain, Spring Boot, EventKit, Core Location

**The situation.**
Friends lose track of each other's actual availability — everyone's on their phone, nobody knows who's actually free right now. Built at IndeHub WWDC26 around new iOS 27 platform features, but the product problem is older than the hackathon: coordination, not content.

**How I thought about it.**
Most "social" apps solve this by adding a feed, which is exactly the wrong instinct — more content isn't the fix for "I don't know who's around." I scoped it down hard: no posting, no feed, no content, just a friend graph and availability. The app reasons over calendar (EventKit), location (Core Location), and Focus sessions, then nudges you when someone nearby is actually free. Constant location/calendar access meant privacy had to be the architecture, not a settings toggle.

**Engineering decisions.**
On-device inference first: Foundation Models run on the phone over calendar / location / Focus — that data never needs to leave the device to produce a suggestion. Friend-to-friend location is end-to-end encrypted with **CryptoKit** (`CryptoBox`: X25519, ChaCha20-Poly1305); the Spring Boot API only stores and relays ciphertext. Networking is a Swift `actor` `APIClient` over `URLSession` — JSON REST, Bearer auth, token refresh. Tokens and identity keys live in the **Keychain**. Pairing is opt-in (invite codes / QR), Apple-only sign-in. Siri is App Intents plus WidgetKit / Live Activity. `KismetTests` unit-test target. Architecture is SwiftUI + feature stores — not MVVM, not VIPER.

**My contribution.**
Built as part of the hackathon team under time pressure — the call to ship pure coordination (friend graph, encrypted sync, Siri) rather than a broader social app, and the privacy-first split (on-device reasoning, ciphertext-only backend) are the decisions I'd point to first.

**Links:** [GitHub](https://github.com/bhanage-viraj/Whos-Out) · [TestFlight](https://testflight.apple.com/join/avevSG7f)

---

## Project 4 — Rush Hour

**Card subheading:** A focus app built around timelapse accountability
**Card teaser:** MVVM + SwiftUI: AVFoundation timelapse capture (`AVCaptureSession`), Screen Time blocking, WidgetKit — exhibited, then iterated from real users.
**Stack:** Swift/SwiftUI, MVVM, AVFoundation, UIKit, FamilyControls, DeviceActivity, WidgetKit, Combine

**The situation.**
The starting observation was simple: even small tasks get hard when you're constantly pulled away, and ambition without focus doesn't actually get you anywhere. Most focus apps respond to that by just tracking numbers — minutes focused, streaks kept.

**How I thought about it.**
Tracking a number doesn't make someone feel like they showed up for themselves. What does is being able to look back at a session and actually see it — how many times did I get distracted, how did I spend the time, did I really show up for what I said I wanted to do. So instead of a leaderboard, Rush Hour records a timelapse of the session itself, something to reflect on afterward and something you can genuinely share, which builds in accountability without turning focus into a competition.

**Engineering decisions.**
This one **is MVVM + SwiftUI**: discrete screens own a `*ViewModel` as `@MainActor` `ObservableObject`s (Combine). Session video is **AVFoundation** — `AVCaptureSession` for camera capture, export, and a timelapse you can replay or share — with UIKit `UIImage` frames for the in-session preview. App blocking runs on Screen Time (`FamilyControls` / `DeviceActivity`) plus Shield extensions, and a jailbreak-detection monitor. WidgetKit shows whether a session is actually running from the home screen.

**My contribution.**
The Screen Time stack was mine, and so was the camera path: `FamilyControls` / `DeviceActivity`, the Shield extensions, the jailbreak monitor, the `AVFoundation` timelapse, and the WidgetKit surface. After the Academy showcase, real users put it in actual work sessions; that feedback is the pre–App Store pass.

**Links:** [GitHub](https://github.com/bhanage-viraj/RushHour) · [TestFlight](https://testflight.apple.com/join/JX8RE59Q) · [Live site](https://rush-hour-rho.vercel.app)

---

## Project 5 — Sema

**Card subheading:** Offline, on-device Kenyan Sign Language interpreter
**Card teaser:** On-device inference: bidirectional KSL ↔ English/Swahili on iPhone — Gemma 4 via llama.cpp, camera in through MediaPipe, no cloud.
**Stack:** Gemma 4, llama.cpp, MediaPipe, Swift/SwiftUI

**The situation.**
Built for the Gemma for Good Hackathon. The challenge: Kenyan Sign Language (KSL) interpretation is a real, unmet need, but most translation tooling assumes reliable connectivity and cloud inference — both of which are real barriers for a lot of the communities that would actually use this.

**How I thought about it.**
"Fully offline, runs on a phone people already own" wasn't a technical flex here — it was the actual product requirement. If it needs the cloud, it doesn't work for the people it's meant for. And it had to be two-way: sign to the app and have it interpreted for a hearing person, or have a hearing person's speech signed back — a real conversation, not a one-directional lookup tool.

**Engineering decisions.**
Sema is a bidirectional KSL ↔ English/Swahili interpreter running fully offline, on-device, on iPhone. Sign language hits the camera through MediaPipe; speech/text is handled by Gemma 4 (E2B) via llama.cpp — small enough for on-device inference, capable enough for both directions of a real conversation. If it needs the cloud, it doesn't work for the people it's meant for, so there is no server-side model.

**My contribution.**
Full build for the hackathon submission — the on-device Gemma / llama.cpp integration and the bidirectional interpretation flow.

**Links:** [TestFlight](https://testflight.apple.com/join/h9gftDva) · [Kaggle writeup](https://www.kaggle.com/competitions/gemma-4-good-hackathon/writeups/new-writeup-1779016365972)

---

## Open Source — RealityAudio

**Card subheading:** Published Swift package — spatial audio SDK for RealityKit
**Card teaser:** SPM library with a public API (`RealityAudio.play`), Swift 6, AVFoundation + RealityKit, unit tests — extracted from Revenants so any AR app can import it. Featured by DevBytes.
**Stack:** Swift Package Manager, Swift 6, RealityKit, ARKit, AVFoundation, Swift Testing

**The situation.**
Born directly out of Revenants: I needed spatial audio in RealityKit that could realistically muffle or block when a real wall or piece of furniture was between the listener and the sound source. RealityKit didn't have a simple way to do that — it meant hand-rolling matrix math and manual `AnchorEntity` setup every time. That's an SDK problem, not a game-only hack.

**How I thought about it.**
If I was going to fix it, it had to be importable: a Swift package with a public API, explicit framework links, and tests — extracted from the game so another AR app can add it the same way.

**Engineering decisions.**
RealityAudio is a **Swift Package** (`Package.swift`, Swift tools 6.3, Swift 6 language mode). The product is a library target that links **RealityKit** and **AVFoundation**. The public API is one `@MainActor` entry point: `RealityAudio.play(_:in:at:occluded:)` — load an audio file, attach a `SpatialAudioComponent` at a world position, return the emitter `Entity`. LiDAR occlusion is opt-in and pairs with the host `ARView`'s scene-understanding `.occlusion` flag. Platforms: iOS 17+ and visionOS 1+. Tests live in `RealityAudioTests` (Swift Testing). Written so Revenants could drop a letter/clue whisper that respects real walls, then published as its own package.

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
- **School of Solana (Ackee Blockchain).** Certified in Rust & Solana program development; built a functional on-chain Solana program with Anchor as the capstone.
- **3rd Place — Unicorn Bharat Hackathon (2024).** Built a marketplace for farmers to sell their goods.

---

## Experience

**Apple Developer Academy — Junior Developer**
*March 2026 – Present*
Challenge-based program shipping native iOS end-to-end: on-device Core ML and Foundation Models, Swift 6 concurrency around Network.framework / ARKit, a published Swift package, and TestFlight apps (Coralyst, Revenants, Who's Out, Rush Hour).

## Education

**BITS Pilani** — BS Computer Science, 3rd Year *(add expected graduation)*

## Contact

`Email` · `LinkedIn` · `GitHub` · `Resume (PDF)`

---

## Notes — still need from you

1. **Job title** — still using "Junior Developer" as a placeholder for "IS developer." Confirm the exact official title.
2. ~~Rush Hour TestFlight — [join link](https://testflight.apple.com/join/JX8RE59Q) added.~~
3. **Jagran Josh article** — still blocked from fetching, so the Featured card above is running on your framing (Apple Developer Academy, Bali, Nov 2025) rather than the actual article text. Paste the paragraph that mentions you and I'll turn it into a real teaser line instead of a placeholder.
4. **Coralyst** — no TestFlight or App Store link; send one if it exists, otherwise the live prototype stays as the sole reference. Sema TestFlight: [h9gftDva](https://testflight.apple.com/join/h9gftDva).
5. **AlgoUtsav name check** — I couldn't find a contest called "Algoth" at NIT Rourkela, but they run an annual national competitive-programming contest called **AlgoUtsav** through their Algorithmic and Programming Society, which matches an "AIR 3" framing. I've written it up as AlgoUtsav — correct me if it was a different contest (or a different name entirely) and I'll fix it.
6. ~~Cursor Bali Hackathon — name confirmed.~~
7. **Kaggle profile link** — send your Kaggle username/profile URL so I can link "Dataset Expert & Notebook Expert" directly to your profile instead of leaving it as text-only.
8. **Meta Hacker Cup** — which year/round was the 1,623 global rank from? Worth naming the year so it reads as a specific result rather than a vague number.
