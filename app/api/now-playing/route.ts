import { getNowPlaying } from "@/lib/spotify";

// Polled by the /info ticker. Cached and regenerated at most every 30s, so
// no matter how many visitors are polling, Spotify (and a Vercel function)
// gets hit at most twice a minute.
export const dynamic = "force-static";
export const revalidate = 30;

export async function GET() {
  return Response.json({ track: await getNowPlaying() });
}
