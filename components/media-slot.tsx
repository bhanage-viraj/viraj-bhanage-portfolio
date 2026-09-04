"use client";

import { useEffect, useRef } from "react";
import type { ProjectMedia } from "@/lib/types";

const THUMB =
  "pointer-events-none aspect-[16/10] w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] lg:w-[260px] xl:w-[328px]";

function PreviewVideo({
  src,
  poster,
  title,
  className,
}: {
  src: string;
  poster?: string;
  title: string;
  className: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const play = () => {
      void video.play().catch(() => {});
    };
    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-label={`${title} preview`}
    />
  );
}

export function MediaSlot({
  media,
  title,
  variant = "card",
}: {
  media: ProjectMedia;
  title: string;
  variant?: "card" | "study" | "thumb";
}) {
  if (variant === "thumb") {
    if (media.type === "video") {
      return (
        <PreviewVideo
          className={THUMB}
          src={media.previewSrc ?? media.src}
          poster={media.poster}
          title={title}
        />
      );
    }
    if (media.type === "image") {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.src} alt="" className={THUMB} />
      );
    }
    return <div className={`${THUMB} bg-line/25`} aria-hidden="true" />;
  }

  if (media.type === "video") {
    if (variant === "card") {
      return (
        <PreviewVideo
          className="pointer-events-none aspect-[16/10] w-full object-cover"
          src={media.previewSrc ?? media.src}
          poster={media.poster}
          title={title}
        />
      );
    }

    return (
      <figure className="overflow-hidden border border-line/80">
        <video
          className="aspect-video w-full bg-line/30"
          src={media.src}
          poster={media.poster}
          controls
          preload="metadata"
          playsInline
        >
          {/* TODO: add a captions .vtt alongside the video when a track is available. */}
        </video>
        <figcaption className="site-meta border-t border-line/80 px-4 py-2.5 text-ink-muted">
          {title}
        </figcaption>
      </figure>
    );
  }

  if (media.type === "image") {
    return (
      <figure className={variant === "study" ? "overflow-hidden border border-line/80" : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src}
          alt={media.alt}
          className={
            variant === "card"
              ? "aspect-[16/10] w-full object-cover"
              : "w-full object-cover"
          }
        />
        {variant === "study" ? (
          <figcaption className="site-meta border-t border-line/80 px-4 py-2.5 text-ink-muted">
            {title}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div
      className={`flex aspect-[16/10] w-full items-end border border-line/80 bg-line/25 p-3 ${
        variant === "study" ? "min-h-[220px]" : ""
      }`}
    >
      {/* TODO: drop real {media.intended} into public/work/ and switch this project's media field from 'placeholder' to '{media.intended}' with src. */}
      <span className="site-meta">
        TODO · {media.intended} · {title}
      </span>
    </div>
  );
}
