import type { Metadata } from "next";
import Image from "next/image";
import { Panel } from "@/app/_components/panel";
import { getRecentlyPlayed, getTopTracks } from "@/lib/spotify";
import { SpotifyTicker } from "./_components/spotify-ticker";
import headshot1 from "@/public/info/jonah-kunis-1.jpg";
import headshot2 from "@/public/info/jonah-kunis-2.jpg";
import headshot3 from "@/public/info/jonah-kunis-3.jpg";
import headshot4 from "@/public/info/jonah-kunis-4.jpg";

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

// Static imports so Next generates width/height and the blur placeholder.
const HEADSHOTS = [headshot1, headshot2, headshot3, headshot4];

const LINK_HOVER = "transition-opacity duration-150 hover:opacity-60";

// Rebuild the page at most every 10 minutes so the Spotify ticker stays
// fresh while the page is still served static from the CDN in between.
export const revalidate = 600;

export default async function InfoPage() {
  const [recent, top] = await Promise.all([
    getRecentlyPlayed(),
    getTopTracks(),
  ]);

  return (
    <div className="min-h-screen">
      <Panel />

      <main className="flex max-w-[65ch] flex-col gap-8 p-4 lg:ml-[480px] lg:p-0 lg:pt-2 lg:pb-2">
        <div className="flex flex-col gap-2">
          <SpotifyTicker recent={recent} top={top} />
          <h1 className="text-title font-bold tracking-title">Info</h1>
        </div>

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

        <div className="grid max-w-[520px] grid-cols-2 gap-4">
          {HEADSHOTS.map((src, i) => (
            <Image
              key={src.src}
              src={src}
              alt={`Jonah Kunis in a vineyard, portrait ${i + 1} of 4`}
              placeholder="blur"
              sizes="(min-width: 1024px) 260px, 50vw"
              quality={90}
              className="h-auto w-full"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
