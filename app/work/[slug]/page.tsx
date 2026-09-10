import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseNumbers } from "@/components/case-numbers";
import { Footer } from "@/components/footer";
import { MediaSlot } from "@/components/media-slot";
import { ProjectLogo } from "@/components/project-logo";
import { getProject, projects } from "@/lib/content";
import { PageCol, RichText } from "@/lib/rich-text";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return {
    title: project.title,
    description: project.cardTeaser,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const hasMedia = project.media.type !== "placeholder";
  const position = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(position + 1) % projects.length];

  return (
    <main id="main" className="animate-fade-in">
      <article className="pt-12 sm:pt-16">
        <PageCol>
          <header className="border-t border-ink pt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="font-mono text-data uppercase text-ink">{project.caseId}</p>
              <p className="font-mono text-data uppercase text-ink-muted">
                {project.category ?? (project.openSource ? "Open source" : null)}
              </p>
            </div>

            <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                <div className="flex items-end gap-5">
                  {project.logo ? (
                    <ProjectLogo
                      logo={project.logo}
                      title={project.title}
                      variant="heading-study"
                    />
                  ) : null}
                  <h1 className="font-display text-study text-ink">{project.title}</h1>
                </div>
                <p className="mt-8 max-w-[30ch] font-display text-lead text-ink-muted">
                  {project.cardSubheading}
                </p>
              </div>

              <div className="lg:col-span-4 lg:self-end">
                <p className="text-[16px] leading-[1.65] text-ink">{project.cardTeaser}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {project.tech.map((item) => (
                    <li key={item} className="site-tag">
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-1">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-10 items-center text-[15px] font-medium text-signal transition-opacity hover:opacity-70"
                      >
                        {link.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </header>

          {hasMedia ? (
            <div className="mt-14 sm:mt-20">
              <MediaSlot media={project.media} title={project.title} variant="study" />
            </div>
          ) : null}

          {project.images.map((image, index) => (
            <div key={index} className="mt-6">
              <MediaSlot media={image} title={`${project.title} ${index + 1}`} variant="study" />
            </div>
          ))}

          <div className="mt-20 border-b border-line sm:mt-28">
            {project.narrative.map((section, index) => (
              <section
                key={section.heading}
                className="grid gap-5 border-t border-line py-10 sm:py-12 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <p className="eyebrow-signal">{String(index + 1).padStart(2, "0")}</p>
                    <h2 className="mt-3 font-display text-[1.9rem] leading-[1.05] tracking-[-0.01em] text-ink sm:text-[2.25rem]">
                      {section.heading}
                    </h2>
                  </div>
                </div>
                <p className="max-w-[66ch] text-[17px] leading-[1.7] text-ink lg:col-span-8 lg:col-start-5">
                  <RichText>{section.body}</RichText>
                </p>
              </section>
            ))}
          </div>

          {project.numbers ? <CaseNumbers numbers={project.numbers} /> : null}

          <Link
            href={`/work/${next.slug}`}
            className="group mt-20 block border-t border-ink py-10 sm:mt-28 sm:py-14"
          >
            <p className="eyebrow">Next case study</p>
            <p className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
              <span className="font-display text-section text-ink transition-colors duration-500 group-hover:text-signal">
                {next.title}
              </span>
              <span className="font-mono text-data uppercase text-ink-muted">
                {next.caseId}
                <span className="ml-3 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                  →
                </span>
              </span>
            </p>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-snug text-ink-muted">
              {next.cardSubheading}
            </p>
          </Link>
        </PageCol>
      </article>
      <Footer />
    </main>
  );
}
