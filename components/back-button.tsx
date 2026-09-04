"use client";

import { useRouter } from "next/navigation";

export function BackButton({
  fallback = "/",
}: {
  fallback?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        const sameOrigin =
          typeof document !== "undefined" &&
          document.referrer !== "" &&
          new URL(document.referrer).origin === window.location.origin;
        if (sameOrigin) {
          router.back();
        } else {
          router.push(fallback);
        }
      }}
      className="inline-flex items-center gap-1.5 font-body text-[13px] text-ink-muted transition-colors duration-200 hover:text-ink sm:text-[14px]"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M10 3 5 8l5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </button>
  );
}
