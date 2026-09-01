import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const SITE_URL = "https://jonahkunis.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Entries with no images yet are hidden from the site (see
  // filterProjects in lib/projects.ts) — skip them here too rather than
  // listing a URL that 404s or shows nothing.
  const visibleProjects = projects.filter((project) => project.images.length > 0);

  return [
    { url: SITE_URL, priority: 1, changeFrequency: "monthly" },
    { url: `${SITE_URL}/info`, priority: 0.5, changeFrequency: "yearly" },
    ...visibleProjects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ];
}
