import { Panel } from "@/app/_components/panel";

const RECOGNITION = [
  { label: "SFGate Photo of the Day", date: "Dec 2019" },
  { label: "Visit Montana", date: "Mar 2022" },
  { label: "Canon USA" },
];

const SELECTED_EXPERIENCE = [
  { role: "Marketing & Content Strategy Consultant", org: "Smarter Window", year: "2026–Present" },
  { role: "Senior Camera Operator & IT Lead", org: "UC Davis Dept. of Engineering, Distance Learning", year: "2023–Present" },
  { role: "Freelance Photographer", org: "Jonah Kunis Photography", year: "2018–Present" },
  { role: "Photographer and Project Lead", org: "Equal Eats", year: "2025" },
  { role: "Marketing Intern", org: "J Leaders", year: "2025" },
  {
    role: "Owner/Operator",
    org: "Pro Power Washes",
    year: "2024–2025",
    href: "https://www.instagram.com/propowerwashes",
  },
];

const LINK_HOVER = "transition-opacity duration-150 hover:opacity-60";

export default function InfoPage() {
  return (
    <div className="min-h-screen">
      <Panel />

      <main className="ml-[680px] flex max-w-[65ch] flex-col gap-8 pt-2 pb-2">
        <h1 className="text-title font-bold tracking-title">Info</h1>

        <div className="flex flex-col gap-4 text-body tracking-body">
          <p>
            I&rsquo;m a photographer from the East Bay, now studying at UC
            Davis. I&rsquo;ve been shooting for about twelve years.
          </p>
          <p>
            Most of what I do is portraits, grad sessions, and aerial work.
            Commercially I&rsquo;ve shot for real estate agents, solar
            companies, and hospitality brands, on the ground and from the
            air. I work in natural light and I don&rsquo;t rush a frame.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-title font-bold tracking-title">Contact</h2>
          <a
            href="mailto:jonahkunis@gmail.com"
            className={`text-body tracking-body text-inherit no-underline ${LINK_HOVER}`}
          >
            jonahkunis@gmail.com
          </a>
          <a
            href="https://www.instagram.com/jonahkunis"
            className={`text-body tracking-body text-inherit no-underline ${LINK_HOVER}`}
          >
            @jonahkunis
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-title font-bold tracking-title">Gear</h2>
          <p className="text-body tracking-body">
            Sony A7V, FE 28-70mm f/2 GM, DJI Air 2S.
          </p>
        </div>

        <p className="text-body tracking-body">FAA Part 107 licensed.</p>

        <div className="flex flex-col gap-2">
          <h2 className="text-title font-bold tracking-title">Recognition</h2>
          <div className="flex flex-col">
            {RECOGNITION.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-baseline gap-4 py-2 ${
                  i > 0 ? "border-t border-hairline" : ""
                }`}
              >
                <span className="font-mono text-metadata tracking-metadata text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 items-baseline justify-between gap-4">
                  <p className="text-body tracking-body">{item.label}</p>
                  {item.date && (
                    <p className="whitespace-nowrap font-mono text-metadata tracking-metadata text-muted">
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-title font-bold tracking-title">
            Selected experience
          </h2>
          <div className="flex flex-col">
            {SELECTED_EXPERIENCE.map((entry, i) => (
              <div
                key={`${entry.role}-${entry.org}`}
                className={`flex items-baseline gap-4 py-2 ${
                  i > 0 ? "border-t border-hairline" : ""
                }`}
              >
                <span className="font-mono text-metadata tracking-metadata text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 items-baseline justify-between gap-4">
                  <p className="text-body tracking-body">
                    {entry.role} —{" "}
                    {entry.href ? (
                      <a
                        href={entry.href}
                        className={`text-inherit no-underline ${LINK_HOVER}`}
                      >
                        {entry.org}
                      </a>
                    ) : (
                      entry.org
                    )}
                  </p>
                  <p className="whitespace-nowrap font-mono text-metadata tracking-metadata text-muted">
                    {entry.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://www.linkedin.com/in/jonahkunis"
            className={`mt-2 font-mono text-metadata tracking-metadata text-ink text-inherit no-underline ${LINK_HOVER}`}
          >
            LinkedIn
          </a>
        </div>
      </main>
    </div>
  );
}
