"use client";

import Link from "next/link";
import { MediaSlot } from "@/components/media-slot";
import { ScrollStage } from "@/components/scroll-stage";
import { shippedProjects } from "@/lib/content";
import type { Project } from "@/lib/types";

const projects = shippedProjects;

function indexOf(project: Project) {
  return project.caseId.split("·")[0].trim();
}

export function Tags({
  project,
  limit,
  className = "",
}: {
  project: Project;
  limit?: number;
  className?: string;
}) {
  const tech = limit ? project.tech.slice(0, limit) : project.tech;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {tech.map((item) => (
        <li key={item} className="site-tag">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectPlate({
  project,
  compact = false,
}: {
  project: Project;
  /** Hide the teaser/tags in the plate (they live in the side panel instead). */
  compact?: boolean;
}) {
  const hasMedia = project.media.type !== "placeholder";

  return (
    <Link href={`/work/${project.slug}`} className="plate group block">
      <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3 sm:px-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
          {project.caseId}
        </span>
        {project.category ? (
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
            {project.category}
          </span>
        ) : null}
      </div>

      {hasMedia ? (
        <div className="plate-media border-b border-line p-3 sm:p-5">
          <MediaSlot media={project.media} title={project.title} variant="feature" />
        </div>
      ) : null}

      <div className="grid gap-6 px-5 py-6 sm:px-6 sm:py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {project.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logo.src}
              alt=""
              className={
                project.logo.icon
                  ? "mt-1 h-11 w-11 shrink-0 rounded-[22%] object-contain"
                  : "mt-2 h-7 w-auto max-w-[120px] shrink-0 object-contain"
              }
            />
          ) : null}
          <div className="min-w-0">
            <h3 className="font-display text-plate text-ink">{project.title}</h3>
            <p className="mt-3 max-w-[44ch] text-[16px] leading-[1.5] text-ink-muted sm:text-[17px]">
              {project.cardSubheading}
            </p>
            <div className={compact ? "xl:hidden" : ""}>
              <p className="mt-4 max-w-[60ch] text-[15px] leading-[1.65] text-ink-muted">
                {project.cardTeaser}
              </p>
              <Tags project={project} className="mt-5" />
            </div>
          </div>
        </div>
        <span className="plate-cta lg:pb-1">Open case study</span>
      </div>
    </Link>
  );
}

export function WorkGrid() {
  return (
    <ScrollStage
      id="work"
      index="02"
      title="Work"
      lede="On-device inference, a published Swift package, Swift 6 concurrency, AR/networking, and TestFlight apps."
      aside={`${String(projects.length).padStart(2, "0")} projects`}
      listLabel="Projects"
      items={projects}
      getId={(project) => project.slug}
      renderList={(project) => (
        <>
          <span className="stage-list-num">{indexOf(project)}</span>
          <span className="stage-list-label">{project.title}</span>
        </>
      )}
      renderCard={(project) => <ProjectPlate project={project} compact />}
      renderCopy={(project) => (
        <>
          <p className="eyebrow">
            <span className="text-signal">{indexOf(project)}</span>
            {project.category ? (
              <>
                <span className="mx-2 opacity-40">/</span>
                {project.category}
              </>
            ) : null}
          </p>
          <p className="mt-6 font-display text-[1.55rem] leading-[1.15] tracking-[-0.01em] text-ink">
            {project.cardSubheading}
          </p>
          <p className="mt-5 text-[14.5px] leading-[1.7] text-ink-muted">
            {project.cardTeaser}
          </p>
          <Tags project={project} className="mt-6" />
          <Link href={`/work/${project.slug}`} className="link-arrow mt-7">
            Open case study
          </Link>
        </>
      )}
    />
  );
}
