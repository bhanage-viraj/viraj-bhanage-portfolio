export type JobStatus =
  | "to_apply"
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "hold";

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
  resume: string;
  lead: string;
  /** Official status from this Cursor chat. Overlay with local marks on the page. */
  status: JobStatus;
  appliedOn?: string;
  note?: string;
};

export type ChatEntry = {
  id: string;
  at: string;
  from: "cursor" | "you";
  text: string;
};

export const internDesk = {
  asOf: "8 September 2026",
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
    resume: "Viraj-Bhanage-Capital-One.pdf",
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
    resume: "Viraj-Bhanage-Revolut.pdf",
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
    resume: "Viraj-Bhanage-Argmax-RunAnywhere.pdf",
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
    resume: "Viraj-Bhanage-AppLovin.pdf",
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
    resume: "Viraj-Bhanage-TikTok-Creation.pdf",
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
    resume: "Viraj-Bhanage-Verkada.pdf",
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
    resume: "Viraj-Bhanage-Apple-IST.pdf",
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
    resume: "Viraj-Bhanage-Apple-US.pdf",
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
    resume: "Viraj-Bhanage-LINE.pdf",
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
    resume: "Viraj-Bhanage-FrontPage.pdf",
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
    resume: "Viraj-Bhanage-TikTok-Creation.pdf",
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
    resume: "Viraj-Bhanage-Revolut.pdf",
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
    resume: "Viraj-Bhanage-Argmax-RunAnywhere.pdf",
    lead: "Who's Out + RealityAudio",
    status: "to_apply",
  },
  {
    id: "c5",
    at: "8 Sep 2026",
    from: "cursor",
    text: "New verified openings: N26 junior iOS (Berlin/Barcelona, visa support — only if you can take leave), ego iOS MTS (SG/Tokyo remote listed vs US-visa-only field), TikTok Live Foundation iOS intern Sydney (hold for slot 2). Capital One OA deadline was 7 Sep 23:59. RunAnywhere still has no iOS intern JD — email san@runanywhere.ai. No verified paid remote-worldwide iOS intern exists.",
  },
];

export const timeline = [
  {
    when: "Tonight — 7 Sep 2026",
    jobs: "Capital One Canada assessment deadline 23:59 — window has passed. If you applied, wait. If not, do not chase.",
  },
  {
    when: "This week (8–14 Sep 2026)",
    jobs: "Revolut, Argmax, ego + RunAnywhere email, FrontPage, AppLovin, TikTok slot 1, Verkada, Apple IS&T SG, LINE. Hold TikTok Live Sydney and N26 until you decide.",
  },
  {
    when: "Rolling through Dec 2026",
    jobs: "Revolut recruiting window still open",
  },
  {
    when: "Winter 2027 / January",
    jobs: "Capital One start · Verkada winter option · ask Argmax / RunAnywhere for Jan",
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

export const coldMail = [
  {
    company: "RunAnywhere (YC W26)",
    chance: "High",
    who: "Sanchit Monga — san@runanywhere.ai",
    hook: "Ask for iOS SDK intern, not DevRel. Sema + RealityAudio.",
    href: "mailto:san@runanywhere.ai",
    label: "san@runanywhere.ai",
  },
  {
    company: "Argmax (note after apply)",
    chance: "High",
    who: "Founders / hiring via Greenhouse + LinkedIn",
    hook: "I already publish a Swift package and run Core ML on-device.",
    href: "https://www.argmaxinc.com/",
    label: "argmaxinc.com",
  },
  {
    company: "Speak (YC W17)",
    chance: "Medium",
    who: "Andrew Hsu (CTO)",
    hook: "Is there a Winter/Summer 2027 iOS intern?",
    href: "https://www.workatastartup.com/jobs/88690",
    label: "WAAS 88690",
  },
  {
    company: "FrontPage founders",
    chance: "High",
    who: "WAAS apply + LinkedIn",
    hook: "3rd year BITS, 4–6 months on-site, iOS-first.",
    href: "https://www.workatastartup.com/jobs/103634",
    label: "WAAS",
  },
  {
    company: "Jar",
    chance: "Medium",
    who: "Jar careers / iOS lead",
    hook: "Recheck the iOS intern row, then email if it vanished.",
    href: "https://changejar.applytojob.com/apply",
    label: "Jar careers",
  },
  {
    company: "Infilect",
    chance: "Medium",
    who: "infilect.com/career",
    hook: "On-device models + shipped iOS, not Flutter.",
    href: "https://www.infilect.com/career",
    label: "Infilect",
  },
  {
    company: "ego / 222 / Reframe (YC)",
    chance: "Medium",
    who: "Founders on the live FT iOS posts",
    hook: "Intern now, convert later.",
    href: "https://www.ycombinator.com/companies/ego/jobs/0Gwm3fO-member-of-technical-staff-ios-engineer",
    label: "ego iOS",
  },
  {
    company: "Suno",
    chance: "Medium",
    who: "iOS hiring on Ashby",
    hook: "Intern on the SwiftUI seat. RealityAudio + Rush Hour.",
    href: "https://jobs.ashbyhq.com/suno",
    label: "Suno Ashby",
  },
  {
    company: "ElevenLabs",
    chance: "Long shot",
    who: "Mobile/iOS on LinkedIn",
    hook: "Sema / Coralyst audio. Ask for a mobile intern.",
    href: "https://jobs.ashbyhq.com/elevenlabs",
    label: "ElevenLabs",
  },
  {
    company: "Bloom (YC P25)",
    chance: "Medium",
    who: "WAAS 82957",
    hook: "AI + mobile creation intern already exists.",
    href: "https://www.workatastartup.com/jobs/82957",
    label: "Bloom WAAS",
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
