import { shippedProjects } from "@/lib/content";
import { Section } from "@/lib/ui";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";

export function WorkGrid() {
  return (
    <Section
      id="work"
      title="Work"
      lede="A selection of projects I've built around AI, native development, games and creative technology."
    >
      <ul className="space-y-6 sm:space-y-8">
        {shippedProjects.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={index * 70}>
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
