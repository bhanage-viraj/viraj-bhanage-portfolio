import { about } from "@/lib/content";
import { Section } from "@/lib/ui";
import { Reveal } from "./reveal";

export function About() {
  return (
    <Section id="about" title="About">
      <Reveal stagger>
        {about.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="max-w-prose text-body text-ink [&+&]:mt-5"
          >
            {paragraph}
          </p>
        ))}
      </Reveal>
    </Section>
  );
}
