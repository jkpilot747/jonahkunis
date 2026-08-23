"use client";

import { useState } from "react";
import projects from "@/content/projects.json";

const FILTERS = ["ALL", "PROJECTS", "COMMERCIAL", "PERSONAL"] as const;
type Filter = (typeof FILTERS)[number];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL");

  const visibleProjects =
    activeFilter === "ALL"
      ? projects
      : projects.filter(
          (project) => project.category === activeFilter.toLowerCase(),
        );

  return (
    <div className="min-h-screen">
      <aside className="fixed left-5 top-5 bottom-5 flex w-[640px] flex-col rounded-[10px] bg-panel p-5">
        <h1 className="text-wordmark font-bold tracking-wordmark">
          Jonah Kunis
        </h1>
        <p className="mt-1 font-mono text-metadata tracking-metadata text-muted">
          Commercial photography, video, and product work
        </p>

        <div className="mt-5 border-t border-hairline" />

        <div className="mt-5 flex gap-3">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`font-mono text-filter uppercase tracking-filter ${
                filter === activeFilter ? "text-ink" : "text-muted"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-5 border-t border-hairline" />

        <ul className="index-list mt-5 min-h-0 flex-1 overflow-y-auto">
          {visibleProjects.map((project) => (
            <li key={project.slug} className="text-index tracking-index">
              {project.title}
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-hairline" />

        <div className="mt-5 flex gap-3 font-mono text-metadata tracking-metadata text-ink">
          <a href="#">Info</a>
          <a href="#">CV</a>
        </div>
      </aside>

      <main className="ml-[680px] grid grid-cols-2 gap-4 pt-2 pr-2 pb-2 min-[1800px]:grid-cols-3">
        {visibleProjects.map((project) => (
          <div
            key={project.slug}
            className="aspect-[3/2] rounded-[6px] bg-[#c9c9c4]"
          />
        ))}
      </main>
    </div>
  );
}
