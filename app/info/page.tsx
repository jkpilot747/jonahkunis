import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
          <p>Hi, I&rsquo;m Jonah.</p>
          <p>
            I&rsquo;m a photographer and videographer based in the Bay Area, and
            a senior camera operator for the UC Davis Department of Engineering.
            My commercial work spans real estate, solar, nonprofits, and brands,
            along with portraits and travel.
          </p>
          <p>
            Photography started for me at 12, after &ldquo;borrowing&rdquo; my
            mom&rsquo;s old Nikon D5000. My style is minimal and warm, with
            natural light, muted pastels, and room for subjects to breathe.
            Landscapes and people are what I enjoy shooting most.
          </p>
          <p>
            In summer 2026, I worked on go-to-market and content for{" "}
            <Link
              href="/work/smarter-window-2026"
              className={`text-inherit no-underline ${LINK_HOVER}`}
            >
              Smarter Window
            </Link>
            , a smart-home tech startup. Two founder Reddit posts built on my
            strategy drove 60% of their pre-launch reservations. On the video
            side of things, I shot and edited their founder documentary and
            launch demos.
          </p>
          <p>
            I&rsquo;m graduating from UC Davis in 2027 with a degree in
            Managerial Economics and a minor in CS, and I want to work in
            go-to-market strategy. My pressure-washing business,{" "}
            <a
              href="https://www.instagram.com/propowerwashes"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-inherit no-underline ${LINK_HOVER}`}
            >
              @propowerwashes
            </a>
            , did 60 jobs and $20,000 over two summers, with about 95% of
            clients coming from Nextdoor with zero ad spend.
          </p>
          <p>
            Outside of work, drums have been a part of my life since I was 14
            (after some years of classical piano), along with climbing, skiing,
            working out, and a lot of espresso. My music Instagram is{" "}
            <a
              href="https://www.instagram.com/jonahkmusic"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-inherit no-underline ${LINK_HOVER}`}
            >
              @jonahkmusic
            </a>
            .
          </p>
          <p>
            I&rsquo;m always open to freelance shoots (happy to travel) and
            looking for full-time marketing roles in the Bay Area. Send me an
            email at{" "}
            <a
              href="mailto:jonahkunis@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-inherit no-underline ${LINK_HOVER}`}
            >
              jonahkunis@gmail.com
            </a>
            .
          </p>
        </div>

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
            Sony A7V, FE 28-70mm f/2 GM, DJI Air 2S. FAA Part 107 licensed for
            aerial.
          </p>
        </div>

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
