"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Project, ProjectImage } from "@/lib/projects";

export function ProjectGallery({
  images,
  groups,
  projectSlug,
  projectTitle,
}: {
  images: ProjectImage[];
  groups?: Project["groups"];
  projectSlug: string;
  projectTitle: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Split the flat image list into contiguous runs by group so a labeled
  // section break can render between shoots. Images without a group (the
  // common case) collapse into a single unlabeled run — same layout as
  // before this feature existed.
  const runs: { group: string; items: { image: ProjectImage; index: number }[] }[] = [];
  images.forEach((image, index) => {
    const group = image.group ?? "";
    const lastRun = runs[runs.length - 1];
    if (lastRun && lastRun.group === group) {
      lastRun.items.push({ image, index });
    } else {
      runs.push({ group, items: [{ image, index }] });
    }
  });

  useEffect(() => {
    if (openIndex === null) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      }
      if (event.key === "ArrowLeft") {
        setOpenIndex((i) =>
          i === null ? i : (i - 1 + images.length) % images.length,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openIndex, images.length]);

  return (
    <>
      {runs.map((run, runIndex) => {
        const groupInfo = run.group ? groups?.[run.group] : undefined;
        const label =
          typeof groupInfo === "string" ? groupInfo : groupInfo?.text;
        const href = typeof groupInfo === "object" ? groupInfo.href : undefined;

        return (
        <div key={run.group || runIndex} className={runIndex > 0 ? "mt-8" : undefined}>
          {label &&
            (href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 block text-index font-bold tracking-index text-ink hover:underline"
              >
                {label}
              </a>
            ) : (
              <p className="mb-3 text-index font-bold tracking-index text-ink">
                {label}
              </p>
            ))}
          <div className="columns-2 gap-4">
            {run.items.map(({ image, index }) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setOpenIndex(index)}
                className="relative mb-4 block w-full overflow-hidden break-inside-avoid"
              >
                <Image
                  src={`/work/${projectSlug}/${image.src}`}
                  alt={image.caption || projectTitle}
                  width={image.w}
                  height={image.h}
                  placeholder="blur"
                  blurDataURL={image.blur}
                  sizes="50vw"
                  className="h-auto w-full"
                />
                {image.video && <PlayIcon />}
              </button>
            ))}
          </div>
        </div>
        );
      })}

      {openIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-opacity duration-150">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute right-5 top-5 z-20 text-white/60 hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M2 2L18 18M18 2L2 18" />
            </svg>
          </button>

          {!images[openIndex].video && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() =>
                  setOpenIndex((i) =>
                    i === null ? i : (i - 1 + images.length) % images.length,
                  )
                }
                className="absolute inset-y-0 left-0 z-10 w-1/2 cursor-w-resize"
              />
              <button
                type="button"
                aria-label="Next image"
                onClick={() =>
                  setOpenIndex((i) => (i === null ? i : (i + 1) % images.length))
                }
                className="absolute inset-y-0 right-0 z-10 w-1/2 cursor-e-resize"
              />
            </>
          )}

          {images[openIndex].video ? (
            <video
              key={images[openIndex].src}
              src={images[openIndex].video.src}
              poster={`/work/${projectSlug}/${images[openIndex].src}`}
              controls
              className="relative z-0 h-auto max-h-[calc(100vh-40px)] w-auto max-w-[calc(100vw-40px)]"
              style={{ aspectRatio: `${images[openIndex].w} / ${images[openIndex].h}` }}
            />
          ) : (
            <Image
              key={images[openIndex].src}
              src={`/work/${projectSlug}/${images[openIndex].src}`}
              alt={images[openIndex].caption || projectTitle}
              width={images[openIndex].w}
              height={images[openIndex].h}
              placeholder="blur"
              blurDataURL={images[openIndex].blur}
              className="relative z-0 h-auto max-h-[calc(100vh-40px)] w-auto max-w-[calc(100vw-40px)]"
            />
          )}
        </div>
      )}
    </>
  );
}

// Hand-drawn inline SVG, matching the lightbox's close/arrow icons and the
// social dock's no-icon-library rule. A play triangle in a plain circle —
// no gradient, no shadow, always visible (not hover-only) so a video clip
// reads as playable at a glance in the grid.
function PlayIcon() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-panel">
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
          <path d="M1 1.5V18.5L17 10L1 1.5Z" fill="var(--ink)" />
        </svg>
      </div>
    </div>
  );
}
