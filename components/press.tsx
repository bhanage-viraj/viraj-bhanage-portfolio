import { press } from "@/lib/content";
import { Section } from "@/lib/ui";
import { Reveal } from "./reveal";

export function Press() {
  return (
    <Section
      id="featured"
      index="05"
      title="Featured"
      aside={`${String(press.length).padStart(2, "0")} mentions`}
    >
      <Reveal stagger className="border-b border-line">
        {press.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="ledger-row group grid-cols-1 sm:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)_auto] sm:items-baseline"
          >
            <h3 className="font-display text-[1.75rem] leading-none tracking-[-0.01em] text-ink sm:text-[2rem]">
              {item.outlet}
            </h3>
            {/* TODO: Jagran Josh excerpt — replace the placeholder framing once the paragraph mentioning Viraj is pasted in. */}
            <p className="max-w-[56ch] text-[16px] leading-[1.55] text-ink-muted transition-colors group-hover:text-ink">
              {item.subheading}
            </p>
            <span className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
              {item.date}
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                ↗
              </span>
            </span>
          </a>
        ))}
      </Reveal>
    </Section>
  );
}
