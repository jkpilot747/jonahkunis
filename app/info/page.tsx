import { Panel } from "@/app/_components/panel";

const RECOGNITION = [
  { label: "SFGate Photo of the Day", date: "Dec 2019" },
  { label: "Visit Montana", date: "Mar 2022" },
  { label: "Canon USA", date: "Jun 2022" },
];

const LINK_HOVER = "transition-opacity duration-150 hover:opacity-60";

export default function InfoPage() {
  return (
    <div className="min-h-screen">
      <Panel />

      <main className="flex max-w-[65ch] flex-col gap-8 p-4 lg:ml-[480px] lg:p-0 lg:pt-2 lg:pb-2">
        <h1 className="text-title font-bold tracking-title">Info</h1>

        <div className="flex flex-col gap-4 text-body tracking-body">
          <p>
            Hi, I&rsquo;m Jonah. Yes, same first name as Jonah Hill. Thanks
            for stopping by.
          </p>
          <p>
            I&rsquo;m a photographer, videographer, entrepreneur, musician,
            athlete, and creative based in the East Bay, currently studying
            at UC Davis. I picked up a camera for the first time at 12 and
            never really put it down.
          </p>
          <p>
            I love telling stories through powerful visuals: real light,
            real moments, and whatever a shot actually calls for.
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
          <a
            href="https://www.linkedin.com/in/jonahkunis"
            className={`text-body tracking-body text-inherit no-underline ${LINK_HOVER}`}
          >
            LinkedIn
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
      </main>
    </div>
  );
}
