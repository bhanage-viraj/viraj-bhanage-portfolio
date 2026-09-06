import { press } from "@/lib/content";
import { PageCol } from "@/lib/rich-text";
import { Reveal } from "./reveal";

export function Press() {
  return (
    <section id="featured" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
      <PageCol>
        <Reveal>
          <h2 className="font-display text-section font-semibold text-ink">Featured</h2>
        </Reveal>
        <ul className="mt-10 space-y-6 sm:space-y-8">
          {press.map((item, index) => (
            <li key={item.href}>
              <Reveal delay={index * 70}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card flex w-full items-center gap-4 sm:gap-6"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[18px] font-semibold leading-snug text-ink">
                      {item.outlet}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[16px] leading-[1.55] text-ink-muted">
                      {item.subheading}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-data text-ink-muted">
                    {item.date}
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </PageCol>
    </section>
  );
}
