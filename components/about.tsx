import { about } from "@/lib/content";
import { Section } from "@/lib/ui";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-prose space-y-5">
        {about.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-body text-ink">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
