import type { ReactNode } from "react";

export const pageColClass = "mx-auto w-full max-w-page px-6 sm:px-10 lg:px-12";
export const wideColClass = "mx-auto w-full max-w-wide px-6 sm:px-10 lg:px-12";

export function PageCol({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${pageColClass} ${className}`}>{children}</div>;
}

export function WideCol({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${wideColClass} ${className}`}>{children}</div>;
}

/**
 * Editorial section opener: a numbered mono eyebrow, a large serif title and an
 * optional lede, with room for a right-aligned data aside.
 */
export function SectionHead({
  index,
  title,
  lede,
  aside,
}: {
  index: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="grid gap-6 border-t border-ink pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-10">
      <div>
        <p className="eyebrow-signal">{index}</p>
        <h2 className="mt-8 max-w-[14ch] font-display text-section text-ink sm:mt-12">
          {title}
        </h2>
        {lede ? (
          <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.55] text-ink-muted">
            {lede}
          </p>
        ) : null}
      </div>
      {aside ? <div className="eyebrow sm:pb-1 sm:text-right">{aside}</div> : null}
    </div>
  );
}

export function Section({
  id,
  index,
  title,
  lede,
  aside,
  children,
  className = "",
}: {
  id?: string;
  index: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-section-sm sm:py-section ${className}`}
    >
      <PageCol>
        <SectionHead index={index} title={title} lede={lede} aside={aside} />
        <div className="mt-14 sm:mt-20">{children}</div>
      </PageCol>
    </section>
  );
}
