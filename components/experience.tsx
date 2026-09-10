import { education, experience } from "@/lib/content";
import { PageCol, SectionHead } from "@/lib/ui";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-section-sm sm:py-section">
      <PageCol>
        <Reveal>
          <SectionHead index="06" title="Experience" />
        </Reveal>

        <Reveal stagger className="mt-14 border-b border-line sm:mt-20">
          {experience.map((item) => (
            <article
              key={item.org}
              className="ledger-row grid-cols-1 sm:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)]"
            >
              <div>
                <h3 className="font-display text-[1.75rem] leading-none tracking-[-0.01em] text-ink sm:text-[2rem]">
                  {item.org}
                </h3>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                  {item.dates}
                </p>
              </div>
              <div className="min-w-0">
                {/* TODO: confirm exact official title — "Junior Developer" is still a placeholder for "IS developer." */}
                <p className="text-[17px] font-medium text-ink">{item.title}</p>
                <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.65] text-ink-muted">
                  {item.body}
                </p>
              </div>
            </article>
          ))}

          <article className="ledger-row grid-cols-1 sm:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)]">
            <div>
              <h3 className="font-display text-[1.75rem] leading-none tracking-[-0.01em] text-ink sm:text-[2rem]">
                {education.school}
              </h3>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                Education
              </p>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              {/* TODO: add expected graduation */}
              <p className="text-[17px] font-medium text-ink">{education.program}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                CGPA <span className="text-ink">{education.cgpa}</span>
              </p>
            </div>
          </article>
        </Reveal>
      </PageCol>
    </section>
  );
}
