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

      <main className="ml-[680px] grid grid-cols-2 gap-4 pt-2 pr-2 pb-2 min-[1800px]:grid-cols-3">
        {visibleProjects.map((project) => {
          const cover = getCoverImage(project);
          if (!cover) return null;

          return (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="relative aspect-[3/2] overflow-hidden rounded-[6px]"
            >
              <Image
                src={`/work/${project.slug}/${cover.src}`}
                alt={project.title}
                fill
                placeholder="blur"
                blurDataURL={cover.blur}
                sizes="(min-width: 1800px) 33vw, 50vw"
                style={{
                  objectFit: "cover",
                  objectPosition: project.cover?.focal ?? "center",
                }}
              />
            </Link>
          );
        })}
      </main>
    </div>
  );
}
