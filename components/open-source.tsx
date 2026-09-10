import Link from "next/link";
import { openSourceProjects } from "@/lib/content";
import type { Project } from "@/lib/types";
import { Section } from "@/lib/ui";
import { Reveal } from "./reveal";
import { Tags } from "./work-grid";

/**
 * RealityAudio has no screenshot — it's a library — so the plate carries a
 * typographic artefact of its public surface instead of a media slot.
 */
function ApiArtifact() {
  return (
    <div
      className="flex h-full flex-col justify-between gap-10 bg-ink p-6 font-mono text-[12.5px] leading-[1.75] text-paper/85 sm:p-8"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.14em] text-paper/45">
        <span>Package.swift</span>
        <span>swiftLanguageModes: [.v6]</span>
      </div>
      <pre className="overflow-x-auto whitespace-pre text-[13px] leading-[1.9] sm:text-[15px]">
        <span className="text-paper/45">@MainActor</span>
        {"\n"}
        <span className="text-[#7FD1C7]">RealityAudio</span>
        <span className="text-paper/60">.</span>
        <span className="text-paper">play</span>
        <span className="text-paper/60">(</span>
        <span className="text-paper/80">_:in:at:</span>
        <span className="text-[#F2B880]">occluded:</span>
        <span className="text-paper/60">)</span>
        {"\n"}
        <span className="text-paper/60">{"  -> "}</span>
        <span className="text-[#7FD1C7]">Entity</span>
      </pre>
      <div className="flex flex-wrap items-center justify-between gap-3 text-[10.5px] uppercase tracking-[0.14em] text-paper/45">
        <span>SpatialAudioComponent</span>
        <span>iOS 17+ · visionOS 1+</span>
      </div>
    </div>
  );
}

function LibraryPlate({ project }: { project: Project }) {
  return (
    <article className="plate grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="flex flex-col justify-between gap-10 px-6 py-7 sm:px-8 sm:py-9">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
              {project.caseId}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">
              open source
            </span>
          </div>
          <h3 className="mt-10 font-display text-plate text-ink">{project.title}</h3>
          <p className="mt-4 max-w-[40ch] font-display text-[1.35rem] leading-[1.25] text-ink-muted">
            {project.cardSubheading}
          </p>
          <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.7] text-ink-muted">
            {project.cardTeaser}
          </p>
          <Tags project={project} className="mt-6" />
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          <Link href={`/work/${project.slug}`} className="link-arrow">
            Open case study
          </Link>
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center text-[15px] font-medium text-signal transition-opacity hover:opacity-70"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-line lg:border-l lg:border-t-0">
        <ApiArtifact />
      </div>
    </article>
  );
}

export function OpenSource() {
  return (
    <Section
      id="open-source"
      index="03"
      title="Open source"
      aside={`${String(openSourceProjects.length).padStart(2, "0")} package`}
    >
      <div className="space-y-8">
        {openSourceProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 70}>
            <LibraryPlate project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
