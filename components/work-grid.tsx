import { shippedProjects } from "@/lib/content";
import { Section } from "@/lib/ui";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";

export function WorkGrid() {
  return (
    <Section
      id="work"
      title="Work"
      lede="On-device inference, a published Swift package, Swift 6 concurrency, AR/networking, and TestFlight apps."
    >
      <ul className="space-y-5 sm:space-y-6">
        {shippedProjects.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={index * 70}>
              <ProjectCard project={project} mediaFirst={index % 2 === 1} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
