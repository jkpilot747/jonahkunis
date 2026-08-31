import { notFound } from "next/navigation";
import { Panel } from "@/app/_components/panel";
import { projects } from "@/lib/projects";
import { BookingSection } from "./_components/booking-section";
import { ProjectGallery } from "./_components/project-gallery";

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Panel />

      <main className="flex flex-col gap-4 p-4 lg:ml-[680px] lg:p-0 lg:pt-2 lg:pr-2 lg:pb-2">
        <h1 className="text-title font-bold tracking-title">{project.title}</h1>

        {(project.client || project.year) && (
          <div className="font-mono text-metadata tracking-metadata text-muted">
            <p>{"-".repeat(28)}</p>
            {project.client && <p>CLIENT — {project.client}</p>}
            {project.year && <p>YEAR — {project.year}</p>}
            <p>{"-".repeat(28)}</p>
          </div>
        )}

        {project.description && (
          <p className="text-body tracking-body">{project.description}</p>
        )}

        <ProjectGallery
          images={project.images}
          groups={project.groups}
          projectSlug={project.slug}
          projectTitle={project.title}
        />

        {project.booking && <BookingSection booking={project.booking} />}
      </main>
    </div>
  );
}
