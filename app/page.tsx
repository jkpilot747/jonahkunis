const FILTERS = ["ALL", "PROJECTS", "COMMERCIAL", "PERSONAL"];

const PROJECTS = [
  "Chamisal Vineyards",
  "North Fork Trail",
  "Still Life, No. 2",
  "Terra Studio",
  "Late Harvest",
  "Union Pacific",
];

export default function Home() {
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
          {FILTERS.map((filter, i) => (
            <span
              key={filter}
              className={`font-mono text-filter uppercase tracking-filter ${
                i === 0 ? "text-ink" : "text-muted"
              }`}
            >
              {filter}
            </span>
          ))}
        </div>

        <div className="mt-5 border-t border-hairline" />

        <ul className="mt-5 min-h-0 flex-1 overflow-y-auto">
          {PROJECTS.map((project) => (
            <li key={project} className="text-index tracking-index">
              {project}
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
        {PROJECTS.map((project) => (
          <div key={project} className="aspect-[3/2] rounded-[6px] bg-[#c9c9c4]" />
        ))}
      </main>
    </div>
  );
}
