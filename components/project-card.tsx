import Link from "next/link";
import type { Project } from "@/lib/types";
import { cardClass } from "@/lib/ui";
import { MediaSlot } from "./media-slot";
import { ProjectLogo } from "./project-logo";

export function ProjectCard({
  project,
  showOpenSourceLabel = true,
}: {
  project: Project;
  showOpenSourceLabel?: boolean;
}) {
  const hasMedia = project.media.type !== "placeholder";

  return (
    <Link href={`/work/${project.slug}`} className={cardClass}>
      <div
        className={`flex flex-col gap-6 ${
          hasMedia ? "lg:flex-row lg:items-start lg:gap-12" : ""
        }`}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="site-meta">{project.caseId}</span>
            {showOpenSourceLabel && project.openSource ? (
              <span className="font-mono text-data uppercase tracking-[0.12em] text-signal">
                open source
              </span>
            ) : null}
          </div>
          {project.logo ? (
            <ProjectLogo logo={project.logo} title={project.title} variant="heading" />
          ) : null}
          <h3 className="mt-4 font-display text-card font-medium text-ink">
            {project.cardSubheading}
          </h3>
          <p
            className={`mt-3 text-[15px] leading-[1.65] text-ink-muted sm:text-body ${
              hasMedia ? "max-w-[42ch]" : "max-w-prose"
            }`}
          >
            {project.cardTeaser}
          </p>
        </div>
        {hasMedia ? (
          <div className="w-full overflow-hidden border border-line/80 lg:w-auto">
            <MediaSlot media={project.media} title={project.title} variant="thumb" />
          </div>
        ) : null}
      </div>
      <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
        {project.tech.map((item) => (
          <li key={item} className="site-tag">
            {item}
          </li>
        ))}
      </ul>
    </Link>
  );
}
