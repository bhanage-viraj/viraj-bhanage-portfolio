import Link from "next/link";
import type { Project } from "@/lib/types";
import { projectCardClass } from "@/lib/ui";
import { MediaSlot } from "./media-slot";
import { ProjectLogo } from "./project-logo";

function cardMeta(project: Project) {
  if (!project.category) return project.caseId;
  const index = project.caseId.split("·")[0].trim();
  return `${index}  ${project.category}`;
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
          <span className="site-meta text-signal">open source</span>
        ) : null}
      </div>

      <div className="mt-4 flex items-start gap-3.5">
        {project.logo ? (
          <ProjectLogo logo={project.logo} title={project.title} variant="card" />
        ) : null}
        <div className="min-w-0">
          <h3 className="font-display text-[1.35rem] font-semibold tracking-[-0.03em] text-ink sm:text-[1.5rem]">
            {project.title}
          </h3>
          <p className="mt-1 max-w-[36ch] text-[16px] leading-snug text-ink-muted">
            {project.cardSubheading}
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((item) => (
          <li key={item} className="site-tag">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.55] text-ink-muted">
        {project.cardTeaser}
      </p>
    </div>
  );

  const media = hasMedia ? (
    <div className="site-media-frame w-full lg:w-[46%] lg:shrink-0">
      <MediaSlot media={project.media} title={project.title} variant="feature" />
    </div>
  ) : null;

  return (
    <Link href={`/work/${project.slug}`} className={projectCardClass}>
      <div
        className={`flex flex-col gap-5 ${
          hasMedia
            ? `lg:flex-row lg:items-center lg:gap-8 ${
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
