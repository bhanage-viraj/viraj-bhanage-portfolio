import { shippedProjects } from "@/lib/content";
import { CardList, Section } from "@/lib/ui";
import { ProjectCard } from "./project-card";

export function WorkGrid() {
  return (
    <Section id="work" title="Work">
      <CardList>
        {shippedProjects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </CardList>
    </Section>
  );
}
