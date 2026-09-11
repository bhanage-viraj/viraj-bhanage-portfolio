# Customized Overleaf resumes

Harshibar / jake-yang template. One page each. Same facts, different order and keywords.

**PDFs stay on this Mac** as `resumes/pdf/<Company>/Viraj-Bhanage.pdf`. Same filename in every company folder. They are gitignored and not served on the website.

## Overleaf MCP (Cursor)

[mjyoo2/OverleafMCP](https://github.com/mjyoo2/OverleafMCP) is installed as the `overleaf` MCP server. It **syncs `.tex` over Git** — it does not compile PDFs.

To turn sync on: copy `~/.config/overleaf-mcp/projects.example.json` → `projects.json`, paste your Overleaf project ID + Git token, reload MCP.

## Overleaf (browser compile)

1. New project → Upload `preamble.tex` **and** the `resume-*.tex` you need.
2. Menu → **Compiler** → `pdfLaTeX`.
3. Menu → **Main document** → that `resume-*.tex`.
4. Recompile.

Or upload the whole `resumes/` folder and switch Main document per application.

## Which PDF for which apply

| File | Use for | Apply |
|---|---|---|
| `resume-cursor.tex` | Cursor (Anysphere) · Software Engineer, New Grad 2027 · SF / NY | [Careers](https://cursor.com/careers) |
| `resume-capital-one.tex` | Capital One Canada · Mobile SWE · Winter 2027 · Toronto | [Workday](https://capitalone.wd12.myworkdayjobs.com/en-US/Capital_One/job/Intern--Mobile-Software-Engineer---Team-Gringotts-North---Winter-2027_R249015) |
| `resume-revolut.tex` | Revolut iOS intern · Summer 2027 | [Revolut](https://www.revolut.com/careers/apply/bc2ddc16-c0ca-4c39-9db7-390db7f6cb3c/) |
| `resume-argmax-runanywhere.tex` | Argmax Frameworks intern **and** RunAnywhere cold email | [Argmax](https://job-boards.greenhouse.io/argmax/jobs/4067268009) |
| `resume-applovin.tex` | AppLovin Gist · Mobile · Summer 2027 · Singapore | [Greenhouse](https://job-boards.greenhouse.io/applovin/jobs/4708448006) |
| `resume-tiktok-creation.tex` | TikTok Intelligent Creation · Singapore · **slot 1 of 2** | [TikTok](https://careers.tiktok.com/resume/7663326108122515717/apply) |
| `resume-verkada.tex` | Verkada Mobile SWE 2027 · San Mateo | [Greenhouse](https://job-boards.greenhouse.io/verkada/jobs/5219131007) |
| `resume-apple-ist.tex` | Apple IS&T 2027 · Singapore (same PDF for Sydney backup) | [SG](https://jobs.apple.com/en-us/details/200675982-3278/2027-apple-internship-information-systems-and-technology) · [AUS](https://jobs.apple.com/en-in/details/200676288-3957/2027-apple-internship-information-systems-and-technology-aus) |
| `resume-apple-us.tex` | Apple US undergrad intern pipeline | [Apple](https://jobs.apple.com/en-us/details/200664785-3810/software-undergrad-engineering-internships) |
| `resume-line.tex` | LINE Thailand iOS ROOKIE · Bangkok | [LINE](https://careers.linecorp.com/jobs/2934) |
| `resume-frontpage.tex` | FrontPage (YC S21) · Bengaluru | [WAAS](https://www.workatastartup.com/jobs/103634) |

Generic version (not tailored): `../resume.tex`.

## What is different (not invented)

- **Cursor** — product-engineer shape: shipped-and-iterated (Rush Hour), frontend + backend (Who’s Out), reviewable OSS (RealityAudio), Cursor Bali Hackathon 1st first in Achievements. **Only file that says Expected 2027** (degree can be shortened to graduate Spring 2027). Compile locally: `cd resumes && tectonic -o pdf/Cursor resume-cursor.tex`.
- **Capital One** — Who’s Out REST + Spring Boot first; mobile + backend skills.
- **Revolut** — Rush Hour MVVM + SwiftUI first. Does **not** list RxSwift, Core Data, or Realm.
- **Argmax / RunAnywhere** — RealityAudio SPM, Coralyst Core ML, Sema / llama.cpp.
- **AppLovin** — social graph, camera/media, threading / bounded queue.
- **TikTok Creation** — ARKit / RealityKit / RoomPlan, on-device, camera.
- **Verkada** — Swift 6 concurrency, REST, tests.
- **Apple IS&T** — internal-tool shape (dashboard, APIs, App Intents).
- **Apple US** — platform breadth: package + AR + Core ML + Foundation Models.
- **LINE** — SwiftUI + networking + Keychain only.
- **FrontPage** — India-ready; AI client + Spring Boot.

## Flag

Education says **Expected 2028** everywhere except `resume-cursor.tex` (**Expected 2027**, since the Cursor new-grad role requires a Spring 2027 graduation). Pick one year before sending resumes to companies that may compare notes.
