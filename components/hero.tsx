import { hero } from "@/lib/content";
import { PageCol } from "@/lib/ui";

export function Hero() {
  return (
    <section className="pt-20 pb-16 sm:pt-28 sm:pb-24">
      <PageCol>
        {/* TODO: confirm official job title in the subhead — "Junior Developer" is still a placeholder for "IS developer." */}
        <h1 className="max-w-[16ch] font-display text-hero font-semibold text-ink sm:max-w-[18ch]">
          {hero.headline}
        </h1>
        <p className="mt-7 max-w-prose text-body text-ink-muted sm:mt-8">
          {hero.subhead}
        </p>
      </PageCol>
    </section>
  );
}
