import { notFound } from "next/navigation";
import { Panel } from "@/app/_components/panel";
import { projects } from "@/lib/projects";
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

      <main className="ml-[680px] flex flex-col gap-4 pt-2 pr-2 pb-2">
        {project.description && (
          <p className="text-body tracking-body">{project.description}</p>
        )}

        <ProjectGallery
          images={project.images}
          projectSlug={project.slug}
          projectTitle={project.title}
        />
      </main>
    </div>
  );
}
