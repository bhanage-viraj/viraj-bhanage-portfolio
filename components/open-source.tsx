import { openSourceProjects } from "@/lib/content";
import { CardList, Section } from "@/lib/ui";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";

export function OpenSource() {
  return (
    <Section id="open-source" title="Open source">
      <CardList>
        {openSourceProjects.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={index * 70}>
              <ProjectCard project={project} showOpenSourceLabel={false} />
            </Reveal>
          </li>
        ))}
      </CardList>
    </Section>
  );
}
