import { Panel } from "@/app/_components/panel";

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

export default function InfoPage() {
  return (
    <div className="min-h-screen">
      <Panel />

      <main className="ml-[680px] flex max-w-[65ch] flex-col gap-8 pt-2 pb-2">
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
          <p className="text-body tracking-body">jonahkunis@gmail.com</p>
          <p className="text-body tracking-body">@jonahkunis</p>
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
          <ul className="flex flex-col gap-1 text-body tracking-body">
            <li>SFGate Photo of the Day, Dec 2019</li>
            <li>Visit Montana, Mar 2022</li>
            <li>Canon USA</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-title font-bold tracking-title">
            Selected experience
          </h2>
          <ul className="flex flex-col gap-1 text-body tracking-body">
            {SELECTED_EXPERIENCE.map((entry) => (
              <li key={`${entry.role}-${entry.org}`}>
                {entry.role} — {entry.href ? (
                  <a href={entry.href}>{entry.org}</a>
                ) : (
                  entry.org
                )}
                , {entry.year}
              </li>
            ))}
          </ul>
          <a
            href="https://www.linkedin.com/in/jonahkunis"
            className="text-body tracking-body"
          >
            LinkedIn
          </a>
        </div>
      </main>
    </div>
  );
}
