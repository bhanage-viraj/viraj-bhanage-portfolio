import { SignalTrace } from "@/components/signal-trace";
import { contact, hero, projects } from "@/lib/content";
import { PageCol } from "@/lib/ui";

function Words({
  text,
  offset = 0,
  accentLast = false,
}: {
  text: string;
  offset?: number;
  accentLast?: boolean;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const last = i === words.length - 1;
        return (
          <span key={`${word}-${i}`}>
            <span
              className="hero-word"
              style={{ "--i": offset + i } as React.CSSProperties}
            >
              <span className={accentLast && last ? "display-italic" : undefined}>
                {word}
              </span>
            </span>
            {last ? null : " "}
          </span>
        );
      })}
    </>
  );
}

function caseIndex(caseId: string) {
  return caseId.split("·")[0].trim();
}

export function Hero() {
  const leadCount = hero.headlineLead.split(" ").length;

  return (
    <section className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-between pt-14 sm:pt-20">
      <PageCol>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="site-meta hero-in">{hero.eyebrow}</p>
          <p className="site-meta hero-in hidden sm:block [animation-delay:120ms]">
            {String(projects.length).padStart(2, "0")} projects
          </p>
        </div>

        <h1 className="mt-14 font-display text-hero text-ink sm:mt-20">
          <Words text={hero.headlineLead} />
          <br />
          <Words text={hero.headlineEnd} offset={leadCount} accentLast />
        </h1>

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-12 lg:gap-10">
          {/* TODO: confirm official job title in the subhead — "Junior Developer" is still a placeholder for "IS developer." */}
          <p className="hero-in max-w-[46ch] text-[17px] leading-[1.6] text-ink-muted [animation-delay:560ms] lg:col-span-7 lg:col-start-1 sm:text-[18px]">
            {hero.subhead}
          </p>
          <div className="hero-in flex flex-wrap items-center gap-x-8 gap-y-3 [animation-delay:680ms] lg:col-span-4 lg:col-start-9 lg:justify-self-end lg:self-end">
            <a href="#work" className="link-arrow">
              View work
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center text-[15px] font-medium text-signal transition-opacity hover:opacity-70"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </PageCol>

      <div className="hero-in mt-16 [animation-delay:800ms] sm:mt-20">
        <div className="h-[84px] w-full sm:h-[104px]">
          <SignalTrace />
        </div>
        <PageCol>
          <ol className="flex flex-wrap items-baseline gap-x-7 gap-y-2 border-t border-line py-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted sm:gap-x-10">
            {projects.map((project) => (
              <li key={project.slug}>
                <a
                  href={`#${project.slug}`}
                  className="inline-flex items-baseline gap-2 transition-colors hover:text-ink"
                >
                  <span className="text-signal">{caseIndex(project.caseId)}</span>
                  {project.title}
                </a>
              </li>
            ))}
          </ol>
        </PageCol>
      </div>
    </section>
  );
}
