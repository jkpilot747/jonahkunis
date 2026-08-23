"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

export function ProjectGallery({
  images,
  projectSlug,
  projectTitle,
}: {
  images: ProjectImage[];
  projectSlug: string;
  projectTitle: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      <div className="grid grid-cols-2 gap-4 min-[1600px]:grid-cols-3">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative aspect-[3/2] overflow-hidden rounded-[6px]"
          >
            <Image
              src={`/work/${projectSlug}/${image.src}`}
              alt={image.caption || projectTitle}
              fill
              placeholder="blur"
              blurDataURL={image.blur}
              sizes="(min-width: 1600px) 33vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </button>
        ))}
      </div>

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
        </div>
      )}
    </>
  );
}
