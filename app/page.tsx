"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Panel } from "@/app/_components/panel";
import {
  type Filter,
  filterProjects,
  getCoverImage,
  orderForMasonry,
} from "@/lib/projects";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL");
  const visibleProjects = orderForMasonry(filterProjects(activeFilter));

  return (
    <div className="min-h-screen">
      <Panel onFilterChange={setActiveFilter} />

      <main className="masonry-grid gap-4 p-4 lg:ml-[480px] lg:p-0 lg:pt-2 lg:pr-2 lg:pb-2">
        {visibleProjects.map((project) => {
          const cover = getCoverImage(project);
          if (!cover) return null;

          return (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="mb-6 block break-inside-avoid"
            >
              <div className="overflow-hidden">
                <Image
                  src={`/work/${project.slug}/${cover.src}`}
                  alt={project.title}
                  width={cover.w}
                  height={cover.h}
                  placeholder="blur"
                  blurDataURL={cover.blur}
                  sizes="(min-width: 1400px) 33vw, (min-width: 1024px) 50vw, 100vw"
                  quality={75}
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-2 text-index tracking-index text-ink">
                {project.title}
              </p>
              <p className="font-mono text-metadata capitalize tracking-metadata text-muted">
                {project.category}
              </p>
            </Link>
          );
        })}
      </main>
    </div>
  );
}
