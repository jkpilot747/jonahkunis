import type { Metadata } from "next";
import { Panel } from "@/app/_components/panel";

export const metadata: Metadata = {
  title: "Info",
  description:
    "Bio, contact, gear, and recognition for Jonah Kunis, a Bay Area photographer and videographer.",
};

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
          <p>Hi, I&rsquo;m Jonah! Thanks for stopping by.</p>
          <p>
            I&rsquo;m a photographer and videographer based in the Bay Area.
            I first picked up a camera at 12 and never really put it down.
            When I&rsquo;m not taking pictures I&rsquo;m usually making
            music, climbing, studying, or building something.
          </p>
          <p>
            On the professional side, my focus is GTM, marketing, and
            analytics. I&rsquo;m a senior studying managerial economics with
            a CS minor at UC Davis, and I like work that combines creative
            instinct with metrics.
          </p>
          <p>
            I love telling stories through powerful visuals. I would say
            that my style leans minimal and warm: I&rsquo;m a fan of natural
            light, muted pastel color, clean lines, and giving subjects
            space to breathe.
          </p>
        </div>

        <p className="text-body tracking-body">
          I also ran a residential pressure-washing business for a few
          years,{" "}
          <a
            href="https://www.instagram.com/propowerwashes"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-inherit no-underline ${LINK_HOVER}`}
          >
            @propowerwashes
          </a>
          .
        </p>

        <p className="text-body tracking-body">
          Always looking for the next project. If something sounds like a
          fit, let&rsquo;s talk.
        </p>

        <div className="flex flex-col gap-2">
          <h2 className="text-title font-bold tracking-title">Contact</h2>
          <a
            href="mailto:jonahkunis@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-body tracking-body text-inherit no-underline ${LINK_HOVER}`}
          >
            jonahkunis@gmail.com
          </a>
          <a
            href="https://www.instagram.com/jonahkunis"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-body tracking-body text-inherit no-underline ${LINK_HOVER}`}
          >
            @jonahkunis
          </a>
          <a
            href="https://www.linkedin.com/in/jonahkunis"
            target="_blank"
            rel="noopener noreferrer"
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

        <p className="text-body tracking-body">
          Based in the East Bay, available for work across the Bay Area and
          open to travel. FAA Part 107 licensed for aerial.
        </p>

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
