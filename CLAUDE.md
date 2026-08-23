# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (Turbopack, default at http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`)

There is no test runner configured in this project.

## Architecture

This is a Next.js 16 App Router site (`app/` directory) with no `src/` wrapper. It is currently just the stripped-down `create-next-app` starter:

- `app/layout.tsx` — root layout; loads Geist Sans/Mono via `next/font/google` and exposes them as CSS variables (`--font-geist-sans`, `--font-geist-mono`) consumed in `app/globals.css`. Uses the Next 16 typed-props helper `LayoutProps<"/">` instead of a hand-written props interface — see `node_modules/next/dist/docs/` before changing layout signatures, since typed routing/layout props are new relative to older Next.js versions.
- `app/page.tsx` — the home route.
- `app/globals.css` — Tailwind v4 is loaded via `@import "tailwindcss"` (no `tailwind.config.js`); theme tokens are declared inline with `@theme inline` and light/dark colors are set through `--background`/`--foreground` custom properties switched by `prefers-color-scheme`.
- Path alias `@/*` maps to the repo root (`tsconfig.json`).

Since this project pins a very new Next.js version, always check `node_modules/next/dist/docs/` for the current API shape before adding routes, data fetching, metadata, or config — do not rely on prior Next.js knowledge for anything beyond trivial JSX changes.
