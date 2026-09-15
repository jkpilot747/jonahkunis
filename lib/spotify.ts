// Spotify data for the /info ticker. Server-only: the client secret and
// refresh token never reach the browser. Credentials come from env vars (see
// scripts/spotify-token.mjs for the one-time setup). Every function swallows
// failures and returns an empty result, so the page renders without the
// ticker instead of breaking.

export type Track = {
  id: string;
  name: string;
  artist: string;
  url: string;
  // ISO time of the most recent play. Recently played only.
  playedAt?: string;
};

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
  process.env;

type SpotifyTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
};

function toTrack(t: SpotifyTrack): Track {
  return {
    id: t.id,
    name: t.name,
    artist: t.artists.map((a) => a.name).join(", "),
    url: t.external_urls.spotify,
  };
}

async function getAccessToken(): Promise<string | null> {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return null;
  }
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token ?? null;
}

async function spotifyGet(path: string) {
  const token = await getAccessToken();
  if (!token) return null;
  const res = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // 204 = nothing playing.
  if (!res.ok || res.status === 204) return null;
  return res.json();
}

export async function getRecentlyPlayed(limit = 20): Promise<Track[]> {
  try {
    const data = await spotifyGet("/me/player/recently-played?limit=50");
    // Replays of the same song back to back would read as a stutter in the
    // ticker, so keep only the latest play of each track (items are newest
    // first).
    const seen = new Set<string>();
    const tracks: Track[] = [];
    for (const { track, played_at } of data?.items ?? []) {
      if (!track || seen.has(track.id)) continue;
      seen.add(track.id);
      tracks.push({ ...toTrack(track), playedAt: played_at });
      if (tracks.length === limit) break;
    }
    return tracks;
  } catch {
    return [];
  }
}

// Top tracks over roughly the last four weeks (Spotify's "short_term").
export async function getTopTracks(limit = 20): Promise<Track[]> {
  try {
    const data = await spotifyGet(
      `/me/top/tracks?time_range=short_term&limit=${limit}`,
    );
    return (data?.items ?? []).map(toTrack);
  } catch {
    return [];
  }
}

// The track playing right now, or null when paused, idle, or on a podcast.
export async function getNowPlaying(): Promise<Track | null> {
  try {
    const data = await spotifyGet("/me/player/currently-playing");
    if (!data?.is_playing || data.currently_playing_type !== "track") {
      return null;
    }
    return data.item ? toTrack(data.item) : null;
  } catch {
    return null;
  }
}
