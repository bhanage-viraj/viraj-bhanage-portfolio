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
            ? "mt-5 h-14 w-auto rounded-[22%] object-contain sm:h-[4.5rem]"
            : card
              ? "h-12 w-12 rounded-[22%] object-contain"
              : "mt-5 h-9 w-auto rounded-[22%] object-contain sm:h-11"
          : study
            ? "mt-5 h-10 w-auto max-w-[min(100%,360px)] object-contain sm:h-12"
            : card
              ? "h-8 w-auto max-w-[min(100%,200px)] object-contain"
              : "mt-5 h-7 w-auto max-w-[min(100%,240px)] object-contain sm:h-8"
      }
    />
  );
}
