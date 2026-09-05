import { about } from "@/lib/content";
import { Section } from "@/lib/ui";
import { Reveal } from "./reveal";

export function About() {
  return (
    <Section id="about" title="About">
      <Reveal>
        <div className="max-w-prose space-y-5">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-body text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
