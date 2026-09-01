import { notFound } from "next/navigation";
import { Panel } from "@/app/_components/panel";
import { projects } from "@/lib/projects";
import { BookingSection } from "./_components/booking-section";
import { ProjectGallery } from "./_components/project-gallery";

// Project descriptions are plain strings, but a couple (Equal Eats today)
// want one inline link out to the client's own site — supporting a single
// markdown-style `[text](url)` pattern is enough for that without adding a
// whole rich-text field to the content model. Anything not matching the
// pattern renders as plain text, same as before.
const DESCRIPTION_LINK = /\[([^\]]+)\]\(([^)]+)\)/;

function DescriptionText({ text }: { text: string }) {
  const match = text.match(DESCRIPTION_LINK);
  if (!match) return <>{text}</>;

  const [full, linkText, href] = match;
  const index = match.index ?? 0;
  return (
    <>
      {text.slice(0, index)}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-inherit transition-opacity duration-150 hover:opacity-60"
      >
        {linkText}
      </a>
      {text.slice(index + full.length)}
    </>
  );
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Panel />

      <main className="flex flex-col gap-4 p-4 lg:ml-[480px] lg:p-0 lg:pt-2 lg:pr-2 lg:pb-2">
        <h1 className="text-title font-bold tracking-title">{project.title}</h1>

        {(project.client || project.year) && (
          <div className="font-mono text-metadata tracking-metadata text-muted">
            {project.client && <p>CLIENT — {project.client}</p>}
            {project.year && <p>YEAR — {project.year}</p>}
          </div>
        )}

        {project.description && (
          <p className="text-body tracking-body">
            <DescriptionText text={project.description} />
          </p>
        )}

        <ProjectGallery
          images={project.images}
          groups={project.groups}
          layout={project.layout}
          projectSlug={project.slug}
          projectTitle={project.title}
        />

        {project.booking && <BookingSection booking={project.booking} />}
      </main>
    </div>
  );
}
