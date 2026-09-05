import Link from "next/link";
import type { Project } from "@/lib/types";
import { projectCardClass } from "@/lib/ui";
import { MediaSlot } from "./media-slot";

function cardMeta(project: Project) {
  if (!project.category) return project.caseId;
  const index = project.caseId.split("·")[0].trim();
  return `${index}  ${project.category}`;
}

export function ProjectCard({
  project,
  showOpenSourceLabel = true,
}: {
  project: Project;
  showOpenSourceLabel?: boolean;
}) {
  const hasMedia = project.media.type !== "placeholder";

  return (
    <Link href={`/work/${project.slug}`} className={projectCardClass}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="site-meta">{cardMeta(project)}</span>
        {showOpenSourceLabel && project.openSource ? (
          <span className="site-meta text-signal">open source</span>
        ) : null}
      </div>

      <h3 className="mt-6 font-display text-study font-semibold text-ink">
        {project.title}
      </h3>
      <p className="mt-2 max-w-[28ch] font-display text-card font-medium text-ink">
        {project.cardSubheading}
      </p>

      {hasMedia ? (
        <div className="site-media-frame mt-8">
          <MediaSlot media={project.media} title={project.title} variant="feature" />
        </div>
      ) : null}

      <div className="mt-7 flex items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <li key={item} className="site-tag">
              {item}
            </li>
          ))}
        </ul>
        <span className="shrink-0 text-[18px] text-ink-muted" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}
