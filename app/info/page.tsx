import type { Metadata } from "next";
import Image from "next/image";
import { Panel } from "@/app/_components/panel";
import { getRecentlyPlayed, getTopTracks } from "@/lib/spotify";
import { SpotifyTicker } from "./_components/spotify-ticker";
import headshot from "@/public/info/jonah-kunis-headshot.jpg";

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

        <div className="max-w-[520px]">
          {/* Static import so Next generates width/height and the blur placeholder. */}
          <Image
            src={headshot}
            alt="Portrait of Jonah Kunis"
            placeholder="blur"
            priority
            sizes="(min-width: 1024px) 520px, 100vw"
            quality={90}
            className="h-auto w-full"
          />
        </div>

        <div className="flex flex-col gap-4 text-body tracking-body">
          <p>
            I&rsquo;m Jonah Kunis, a photographer and videographer based in the
            Bay Area. I&rsquo;m also a Managerial Economics student at UC Davis
            with a minor in Computer Science, graduating in June 2027. My work
            covers making the content, deciding how it reaches customers, and
            measuring what worked.
          </p>
          <p>
            On the creative side, I shoot commercial work for real estate,
            solar, nonprofits, and brands, along with portraits and travel. My
            style is minimal and warm, with natural light, muted pastels, and
            room for subjects to breathe. I got into photography at 12 by
            borrowing my mom&rsquo;s Nikon D5000. She didn&rsquo;t get it back
            for a long time.
          </p>
          <p>
            I&rsquo;m also the Senior Camera Operator for the UC Davis College
            of Engineering&rsquo;s distance-learning program. I film graduate
            sessions across UC Davis and Lawrence Livermore and have trained
            four new operators since starting in 2023.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-body tracking-body">
          <h2 className="text-title font-bold tracking-title">Selected work</h2>
          <p>
            <a
              href="https://smarter-window.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold text-inherit no-underline ${LINK_HOVER}`}
            >
              Smarter Window, Summer 2026.
            </a>{" "}
            I led go-to-market strategy and content for this smart-home startup
            before launch. Two founder Reddit posts built on my strategy drove
            60% of pre-launch reservations. I also shot and edited the founder
            documentary and multiple launch demos.
          </p>
          <p>
            <a
              href="https://github.com/jkpilot747/consignment-pricing-analysis"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold text-inherit no-underline ${LINK_HOVER}`}
            >
              Consignment pricing analysis, September 2026.
            </a>{" "}
            I analyzed 17 years of point-of-sale data from my family&rsquo;s
            10,000-square-foot furniture consignment store, where I work on
            e-commerce and operations. The first month decides most outcomes. A
            new item has about a 50% chance of selling in its first month, but
            once it&rsquo;s been on the floor for six months, that chance drops
            to about 4%. Mainstream brands also outsold high-end ones: about 84%
            of West Elm and Crate &amp; Barrel pieces sold within 90 days,
            compared with roughly 50% for Knoll and Restoration Hardware. My dad
            now sources even more of the fast-selling categories, and I&rsquo;ve
            set a baseline to measure whether sell-through improves by February.
          </p>
          <p>
            <a
              href="https://www.instagram.com/propowerwashes"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold text-inherit no-underline ${LINK_HOVER}`}
            >
              @propowerwashes.
            </a>{" "}
            I started and ran a pressure-washing business that completed 60 jobs
            and brought in $20,000 over two summers. About 95% of clients came
            from Nextdoor with zero ad spend.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-body tracking-body">
          <h2 className="text-title font-bold tracking-title">
            Outside of work
          </h2>
          <p>
            I&rsquo;ve played drums since 14, after 5 years of classical piano
            training. I also climb, ski, lift, and drink a lot of espresso. My
            music is on Instagram at{" "}
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
            I&rsquo;m always open to freelance shoots and happy to travel.
            I&rsquo;m also looking for marketing and marketing analytics roles
            in the Bay Area after I graduate. Email me at{" "}
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
      </main>
    </div>
  );
}
