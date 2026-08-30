# Design Brief — jonahkunis.com

This document is the design authority for this project. When a layout, type, or
color decision is ambiguous, the answer is here. If it is not here, ask before
inventing one.

Visual references live in `docs/refs/`. Look at them before proposing any layout.

---

## What this site is

A portfolio for Jonah Kunis: commercial photography and video, marketing and
product project work, and personal photography. One site, one index, filtered.

## Who it is for

Two audiences arriving with two different questions:

- **Hiring managers** looking at marketing, brand, and product work. They want to
  see project thinking and evidence of execution.
- **Photography clients** looking for commercial, event, and portrait work. They
  want to see images and know he is reliable.

Both must be able to find what they came for within one click of the homepage.
Neither should have to wade through the other's material to get there.

---

## Hard rules

These are non-negotiable. They exist because the default output of any web
framework drifts toward generic, and this list is what stops it.

- No drop shadows. Anywhere. Not on the panel, not on images, not on hover.
- No gradients of any kind.
- No icon libraries. The social dock uses hand-written inline SVG, nothing else.
- No centered hero with a headline and a subtitle underneath it.
- No cards. Text content does not get a bordered box around it.
- No site-wide `max-width` container centering everything. The grid runs to the
  right edge of the viewport.
- No border radius anywhere. Square corners only — rounded corners are the
  first thing that reads as generic template/AI-tool output, so this is
  stricter than the "10px cap" an earlier draft of this rule allowed. See
  "The panel" and "The grid" below for what replaced the panel's old
  rounded box.
- No typeface beyond the two named below (Instrument Sans and Geist Mono).
- No font weight other than 400 and 700.
- No color that is not a token defined in `globals.css`.
- No transition longer than 150ms.
- No scroll-jacking, no page transition animations, no parallax.
- No dark mode. This site is light only. Remove the `prefers-color-scheme`
  switching that `create-next-app` left in `globals.css`.
- No lorem ipsum at any stage. Use real project names and real copy, or use
  clearly-labeled placeholder text like `[project title]`.
- No em dashes anywhere in site copy (headings, descriptions, captions, FAQ,
  anywhere a visitor reads text). Applies to future copy too, not just what
  exists today.

---

## Typography

Two faces, and only two.

**Instrument Sans** (Google Fonts, via `next/font/google`) — everything that
is not metadata.
**Geist Mono** (already loaded in `app/layout.tsx`) — all metadata.

### Scale

Stay on this scale. Do not introduce intermediate sizes.

| Role | Face | Size | Weight | Tracking |
|---|---|---|---|---|
| Wordmark | Instrument Sans | 80px | 700 | -0.03em |
| Page title | Instrument Sans | 32px | 700 | -0.02em |
| Index item | Instrument Sans | 18px | 400 | -0.005em |
| Body / bio | Instrument Sans | 19px | 400 | 0 |
| Metadata | Geist Mono | 14px | 400 | 0.01em |
| Filter label | Geist Mono | 13px | 400 | 0.12em, uppercase |

These sizes ended up larger than the original draft above through several
rounds of eyeballing the panel in the browser at 640px wide — the numbers
here are what's actually in `globals.css`'s `@theme inline` block, not a
starting proposal.

One deliberate exception: `--text-huge` (72px, weight 700, `tracking-wordmark`,
`leading-none`) exists solely for the "→ Book a session ←" CTA at the bottom
of Graduation's booking section — see Flourishes below. Don't reach for it
anywhere else; if a second spot wants oversized type, that's a sign the scale
needs a real new row, not more ad hoc reuse of this one. (The wordmark's own
80px now exceeds `--text-huge`'s 72px — that's fine, they're unrelated: the
wordmark is a fixed row in this table, `--text-huge` is the one-off token
reserved for the booking CTA specifically.)

Line height: 1.25 for anything 24px and above, 1.5 for index items, 1.6 for body.

Metadata means dates, years, client names, image captions, categories, and the
filter row. Anything that describes the work rather than being the work.

---

## Color

Light only. Photographs supply all the color on this site; the interface
supplies none.

```css
--ground:   #FFFFFF;  /* page background, behind the grid */
--panel:    #EFEFED;  /* the index panel, and project page surfaces */
--ink:      #111111;  /* all primary text */
--muted:    #8A8A85;  /* metadata, inactive filters, captions */
--hairline: #E1E1DD;  /* dividers inside the panel */
```

There is no accent color. Active and hover states are expressed through opacity
and weight, never through hue. This is deliberate: a portfolio with no interface
color reads as confident, and it means no photograph ever clashes with the site.

---

## Layout

### Overall

A fixed left panel and a scrolling grid to its right. The panel does not scroll
with the grid.

```
┌────────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌─────────────┐ ┌─────────────┐    │
│  │  PANEL       │  │             │ │             │    │
│  │  (fixed)     │  │   project   │ │   project   │    │
│  │              │  │             │ │             │    │
│  │  wordmark    │  └─────────────┘ └─────────────┘    │
│  │  ──────────  │  ┌─────────────┐ ┌─────────────┐    │
│  │  filters     │  │   project   │ │   project   │    │
│  │  ──────────  │  └─────────────┘ └─────────────┘    │
│  │  project     │  ┌─────────────┐ ┌─────────────┐    │
│  │  project     │  │             │ │             │    │
│  │  project     │  │   project   │ │   project   │    │
│  │              │  │             │ │             │ ◗  │
│  │  ──────────  │  └─────────────┘ └─────────────┘    │
│  │  Info  CV    │                              dock ──┘
│  └──────────────┘                                      │
└────────────────────────────────────────────────────────┘
```

### The panel

- Fixed position, 640px wide, inset 20px from the left, top, and bottom of the
  viewport — full height, not content-driven. (Widened from an original 300px
  draft after seeing the bumped type scale above in the browser — 300px read
  cramped at 18px index items.)
- No background fill, no radius, no shadow. What separates the panel from the
  grid is a single hairline down its right edge (`border-r border-hairline`)
  — not a tonal box. This replaced an earlier `--panel`-filled, 10px-radius
  box once it read too close to a generic template "card" left over from the
  original draft; see `docs/refs/Screenshot 2026-08-31 at 00.07.14.png` (a
  Cargo template) for the reference this pattern is drawn from — full-height
  vertical rules between columns, square corners throughout, no background
  fill on the nav column itself.
- Internal padding 20px.
- Contents in order:
  1. Wordmark: `Jonah Kunis` — links to `/`
  2. One line of Geist Mono, `--muted`: what he does, one short line
  3. Hairline divider
  4. Filter row (see below)
  5. Hairline divider
  6. Project index: one numbered row per project (see Flourishes)
  7. Hairline divider, pinned to the bottom of the panel
  8. `Info` link, sitting on the panel's bottom edge
- The project index (step 6) is the only flexible region — it grows to fill
  whatever space is left between the filter row and the footer, and scrolls
  internally if the list is too long for that space. Everything else in the
  panel keeps its natural height.

### The filter row

Four options in Geist Mono, uppercase, `--muted` when inactive and `--ink` when
active:

`ALL` · `PROJECTS` · `COMMERCIAL` · `PERSONAL`

- **Projects** — marketing, product, and case work. The material for recruiters.
- **Commercial** — paid photography and video.
- **Personal** — personal photography, drone, and music work.

Clicking a filter narrows the project index and the grid at the same time. No
page navigation, no URL change required in v1.

### The grid

Homepage and project pages use different grid rules.

Both the homepage and project pages are masonry now — an earlier draft of
this brief specified a uniform, cropped 3:2 homepage grid with hover-reveals-
caption-in-panel interaction; that was superseded when the homepage was
reworked into a captioned masonry grid, and this section documents what's
actually built, not that earlier draft.

**Homepage (`/`).** One tile per project — its `cover`, never the full
`images` array.

- Two-column CSS masonry (`columns-2`, 16px gutter), three columns above an
  1800px viewport width so a tile never grows to wallpaper size on an
  external monitor. 8px from the top and right edges of the viewport, 20px
  from the panel.
- Each cover renders at its own real aspect ratio (`h-auto w-full`) — no
  forced crop, no `object-fit: cover`. A portrait cover and a landscape
  cover both show their full frame, at the cost of tiles not staying
  row-aligned across columns. `cover.focal` and the `wide` field mentioned
  elsewhere in this doc are both dead — nothing here crops, so there's
  nothing for either to position or override.
- Square corners, no radius — see Hard rules above.
- Below each tile: the project title (Index item scale) and its category
  (Metadata scale, `--muted`, capitalized), both static — always visible,
  not a hover reveal.

**Project pages (`/work/[slug]`).** Same two-column CSS masonry pattern
(`columns-2`, 16px gutter, square corners). Thumbnails render at each image's
real aspect ratio for the same reason as the homepage — a portrait shot and
a landscape shot both show their full frame.

Clicking a thumbnail still opens the lightbox at the image's natural aspect
ratio, fit to the viewport, never upscaled past its real pixel size. Close
with Escape or the close control; move between images by clicking the
left/right half of the lightbox or the arrow keys.

**Video.** An `images[]` entry can carry a `video` field (see Content model
below) — its `src`/`w`/`h`/`blur` still describe a poster frame, exactly
like a still. In the grid, that tile gets a small always-visible play-icon
overlay (a hand-drawn inline SVG triangle in a plain `--panel` circle — no
icon library, no drop shadow, matching the social dock's icon convention).
Clicking it opens the lightbox exactly like a photo, except the media is a
native `<video controls>` element instead of an `<Image>`, and the
left/right click-to-navigate zones are disabled for that one item — they'd
otherwise sit on top of and swallow clicks meant for the video's own
play/pause/scrubber controls. Arrow-key navigation still steps past a video
like any other item. Click-to-play only: no autoplay, no muted-loop grid
preview — consistent with this site's zero-motion-until-clicked rule
elsewhere in this Interaction section.

Images load with their blur placeholder from the manifest. No spinners, no
skeleton loaders, no fade-in animation.

### The social dock

- Fixed, bottom-right, 20px from both edges.
- Vertical stack: `--panel` background, square corners, 44px wide, 10px padding.
- Instagram, LinkedIn, Email. Hand-written inline SVG, single path each,
  `--muted` at rest and `--ink` on hover.

---

## Interaction

Restraint is the point. Four behaviors, nothing else.

1. **Index hover.** Hovering a project name drops every *other* name in the list
   to 40% opacity. The hovered item stays at full. No weight change, no
   underline, no movement — those cause layout shift.
2. **Homepage grid caption.** Each tile's title and category print statically
   underneath it (see "The grid" above) — there's no hover-to-reveal
   behavior; the caption is always visible, not conditional on hover.
3. **Filter change.** The index list updates instantly with no animation. The
   grid crossfades at 120ms.
4. **Text link hover.** Any inline text link — Graduation's booking CTA,
   `/info`'s Contact/LinkedIn/Selected-experience links — fades to 60%
   opacity (`transition-opacity duration-150 hover:opacity-60`). Same
   opacity-only rule as everything else on this site: never a color change,
   never an underline.

Everything else is a plain click.

---

## Flourishes

A deliberate departure from pure restraint, added after the base system was
working — inspired by the Cargo templates in `docs/refs/`. These are the only
ones. Don't extrapolate a general "add personality" license from them; each
one below is specific and intentional, not a style to sprinkle everywhere.

- **Numbered track-listing rows.** The panel's project index, Graduation's
  packages and FAQ lists, and `/info`'s Recognition and Selected experience
  lists all use this. Each row gets a zero-padded two-digit index (`01`,
  `02`, ...) in Geist Mono `--muted`, and rows are separated by a hairline
  divider (the first row in a list skips its top divider). Where a row has a
  trailing date/year, it renders right-aligned in Geist Mono `--muted`
  (matching the Typography section's definition of metadata), the same
  layout Graduation's packages use for price. This is a real pattern now —
  reuse it verbatim for any future numbered list rather than inventing a new
  numbering style.
- **Terminal metadata block.** On `/work/[slug]`, entries that have a
  `client` and/or `year` (currently only the three Projects entries) get a
  small monospace block between the page title and the description: a line
  of 28 hyphens, then `CLIENT — <value>` / `YEAR — <value>` each on their own
  line, then another 28 hyphens. Entries without that data skip the block
  entirely — this is conditional on having real metadata to show, never
  padded out with empty rows. Borrowed from the "CARGO™ Place_holder" ref.
- **The huge CTA.** "→ Book a session ←" at `--text-huge` (72px) — see
  Typography above. One CTA, one spot. Arrows point inward at the text on
  both sides, not a trailing "go here" arrow.

---

## Routes

Three. Resist adding more.

- `/` — panel plus grid, all projects, filterable.
- `/work/[slug]` — a single project. Same panel on the left. Right side leads
  with a page title (Page title scale), then — only for entries with a
  `client`/`year` — the terminal metadata block from Flourishes above, then a
  short description block, Body/bio scale, then a single-column stack of
  that project's images.
- `/info` — bio, contact, gear, license, recognition, selected experience. Same
  panel. Right side is a single text column, max 65 characters wide,
  left-aligned against the grid's left edge, leading with a page title
  ("Info", Page title scale) for the same anchor `/work/[slug]` gets.
  Recognition and Selected experience use the numbered track-listing rows
  from Flourishes above; Contact's email/Instagram and the LinkedIn link are
  real links using the standard hover-opacity transition. See
  `docs/content-plan.md` for the exact copy and structure.

---

## Content model

`content/projects.json`, generated by `npm run images`, hand-edited for
everything the script cannot know.

```json
{
  "slug": "chamisal-2026",
  "title": "Chamisal",
  "year": 2026,
  "category": "commercial",
  "client": "Chamisal Vineyards",
  "role": "Photography, direction",
  "description": "One or two sentences. Optional.",
  "cover": { "src": "01.jpg" },
  "images": [
    { "src": "01.jpg", "w": 2400, "h": 1600, "blur": "data:...", "caption": "" },
    {
      "src": "02.jpg", "w": 2400, "h": 1350, "blur": "data:...", "caption": "",
      "video": { "src": "/work/chamisal-2026/02.mp4", "duration": 34 }
    }
  ]
}
```

`category` is one of `projects`, `commercial`, `personal`. The filter row reads
from this field, so it must be exactly one of those three strings.

`cover.focal` still exists on the type and `npm run images` still preserves
it across reruns, but it's inert — nothing renders it. It was written for a
now-superseded uniform-crop homepage grid (see "The grid" above); the
current masonry grid shows every cover at its full aspect ratio, so there's
no crop for a focal point to position. Leave it out of new entries.

**Video.** An `images[]` entry can carry an optional `video` field —
`src`/`w`/`h`/`blur`/`caption` above it still describe the poster frame,
generated by `scripts/images.mjs` the exact same way a still's blur
placeholder is. `video.src` is the actual clip to play; it can be a
site-relative path under `/work/<slug>/` (self-hosted, the pipeline's
current default) or an absolute URL (externally hosted) — the lightbox's
`<video>` element doesn't care which, so the hosting location can change
later without touching this schema. `video.duration` (seconds) is optional
and currently unused by any component. See "Video" under Layout above for
how it renders. Processing a video file in `raw/<slug>/` requires `ffmpeg`
on `PATH` (`brew install ffmpeg`) — the script only checks for it the first
time it actually encounters a video file, so an image-only project is
unaffected on a machine without it installed.

**Grouped entries.** A Commercial entry that spans multiple distinct shoots
(Events & Fundraisers is the motivating case — one entry, several unrelated
events) can tag each image with a `group` key and add a top-level `groups`
map from that key to a short label. A plain string renders as text; an
`{ text, href }` object renders as a link (e.g. out to the client's site):

```json
{
  "images": [
    { "src": "01.jpg", "w": 2400, "h": 1600, "blur": "data:...", "caption": "", "group": "shalom-gala" },
    { "src": "02.jpg", "w": 2400, "h": 1600, "blur": "data:...", "caption": "", "group": "ncjw" }
  ],
  "groups": {
    "shalom-gala": { "text": "Shalom School gala, Sacramento", "href": "https://shalomschool.org" },
    "ncjw": "NCJW fundraiser"
  }
}
```

The project page renders the label above the run of images that share a
group — no divider, just a short bold line before that section's grid
starts. So images sharing a group must be **contiguous** in the array —
`npm run images` sorts by filename, so name files so each shoot's photos
cluster together alphabetically (e.g. a per-shoot filename prefix). `group`
is entirely optional and preserved across `npm run images` reruns the same
way `caption` is; entries that don't set it render exactly as before this
feature existed — one continuous grid, no section breaks.

There is no `feature` field and no `images[].wide` field — see "The grid"
under Layout above for why (both grids are masonry now, rendering each
image's real aspect ratio; neither field would have anything to do).

Images are never referenced by hardcoded path in a component. Every image on the
site comes from this file.

---

## Build order

Follow this sequence. Each step should look finished before the next begins.

1. **Tokens.** Write the color and type tokens into `globals.css`. Strip the
   `create-next-app` defaults and the dark mode switching. Swap Geist Sans for
   the display face named in Typography above (Instrument Sans, currently) in
   `app/layout.tsx`.
2. **Shell.** Build the panel and grid regions with flat grey rectangles standing
   in for photographs. Get the proportions, spacing, and type scale right while
   there is nothing pretty to hide behind. This step matters more than any other.
3. **Index and filters.** Wire the filter row against a hand-written
   `projects.json` with five or six fake entries.
4. **Project page.** `/work/[slug]`.
5. **Info page.** `/info`.
6. **Image pipeline.** The `npm run images` script.
7. **Real photographs.** Last. Only now.

Do not skip to step 7. A layout tuned around specific images is painful to
change; a layout that already works with grey rectangles will work with anything.
