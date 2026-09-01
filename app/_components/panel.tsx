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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const visibleProjects = filterProjects(activeFilter);

  function handleFilterClick(filter: Filter) {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  }

  // Shared between the desktop sidebar and the mobile menu overlay — same
  // content, just a different wrapper around it (see below). Links close
  // the mobile menu on tap; that's a no-op on desktop, where isMenuOpen is
  // never read.
  const panelBody = (
    <>
      <p className="font-mono text-metadata tracking-metadata text-muted lg:mt-1">
        Commercial &amp; personal photography and video
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

      <div className="mt-5 flex flex-wrap gap-3">
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

      <ul className="index-list mt-5 flex flex-col lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        {visibleProjects.map((project, i) => (
          <li
            key={project.slug}
            className="flex items-baseline gap-3 border-t border-hairline py-2 text-index tracking-index first:border-t-0 first:pt-0"
          >
            <span className="font-mono text-metadata tracking-metadata text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Link
              href={`/work/${project.slug}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-inherit no-underline"
            >
              {project.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-hairline" />

      <div className="mt-5 flex gap-3 font-mono text-[16px] tracking-metadata text-ink">
        <Link href="/info" onClick={() => setIsMenuOpen(false)} className="text-inherit no-underline">
          Info
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile: a slim bar (wordmark + toggle) that's always reachable
          without scrolling. Tapping it expands the same panel content as
          the desktop sidebar into a full-screen overlay. Collapsed, it's
          `sticky` so it scrolls away with the page like normal content but
          re-appears the moment you scroll back up; expanded, it switches to
          `fixed inset-0` to cover the page. Hidden entirely at `lg` and up,
          where the fixed sidebar below takes over. */}
      <div
        className={`lg:hidden ${
          isMenuOpen
            ? "fixed inset-0 z-40 flex flex-col bg-ground"
            : "sticky top-0 z-40 bg-ground"
        }`}
      >
        <header className="flex items-center justify-between border-b border-hairline bg-ground p-5">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-[22px] font-bold tracking-wordmark text-inherit no-underline"
          >
            Jonah Kunis
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="font-mono text-filter uppercase tracking-filter text-ink"
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </header>

        {isMenuOpen && (
          <div className="flex-1 overflow-y-auto p-5">{panelBody}</div>
        )}
      </div>

      {/* Desktop: fixed sidebar, unchanged from before the mobile menu. */}
      <aside className="hidden lg:fixed lg:top-5 lg:bottom-5 lg:left-5 lg:flex lg:w-[440px] lg:flex-col lg:border-r lg:border-hairline lg:p-5">
        <h1 className="text-wordmark font-bold tracking-wordmark">
          <Link href="/" className="text-inherit no-underline">
            Jonah Kunis
          </Link>
        </h1>
        {panelBody}
      </aside>
    </>
  );
}
