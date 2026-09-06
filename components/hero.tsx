import { contact, hero } from "@/lib/content";
import { PageCol } from "@/lib/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="hero-ambient" aria-hidden="true" />
      <PageCol className="relative z-[1]">
        <p className="site-meta hero-in">{hero.eyebrow}</p>
        <h1 className="hero-in mt-5 max-w-[18ch] font-display text-hero font-semibold text-ink [animation-delay:80ms]">
          {hero.headlineLead}
          <br />
          {hero.headlineEnd}
        </h1>
        {/* TODO: confirm official job title in the subhead — "Junior Developer" is still a placeholder for "IS developer." */}
        <p className="hero-in mt-7 max-w-[40ch] text-body text-ink-muted [animation-delay:160ms] sm:mt-8">
          {hero.subhead}
        </p>
        <div className="hero-in mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 [animation-delay:240ms]">
          <a
            href="#work"
            className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-ink/25 underline-offset-[5px] transition-colors hover:decoration-ink"
          >
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
      </PageCol>
    </section>
  );
}
