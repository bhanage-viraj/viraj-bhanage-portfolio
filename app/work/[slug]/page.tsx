import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

  return (
    <main id="main" className="animate-fade-in">
      <article className="border-b border-line py-16 sm:py-20">
        <PageCol>
          <p className="font-mono text-data text-ink-muted">{project.caseId}</p>
          {project.logo ? (
            <>
              <h1 className="sr-only">{project.title}</h1>
              <ProjectLogo
                logo={project.logo}
                title={project.title}
                variant="heading-study"
              />
            </>
          ) : (
            <h1 className="mt-3 max-w-study font-display text-section font-semibold text-ink sm:text-[2.5rem]">
              {project.title}
            </h1>
          )}
          <p className="mt-4 max-w-study font-display text-card font-medium text-ink">
            {project.cardSubheading}
          </p>

          {project.media.type !== "placeholder" ? (
            <div className="mt-10">
              <MediaSlot media={project.media} title={project.title} variant="study" />
            </div>
          ) : null}

          {project.images.map((image, index) => (
            <div key={index} className="mt-6">
              <MediaSlot media={image} title={`${project.title} ${index + 1}`} variant="study" />
            </div>
          ))}

          <div className="mt-14 max-w-study space-y-12">
            {project.narrative.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-[22px] font-semibold text-ink">
                  {section.heading}
                </h2>
                <p className="mt-4 text-body text-ink">
                  <RichText>{section.body}</RichText>
                </p>
              </section>
            ))}
          </div>

          <ul className="mt-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-body text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </PageCol>
      </article>
      <Footer />
    </main>
  );
}
