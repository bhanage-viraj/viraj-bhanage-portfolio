import { contact } from "@/lib/content";
import { PageCol } from "@/lib/rich-text";
import { Reveal } from "./reveal";

type ContactLink = {
  label: string;
  href: string | null;
};

const items: ContactLink[] = [
  { label: "Email", href: contact.email ? `mailto:${contact.email}` : null },
  { label: "LinkedIn", href: contact.linkedin },
  { label: "X", href: contact.x },
  { label: "GitHub", href: contact.github },
  { label: "Resume (PDF)", href: contact.resume },
];

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-line py-16 sm:py-20">
      <PageCol>
        <Reveal>
          <h2 className="font-display text-section font-semibold text-ink">Contact</h2>
        </Reveal>
        <Reveal delay={80}>
          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
            {items.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-body text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-body text-ink-muted">
                    {/* TODO: add {item.label} URL */}
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </PageCol>
    </footer>
  );
}
