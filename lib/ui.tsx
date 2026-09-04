import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export const pageColClass = "mx-auto w-full max-w-page px-6 sm:px-10 lg:px-12";

export const cardClass =
  "site-card group block w-full text-left";

export function PageCol({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${pageColClass} ${className}`}>{children}</div>;
}

export function Section({
  id,
  title,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-line py-section-sm sm:py-section ${className}`}
    >
      <PageCol>
        <h2 className="font-display text-section font-semibold text-ink">{title}</h2>
        <div className="mt-10 sm:mt-12">{children}</div>
      </PageCol>
    </section>
  );
}

export function CardList({ children }: { children: ReactNode }) {
  return <ul className="space-y-5 sm:space-y-6">{children}</ul>;
}

type CardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Card<T extends ElementType = "div">({
  as,
  className = "",
  children,
  ...props
}: CardProps<T>) {
  const Comp = as ?? "div";
  return (
    <Comp className={`${cardClass} ${className}`} {...props}>
      {children}
    </Comp>
  );
}
