import { about } from "@/lib/content";
import { PageCol } from "@/lib/ui";
import { Reveal } from "./reveal";

const [lead, ...rest] = about;

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-section-sm sm:py-section">
      <PageCol>
        <div className="border-t border-ink pt-5">
          <div className="flex items-baseline justify-between gap-6">
            <p className="eyebrow-signal">01</p>
            <h2 className="eyebrow">About</h2>
          </div>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
            <Reveal className="lg:col-span-10">
              <p className="max-w-[26ch] font-display text-lead text-ink sm:max-w-[34ch]">
                {lead}
              </p>
            </Reveal>

            <Reveal stagger className="lg:col-span-6 lg:col-start-7">
              {rest.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="max-w-prose text-[16px] leading-[1.7] text-ink [&+&]:mt-6 sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </PageCol>
    </section>
  );
}
