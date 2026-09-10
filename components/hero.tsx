import { HeroAmbient } from "@/components/hero-ambient";
import { contact, hero } from "@/lib/content";
import { PageCol } from "@/lib/ui";

function Words({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span
            className="hero-word"
            style={{ "--i": offset + i } as React.CSSProperties}
          >
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const leadCount = hero.headlineLead.split(" ").length;

  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
      <HeroAmbient />
      <div className="hero-grid" aria-hidden="true" />
      <PageCol className="relative z-[1]">
        <p className="site-meta hero-in">{hero.eyebrow}</p>
        <h1 className="mt-5 max-w-[18ch] font-display text-hero font-semibold text-ink">
          <Words text={hero.headlineLead} />
          <br />
          <Words text={hero.headlineEnd} offset={leadCount} />
        </h1>
        {/* TODO: confirm official job title in the subhead — "Junior Developer" is still a placeholder for "IS developer." */}
        <p className="hero-in mt-7 max-w-[40ch] text-body text-ink-muted [animation-delay:420ms] sm:mt-8">
          {hero.subhead}
        </p>
        <div className="hero-in mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 [animation-delay:540ms]">
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
      </PageCol>
    </section>
  );
}
