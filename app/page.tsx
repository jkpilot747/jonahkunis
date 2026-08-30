"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Panel } from "@/app/_components/panel";
import { type Filter, filterProjects, getCoverImage } from "@/lib/projects";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL");
  const visibleProjects = filterProjects(activeFilter);

  return (
    <div className="min-h-screen">
      <Panel onFilterChange={setActiveFilter} />

      <main className="ml-[680px] columns-2 gap-4 pt-2 pr-2 pb-2 min-[1800px]:columns-3">
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
                  sizes="(min-width: 1800px) 33vw, 50vw"
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
