import type { Metadata } from "next";
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

  return (
    <main id="main" className="animate-fade-in">
      <article className="border-b border-line py-12 sm:py-16">
        <PageCol>
          <div
            className={
              hasMedia
                ? "grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-12"
                : ""
            }
          >
            <header>
              <p className="font-mono text-data text-ink-muted">{project.caseId}</p>
              <div className="mt-4 flex items-center gap-4">
                {project.logo ? (
                  <ProjectLogo
                    logo={project.logo}
                    title={project.title}
                    variant="heading-study"
                  />
                ) : null}
                <h1 className="font-display text-section font-semibold tracking-[-0.038em] text-ink">
                  {project.title}
                </h1>
              </div>
              <p className="mt-4 font-display text-card font-medium text-ink">
                {project.cardSubheading}
              </p>
              <p className="mt-3 text-[16px] leading-[1.6] text-ink-muted">
                {project.cardTeaser}
              </p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {project.tech.map((item) => (
                  <li key={item} className="site-tag">
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-7">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[16px] font-medium text-ink underline decoration-ink/25 underline-offset-[5px] hover:decoration-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </header>

            {hasMedia ? (
              <div className="min-w-0">
                <MediaSlot media={project.media} title={project.title} variant="study" />
              </div>
            ) : null}
          </div>

          {project.images.map((image, index) => (
            <div key={index} className="mt-6">
              <MediaSlot media={image} title={`${project.title} ${index + 1}`} variant="study" />
            </div>
          ))}

          <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14">
            {project.narrative.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-[22px] font-semibold text-ink">
                  {section.heading}
                </h2>
                <p className="mt-4 text-[17px] leading-[1.65] text-ink">
                  <RichText>{section.body}</RichText>
                </p>
              </section>
            ))}
          </div>

          {project.numbers ? <CaseNumbers numbers={project.numbers} /> : null}
        </PageCol>
      </article>
      <Footer />
    </main>
  );
}
