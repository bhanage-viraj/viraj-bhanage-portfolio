import { contact, site } from "@/lib/content";
import { PageCol } from "@/lib/ui";
import { Reveal } from "./reveal";

type ContactLink = {
  label: string;
  href: string | null;
};

const items: ContactLink[] = [
  { label: "LinkedIn", href: contact.linkedin },
  { label: "X", href: contact.x },
  { label: "GitHub", href: contact.github },
  { label: "Resume (PDF)", href: contact.resume },
];

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 bg-ink text-paper">
      <PageCol className="py-20 sm:py-28">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-t border-paper/25 pt-5">
            <p className="font-mono text-data uppercase text-[#7FD1C7]">07</p>
            <h2 className="font-mono text-data uppercase text-paper/60">Contact</h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          {contact.email ? (
            <a
              href={`mailto:${contact.email}`}
              className="mt-14 block break-all font-display text-[clamp(1.75rem,5.4vw,4.75rem)] leading-[1.02] tracking-[-0.02em] text-paper transition-colors duration-500 hover:text-[#7FD1C7] sm:mt-20"
            >
              {contact.email}
            </a>
          ) : (
            <p className="mt-14 font-display text-section text-paper/60">
              {/* TODO: add Email */}
              Email
            </p>
          )}
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-16 grid gap-10 border-t border-paper/20 pt-8 sm:mt-24 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {items.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-[15px] text-paper/80 underline decoration-paper/25 underline-offset-[6px] transition-colors hover:text-paper hover:decoration-paper"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-[15px] text-paper/50">
                      {/* TODO: add {item.label} URL */}
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/45">
              {site.name} · {site.wordmark}
            </p>
          </div>
        </Reveal>
      </PageCol>
    </footer>
  );
}
