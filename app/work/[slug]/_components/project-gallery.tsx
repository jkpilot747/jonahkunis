"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Project, ProjectImage } from "@/lib/projects";

export function ProjectGallery({
  images,
  groups,
  layout,
  projectSlug,
  projectTitle,
}: {
  images: ProjectImage[];
  groups?: Project["groups"];
  layout?: Project["layout"];
  projectSlug: string;
  projectTitle: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number; side: "left" | "right" } | null>(
    null,
  );

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

  // Within a run, a video breaks out of the two-column masonry into its own
  // full-width block in normal document flow, rather than spanning the CSS
  // columns with `column-span: all` — WebKit doesn't reliably honor
  // `width: 100%` on a spanning element and shrink-wraps/centers it instead.
  // Runs of stills on either side of a video still get their own
  // `columns-2` block so the masonry packing isn't affected by the break.
  type Item = { image: ProjectImage; index: number };
  type Chunk =
    | { type: "columns"; items: Item[] }
    | { type: "video"; item: Item };
  function chunkByVideo(items: Item[]): Chunk[] {
    const chunks: Chunk[] = [];
    for (const item of items) {
      if (item.image.video) {
        chunks.push({ type: "video", item });
      } else {
        const last = chunks[chunks.length - 1];
        if (last?.type === "columns") {
          last.items.push(item);
        } else {
          chunks.push({ type: "columns", items: [item] });
        }
      }
    }
    return chunks;
  }

  // Suppresses the cursor-following arrow near the close button (top-right
  // corner) so it doesn't render on top of the X — the two are both just
  // diagonal strokes and overlap into an illegible mess otherwise. Also
  // suppressed entirely on touch devices — a touch has no persistent
  // cursor to follow, and some mobile browsers synthesize a mousemove on
  // tap, which without this check left a phantom arrow stuck wherever
  // the last tap landed. Tapping the left/right half still navigates via
  // onClick either way; this only gates the visual indicator.
  function handleNavMouseMove(e: React.MouseEvent, side: "left" | "right") {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const nearCloseButton = e.clientX > window.innerWidth - 72 && e.clientY < 72;
    setCursor(nearCloseButton ? null : { x: e.clientX, y: e.clientY, side });
  }

  useEffect(() => {
    if (openIndex === null) return;

    // Plain `overflow: hidden` on the body doesn't reliably block scroll
    // on mobile Safari — the page can still rubber-band/drag underneath
    // the fixed lightbox, which is exactly what showed as grid photos
    // peeking in around a portrait image (tall enough to invite a
    // vertical drag; short landscape images rarely got dragged, so the
    // leak wasn't visible there). Pinning the body in place with
    // `position: fixed` and restoring its scroll position on close is
    // the standard fix for that class of bug.
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

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
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
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
          {chunkByVideo(run.items).map((chunk, chunkIndex) =>
            chunk.type === "video" ? (
              <GalleryTile
                key={chunk.item.image.src}
                image={chunk.item.image}
                onClick={() => setOpenIndex(chunk.item.index)}
                projectSlug={projectSlug}
                projectTitle={projectTitle}
                wide
              />
            ) : (
              <div
                key={chunkIndex}
                className={`columns-1 gap-4 ${layout === "single-column" ? "" : "lg:columns-2"}`}
              >
                {chunk.items.map(({ image, index }) => (
                  <GalleryTile
                    key={image.src}
                    image={image}
                    onClick={() => setOpenIndex(index)}
                    projectSlug={projectSlug}
                    projectTitle={projectTitle}
                  />
                ))}
              </div>
            ),
          )}
        </div>
        );
      })}

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overscroll-none bg-ground transition-opacity duration-150"
          onMouseLeave={() => setCursor(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute right-6 top-6 z-20 cursor-pointer text-muted hover:text-ink"
          >
            <svg
              width="26"
              height="26"
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
                onMouseMove={(e) => handleNavMouseMove(e, "left")}
                className="absolute inset-y-0 left-0 z-10 w-1/2 cursor-none"
              />
              <button
                type="button"
                aria-label="Next image"
                onClick={() =>
                  setOpenIndex((i) => (i === null ? i : (i + 1) % images.length))
                }
                onMouseMove={(e) => handleNavMouseMove(e, "right")}
                className="absolute inset-y-0 right-0 z-10 w-1/2 cursor-none"
              />
              {cursor && <NavArrow x={cursor.x} y={cursor.y} side={cursor.side} />}

              {/* Preload the neighbors so a click swaps instantly instead of
                  fetching that image's optimized URL for the first time. */}
              <PreloadNeighbor
                image={images[(openIndex - 1 + images.length) % images.length]}
                projectSlug={projectSlug}
              />
              <PreloadNeighbor
                image={images[(openIndex + 1) % images.length]}
                projectSlug={projectSlug}
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
            // No `key` here on purpose — keeping the same <img> across a
            // src change lets the browser hold the previous frame on
            // screen until the next one is decoded, instead of unmounting
            // (which briefly exposed the backdrop through as a flash).
            <Image
              src={`/work/${projectSlug}/${images[openIndex].src}`}
              alt={images[openIndex].caption || projectTitle}
              width={images[openIndex].w}
              height={images[openIndex].h}
              placeholder="blur"
              blurDataURL={images[openIndex].blur}
              quality={90}
              priority
              className="relative z-0 h-auto max-h-[calc(100vh-40px)] w-auto max-w-[calc(100vw-40px)]"
            />
          )}
        </div>
      )}
    </>
  );
}

// A single grid tile — a still or a video's poster frame, with its optional
// caption printed above it. `wide` renders it as its own full-width block
// instead of inside the two-column masonry (used for a video breaking out
// of `chunkByVideo` above) — same tile markup either way.
function GalleryTile({
  image,
  onClick,
  projectSlug,
  projectTitle,
  wide = false,
}: {
  image: ProjectImage;
  onClick: () => void;
  projectSlug: string;
  projectTitle: string;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mb-4 block w-full text-left ${wide ? "" : "break-inside-avoid"}`}
    >
      {image.caption && (
        <p className="mb-3 text-index font-bold tracking-index text-ink">
          {image.caption}
        </p>
      )}
      <div className="relative overflow-hidden">
        <Image
          src={`/work/${projectSlug}/${image.src}`}
          alt={image.caption || projectTitle}
          width={image.w}
          height={image.h}
          placeholder="blur"
          blurDataURL={image.blur}
          sizes={wide ? "100vw" : "(min-width: 1024px) 50vw, 100vw"}
          quality={75}
          className="h-auto w-full"
        />
        {image.video && <PlayIcon />}
      </div>
    </button>
  );
}

// Follows the cursor inside the lightbox's click zones and points whichever
// way a click there would navigate, flipping the moment the cursor crosses
// the left/right halfway line — replaces relying on the browser's native
// resize cursor as the only affordance.
function NavArrow({ x, y, side }: { x: number; y: number; side: "left" | "right" }) {
  return (
    <div
      className="pointer-events-none fixed z-20 flex h-16 w-16 items-center justify-center"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {side === "left" ? <path d="M20 6L10 16L20 26" /> : <path d="M12 6L22 16L12 26" />}
      </svg>
    </div>
  );
}

// Rendered invisibly (display: none) while the lightbox is open so the
// browser fetches this neighbor's optimized image URL ahead of a click.
// `priority` skips next/image's normal lazy-loading gate, which otherwise
// wouldn't fire a request for an element that's never actually visible.
function PreloadNeighbor({
  image,
  projectSlug,
}: {
  image: ProjectImage;
  projectSlug: string;
}) {
  if (image.video) return null;
  return (
    <div className="hidden">
      <Image
        src={`/work/${projectSlug}/${image.src}`}
        alt=""
        width={image.w}
        height={image.h}
        quality={90}
        priority
      />
    </div>
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
