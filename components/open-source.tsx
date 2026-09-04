import { openSourceProjects } from "@/lib/content";
import { CardList, Section } from "@/lib/ui";
import { ProjectCard } from "./project-card";

export function OpenSource() {
  return (
    <Section id="open-source" title="Open source">
      <CardList>
        {openSourceProjects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} showOpenSourceLabel={false} />
          </li>
        ))}
      </CardList>
    </Section>
  );
}
