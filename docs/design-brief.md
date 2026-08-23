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
- No border radius larger than 10px.
- No typeface beyond the two named below.
- No font weight other than 400 and 700.
- No color that is not a token defined in `globals.css`.
- No transition longer than 150ms.
- No scroll-jacking, no page transition animations, no parallax.
- No dark mode. This site is light only. Remove the `prefers-color-scheme`
  switching that `create-next-app` left in `globals.css`.
- No lorem ipsum at any stage. Use real project names and real copy, or use
  clearly-labeled placeholder text like `[project title]`.

---

## Typography

Two faces, and only two.

**Archivo** (Google Fonts) — everything that is not metadata.
**Geist Mono** (already loaded in `app/layout.tsx`) — all metadata.

Replace Geist Sans with Archivo in `app/layout.tsx`; keep Geist Mono as it is.

### Scale

Stay on this scale. Do not introduce intermediate sizes.

| Role | Face | Size | Weight | Tracking |
|---|---|---|---|---|
| Wordmark | Archivo | 30px | 700 | -0.03em |
| Page title | Archivo | 24px | 700 | -0.02em |
| Index item | Archivo | 14px | 400 | -0.005em |
| Body / bio | Archivo | 15px | 400 | 0 |
| Metadata | Geist Mono | 12px | 400 | 0.01em |
| Filter label | Geist Mono | 11px | 400 | 0.12em, uppercase |

Line height: 1.25 for anything 24px and above, 1.5 for index items, 1.6 for body.

Metadata means dates, years, client names, image captions, categories, and the
filter row. Anything that describes the work rather than being the work.

---

## Color

Light only. Photographs supply all the color on this site; the interface
supplies none.

```css
--ground:   #EFEFED;  /* page background */
--panel:    #FFFFFF;  /* the index panel, and project page surfaces */
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

- Fixed position, 300px wide, inset 20px from the left, top, and bottom of the
  viewport — full height, not content-driven.
- Background `--panel`, radius 10px, no border, no shadow. It sits on `--ground`,
  and that tonal step is the only separation it needs.
- Internal padding 20px.
- Contents in order:
  1. Wordmark: `Jonah Kunis`
  2. One line of Geist Mono, `--muted`: what he does, one short line
  3. Hairline divider
  4. Filter row (see below)
  5. Hairline divider
  6. Project index: one project name per line
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

**Homepage (`/`).** One tile per project — its `cover`, never the full
`images` array.

- Two columns by default, 16px gutter, 8px from the top and right edges of
  the viewport, 20px from the panel. Three columns above an 1800px viewport
  width, so a tile never grows to wallpaper size on an external monitor.
- Every tile is a uniform 3:2 landscape crop, `object-fit: cover`. Zero gaps
  by construction — every tile in a row is the same height, so there is
  nothing for the CSS grid to misalign.
- `object-position` comes from the cover's optional `focal` field (e.g.
  `"50% 30%"`); default to `center` when a cover has none.
- Radius 6px on every tile.
- No spans, no exceptions. Every tile is the same size and shape as every
  other. Nothing on the homepage grid breaks row alignment, because nothing
  is allowed to.

**Project pages (`/work/[slug]`).** Three columns, same 16px gutter and 6px
radius as the homepage grid, dropping to two columns on narrow viewports.
Thumbnails are a uniform 3:2 crop, `object-fit: cover` — same "no spans, no
exceptions" rule as the homepage. "No cropping" now applies to the lightbox,
not the thumbnails: clicking a thumbnail opens the image at its natural
aspect ratio, fit to the viewport, never upscaled past its real pixel size.
Close with Escape or the close control; move between images by clicking the
left/right half of the lightbox or the arrow keys.

There is no `wide` field. It existed only because the single-column layout
made a full-width image harmless; now that thumbnails are a uniform grid,
the same "no spans, no exceptions" reasoning that killed the homepage's
`feature` flag applies here too.

Images load with their blur placeholder from the manifest. No spinners, no
skeleton loaders, no fade-in animation.

### The social dock

- Fixed, bottom-right, 20px from both edges.
- Vertical pill: `--panel` background, radius 10px, 44px wide, 10px padding.
- Instagram, LinkedIn, Email. Hand-written inline SVG, single path each,
  `--muted` at rest and `--ink` on hover.

---

## Interaction

Restraint is the point. Three behaviors, nothing else.

1. **Index hover.** Hovering a project name drops every *other* name in the list
   to 40% opacity. The hovered item stays at full. No weight change, no
   underline, no movement — those cause layout shift.
2. **Grid image hover.** The image's caption appears in a fixed slot at the
   bottom of the panel, in Geist Mono at `--muted`. The image itself does not
   move, scale, or change opacity.
3. **Filter change.** The index list updates instantly with no animation. The
   grid crossfades at 120ms.

Everything else is a plain click.

---

## Routes

Three. Resist adding more.

- `/` — panel plus grid, all projects, filterable.
- `/work/[slug]` — a single project. Same panel on the left. Right side becomes a
  single-column stack of that project's images with a short description block at
  the top, Archivo body scale.
- `/info` — bio, contact, gear, license, recognition, selected experience. Same
  panel. Right side is a single text column, max 65 characters wide,
  left-aligned against the grid's left edge. See `docs/content-plan.md` for the
  exact copy and structure.

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
  "cover": { "src": "01.jpg", "focal": "50% 30%" },
  "images": [
    { "src": "01.jpg", "w": 2400, "h": 1600, "blur": "data:...", "caption": "" }
  ]
}
```

`category` is one of `projects`, `commercial`, `personal`. The filter row reads
from this field, so it must be exactly one of those three strings.

`cover.focal` is optional; omit it to default to `center`. There is no `feature`
field and no `images[].wide` field: both grids are uniform, no spans, no
exceptions.

Images are never referenced by hardcoded path in a component. Every image on the
site comes from this file.

---

## Build order

Follow this sequence. Each step should look finished before the next begins.

1. **Tokens.** Write the color and type tokens into `globals.css`. Strip the
   `create-next-app` defaults and the dark mode switching. Swap Geist Sans for
   Archivo in `app/layout.tsx`.
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
