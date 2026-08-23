import data from "@/content/projects.json";

export interface ProjectImage {
  src: string;
  w: number;
  h: number;
  blur: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  year: number | null;
  category: "projects" | "commercial" | "personal";
  client: string;
  role: string;
  description: string;
  cover: { src: string; focal?: string } | null;
  images: ProjectImage[];
}

// content/projects.json currently has every images[] empty, which collapses
// to a `never[]` element type under plain JSON-import inference — assert the
// real shape explicitly instead of relying on that inference.
export const projects = data as Project[];

export const FILTERS = ["ALL", "PROJECTS", "COMMERCIAL", "PERSONAL"] as const;
export type Filter = (typeof FILTERS)[number];

export function getCoverImage(project: Project): ProjectImage | null {
  if (!project.cover) return null;
  return (
    project.images.find((image) => image.src === project.cover?.src) ?? null
  );
}

export function filterProjects(filter: Filter) {
  // Entries with no images yet are unfinished — hide them from the index and
  // grid rather than render broken/empty tiles.
  const withImages = projects.filter((project) => project.images.length > 0);

  return filter === "ALL"
    ? withImages
    : withImages.filter((project) => project.category === filter.toLowerCase());
}
