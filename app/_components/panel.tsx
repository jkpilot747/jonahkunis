"use client";

import Link from "next/link";
import { useState } from "react";
import { FILTERS, type Filter, filterProjects } from "@/lib/projects";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jonahkunis" },
  { label: "Instagram", href: "https://www.instagram.com/jonahkunis" },
  { label: "Email", href: "mailto:jonahkunis@gmail.com" },
] as const;

export function Panel({
  onFilterChange,
}: {
  onFilterChange?: (filter: Filter) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL");
  const visibleProjects = filterProjects(activeFilter);

  function handleFilterClick(filter: Filter) {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  }

  return (
    <aside className="fixed left-5 top-5 bottom-5 flex w-[640px] flex-col border-r border-hairline p-5">
      <h1 className="text-wordmark font-bold tracking-wordmark">
        <Link href="/" className="text-inherit no-underline">
          Jonah Kunis
        </Link>
      </h1>
      <p className="mt-1 font-mono text-metadata tracking-metadata text-muted">
        Commercial photography, video, and product work
      </p>

      <div className="mt-5 flex flex-col gap-1 font-mono text-metadata tracking-metadata">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted no-underline transition-colors hover:text-ink"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-5 border-t border-hairline" />

      <div className="mt-5 flex gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleFilterClick(filter)}
            className={`font-mono text-filter uppercase tracking-filter ${
              filter === activeFilter ? "text-ink" : "text-muted"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-5 border-t border-hairline" />

      <ul className="index-list mt-5 flex min-h-0 flex-1 flex-col overflow-y-auto">
        {visibleProjects.map((project, i) => (
          <li
            key={project.slug}
            className="flex items-baseline gap-3 border-t border-hairline py-2 text-index tracking-index first:border-t-0 first:pt-0"
          >
            <span className="font-mono text-metadata tracking-metadata text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Link href={`/work/${project.slug}`} className="text-inherit no-underline">
              {project.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-hairline" />

      <div className="mt-5 flex gap-3 font-mono text-[16px] tracking-metadata text-ink">
        <Link href="/info" className="text-inherit no-underline">
          Info
        </Link>
      </div>
    </aside>
  );
}
