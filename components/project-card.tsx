import Link from "next/link";
import type { Project } from "@/lib/types";
import { cardClass } from "@/lib/ui";
import { MediaSlot } from "./media-slot";
import { ProjectLogo } from "./project-logo";

function cardMeta(project: Project) {
  if (!project.category) return project.caseId;
  const index = project.caseId.split("·")[0].trim();
  return `${index} · ${project.category}`;
}

export function ProjectCard({
  project,
  showOpenSourceLabel = true,
  mediaFirst = false,
}: {
  project: Project;
  showOpenSourceLabel?: boolean;
  mediaFirst?: boolean;
}) {
  const hasMedia = project.media.type !== "placeholder";

  const copy = (
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline justify-between gap-3">
        <span className="site-meta">{cardMeta(project)}</span>
        {showOpenSourceLabel && project.openSource ? (
          <span className="font-mono text-data uppercase tracking-[0.12em] text-signal">
            open source
          </span>
        ) : null}
      </div>
      {project.logo ? (
        <div className="mt-5">
          <ProjectLogo logo={project.logo} title={project.title} variant="card" />
        </div>
      ) : null}
      <h3 className="mt-4 font-display text-study font-semibold text-ink">
        {project.title}
      </h3>
      <p className="mt-2 font-display text-card font-medium text-ink">
        {project.cardSubheading}
      </p>
      <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.65] text-ink-muted sm:text-body">
        {project.cardTeaser}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <li key={item} className="site-tag">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const media = hasMedia ? (
    <div className="w-full overflow-hidden border border-line/80 lg:w-[46%] lg:shrink-0">
      <MediaSlot media={project.media} title={project.title} variant="feature" />
    </div>
  ) : null;

  return (
    <Link href={`/work/${project.slug}`} className={cardClass}>
      <div
        className={`flex flex-col gap-6 ${
          hasMedia
            ? `lg:flex-row lg:items-center lg:gap-10 ${
                mediaFirst ? "lg:flex-row-reverse" : ""
              }`
            : ""
        }`}
      >
        {copy}
        {media}
      </div>
    </Link>
  );
}
