import type { ProjectLogo as ProjectLogoData } from "@/lib/types";

export function ProjectLogo({
  logo,
  variant,
}: {
  logo: ProjectLogoData;
  title: string;
  variant: "heading" | "heading-study" | "card";
}) {
  const study = variant === "heading-study";
  const card = variant === "card";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={logo.alt}
      className={
        logo.icon
          ? study
            ? "h-12 w-12 shrink-0 rounded-[22%] object-contain sm:h-14 sm:w-14"
            : card
              ? "h-12 w-12 rounded-[22%] object-contain"
              : "mt-5 h-9 w-auto rounded-[22%] object-contain sm:h-11"
          : study
            ? "h-9 w-auto max-w-[min(100%,220px)] shrink-0 object-contain sm:h-11"
            : card
              ? "h-8 w-auto max-w-[min(100%,200px)] object-contain"
              : "mt-5 h-7 w-auto max-w-[min(100%,240px)] object-contain sm:h-8"
      }
    />
  );
}
