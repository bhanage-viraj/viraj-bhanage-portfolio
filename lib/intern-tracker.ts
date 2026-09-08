export type JobStatus =
  | "to_apply"
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "hold";

/**
 * When Viraj prompts “add this internship”, fill a complete Job:
 * apply URL or mailTo, resume folder under resumes/pdf/<Company>/Viraj-Bhanage.pdf,
 * coverNote or mailBody, lead (true stack only), status.
 * Never invent RxSwift / Core Data / Realm / Firebase / work auth.
 * Identity is always Bali, +91 8855867440, need sponsorship, Expected 2028.
 */
export type Job = {
  id: string;
  order: number;
  company: string;
  role: string;
  term: string;
  when: string;
  where: string;
  why: string;
  risk: string;
  href: string;
  extraHref?: string;
  extraLabel?: string;
  applyLabel: string;
  /** Company folder under resumes/pdf/. File is always Viraj-Bhanage.pdf */
  resume: string;
  lead: string;
  /** Official status from this Cursor chat. Overlay with local marks on the page. */
  status: JobStatus;
  appliedOn?: string;
  note?: string;
  /** apply = posting exists. email = no live listing / lost posting. */
  channel?: "apply" | "email";
  mailTo?: string;
  mailSubject?: string;
  mailBody?: string;
  coverNote?: string;
};

export type ChatEntry = {
  id: string;
  at: string;
  from: "cursor" | "you";
  text: string;
};

export const internDesk = {
  asOf: "9 September 2026",
  chatId: "5f5bd748-3f89-4678-88a8-ccc623429751",
  identity: {
    name: "Viraj Bhanage",
    email: "virajbhanage00@gmail.com",
    phone: "+91 8855867440",
    location: "Bali, Indonesia",
    school: "BITS Pilani — B.S. Computer Science",
    year: "3rd year · Expected 2028",
    sponsorship: "Need sponsorship — do not claim you already have it",
    portfolio: "https://www.bhanageviraj.tech",
    github: "https://github.com/bhanage-viraj",
    linkedin: "https://www.linkedin.com/in/bhanageviraj/",
  },
};

export const RESUME_FILE = "Viraj-Bhanage.pdf";

export function resumeRelPath(job: Job) {
  return `resumes/pdf/${job.resume}/${RESUME_FILE}`;
}

export function resumeAbsPath(job: Job) {
  return `/Users/bhanageviraj/Desktop/Portfollio/${resumeRelPath(job)}`;
}

export const jobs: Job[] = [
  {
    id: "capital-one",
    order: 1,
    company: "Capital One Canada",
    role: "Mobile SWE Intern — Winter 2027",
    term: "Winter 2027",
    when: "This week if the assessment was submitted by 7 Sep 23:59 — otherwise treat as closed",
    where: "Toronto hybrid",
    why: "Only verified paid January 2027 mobile intern. Swift on the stack. CAD $45k–$85k annualized.",
    risk: "Canadian work permit not promised. Full-stack, not iOS-only.",
    href: "https://capitalone.wd12.myworkdayjobs.com/en-US/Capital_One/job/Intern--Mobile-Software-Engineer---Team-Gringotts-North---Winter-2027_R249015",
    applyLabel: "Workday",
    resume: "Capital-One",
    lead: "Who's Out REST + Spring Boot",
    status: "hold",
  },
  {
    id: "revolut",
    order: 2,
    company: "Revolut",
    role: "Internship 2027 — Software Engineer (iOS)",
    term: "Summer 2027",
    when: "This week. Rolling through Dec 2026. June/July 2027 start.",
    where: "PL / PT / UAE / UK — visa + travel + housing offered",
    why: "Best native-iOS intern open worldwide. Graduating 2028 window. International applicants invited.",
    risk: "JD lists RxSwift / Core Data / Realm — do not claim them. Lead Rush Hour MVVM.",
    href: "https://www.revolut.com/careers/apply/bc2ddc16-c0ca-4c39-9db7-390db7f6cb3c/",
    applyLabel: "Revolut apply",
    resume: "Revolut",
    lead: "Rush Hour MVVM + SwiftUI",
    status: "to_apply",
  },
  {
    id: "argmax",
    order: 3,
    company: "Argmax",
    role: "On-device AI Frameworks Engineer (Intern)",
    term: "Jan or Summer 2027",
    when: "This week — Greenhouse, then founder note",
    where: "Palo Alto or Manhattan, 3 days on-site",
    why: "Closest skill match: Swift + Core ML / on-device SDK.",
    risk: "Start month unpublished. Visa not stated.",
    href: "https://job-boards.greenhouse.io/argmax/jobs/4067268009",
    applyLabel: "Greenhouse",
    resume: "Argmax",
    lead: "RealityAudio + Coralyst + Sema",
    status: "to_apply",
  },
  {
    id: "applovin",
    order: 4,
    company: "AppLovin (Gist)",
    role: "Mobile Engineering Intern — Summer 2027",
    term: "Summer 2027",
    when: "This week",
    where: "Singapore on-site",
    why: "Native iOS or Android on a new social app. Media + threading.",
    risk: "Android equally valid. Sponsorship asked, not promised.",
    href: "https://job-boards.greenhouse.io/applovin/jobs/4708448006",
    applyLabel: "Greenhouse",
    resume: "AppLovin",
    lead: "Who's Out social + Rush Hour camera",
    status: "to_apply",
  },
  {
    id: "tiktok",
    order: 5,
    company: "TikTok",
    role: "Mobile Engineer Intern (Intelligent Creation) — 2027",
    term: "2027 — date TBD",
    when: "This week. Slot 1 of 2. Do not submit a second TikTok until this is in.",
    where: "Singapore on-site",
    why: "AR / creation / mobile performance. Swift accepted.",
    risk: "iOS not guaranteed. Two-application global cap.",
    href: "https://careers.tiktok.com/resume/7663326108122515717/apply",
    applyLabel: "TikTok apply",
    resume: "TikTok",
    lead: "Revenants AR + Coralyst + Rush Hour",
    status: "to_apply",
  },
  {
    id: "verkada",
    order: 6,
    company: "Verkada",
    role: "Mobile SWE Intern 2027 (Winter or Summer)",
    term: "Winter or Summer 2027",
    when: "This week",
    where: "San Mateo on-site",
    why: "Native iOS, Swift 6, APIs, tests. Visa sponsorship is written on the posting.",
    risk: "Some mirrors say grad 2026. Put Expected 2028 on the form.",
    href: "https://job-boards.greenhouse.io/verkada/jobs/5219131007",
    applyLabel: "Greenhouse",
    resume: "Verkada",
    lead: "Swift 6 + REST + tests",
    status: "to_apply",
  },
  {
    id: "apple-ist",
    order: 7,
    company: "Apple IS&T",
    role: "2027 Information Systems and Technology intern",
    term: "2027 (grad window Jun 2027–Jun 2028)",
    when: "This week",
    where: "Singapore first; Sydney backup",
    why: "Grad window matches. Swift / Obj-C and Mobile Applications are listed tracks.",
    risk: "Team is not guaranteed iOS. Work pass is not automatic.",
    href: "https://jobs.apple.com/en-us/details/200675982-3278/2027-apple-internship-information-systems-and-technology",
    extraHref:
      "https://jobs.apple.com/en-in/details/200676288-3957/2027-apple-internship-information-systems-and-technology-aus",
    extraLabel: "Sydney backup",
    applyLabel: "Apple Singapore",
    resume: "Apple-IST",
    lead: "Dashboard / APIs / App Intents",
    status: "to_apply",
  },
  {
    id: "apple-us",
    order: 8,
    company: "Apple US",
    role: "Software undergrad engineering internships",
    term: "Oct 2026–Sep 2027 window",
    when: "This week (interest pipeline)",
    where: "United States",
    why: "Submit once for Jan or Summer placement.",
    risk: "US intern visa from an Indian university is the hard part.",
    href: "https://jobs.apple.com/en-us/details/200664785-3810/software-undergrad-engineering-internships",
    applyLabel: "Apple US",
    resume: "Apple-US",
    lead: "Package + AR + Core ML + Foundation Models",
    status: "to_apply",
  },
  {
    id: "line",
    order: 9,
    company: "LINE Thailand",
    role: "iOS Engineering Intern (ROOKIE)",
    term: "2027 — date TBD",
    when: "This week if the form is still live",
    where: "Bangkok, ~10 weeks",
    why: "Required Swift + SwiftUI on a messaging super-app.",
    risk: "2027 dates and visa unstated.",
    href: "https://careers.linecorp.com/jobs/2934",
    applyLabel: "LINE careers",
    resume: "LINE",
    lead: "SwiftUI + URLSession + Keychain",
    status: "to_apply",
  },
  {
    id: "frontpage",
    order: 10,
    company: "FrontPage (YC S21)",
    role: "SWE Intern — AI-native product (iOS track)",
    term: "2027 — 4–6 months",
    when: "This week — India, paid, no visa",
    where: "Bengaluru HSR",
    why: "YC, profitable, Swift in the stack, ₹30–50k/mo.",
    risk: "Prefers final-year. Offer 4–6 months and convert.",
    href: "https://www.workatastartup.com/jobs/103634",
    applyLabel: "WAAS",
    resume: "FrontPage",
    lead: "AI client + Spring Boot",
    status: "to_apply",
  },
  {
    id: "tiktok-live",
    order: 11,
    company: "TikTok Live Foundation",
    role: "iOS Software Engineer Intern — 2027 start",
    term: "2027 — Sydney",
    when: "Live 8 Sep. Hold until Creation SG (slot 1) is in. Slot 2 only.",
    where: "Sydney on-site",
    why: "Native iOS intern (Swift or Objective-C), not a generic mobile intern.",
    risk: "Global two-application cap. AU visa NOT VERIFIED. Aggregator claimed Dec 2026 start / 19 Oct deadline — official page does not say that.",
    href: "https://careers.tiktok.com/resume/7661940129289947397/apply",
    applyLabel: "TikTok Live apply",
    resume: "TikTok-Live",
    lead: "Rush Hour + Revenants",
    status: "hold",
  },
  {
    id: "n26",
    order: 12,
    company: "N26",
    role: "Junior iOS Engineer — Payments",
    term: "Junior FT — now / Jan 2027",
    when: "Verified live 8 Sep. Apply only if you can take leave and move.",
    where: "Hybrid Berlin or Barcelona",
    why: "Junior iOS on payments. Relocation package with visa support is written on the posting. MVVM / VIPER listed.",
    risk: "Not an intern. Expected 2028. Hybrid EU, not remote from Bali.",
    href: "https://n26.com/en-eu/careers/positions/8163939",
    applyLabel: "N26 apply",
    resume: "N26",
    lead: "Revenants VIPER + Who's Out REST",
    status: "hold",
  },
  {
    id: "ego",
    order: 13,
    company: "ego (YC W24)",
    role: "Member of Technical Staff — iOS (new grads ok)",
    term: "FT — pitch intern/contract",
    when: "Verified live 8 Sep. Apply this week + founder note.",
    where: "SF hybrid; listing also says Remote Tokyo / SG",
    why: "SwiftUI, shipped consumer iOS, LLM-on-device nice-to-have. 9-person team.",
    risk: "Visa field says US citizen/visa only while location lists SG/Tokyo. Resolve in the first sentence.",
    href: "https://www.ycombinator.com/companies/ego/jobs/0Gwm3fO-member-of-technical-staff-ios-engineer",
    applyLabel: "YC / WAAS",
    resume: "ego",
    lead: "Who's Out + RealityAudio",
    status: "to_apply",
  },
  {
    id: "runanywhere",
    order: 14,
    company: "RunAnywhere",
    role: "iOS SDK intern — not posted",
    term: "Winter or Summer 2027",
    when: "Send this week. No public iOS intern JD.",
    where: "Ask — do not assume remote",
    why: "No public iOS intern JD. They do have a remote DevRel intern (visa not required). Still ask Sanchit for iOS SDK intern, not DevRel, unless you want the writing seat.",
    risk: "No listing. Ask for iOS SDK intern, not DevRel.",
    href: "mailto:san@runanywhere.ai",
    extraHref: "https://www.workatastartup.com/jobs/98717",
    extraLabel: "DevRel intern (not iOS)",
    applyLabel: "Open Mail",
    resume: "RunAnywhere",
    lead: "Sema + RealityAudio + Coralyst Core ML",
    status: "to_apply",
    channel: "email",
    mailTo: "san@runanywhere.ai",
    mailSubject: "iOS SDK intern — on-device Swift (Viraj Bhanage)",
    mailBody: `Hi Sanchit,

I'm Viraj Bhanage, 3rd-year CS at BITS Pilani, currently at the Apple Developer Academy in Bali. RunAnywhere does not have a public iOS intern posting. I am asking for an iOS SDK intern seat (not DevRel) for Winter or Summer 2027.

I ship on-device, not wrappers:
• RealityAudio — published Swift package (audio + spatial)
• Coralyst — Core ML LSTM blast-fishing classifier, bundled on-device
• Sema — on-device KSL ↔ English/Swahili via llama.cpp / Gemma

Need sponsorship. Expected 2028. Portfolio: https://www.bhanageviraj.tech
Happy to send the tailored PDF and jump on a short call.

Viraj Bhanage
virajbhanage00@gmail.com
+91 8855867440
https://github.com/bhanage-viraj`,
  },
  {
    id: "speak",
    order: 15,
    company: "Speak",
    role: "iOS intern — listing still titled Summer 2026",
    term: "Ask Winter / Summer 2027",
    when: "Email first. Do not submit a 2026 form as if it were 2027.",
    where: "Unconfirmed",
    why: "iOS product exists. Cycle name is stale.",
    risk: "If they only have 2026 leftover, skip.",
    href: "https://www.workatastartup.com/jobs/88690",
    applyLabel: "WAAS (stale)",
    resume: "Speak",
    lead: "Sema on-device language + Rush Hour",
    status: "hold",
    channel: "email",
    mailSubject: "Winter/Summer 2027 iOS intern — Viraj Bhanage",
    mailBody: `Hi Speak team — please forward to Andrew Hsu if useful.

Your WAAS iOS intern row still reads Summer 2026. Is there a Winter or Summer 2027 native-iOS intern seat?

I'm Viraj Bhanage, 3rd-year CS at BITS, Apple Developer Academy (Bali). On-device language + camera: Sema (KSL ↔ English/Swahili on-device) and Rush Hour (AVCaptureSession + Screen Time). Need sponsorship. Expected 2028.

https://www.bhanageviraj.tech
virajbhanage00@gmail.com
+91 8855867440`,
  },
  {
    id: "jar",
    order: 16,
    company: "Jar",
    role: "iOS intern — listing may have vanished",
    term: "2027 if they reopen",
    when: "Recheck careers, then send this mail if the iOS intern row is gone.",
    where: "India",
    why: "Fintech iOS. Only email if the intern row disappeared.",
    risk: "Do not invent a posting. This is a lost-listing mail.",
    href: "https://changejar.applytojob.com/apply",
    applyLabel: "Jar careers",
    resume: "Jar",
    lead: "Who's Out REST + Spring Boot",
    status: "hold",
    channel: "email",
    mailSubject: "iOS intern 2027 — Viraj Bhanage (BITS, Apple Developer Academy)",
    mailBody: `Hi Jar iOS / recruiting,

I am writing because the iOS intern row on your careers board has been flaky. If a Winter or Summer 2027 native-iOS intern seat is open, I would like to apply.

Viraj Bhanage — 3rd-year CS, BITS Pilani, Apple Developer Academy (Bali). Who's Out (Swift 6 URLSession actor + Spring Boot) and Rush Hour (SwiftUI + AVCaptureSession). Need sponsorship only if the seat is not India. Expected 2028.

https://www.bhanageviraj.tech
virajbhanage00@gmail.com
+91 8855867440`,
  },
  {
    id: "infilect",
    order: 17,
    company: "Infilect",
    role: "Mobile intern — no native-iOS intern JD",
    term: "Ask 2027",
    when: "Cold email. Career page is generic.",
    where: "India",
    why: "On-device models + shipped iOS, not Flutter.",
    risk: "They may only want full-time / Android.",
    href: "https://www.infilect.com/career",
    applyLabel: "Career page",
    resume: "Infilect",
    lead: "Coralyst Core ML + RealityAudio",
    status: "hold",
    channel: "email",
    mailSubject: "On-device iOS intern 2027 — Viraj Bhanage",
    mailBody: `Hi Infilect,

Is there a 2027 intern seat for native iOS + on-device models (not Flutter)?

I am Viraj Bhanage, 3rd-year CS at BITS, Apple Developer Academy (Bali). Coralyst runs a bundled Core ML classifier on-device. RealityAudio is a published Swift package. Expected 2028. Based in Bali; India on-site is realistic.

https://www.bhanageviraj.tech
virajbhanage00@gmail.com
+91 8855867440`,
  },
  {
    id: "suno",
    order: 18,
    company: "Suno",
    role: "SwiftUI intern — no intern row, only FT board",
    term: "Ask 2027 intern on the SwiftUI seat",
    when: "Ashby is FT-shaped. Send the mail, do not fake an intern apply.",
    where: "Unconfirmed",
    why: "Audio + SwiftUI is a real fit if they take an intern.",
    risk: "May be FT-only. Do not apply to a senior req as intern.",
    href: "https://jobs.ashbyhq.com/suno",
    applyLabel: "Suno Ashby",
    resume: "Suno",
    lead: "RealityAudio + Rush Hour",
    status: "hold",
    channel: "email",
    mailSubject: "SwiftUI intern 2027 — RealityAudio / Rush Hour — Viraj Bhanage",
    mailBody: `Hi Suno iOS hiring,

Your Ashby board does not show a 2027 intern. If you will take a native-iOS intern on the SwiftUI seat, I would like to be considered.

Viraj Bhanage — 3rd-year CS, BITS Pilani, Apple Developer Academy (Bali). RealityAudio (published Swift package) and Rush Hour (SwiftUI + camera). Need sponsorship. Expected 2028.

https://www.bhanageviraj.tech
virajbhanage00@gmail.com
+91 8855867440`,
  },
  {
    id: "twinmind",
    order: 19,
    company: "TwinMind",
    role: "iOS Engineer — full-time or internship",
    term: "Immediate / intern (dates unpublished)",
    when: "Apply this week. Official page still lists Fulltime / Internship.",
    where: "Menlo Park, CA — in office",
    why: "Tiny AI-native iOS product. JD asks SwiftUI + on-device models (Core ML / MLX bonus). Intern track is written on the page.",
    risk: "On-site California. International hiring UNKNOWN. US intern visa from BITS is the hard part. Wellfound copy also mentions 3 years exp in some index snippets — ignore aggregator text; the company page says internship is allowed.",
    href: "https://tally.so/r/mBMzg4",
    extraHref: "https://twinmind.com/about/ios-engineer",
    extraLabel: "JD",
    applyLabel: "Tally apply",
    resume: "TwinMind",
    lead: "Sema llama.cpp + Coralyst Core ML + Rush Hour SwiftUI",
    status: "to_apply",
  },
  {
    id: "bloom",
    order: 20,
    company: "Bloom (YC)",
    role: "AI Engineering Student Internship",
    term: "Listing still says Winter or Summer 2026",
    when: "Form is live 8 Sep 2026. Ask if a Winter 2027 seat exists. Title is stale.",
    where: "Zurich — US citizenship/visa not required",
    why: "Small YC team. Student intern. Portfolio apply. Swift is a bonus, TypeScript is the core. Mobile-app creator product.",
    risk: "Not a native-iOS intern. Cycle name is 2026. Zurich on-site implied. Expected 2028 vs convert-after-grad language.",
    href: "https://www.workatastartup.com/jobs/82957",
    applyLabel: "WAAS Bloom",
    resume: "Bloom",
    lead: "Who's Out + Sema — you ship apps, they generate apps",
    status: "to_apply",
  },
  {
    id: "flavorscale",
    order: 21,
    company: "FlavorScale",
    role: "iOS intern — native rebuild (listing marked inactive)",
    term: "Work-student / intern. 2026/2027 funding cycle mentioned.",
    when: "Hub page says no longer active. Email Penelope. Do not apply to a dead form.",
    where: "Remote-first, must be located within the EU",
    why: "Exact 3rd-year bet: Flutter MVP → native Swift/SwiftUI, portfolio mandatory, work with CTO/CEO, student explicitly invited.",
    risk: "Bali is not EU. They wrote Located within EU. No paid-role promise. Listing inactive.",
    href: "mailto:Peneloppe@flavorscale.app",
    extraHref: "https://thehub.io/jobs/69f33cc638b05d4153e381ef",
    extraLabel: "Hub JD (inactive)",
    applyLabel: "Open Mail",
    resume: "FlavorScale",
    lead: "Rush Hour SwiftUI + Revenants",
    status: "to_apply",
    channel: "email",
    mailTo: "Peneloppe@flavorscale.app",
    mailSubject: "Native iOS intern — SwiftUI rebuild — Viraj Bhanage",
    mailBody: `Hi Penelope,

The Hub listing for FlavorScale's native iOS intern is marked inactive. If you still need someone to rebuild the Flutter MVP in Swift/SwiftUI, I want that seat.

I am Viraj Bhanage, 3rd-year CS at BITS, currently at the Apple Developer Academy in Bali. I ship native iOS, not wrappers: Rush Hour (SwiftUI + AVCaptureSession) and Revenants (Swift 6 / RealityKit). Portfolio-first is how I apply.

I am not in the EU. If remote-from-Bali is a no, say so. If a 2027 intern or contractor seat exists, I can send the tailored PDF today.

https://www.bhanageviraj.tech
virajbhanage00@gmail.com
+91 8855867440`,
  },
  {
    id: "metry-ai",
    order: 22,
    company: "Metry AI",
    role: "App Development Intern (iOS / Android)",
    term: "3–6 months, rolling",
    when: "Apply this week. Wellfound says intern, student/recent grad, no experience required, remote everywhere.",
    where: "Remote everywhere (company listed Alberta / Tokyo / Taipei)",
    why: "Highest remote YES-chance in this pass. Student intern. Swift is on the skill list. Founder-accessible on Wellfound.",
    risk: "Stack is Swift OR Kotlin OR Flutter OR React Native — native iOS is not guaranteed. Visa sponsorship not available. Quality of the intern program is UNKNOWN. Do not treat this as an on-device AI seat.",
    href: "https://wellfound.com/jobs/3470786-app-development-intern-ios-android",
    extraHref: "https://wellfound.com/company/metry-ai",
    extraLabel: "Company",
    applyLabel: "Wellfound",
    resume: "Metry-AI",
    lead: "Rush Hour SwiftUI + Who's Out",
    status: "to_apply",
  },
  {
    id: "bytedance-ios",
    order: 23,
    company: "ByteDance",
    role: "iOS Engineer Intern (Global Payment) — 2027 Start",
    term: "2027 — dates unpublished; state availability on the resume",
    when: "Apply this week. Native iOS intern in Singapore.",
    where: "Singapore on-site",
    why: "Only new native-iOS intern found in SG this pass. Swift/Obj-C preferred. Payments + TikTok Pay wallet.",
    risk: "Two-application cap across ByteDance AND TikTok globally. If Creation SG is slot 1, this is slot 2 — do not also submit TikTok Social or Sydney.",
    href: "https://jobs.bytedance.com/en/resume/7668311010746894597/apply",
    extraHref: "https://joinbytedance.com/search/7668311010746894597",
    extraLabel: "JD",
    applyLabel: "ByteDance apply",
    resume: "ByteDance",
    lead: "Rush Hour SwiftUI + Who's Out payments-shaped REST",
    status: "to_apply",
  },
  {
    id: "airwallex",
    order: 24,
    company: "Airwallex",
    role: "Software Engineer Intern (Summer 2027)",
    term: "17 May – 30 July 2027 (12 weeks)",
    when: "Applications close 18 Sep 2026 23:59 SGT. Apply before anything else in SG that is not iOS.",
    where: "Singapore on-site",
    why: "Official careers page live 8 Sep. Penultimate or final year. Graduation-year form includes June 2028. Working-rights field has Other, not only Citizen/PR.",
    risk: "Not native iOS (Kotlin / Kafka / K8s / React). TEP/work pass not promised. Transcript PDF required.",
    href: "https://careers.airwallex.com/job/6cdb0f39-234a-4234-b1f1-cb48a1fa2795/software-engineer-intern-summer-2027/",
    extraHref: "https://jobs.ashbyhq.com/airwallex/6cdb0f39-234a-4234-b1f1-cb48a1fa2795",
    extraLabel: "Ashby backup",
    applyLabel: "Airwallex apply",
    resume: "Airwallex",
    lead: "Who's Out Spring Boot + APIs",
    status: "to_apply",
  },
  {
    id: "shopback",
    order: 25,
    company: "ShopBack",
    role: "Software Engineer Intern — Backend (H1 2027)",
    term: "Jan–Jul 2027 · 6 months full-time",
    when: "Apply this week. Credit-bearing intern. January start.",
    where: "Singapore on-site",
    why: "Only sourced 6-month Jan 2027 product-company intern in SG. All varsities welcome. REST APIs.",
    risk: "Backend, not iOS. Credit-bearing may expect a Singapore school letter. Work pass UNKNOWN.",
    href: "https://jobs.lever.co/shopback-2/1804a30e-2d2e-4631-9e85-614c91806ddf/apply",
    extraHref: "https://jobs.lever.co/shopback-2/1804a30e-2d2e-4631-9e85-614c91806ddf",
    extraLabel: "JD",
    applyLabel: "ShopBack Lever",
    resume: "ShopBack",
    lead: "Who's Out REST + Spring Boot",
    status: "to_apply",
  },
  {
    id: "shopback-pb",
    order: 26,
    company: "ShopBack",
    role: "Product Builder Intern",
    term: "6 months full-time, Singapore office",
    when: "Apply this week if you want the design/product seat, not backend.",
    where: "Singapore on-site",
    why: "Portfolio-first. Penultimate or final year, any discipline. AI-native consumer surfaces. Named manager.",
    risk: "Not an iOS engineer intern. 6 months on-site. Work pass UNKNOWN.",
    href: "https://jobs.lever.co/shopback-2/5e5c78b0-1b9a-4c09-843d-49ea41e991fe/apply",
    extraHref: "https://jobs.lever.co/shopback-2/5e5c78b0-1b9a-4c09-843d-49ea41e991fe",
    extraLabel: "JD",
    applyLabel: "Product Builder",
    resume: "ShopBack-PB",
    lead: "Rush Hour + Who's Out — ship a consumer surface, then explain the choices",
    status: "to_apply",
  },
  {
    id: "straitsx",
    order: 27,
    company: "StraitsX",
    role: "Software Engineer Intern, Transaction Experience",
    term: "At least 6 months",
    when: "Apply this week. Greenhouse form is live.",
    where: "Singapore",
    why: "SG fintech, student intern, fullstack (React + payments backend). Smaller than banks.",
    risk: "Not iOS. Work pass UNKNOWN. Dates unpublished.",
    href: "https://job-boards.eu.greenhouse.io/straitsx/jobs/4753167101",
    applyLabel: "StraitsX Greenhouse",
    resume: "StraitsX",
    lead: "Who's Out REST + SwiftUI if they ask mobile",
    status: "to_apply",
  },
  {
    id: "mastercard-sg",
    order: 28,
    company: "Mastercard",
    role: "Software Engineer Intern, Summer 2027 — Singapore",
    term: "Summer 2027",
    when: "End date on the posting: 11 Oct 2026",
    where: "Singapore on-site",
    why: "Official careers page live. Summer 2027 intern.",
    risk: "Bank / elite pipeline. Not iOS. Work pass not verified on the scrape.",
    href: "https://careers.mastercard.com/us/en/job/R-287574/Software-Engineer-Intern-Summer-2027-Singapore",
    applyLabel: "Mastercard apply",
    resume: "Mastercard",
    lead: "Who's Out REST",
    status: "to_apply",
  },
  {
    id: "jane-street-sg",
    order: 29,
    company: "Jane Street",
    role: "Software Engineer Internship — Singapore (May–August)",
    term: "Mid May – mid August 2027 · 12 weeks",
    when: "Apply if you will grind OCaml interviews. Flights + housing written.",
    where: "Singapore; training week in Hong Kong + one week in New York",
    why: "Official SG intern. They fly you. Unafraid of non-finance backgrounds.",
    risk: "OCaml, not iOS. Elite bar. Low YES. Entire May–Aug required.",
    href: "https://www.janestreet.com/join-jane-street/apply/8632392002/",
    extraHref: "https://www.janestreet.com/join-jane-street/position/8632392002/",
    extraLabel: "JD",
    applyLabel: "Jane Street apply",
    resume: "Jane-Street",
    lead: "Do not lead Swift. Lead systems / code quality if you apply.",
    status: "to_apply",
  },
  {
    id: "jump-sg",
    order: 30,
    company: "Jump Trading",
    role: "Campus C++ Software Engineer Intern — Singapore",
    term: "Campus intern (dates on the Greenhouse form)",
    when: "Apply this week if you will do C++. Python intern is a second Jump posting.",
    where: "Singapore",
    why: "Live Jump campus intern in SG (C++ and Python both listed 8 Sep).",
    risk: "Quant, not iOS. gh_jid=7543377 was a dead embed; use the live C++/Python IDs.",
    href: "https://www.jumptrading.com/hr/job?gh_jid=8027946",
    extraHref: "https://www.jumptrading.com/hr/job?gh_jid=8027955",
    extraLabel: "Python intern",
    applyLabel: "Jump C++ intern",
    resume: "Jump-Trading",
    lead: "Do not lead Swift. Lead C++/systems if you apply.",
    status: "to_apply",
  },
  {
    id: "jpmc-sg",
    order: 31,
    company: "JPMorgan Chase",
    role: "2027 Software Engineer Program — Summer Analyst (Singapore)",
    term: "Summer 2027",
    when: "Deadline on the program page: 29 October 2026",
    where: "Singapore",
    why: "Official JPMC summer intern in SG.",
    risk: "Bank. Not iOS. Work pass / local-student filter not scraped line-by-line (rate limit). Confirm eligibility on the form.",
    href: "https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/job/210754425",
    extraHref: "https://www.jpmorganchase.com/careers/explore-opportunities/programs/software-engineer-summer",
    extraLabel: "Program page",
    applyLabel: "JPMC apply",
    resume: "JPMC",
    lead: "Who's Out REST",
    status: "to_apply",
  },
  {
    id: "govtech",
    order: 32,
    company: "GovTech Singapore",
    role: "2027 internship programme (tech and non-tech)",
    term: "3–6 months",
    when: "Applications open until 30 September 2026, 12:00",
    where: "Singapore",
    why: "National tech agency internships. Deadline is soon.",
    risk: "Page does not say they take overseas-university students. Treat as likely local poly/uni unless the form allows BITS. Not iOS-specific.",
    href: "https://go.gov.sg/govtech-internship-apply",
    extraHref: "https://www.tech.gov.sg/careers/students-and-graduates/internships/",
    extraLabel: "Programme page",
    applyLabel: "GovTech apply",
    resume: "GovTech",
    lead: "Who's Out + intern desk / dashboards",
    status: "hold",
  },
  {
    id: "tiktok-social",
    order: 33,
    company: "TikTok Social",
    role: "Mobile Software Engineer Intern (Social) — 2027 Start",
    term: "2027 — Singapore",
    when: "Hold. Two-application cap. Only if Creation SG is NOT submitted and you skip ByteDance iOS.",
    where: "Singapore on-site",
    why: "Messaging team. Swift listed among languages. Undergraduate.",
    risk: "JD also says implement Android software. iOS not guaranteed. Cap with ByteDance/TikTok affiliates.",
    href: "https://careers.tiktok.com/resume/7665622826842327349/apply",
    extraHref: "https://lifeattiktok.com/search/7665622826842327349",
    extraLabel: "JD",
    applyLabel: "TikTok Social (hold)",
    resume: "TikTok-Social",
    lead: "Who's Out social + Rush Hour",
    status: "hold",
  },
  {
    id: "notewise",
    order: 34,
    company: "Notewise",
    role: "iOS intern — not posted (native iOS + Android product)",
    term: "Ask Winter or Summer 2027",
    when: "Send this week. Only verified small SG iOS product with a public jobs inbox.",
    where: "One-North, Singapore on-site (they wrote in-person)",
    why: "~9 people. Native iOS (Swift / UIKit / SwiftUI / Metal listed on the senior JD). Apple Design Award nominee 2025–2026. They hire interns (LinkedIn shows Intern on the team). New-grad posting is 2025/2026 grads only — do not apply as new grad.",
    risk: "No intern JD. careers page 404 on 9 Sep; indexed instruction is still email jobs@notewise.dev. Work pass UNKNOWN. Expected 2028 vs new-grad 2026.",
    href: "mailto:jobs@notewise.dev",
    extraHref: "https://notewise.dev/",
    extraLabel: "Product",
    applyLabel: "Open Mail",
    resume: "Notewise",
    lead: "Rush Hour SwiftUI + RealityAudio",
    status: "to_apply",
    channel: "email",
    mailTo: "jobs@notewise.dev",
    mailSubject: "Native iOS intern 2027 — Viraj Bhanage",
    mailBody: `Hi Notewise team,

Your jobs page asks for resumes at this inbox. The Software Engineer, New Grad row is for 2025/2026 graduates. I graduate in 2028, so I am asking for a native iOS intern seat for Winter or Summer 2027, not the new-grad role.

I am Viraj Bhanage, 3rd-year CS at BITS Pilani, currently at the Apple Developer Academy in Bali. I ship native iOS, not wrappers:
• Rush Hour — SwiftUI + AVCaptureSession
• RealityAudio — published Swift package
• Revenants — Swift 6 / RealityKit

One-North on-site is fine if you can sponsor a Training Employment Pass. If you do not take overseas-university interns, say so.

https://www.bhanageviraj.tech
virajbhanage00@gmail.com
+91 8855867440`,
  },
];

export const timeline = [
  {
    when: "Tonight — 7 Sep 2026",
    jobs: "Capital One Canada assessment deadline 23:59 — window has passed. If you applied, wait. If not, do not chase.",
  },
  {
    when: "This week (8–14 Sep 2026)",
    jobs: "SG iOS startups: email Notewise (jobs@notewise.dev). ego WAAS (SG listed vs US-visa-only). AppLovin Gist intern. Airwallex still closes 18 Sep 23:59 SGT — not iOS. ByteDance iOS is Big Tech, not a startup, and is TikTok slot 2.",
  },
  {
    when: "Rolling through Dec 2026",
    jobs: "Revolut recruiting window still open",
  },
  {
    when: "Winter 2027 / January",
    jobs: "ShopBack H1 (Jan–Jul) · StraitsX 6 months · Capital One if already in · Argmax / RunAnywhere if they take January",
  },
  {
    when: "Summer 2027 (Jun–Aug)",
    jobs: "Revolut 8–10 weeks · AppLovin Singapore · Verkada summer · Apple intern window",
  },
  {
    when: "2027 — date TBD",
    jobs: "TikTok Creation · LINE Bangkok · FrontPage 4–6 months · Argmax if they do not name a month",
  },
];

export const windows = [
  {
    window: "Winter 2027",
    companies:
      "Capital One · Verkada (winter option) · Argmax / RunAnywhere if they take January",
  },
  {
    window: "Summer 2027",
    companies: "Revolut · AppLovin · Verkada (summer) · Apple US pipeline",
  },
  {
    window: "2027 TBD",
    companies: "TikTok Creation · LINE · FrontPage · Apple IS&T · Argmax if undated",
  },
];

export const hold = [
  {
    company: "TikTok Sydney Live / San Jose e-commerce / Friending",
    why: "Save TikTok slot 2. Sydney only if Australia is realistic; SJ if you will do the US.",
  },
  {
    company: "Shure iOS intern",
    why: "Paid Summer 2027, audio fit — they will not sponsor. Skip unless you have US work auth.",
  },
  {
    company: "Speak Summer 2026 listing",
    why: "Form may still be live, cycle name is 2026. Ask if a 2027 seat exists first.",
  },
];

export const formRules = [
  ["Name", internDesk.identity.name],
  ["Email", internDesk.identity.email],
  ["Phone", internDesk.identity.phone],
  ["Location", internDesk.identity.location],
  ["School", internDesk.identity.school],
  ["Year", internDesk.identity.year],
  ["Work auth", internDesk.identity.sponsorship],
  ["Portfolio", internDesk.identity.portfolio],
  ["GitHub", internDesk.identity.github],
  ["LinkedIn", internDesk.identity.linkedin],
] as const;

export const chatLog: ChatEntry[] = [
  {
    id: "c1",
    at: "7 Sep 2026",
    from: "cursor",
    text: "This desk is the live record of the internship search in Cursor. Official job list, resumes, and timeline live in lib/intern-tracker.ts. When you tell me you applied or heard back, I update that file and this page.",
  },
  {
    id: "c2",
    at: "7 Sep 2026",
    from: "cursor",
    text: "Ten formal apps this week. Capital One first if the 7 Sep assessment is still open. Then Revolut, Argmax, AppLovin, one TikTok, Verkada, Apple IS&T SG. On every form: Bali, +91 8855867440, sponsorship needed, Expected 2028.",
  },
  {
    id: "c3",
    at: "7 Sep 2026",
    from: "cursor",
    text: "Do not invent RxSwift, Core Data, Realm, Firebase, Instruments writeups, a Core ML export pipeline, or work auth you do not have. Combine is only ObservableObject.",
  },
  {
    id: "c4",
    at: "7 Sep 2026",
    from: "cursor",
    text: "A webpage cannot open this Cursor thread as a chatbot. Mark status here for yourself, or tell me in the search chat and I will move the official row.",
  },
  {
    id: "c5",
    at: "8 Sep 2026",
    from: "cursor",
    text: "New verified openings: N26 junior iOS (Berlin/Barcelona, visa support — only if you can take leave), ego iOS MTS (SG/Tokyo remote listed vs US-visa-only field), TikTok Live Foundation iOS intern Sydney (hold for slot 2). Capital One OA deadline was 7 Sep 23:59. RunAnywhere still has no iOS intern JD — email san@runanywhere.ai. No verified paid remote-worldwide iOS intern exists.",
  },
  {
    id: "c6",
    at: "8 Sep 2026",
    from: "cursor",
    text: "Startup-first pass: TwinMind (iOS intern allowed, Menlo Park), Bloom student intern (Zurich, TS core, Swift bonus, 2026 title), FlavorScale native-iOS intern email (EU-only, Hub listing inactive), Metry AI remote-everywhere student intern (Swift listed among RN/Flutter). Did not invent a 100-company native-iOS intern database — public listings ran out. RxSwift is still not on your stack.",
  },
  {
    id: "c7",
    at: "8 Sep 2026",
    from: "cursor",
    text: "Singapore pass: ByteDance iOS Global Payment 2027 (counts toward TikTok/ByteDance 2-app cap). Airwallex SWE intern closes 18 Sep 2026 23:59 SGT. ShopBack backend Jan–Jul 2027 and Product Builder intern. StraitsX fullstack intern. Mastercard Summer 2027 (closes 11 Oct). Jane Street SG May–Aug (OCaml). Jump C++/Python campus intern SG. JPMC Summer Analyst deadline 29 Oct. GovTech until 30 Sep — likely local students. TikTok Social 2027 held for the cap.",
  },
  {
    id: "c8",
    at: "9 Sep 2026",
    from: "cursor",
    text: "SG iOS-startup pass: no public native-iOS intern at a 2–50 person SG company. Only cold-email: Notewise (jobs@notewise.dev). Already on desk: ego (FT, SG/Tokyo listed) and AppLovin Gist intern. Skipped as not intern / not native / expired / PR-only: Bjak (must already live in SG, 3+ years), Plaud Mobile SG URL dead, foodpanda PowerUp (Citizen/PR), Shopee iOS intern Jan 2026 expired, GXS May–Aug 2026 closed, Take App / HitPay no iOS intern, Gotrade Flutter, MindFi no intern JD, Milky Way AI inactive.",
  },
];

export const statusLabel: Record<JobStatus, string> = {
  to_apply: "To apply",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  hold: "Hold",
};

export function getJob(id: string) {
  return jobs.find((job) => job.id === id);
}

export function jobChannel(job: Job): "apply" | "email" {
  return job.channel ?? "apply";
}

export function identityPack(): string {
  return formRules.map(([label, value]) => `${label}: ${value}`).join("\n");
}

export function coverNoteFor(job: Job): string {
  if (job.coverNote) return job.coverNote;
  const i = internDesk.identity;
  return [
    `I am applying for ${job.role} (${job.term}) at ${job.company}.`,
    "",
    `${job.lead}.`,
    `Portfolio: ${i.portfolio}`,
    `GitHub: ${i.github}`,
    "",
    `${i.school}. ${i.year}. Based in ${i.location}.`,
    `${i.sponsorship}.`,
    "",
    i.name,
    i.email,
    i.phone,
  ].join("\n");
}

export function mailtoFor(job: Job): string | null {
  if (!job.mailTo || !job.mailSubject || !job.mailBody) return null;
  return `mailto:${job.mailTo}?subject=${encodeURIComponent(job.mailSubject)}&body=${encodeURIComponent(job.mailBody)}`;
}

export function emailDraft(job: Job): string | null {
  if (!job.mailBody) return null;
  const lines = [
    job.mailTo ? `To: ${job.mailTo}` : "To: (no verified inbox — paste on LinkedIn / careers)",
    job.mailSubject ? `Subject: ${job.mailSubject}` : null,
    "",
    job.mailBody,
  ].filter((line) => line !== null);
  return lines.join("\n");
}
