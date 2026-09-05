import { education, experience } from "@/lib/content";
import { PageCol } from "@/lib/rich-text";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
      <PageCol>
        <div className="flex flex-col gap-16">
          <div>
            <h2 className="font-display text-section font-semibold text-ink">Experience</h2>
            <ul className="mt-10 space-y-6 sm:space-y-8">
              {experience.map((item) => (
                <li
                  key={item.org}
                  className="project-card flex flex-col"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-[18px] font-semibold text-ink">
                      {item.org}
                    </h3>
                    <span className="font-mono text-data text-ink-muted">{item.dates}</span>
                  </div>
                  {/* TODO: confirm exact official title — "Junior Developer" is still a placeholder for "IS developer." */}
                  <p className="mt-1 text-ink-muted">{item.title}</p>
                  <p className="mt-3 text-[16px] leading-[1.55] text-ink">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-section font-semibold text-ink">Education</h2>
            <div className="project-card mt-10">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-[18px] font-semibold text-ink">
                  {education.school}
                </h3>
                <span className="font-mono text-data text-ink-muted">
                  CGPA {education.cgpa}
                </span>
              </div>
              {/* TODO: add expected graduation */}
              <p className="mt-1 text-ink-muted">{education.program}</p>
            </div>
          </div>
        </div>
      </PageCol>
    </section>
  );
}
