"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { Track } from "@/lib/spotify";

// A slow horizontal ticker of Spotify listening, above the /info title.
// - Two views, switched from the label in the filter-row style: recent plays
//   (with "2h ago" times) and top tracks of the last ~4 weeks (numbered).
// - Polls /api/now-playing; while something is playing, a pulsing dot sits
//   by the logo and that track leads the recent list.
// - Hovering pauses the ticker so a title can be read or clicked.
// The list renders twice so the loop is seamless: the track animates by
// exactly -50%, landing the second copy where the first started. Reduced-
// motion visitors get a static, swipeable row (see .ticker in globals.css).

type Mode = "recent" | "top";

const POLL_MS = 30_000;

export function SpotifyTicker({
  recent,
  top,
}: {
  recent: Track[];
  top: Track[];
}) {
  const [mode, setMode] = useState<Mode>(recent.length ? "recent" : "top");
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);
  const now = useNow();

  useEffect(() => {
    let cancelled = false;
    const poll = () => {
      if (document.hidden) return;
      fetch("/api/now-playing")
        .then((res) => res.json())
        .then((data) => !cancelled && setNowPlaying(data.track ?? null))
        .catch(() => {});
    };
    poll();
    const id = setInterval(poll, POLL_MS);
    document.addEventListener("visibilitychange", poll);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", poll);
    };
  }, []);

  if (recent.length === 0 && top.length === 0) return null;

  const items: { track: Track; meta: string | null; live?: boolean }[] =
    mode === "top"
      ? top.map((track, i) => ({
          track,
          meta: String(i + 1).padStart(2, "0"),
        }))
      : [
          ...(nowPlaying
            ? [{ track: nowPlaying, meta: "now", live: true }]
            : []),
          ...recent
            .filter((t) => t.id !== nowPlaying?.id)
            .map((track) => ({
              track,
              meta: now && track.playedAt ? timeAgo(track.playedAt, now) : null,
            })),
        ];

  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map(({ track, meta, live }, i) => (
        <li key={`${track.id}-${i}`} className="flex items-center">
          {mode === "top" && meta && (
            <span className="pr-2 text-muted">{meta}</span>
          )}
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={hidden ? -1 : undefined}
            className="whitespace-nowrap transition-opacity duration-150 hover:opacity-60"
          >
            {track.name} — {track.artist}
          </a>
          {mode === "recent" && meta && (
            <span className={`pl-2 ${live ? "text-ink" : "text-muted"}`}>
              {meta}
            </span>
          )}
          <span className="px-4 text-muted">·</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col gap-2 font-mono text-metadata tracking-metadata text-ink sm:flex-row sm:items-center sm:gap-4">
      <div className="flex shrink-0 items-center gap-2 uppercase tracking-filter">
        <SpotifyIcon />
        {nowPlaying && (
          <span className="relative flex size-1.5" aria-label="Listening now">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-ink" />
          </span>
        )}
        {recent.length > 0 && top.length > 0 ? (
          <>
            <ModeButton active={mode === "recent"} onClick={() => setMode("recent")}>
              Recently played
            </ModeButton>
            <span className="text-muted">/</span>
            <ModeButton active={mode === "top"} onClick={() => setMode("top")}>
              Top this month
            </ModeButton>
          </>
        ) : (
          <span>{recent.length ? "Recently played" : "Top this month"}</span>
        )}
      </div>

      <div className="ticker min-w-0 flex-1 overflow-hidden">
        <div
          // Remount on switch so the new list starts from the beginning.
          key={mode}
          className="ticker-track flex w-max"
          style={{ animationDuration: `${items.length * 6}s` }}
        >
          {list(false)}
          {list(true)}
        </div>
      </div>

    </div>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`uppercase transition-colors duration-150 hover:text-ink ${
        active ? "text-ink" : "text-muted"
      }`}
    >
      {children}
    </button>
  );
}

// Current time for "2h ago" labels, ticking once a minute. Null during the
// server render and hydration, so the server's clock never has to match the
// visitor's; the times appear right after.
let currentTime = Date.now();
function subscribeToMinutes(onChange: () => void) {
  currentTime = Date.now();
  const id = setInterval(() => {
    currentTime = Date.now();
    onChange();
  }, 60_000);
  return () => clearInterval(id);
}
function useNow() {
  return useSyncExternalStore(
    subscribeToMinutes,
    () => currentTime,
    () => null,
  );
}

function timeAgo(iso: string, now: number) {
  const minutes = Math.floor((now - new Date(iso).getTime()) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// Spotify's icon mark in black (--ink), one of the colors their brand
// guidelines allow. It doubles as the attribution they ask for.
function SpotifyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      role="img"
      aria-label="Spotify"
      className="shrink-0"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}
