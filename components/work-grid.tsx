"use client";

import Link from "next/link";
import { MediaSlot } from "@/components/media-slot";
import { ScrollStage } from "@/components/scroll-stage";
import { shippedProjects } from "@/lib/content";
import type { Project } from "@/lib/types";

const projects = shippedProjects;

const projectTone: Record<
  string,
  { glow: string; mark: string; pill: string }
> = {
  coralyst: {
    glow: "from-[#DCECF5] to-[#F7F7F5]",
    mark: "text-[#2B6CB0]",
    pill: "bg-[#E4EEF8] text-[#2B6CB0]",
  },
  revenants: {
    glow: "from-[#E8E2F2] to-[#F7F7F5]",
    mark: "text-[#5B4578]",
    pill: "bg-[#EEE8F6] text-[#5B4578]",
  },
  "whos-out": {
    glow: "from-[#E2EEF8] to-[#F7F7F5]",
    mark: "text-[#3A6EA5]",
    pill: "bg-[#E4EEF8] text-[#3A6EA5]",
  },
  "rush-hour": {
    glow: "from-[#F3E8DE] to-[#F7F7F5]",
    mark: "text-[#B5673A]",
    pill: "bg-[#F6EBE3] text-[#B5673A]",
  },
  sema: {
    glow: "from-[#E5F0E8] to-[#F7F7F5]",
    mark: "text-[#3F7A55]",
    pill: "bg-[#E6F3EA] text-[#3F7A55]",
  },
};

const fallbackTone = {
  glow: "from-[#ECEBE8] to-[#F7F7F5]",
  mark: "text-ink",
  pill: "bg-[#ECEBE8] text-ink-muted",
};

function toneOf(project: Project) {
  return projectTone[project.slug] ?? fallbackTone;
}

function indexOf(project: Project) {
  return project.caseId.split("·")[0].trim();
}

function cardMeta(project: Project) {
  if (!project.category) return project.caseId;
  return `${indexOf(project)}  ${project.category}`;
}

function Tags({ project, limit }: { project: Project; limit?: number }) {
  const tone = toneOf(project);
  const tech = limit ? project.tech.slice(0, limit) : project.tech;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tech.map((item) => (
        <li key={item} className={`site-tag border-transparent ${tone.pill}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const tone = toneOf(project);
  const index = indexOf(project);

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`tint-card group flex flex-col gap-5 rounded-[1.6rem] p-5 sm:p-6 ${tone.glow}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {project.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logo.src}
              alt=""
              className="h-10 w-10 shrink-0 rounded-2xl bg-paper/80 object-contain p-1.5 shadow-sm"
            />
          ) : (
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-paper/80 font-mono text-[11px] ${tone.mark}`}
            >
              {index}
            </span>
          )}
          <div className="min-w-0">
            <p className={`font-mono text-[10px] uppercase tracking-[0.12em] ${tone.mark}`}>
              {project.category ?? "Project"}
            </p>
            <h3 className="truncate font-display text-[1.3rem] font-semibold tracking-[-0.03em] text-ink">
              {project.title}
            </h3>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ${tone.pill}`}
        >
          {index}
        </span>
      </div>

      <div className="tint-media">
        <MediaSlot media={project.media} title={project.title} variant="feature" />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-[16px] leading-snug text-ink">{project.cardSubheading}</p>
          <p className="mt-2 text-[14px] leading-[1.6] text-ink-muted lg:hidden">
            {project.cardTeaser}
          </p>
          <div className="mt-4 lg:hidden">
            <Tags project={project} limit={5} />
          </div>
        </div>
        <span className="pill-cta shrink-0 self-start lg:self-auto">
          View
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export function WorkGrid() {
  return (
    <ScrollStage
      id="work"
      listLabel="Projects"
      items={projects}
      getId={(project) => project.slug}
      getTeaser={(project) => project.cardTeaser}
      header={
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-section font-semibold tracking-[-0.038em] text-ink">
              Work
            </h2>
            <p className="mt-3 max-w-[42ch] text-[17px] leading-snug text-ink-muted">
              On-device inference, a published Swift package, Swift 6
              concurrency, AR/networking, and TestFlight apps.
            </p>
          </div>
          <p className="shrink-0 font-mono text-data uppercase text-ink-muted">
            {String(projects.length).padStart(2, "0")} projects
          </p>
        </div>
      }
      renderList={(project) => (
        <span className="flex w-full items-baseline justify-between gap-3">
          <span className="stage-list-label font-display tracking-[-0.02em]">
            {project.title}
          </span>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
            {indexOf(project)}
          </span>
        </span>
      )}
      renderCard={(project) => <ProjectCard project={project} />}
      renderCopy={(project, _i, { desc, scrambling }) => (
        <>
          <p className="site-meta">{cardMeta(project)}</p>
          <p className="mt-3 font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.03em] text-ink">
            {project.cardSubheading}
          </p>
          <p
            className={`mt-3 text-[14px] leading-[1.7] transition-colors duration-300 ${
              scrambling ? "text-signal" : "text-ink-muted"
            }`}
          >
            {desc}
          </p>
          <div className="mt-4">
            <Tags project={project} limit={4} />
          </div>
          <Link href={`/work/${project.slug}`} className="link-arrow mt-5">
            View work
          </Link>
        </>
      )}
    />
  );
}
