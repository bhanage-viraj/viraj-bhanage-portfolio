import { shippedProjects } from "@/lib/content";
import { CardList, Section } from "@/lib/ui";
import { ProjectCard } from "./project-card";

export function WorkGrid() {
  return (
    <Section
      id="work"
      title="Work"
      lede="A selection of projects I've built around AI, native development, games and creative technology."
    >
      <CardList>
        {shippedProjects.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard project={project} mediaFirst={index % 2 === 1} />
          </li>
        ))}
      </CardList>
    </Section>
  );
}
