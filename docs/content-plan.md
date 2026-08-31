# Content Plan — jonahkunis.com

Working document. This is what goes in `content/projects.json` and on the two
standalone pages. Draft blurbs below are starting points to rewrite in your own
voice, not finished copy.

---

## How the index is organized

Two different axes, deliberately:

- **Projects** are **per-engagement**. One entry per piece of work. The story is
  the engagement: brief, what you did, what shipped. These are the entries a
  hiring manager reads.
- **Commercial** is **per-category**, not per-client. One entry per kind of work,
  holding the best frames from every job of that kind. These are the entries a
  photography client scans.
- **Personal** is **per-body-of-work**. Loose, image-led, minimal text.

Never create a commercial entry named after a single client. If you shoot three
more grad sessions next spring, they go into the existing Graduation entry, not
into three new index lines.

**Index order.** The default filter is ALL, so the order of this list is the
order a first-time visitor reads. Projects first, then Commercial, then Personal.
That puts the strongest recruiter-facing work at the top without hiding anything
from a photography client, who will reach for a filter anyway.

---

## PROJECTS

### 1. Equal Eats
`category: projects` · Jul–Sep 2025 · Contract

Your strongest recruiter-facing entry. It is simultaneously a photography
portfolio piece and evidence you can run a project solo end to end.

Draft: *Shot and produced a 46-product photography project for Equal Eats solo,
end to end. Scoped the shoot, built the schedule, planned locations, and executed
both product and lifestyle setups. Delivered assets for e-commerce, marketing,
and social.*

Needs: 8–12 finals. Include at least two that show range (a clean product frame
next to a lifestyle frame). If you kept any planning artifacts (a shot list, a
schedule), one screenshot of that is worth more to a recruiter than a 13th photo.

### 2. Smarter Window
`category: projects` · Jun 2026–present · Contract

Most current work and the most senior-sounding. Content strategy plus production
plus GTM for an early-stage hardware startup.

Draft: *Working directly with the founder of an early-stage startup building
smart-home hardware for casement windows. Content planning, photo and video
production, and go-to-market strategy, from scoping through execution.*

Needs: whatever is shareable. Check with the founder first, since pre-launch
hardware is often under wraps. If nothing can be shown yet, keep the entry with
text only and no cover, or hold it until it can.

### 3. Bay Home Consignment
`category: projects` · Aug 2022–present

You mentioned having a lot of material here. It is a good entry because it is
volume product photography plus an operations system, which is a more unusual
pairing than either alone.

Draft: *Manage product photography, online inventory, and e-commerce sales for a
furniture and high-end audio consignment business. Built an Excel tracker that
automates eBay fee calculations and consignor payouts.*

Needs: a grid of product shots that reads as a consistent system, not a
collection of one-offs. That consistency is the actual selling point. One frame
of the tracker if you are comfortable showing it.

### Pro Power Washes — not a Projects entry

Decided against a full Projects entry: it was marketing Jonah did for his own
business, not a photography project. It appears only as a line on `/info`
under Selected experience, linking out to the Instagram profile
(@propowerwashes) instead of a `/work/[slug]` page.

---

## COMMERCIAL

### 6. Events & Fundraisers
`category: commercial`

Nonprofit galas, fundraisers, walks, corporate events, and private
celebrations.

Final description (in `content/projects.json`): *Event coverage across
nonprofit fundraisers, walks, awards ceremonies, and private celebrations,
including the MG Walk NorCal, the Shalom School Benefit, NorCal Clean Cities
and Communities, the Big Bang Business Competition at UC Davis, and bat
mitzvahs and other private events.* Hillel and NCJW were in the original plan
but didn't end up among the photos actually selected for `raw/`, so they're
not named in the copy — describe what's actually shown, not what was planned.

Event work is the hardest to make look good in a grid, since it is often many
similar frames. Cut ruthlessly. Ten strong frames beat forty adequate ones.

This entry spans multiple unrelated shoots (a gala is not a bat mitzvah), so
its grid breaks into labeled sections per event rather than reading as one
undifferentiated pile of photos — see "Grouped entries" in
`docs/design-brief.md`'s Content model section. Five named groups are tagged
in `content/projects.json` (`lilys-bat-mitzvah`, `shalom-school-benefit`,
`big-bang`, `mg-walk`, `norcal-clean-cities`); two small private shoots
(Jodi's private party, the Wornick prom pre-party) were left ungrouped by
request — not every shoot needs a named section, and these didn't warrant one.

### 7. Product & Brand
`category: commercial`

Distinct from the Equal Eats project entry, which tells a story. This one is
purely a range demonstration across clients.

Final description (in `content/projects.json`): *Product and brand
photography across a range of clients, including GRID Alternatives and
UrbnEco.* GRID Alternatives lives here, not under a separate entry. No
vineyard client material exists, despite an earlier draft of this plan
assuming there would be — UrbnEco (clothing) is the second named client
instead.

### 8. Graduation
`category: commercial`

Your actual revenue engine, and the one entry that carries a commercial ask.
Originally combined with general portrait/headshot work as "Portraits &
Grad," then split apart — grad sessions are the higher-volume, more
seasonal business and deserve their own entry; portraits and headshots are
a different kind of booking (see #8a below) and shouldn't share a page just
because both are "portraiture."

Final description (in `content/projects.json`): *Senior and grad
photography sessions, shot in natural light on location or at home.*

**This page ends with booking.** After the image stack: packages and pricing, the
two client testimonials, a short FAQ, and the Google Form link. Nothing about
booking appears anywhere else on the site, and there is no Booking item in the
panel footer. The ask lands where interest is highest and stays out of the way of
everyone else.

Styling: the packages are a plain table or a simple three-column list in the
existing type scale. No pricing cards, no borders, no highlighted "most popular"
treatment. The hard rules in the design brief still apply here.

Trim the current site's copy hard. Four packages, two testimonials, five FAQ
lines at most.

### 8a. Portraits & Headshots
`category: commercial`

Split out from Graduation (see above) — general portrait and headshot
sessions, not tied to grad season. No booking section of its own yet; add
one later if this line of work turns out to need the same kind of
commercial ask Graduation gets.

Final description (in `content/projects.json`): *Portrait and headshot
sessions, shot in natural light on location or at home.*

Needs: `raw/portraits-headshots/` doesn't exist yet — this entry is hidden
from the site until photos are added.

---

## PERSONAL

This is your largest body of work. Two entries, not five. Landscape and travel
are the same discipline in different zip codes; splitting them produces two grids
that feel like each other.

### 9. Aerial
`category: personal`

Genuinely a different medium, and it ties to the Part 107 license, so it earns
its own entry. Where most of the recognition lives: SFGate Photo of the Day
(Dec 2019), VisitMontana (Mar 2022), Canon USA. Say so in the entry.

### 10. Landscape & Travel
`category: personal`

Everything handheld. The largest single grid on the site, so this is where
editing discipline matters most. Twelve years of shooting means the temptation is
to include eighty frames. Twenty-five is a portfolio; eighty is an archive.

Final description (in `content/projects.json`): *Landscape and travel
photography from twelve years of shooting, all handheld, across the West and
beyond.*

Music production and drums stay off the site. They dilute a page that is already
arguing two things at once.

### 11. Architecture
`category: personal`

Started life as "Real Estate & Architecture," a planned Commercial entry built
around the Part 107 real estate differentiator. Once real photos went in
(`raw/real-estate-architecture/`), most of what actually got shot was hobby
architectural photography — building interiors and exteriors shot for their
own sake, not real estate listings for a client — so it got moved here and
retitled instead of staying miscategorized as paid work. The slug stayed
`real-estate-architecture` (renaming it would mean moving the raw/ and
public/work/ folders and breaking the existing URL for no real benefit); only
the display title, category, and description changed. Part 107 is still true
of some frames but isn't the point of the entry anymore, so it's not in the
description — it's stated plainly on `/info` regardless.

Final description (in `content/projects.json`): *Architectural photography,
shot from the ground and the air, across office buildings, civic architecture,
and other structures that caught my eye.*

---

## Info page (`/info`)

Adapted from your current About page, cut by about half. Order:

1. Short bio. Two paragraphs, not four. Keep the East Bay / UC Davis grounding
   and the "real light, real moments" line, which is the best sentence on your
   current site. Cut the list of hobbies at the end.
2. Contact. Email, Instagram, and that is enough.
3. Gear. Sony A7V, FE 28-70mm f/2 GM, DJI Air 2S. Keep it brief and factual.
4. Part 107 licensed, stated plainly.
5. Recognition. Four lines, no elaboration.
6. Selected experience. Six entries, role/org/year, no bullets, followed by a
   LinkedIn link. This is the resume-lite: no standalone `/resume` route, no
   PDF download. Some roles earn a resume line but not an index entry — that
   is the correct outcome, but here it means they simply don't appear; there
   is no separate record for them to live in.

Cut from the current site: "Industries served" as a list. It reads as SEO filler,
and the commercial entries demonstrate the same thing by existing.

---

## What is still open

- **A real copy pass.** Deliberately deferred — the user wants to work out
  voice/style separately before touching existing prose. Whenever that
  happens: no em dashes anywhere (see Hard rules in `docs/design-brief.md`),
  and `docs/refs/Screenshot 2026-08-31 at 00.07.14.png` (a Cargo template)
  is a useful reference for tone/format — label:value metadata pairs
  ("Publisher: Querido"), italic subtitles under a title, bracketed text
  links ("[View]") instead of styled buttons. That reference's own
  lorem-ipsum placeholder text is full of em dashes, which is irrelevant
  noise from Cargo's filler generator, not a style cue to follow.

Confirmed and closed: booking lives on the Graduation page only; personal
work is substantial and splits into Aerial and Landscape & Travel; Pro Power
Washes is not a Projects entry (see above); Product & Brand stays in Commercial
as planned, and its image count (now 15 real frames) is enough to carry the
entry on its own — it did not fold into Equal Eats. Smarter Window's material
turned out to be shareable — real photos are live. The paid-work scope is
three Projects entries (Equal Eats, Smarter Window, Bay Home Consignment)
plus four Commercial entries (Events & Fundraisers, Product & Brand,
Graduation, Portraits & Headshots — split from the original combined
"Portraits & Grad," see #8/#8a above). Architecture (originally planned as
a fifth Commercial entry, "Real Estate & Architecture") ended up recategorized
as Personal instead — see #11 above for why.

---

## Where I left off

**Done.** Tokens, shell (panel + grid), index/filter wiring, the `/work/[slug]`
project page with a real lightbox, `/info`, and the social dock are all built
and working. `scripts/images.mjs` is written, tested, and wired up as
`npm run images`. All ten entries from this plan are in `content/projects.json`
with real `title` / `category` / `slug` and a real `description` (Pro Power
Washes was cut as a Projects entry — see above — and instead appears as a
linked line on `/info` under Selected experience, pointing at
@propowerwashes on Instagram). The three Projects entries also carry real
`client` / `year`; the Commercial entries and Landscape & Travel don't —
per this plan's own organization (Commercial is per-category, not
per-engagement), a single client/year doesn't fit those, so client names live
in the description prose instead and `client`/`year` stay empty. The social
dock reads its three icons from `public/icons/{instagram,linkedin,email}.svg`
(swap the files to change the icons — no code changes needed) and opens all
three links in a new tab. The project page also supports grouped sub-sections
now (`images[].group` + top-level `groups` map, see "Grouped entries" in
`docs/design-brief.md`) for entries like Events & Fundraisers that span
multiple unrelated shoots — raw folders exist for it but photos and group
assignments aren't in yet. `docs/design-brief.md`'s panel width and type
scale match the code (640px, bumped sizes) — reconciled, no drift between
the two.

"Portraits & Grad" is now two entries: **Graduation** (`graduation`) and
**Portraits & Headshots** (`portraits-headshots`) — see #8/#8a above. Grad
sessions are the higher-volume, more seasonal business and carry Graduation's
booking section (`app/work/[slug]/_components/booking-section.tsx`, rendered
from a `booking` field on the project entry — see the `ProjectBooking` type
in `lib/projects.ts`) with real packages/pricing, both testimonials, five FAQ
lines, and the live Google Form link. Portraits & Headshots split off empty,
with no booking section of its own yet. Equal Eats, Smarter Window, Bay Home
Consignment, Graduation, and Aerial have real photos processed into
`public/work/` and are the only entries currently visible on the site, since
entries with no images are hidden from the index and grid by design, not by
accident. Graduation's raw folder (`raw/graduation/`, 17 photos) was moved
there directly from the old `raw/portraits-grad/` rather than reprocessed
from scratch, since nothing about the images themselves changed.

Also swapped: `--ground` is now white and `--panel` is the off-white
`#EFEFED` (the reverse of the original tokens) — the page background behind
the grid is white, the panel itself is the tonal grey.

`scripts/images.mjs` got a safety fix. It walks every project's raw/ folder
on every run, and `raw/bay-home-consignment-2022/` had drifted out of sync
with what was already shipped (missing `bayhome-4.jpg`, deliberately removed
by hand) — which the old script would have applied silently while someone
was really just trying to add photos to an unrelated entry. It now diffs
each project's raw/ contents against what's already in `content/projects.json`
and logs any removal or cover change loudly (`<slug>: removing N image(s)
no longer in raw/ — ...`, `<slug>: cover changed X -> Y`) instead of doing it
without a trace. Adding and removing files from raw/ still works exactly as
before — the fix is visibility, not a block.

A round of Cargo-inspired flourishes landed too — see "Flourishes" in
`docs/design-brief.md` for the authoritative list: the wordmark's trailing
`Jonah Kunis*`, numbered track-listing rows (panel index, Graduation's
packages and FAQ), the dashed monospace "terminal" metadata block on project
pages with real `client`/`year` data, and the huge "→ Book a session ←" CTA
at the bottom of Graduation. These are deliberate, specific exceptions to the
otherwise-restrained system, not a general license to keep adding personality
everywhere — read that section before extending the pattern further.

**All ten entries are populated and live.** Product & Brand and Portraits &
Headshots (the two that were still empty as of the last update to this
section) both got real photos and custom covers. Every entry in this plan's
scope — three Projects, four Commercial, two Personal (plus Architecture,
recategorized — see above) — now has real photos in `raw/<slug>/`, processed
into `public/work/<slug>/`, and is visible on the site. Nothing is hidden
for lack of images anymore.

**Since then, this session:**
- Swapped the wordmark/body typeface from Archivo to Inter (a brief detour
  through a self-hosted Fontshare face, Switzer, landed and was then
  reverted in favor of Inter — see git history on `app/layout.tsx` if that
  matters later). Wordmark bumped to 56px and its trailing asterisk
  flourish was dropped. `docs/design-brief.md` reflects Inter throughout.
- Bay Home Consignment's photos were updated twice — first adding 6 new
  shots from an 08-26 session, then swapping 2 of those back out — netting
  4 new photos over the original 5. Along the way, found and fixed a real
  bug in `scripts/images.mjs`: every run was silently resetting every
  project's cover to first-in-sort-order, clobbering any hand-picked cover
  that didn't happen to match (this had already quietly overwritten covers
  on Smarter Window, Product & Brand, Graduation, Portraits & Headshots,
  Architecture, and Aerial before it was caught and reverted). The script
  now preserves an existing cover across reruns unless its image is
  actually gone from `raw/`.
- `docs/design-brief.md`'s Layout section was rewritten to match reality:
  the homepage was already masonry (reworked in an earlier session, commit
  `b88c54b`) but the brief still described an old uniform 3:2-crop grid with
  hover-reveals-caption-in-panel behavior that was never actually built that
  way. It now documents the real masonry grid and the real static
  under-tile caption. `cover.focal` and `images[].wide` are both noted as
  inert leftovers from that old design.
- **Video support, in progress.** Content model (`ProjectImage.video`),
  pipeline (`scripts/images.mjs` — ffmpeg-based poster-frame extraction +
  transcode, lazily checked so image-only projects are unaffected on a
  machine without ffmpeg installed), grid play-icon tile, and the
  lightbox's `<video controls>` branch are all built and type-checked.
  Untested against real footage — no `raw/<slug>/` folder has a video file
  yet, and `ffmpeg` isn't installed on this machine, so the pipeline half
  has never actually run. Click-to-play only, no autoplay/loop preview —
  see "Video" under Layout in `docs/design-brief.md`. Hosting location for
  the actual clip files is still an open decision (see "What is still
  open" above).

**This session:**
- Swapped the wordmark/body typeface again, from Inter to **Instrument
  Sans** (still Google Fonts, via `next/font/google`) — Inter read as too
  close to the generic default every AI site-builder reaches for first.
  Picked after comparing Instrument Sans against General Sans, Cabinet
  Grotesk, Author, Switzer, Bricolage Grotesque, Schibsted Grotesk, and
  Space Grotesk side by side in the site's real type scale. `app/layout.tsx`
  (`instrumentSans` / `--font-instrument-sans`), `app/globals.css`
  (`--font-sans`), and `docs/design-brief.md`'s Typography section and Hard
  rules all updated to match.
- Dropped the panel's `--panel` background and 10px radius entirely, after
  comparing against `docs/refs/Screenshot 2026-08-31 at 00.07.14.png` (a
  Cargo template) — the boxed-panel look read too close to a generic
  template card. Replaced with a single right-edge hairline
  (`border-r border-hairline` on `<aside>` in `app/_components/panel.tsx`)
  separating the nav column from the grid, matching the reference's
  full-height vertical rules between columns. Radius removed everywhere else
  too — homepage grid tiles, project-page gallery thumbnails, and the social
  dock all went from 6px/10px radius to square corners. Hard rules and "The
  panel"/"The grid"/"The social dock" in `docs/design-brief.md` all updated;
  the radius cap changed from "10px max" to "none, anywhere."
- Wordmark bumped from 56px to 80px (now exceeds `--text-huge`'s 72px, which
  is fine — see the note in design-brief.md's Typography section for why
  that's not a conflict).
- **Fixed a real double-compression bug.** Next.js 16 defaults
  `images.qualities` to `[75]`, which was silently coercing every `<Image>`
  on the site to quality 75 regardless of the source file's own quality —
  confirmed live via network requests (`_next/image?...&q=75` on every
  photo) after the user flagged images looking under-resolved. Fixed by
  adding `images: { qualities: [75, 90] }` to `next.config.ts` and setting
  `quality={90}` on all three `<Image>` usages (`app/page.tsx`,
  `project-gallery.tsx` grid thumbnail and lightbox). Same file at the same
  1920px width went from 55KB to 102KB, visibly sharper. Cross-checked
  against a real photography Cargo site
  (juliannehan.cargo.site) via its network requests — Cargo's own CDN
  (`freight.cargo.site`) serves every size tier at quality 75 by default, so
  90 already exceeds what a comparable professional site ships. Also bumped
  `scripts/images.mjs`'s own `QUALITY` constant from 80 to 90 and reran
  `npm run images` to regenerate every project's photos and blur
  placeholders at the new source quality (`public/work/` grew from 100M to
  196M) — this doesn't change what's delivered to visitors (Next re-encodes
  to its own quality regardless of source), it only raises the source
  ceiling to reduce generational loss.
- Added a hard rule: no em dashes anywhere in site copy. Not yet applied as
  an actual copy pass — see "What is still open" below.
- Replaced the fixed bottom-right icon social dock with plain-text
  `LinkedIn` / `Instagram` / `Email` links, stacked one per line inside the
  panel itself, right under the tagline. Drawn from
  `docs/refs/Screenshot 2026-08-31 at 00.34.57.png` (a Cargo template),
  which lists contact info as plain text under the site name the same way.
  `app/_components/social-dock.tsx` is deleted; `SocialDock` is no longer
  imported anywhere. `docs/design-brief.md`'s "The panel" contents list,
  Hard rules, the ASCII layout diagram, and the Video section's now-dangling
  reference to "the social dock's icon convention" are all updated —
  the video play-icon overlay is the only hand-drawn icon left on the site.
- Bumped the filter row from 13px to 16px (`--text-filter`, only used
  there, so nothing else moved) and the panel's `Info` footer link to its
  own 16px (previously shared `--text-metadata` with captions/dates/
  categories/the `CLIENT`/`YEAR` block — gave it a one-off size instead of
  bumping that shared token and inflating all of those too).

**Next thing.**
Superseded — see "Status as of 2026-09-01" at the very bottom of this file
for the current open list. Left here so this paragraph's own history
(the copy pass turning out to already be mostly done) doesn't get lost:
what's left from that point is optional and unrelated to the current open
list — a Portraits & Headshots booking section if that work ever needs its
own commercial ask (see #8a above), and general content additions as new
work comes in.

Closed: the Chamisal shoot, previously tracked here as unplaced content,
doesn't exist — there was never a real shoot to place. Drop it from
planning; the "chamisal-2026" slug in `docs/design-brief.md`'s Content
model section is an illustrative schema example only, unrelated to this.

**This session (mobile pass toward launch):**
- `ffmpeg` installed (`brew install ffmpeg`, PATH wired into `~/.zprofile`
  and `~/.zshrc`) and the video pipeline run end-to-end against a real
  clip for the first time — Smarter Window's `raw/smarter-window-2026/`
  got a real product-demo `.mov`, processed into a poster frame + capped
  mp4 under `public/work/smarter-window-2026/`. The pipeline held up:
  correct poster frame, correct duration, cover untouched (a video is
  never eligible as a default cover, confirmed). This also resolves the
  "video hosting" open question from before, at least for now — it's
  self-hosted under `public/work/<slug>/`, the pipeline's existing
  default; nothing pushed us to Vercel Blob/S3/Mux yet. Revisit if the
  repo size becomes a real problem as more clips land.
- The video needed two follow-up fixes once real footage was in: it
  wasn't wide enough (tried `column-span: all` inside the two-column
  masonry first — WebKit doesn't reliably honor `width: 100%` on a
  spanning element and centers/shrinks it instead), and its caption was
  centered (native `<button>` defaults to `text-align: center` and
  nothing overrode it). Fixed by having a video break out of the masonry
  into its own full-width block in normal flow (`ProjectGallery`'s
  `chunkByVideo`, see `app/work/[slug]/_components/project-gallery.tsx`)
  and adding `text-left` to the shared tile markup. Image captions
  (`ProjectImage.caption`) are now actually rendered for the first time
  — previously stored in the data model but only ever used as alt text —
  styled like the grouped-section labels (bold, `text-index`), printed
  above the tile.
- **Mobile got a real layout for the first time.** Previously there was
  none — the panel was a `fixed`, hardcoded-640px sidebar with no
  fallback, so the site was unusable below `lg` (1024px, chosen so
  portrait tablets get the mobile treatment too and only landscape
  tablets/laptops and up get the sidebar). Two iterations:
  1. First pass stacked the panel in normal flow above the grid and used
     a scroll-on-mount hack (`ScrollToContent`) to jump past it into a
     project's content on navigation, since otherwise tapping a project
     just landed you back at the top of the same menu with no sign
     anything happened. Worked, but had a real gap: once scrolled deep
     into a gallery there was no way back to the nav except scrolling
     all the way back up, with no visual cue that was even possible.
  2. Replaced with a slim sticky header (wordmark + a Menu/Close toggle)
     that expands into a full-screen overlay holding everything the old
     sidebar had — tagline, socials, filters, project index, Info link.
     It's reachable at any scroll depth, tapping a link or filter closes
     it and takes you there directly. This made the scroll-jump hack
     unnecessary — `ScrollToContent` was deleted along with its usages.
     Desktop (`lg` and up) is byte-for-byte the same fixed sidebar as
     before; the two layouts share one `panelBody` JSX value in
     `app/_components/panel.tsx` rather than duplicating the filter/
     index/social markup.
  3. Hit one real CSS bug getting there: the sticky header's wrapping
     `<div className="lg:hidden">` was exactly as tall as the header
     itself, and `position: sticky` sticks *within its parent's box* —
     zero extra height meant zero room to stay stuck, so it just
     scrolled away like a normal element despite `position: sticky`
     being set correctly. Fixed by putting the sticky/fixed classes
     directly on that div instead of a separate inner one, so its
     containing block is the full page height, not just its own content.
- Along the way, found that testing against the `next dev` network URL
  (a phone on the same Wi-Fi hitting `http://192.168.0.25:3000`) loaded
  the page but left it completely non-interactive — Next 16 blocks
  cross-origin requests for dev-only JS chunks by default, so React never
  hydrated. Fixed with `allowedDevOrigins: ["192.168.0.25"]` in
  `next.config.ts`. Dev-only; irrelevant once actually deployed, where
  everyone loads from one real origin. If the phone's LAN IP changes
  later, that value needs updating to match.

**This session (copy pass + mobile/bug QA):**
- Did the copy pass this doc had flagged as deferred (see "What is still
  open" above). Turned out most of it was already done — every project
  description in `content/projects.json` already reads as real, finished
  copy in a consistent voice, not the draft placeholders this doc's earlier
  "Draft:" blurbs implied were still live. Two actual gaps found and fixed:
  - Graduation's weather FAQ answer had an em dash in visitor-facing prose
    ("great portraits — heavy rain is where we draw the line"), a real
    violation of the Hard rules' no-em-dash rule in `docs/design-brief.md`
    (the `CLIENT — <value>` / `role — org` em dashes elsewhere are the
    documented terminal-metadata-block flourish, a UI separator glyph, not
    prose — those are correct as-is and weren't touched). Reworded to
    "...great portraits, but heavy rain is where we draw the line."
  - Aerial (`content/projects.json`) had an empty `description` — the only
    entry with no copy at all, silently blank on `/work/aerial`. Added one
    line following this plan's own direction for the entry ("say so" about
    the recognition): "Aerial photography and video, FAA Part 107 licensed.
    Work recognized by SFGate's Photo of the Day, VisitMontana, and Canon
    USA." Worth a second look from the user since it's new prose, not just
    a mechanical fix like the FAQ line.
- Full mobile/bug QA pass via `npm run dev` + Chrome automation: homepage
  grid, mobile menu overlay (open/close, filter tap keeping the menu open —
  confirmed the fix from commit `1addbcc` still holds), project pages, the
  Smarter Window video tile and its lightbox playback, and `/info` all
  checked. No real bugs found. `npm run lint` clean. No console errors on
  any page visited.
  - One rabbit hole along the way: `resize_window` in this session's
    browser tooling stopped reliably setting the actual viewport after its
    first call (subsequent calls reported success but the real
    `window.innerWidth` stayed stuck around 150-340px regardless of the
    requested size, sometimes drifting between screenshots with no resize
    call in between) — a tooling bug in this session's Chrome automation,
    not a site issue. Where a screenshot taken under that broken window
    looked wrong (e.g. the video lightbox appearing to not cover the full
    screen), cross-checked against the DOM directly
    (`getBoundingClientRect`, computed `position`/`background-color`) and
    confirmed the site was actually rendering correctly (full-viewport
    `position: fixed`, black 90%-opacity backdrop, centered video) — the
    screenshot was misleading, not the site.
- After the QA pass above, the user looked at the real site in their own
  browser (not the automated Chrome tab) and flagged two real problems the
  automated pass had missed because they only show up once every photo is
  real and the window is a normal size, not a design-brief compliance
  check: the whole page read as too big, and the homepage grid had
  landscape covers bunched at the top and portrait covers bunched at the
  bottom instead of a mix. Both fixed — see the corresponding notes in
  `docs/design-brief.md` (Typography's Scale table intro, "The panel", and
  "The grid" in Layout) for the full reasoning; in short:
  - Shrank the whole type scale and the panel width (wordmark 80→48,
    title 32→26, index 18→16, body 19→17, metadata/filter 14/16→13 each,
    huge CTA 72→56, panel 640→440px, mobile header wordmark 28→22px,
    homepage's 3-column breakpoint 1800→1400px) — `app/globals.css`,
    `app/_components/panel.tsx`, `app/page.tsx`, and the `lg:ml-[680px]`
    content offset in `app/page.tsx`/`app/info/page.tsx`/
    `app/work/[slug]/page.tsx` (all three now `480px`, matching the new
    440px panel + 20px inset + 20px gap) all touched.
  - Added `orderForMasonry()` to `lib/projects.ts`, used only by the
    homepage grid (`app/page.tsx`) — the panel's index still uses the real
    category order from `filterProjects()`, untouched. Root cause: native
    CSS multi-column masonry fills column 1 with roughly the first half of
    its source array and column 2 with the rest, so the panel's Projects→
    Commercial→Personal category order (a deliberate choice, see "How the
    index is organized" above) put every landscape cover near the top
    (Projects and Commercial happen to be mostly landscape shoots) and
    every portrait cover near the bottom (Personal is entirely portrait
    shots) once real photos replaced placeholders. Wasn't visible earlier
    in the build because it depends on which specific frames got picked as
    covers, not on layout code.
    - Superseded a few minutes later, same session: the user looked at the
      reordered grid and asked for a specific hand-picked lead sequence
      instead — Landscape & Travel and Aerial up top, then Graduation,
      Architecture, Events & Fundraisers, then everything else. Replaced
      the orientation-interleave logic in `orderForMasonry()` with a fixed
      `GRID_LEAD_ORDER` slug list; anything not in that list keeps
      `filterProjects()`'s normal category order and is appended after it.
      Works per-filter, not just under ALL — e.g. filtering to PERSONAL
      still shows Landscape & Travel and Aerial before Architecture, since
      the sort only cares about each entry's position in the lead list,
      not which filter produced the list being sorted. The orientation
      clustering problem the previous version fixed is back in principle
      (this lead sequence is mostly portrait covers) but wasn't re-flagged,
      so left as is — see the note in `docs/design-brief.md`'s "The grid".
    - Extended a few minutes later again, same session: user asked for
      Portraits & Headshots to replace Equal Eats' old spot, Smarter
      Window after it, then Bay Home, then Product & Brand — confirmed via
      an AskUserQuestion after the request read ambiguously (a mention of
      "events should take place of bay home" could have meant moving
      Events & Fundraisers out of the lead group entirely; user confirmed
      it stays put, Equal Eats just moves to last). `GRID_LEAD_ORDER`
      (renamed `GRID_PRIORITY_ORDER` in the next round below) grew to name
      every entry except Equal Eats.
      - Checking the live result at this point also surfaced a real CSS
        bug: the homepage was rendering 2 columns instead of 3 on a normal
        laptop-width screen, because `lg:columns-2` and (at the time)
        `min-[1400px]:columns-3` are two independent Tailwind utility
        classes for the same `columns` property, and Tailwind doesn't
        guarantee the wider breakpoint's rule lands later in the generated
        stylesheet — at a viewport matching both conditions, `lg:` happened
        to win. Tried registering 1400px as a proper named `--breakpoint-*`
        custom breakpoint instead (thinking Tailwind would sort it into the
        same ascending chain as the built-in breakpoints); that didn't fix
        it either, and a variant name starting with a digit (`3col:`) also
        silently failed to generate any CSS at all along the way. Settled
        on hand-writing the three `column-count` rules directly in
        `globals.css` as a plain `.masonry-grid` class instead of fighting
        Tailwind's variant ordering — see the note in
        `docs/design-brief.md`'s "The grid" for the full detail.
    - Extended once more immediately after, same session: user said the
      result was "better, but mix up the horizontal and vertical" —
      pointing at the same same-orientation-clustering problem from two
      rounds back (Landscape & Travel and Aerial, both portrait, sat next
      to each other at the very top of the priority list, so column 1
      opened with two tall portrait tiles in a row). Brought back
      orientation interleaving, but layered on top of the curated priority
      order instead of replacing it: `orderForMasonry()` now builds the
      priority-ordered list first, then splits it into landscape/portrait
      sub-sequences (each preserving its own relative order from the
      priority list) and merges them alternately, starting with whichever
      orientation the first entry actually is so Landscape & Travel still
      leads. Verified in the browser: grid order came back exactly as
      predicted by hand (Landscape & Travel, Graduation, Aerial, Portraits
      & Headshots, Architecture, Smarter Window, Events & Fundraisers,
      Equal Eats, Bay Home Consignment, Product & Brand — alternating P/L
      until the portrait list, one entry longer, runs out).

**This session (a big copy and content batch, one message with ~20 items):**
- Panel tagline: "Commercial photography, video, and product work" →
  "Commercial and personal photography and video" (`panel.tsx`), per the
  user's own suggestion to drop "product work."
- Homepage grid priority order updated again (`GRID_PRIORITY_ORDER` in
  `lib/projects.ts`, renamed from `GRID_LEAD_ORDER` in the previous round):
  now Landscape & Travel, Aerial, Graduation, Events & Fundraisers,
  Architecture, Smarter Window, Product & Brand, Bay Home Consignment —
  Graduation moved ahead of Events & Fundraisers/Architecture, and
  Portraits & Headshots dropped out of the named list entirely (so it now
  falls through to "rest" alongside Equal Eats, in that relative order).
  The orientation-interleave layer built in the previous round still runs
  on top of this unchanged.
- `/info` bio rewritten start to finish — the old three-sentence bio read
  as generic/AI-written to the user. New version keeps a personal, joking
  tone (opens with a Jonah Hill name comparison) while still naming the
  East Bay/UC Davis grounding and folding a list of roles
  (photographer/videographer/entrepreneur/musician/athlete/creative) into
  a normal sentence rather than a bulleted list, to match the site's
  flowing-prose bio pattern rather than introducing a new list style. Only
  a first draft — flagged for the user to react to, not treated as final.
- Canon USA recognition entry got a date (`Jun 2022`) — previously the
  only `RECOGNITION` row with no date.
- Selected experience section removed from `/info` entirely (the user felt
  it didn't fit the site; LinkedIn is enough) — `SELECTED_EXPERIENCE` and
  its whole rendered block deleted from `app/info/page.tsx`. Its LinkedIn
  link moved into the Contact section instead of disappearing, alongside
  email and Instagram, per the user's explicit ask ("don't need another
  link to LinkedIn on the info page unless it can be added to contact
  section"). Real side effect worth flagging: Pro Power Washes' only
  appearance on the whole site was a linked line in Selected experience
  (see "Pro Power Washes — not a Projects entry" above) — removing that
  section means Pro Power Washes no longer appears anywhere on the site.
  Not restored anywhere else since the user didn't ask for that; flagged
  rather than decided unilaterally.
- Terminal metadata block (`CLIENT — <value>` / `YEAR — <value>` on
  `/work/[slug]`) lost its bracketing lines of 28 hyphens, sitewide — see
  the Flourishes note in `docs/design-brief.md`. Affects only the three
  Projects entries, since they're the only ones with `client`/`year` set.
- Equal Eats: description rewritten to drop the solo-shooter framing
  ("alongside their product marketing team" instead of "solo") and link
  out to equaleats.com. That link is a first real content need for a
  clickable mention inside prose — added a small `DescriptionText` helper
  in `app/work/[slug]/page.tsx` supporting one `[text](url)` pair per
  description (regex-based, not a real markdown parser) rather than
  bolting a whole rich-text field onto the content model for one link. See
  the Content model note in `docs/design-brief.md`.
- Bay Home Consignment: `year` cleared (client stays), and the description
  dropped the Excel tracker sentence in favor of a line about shooting the
  building itself, on the ground and from the air, for marketing use. Flag
  for the user: the actual `raw/bay-home-consignment-2022/` images don't
  currently include any aerial/drone shots (no `DJI`-prefixed files, just
  interior/product shots) — the new copy describes work that isn't yet
  reflected in what's on the page. Either the description is describing
  something not yet uploaded, or it should be trimmed back to just "shot
  the building for marketing use" until aerial building shots are added.
- Smarter Window: the 10 install-step images were sorted in *descending*
  order (13, 12, 11 ... 4) because `scripts/images.mjs` sorts by EXIF
  capture date, not filename, and these were apparently shot in reverse of
  their logical step order. For a step-by-step sequence that reads
  backwards, so reordered the array to plain ascending filename order (04
  through 13, video still last). This was a manual one-time fix to
  `content/projects.json` — a future `npm run images` run against this
  same `raw/` folder would re-derive capture-date order and undo it, so if
  new install photos ever get added to this project, the order needs
  checking again after running the script. Also removed this entry's
  dashed terminal-block lines (see above, same fix as Equal Eats/Bay
  Home). Left the actual 2-column masonry layout alone — the user's note
  ("since it's two columns, it should actually go") read as ambiguous
  between "switch to a single column so steps read top-to-bottom" and just
  explaining why the wrong order was extra confusing in two columns;
  interpreted it as the latter since the numbering was the concrete,
  unambiguous complaint. Flagged for the user to confirm either way.
- Events & Fundraisers: the two Wornick prom pre-party images (previously
  ungrouped by request, see "Grouped entries" note above) now carry a
  `wornick-prom` group tagged "Prom party at Wornick's," matching every
  other shoot in this entry. Jodi's private party (the other
  previously-ungrouped shoot) wasn't touched — the user only asked about
  the prom photos.
  - Also fixed a real visual bug in the MG Walk NorCal group: 7 images,
    6 landscape and 1 portrait, rendering in native CSS multi-column
    masonry (`columns-2`) left a large empty gap at the bottom of the left
    column while the right column kept going, because the one tall
    portrait image landed early in the source order and threw off the
    browser's height-balancing estimate for that group. Moved the
    portrait image (`MG_Walk_2026-41.jpg`) to the end of the group's image
    order instead of its original middle position — confirmed in the
    browser that both columns now end at very close to the same height.
    This is a manual, order-dependent workaround for a CSS multi-column
    limitation, not a structural fix — if more images get added to this
    group later and it goes lopsided again, the fix is the same kind of
    manual reorder (or, for a real fix instead of a per-group workaround,
    a JS-computed masonry algorithm that assigns each image to whichever
    column is currently shortest — bigger change, not done here).
- Graduation description shortened to "Grad photography sessions shot on
  UC Davis campus."
- Fixed a real data bug in Graduation's testimonials: the two reviews were
  attributed to the wrong people. "Jonah did a great job with our grad
  shoot..." is Libby A.'s review; "Jonah took some great photos for my
  graduation..." is Daniel Rasas's. Swapped.
- Graduation's payment FAQ now mentions cash as an accepted method
  alongside Venmo and Zelle (previously said Venmo and Zelle only, despite
  the same answer already talking about not needing to collect cash from
  friends for group bookings) — also dropped an em dash from that same
  answer while touching it (Hard rules, no em dashes).
- Portraits & Headshots description now says "Portrait, headshot, and
  family sessions..." instead of just "Portrait and headshot sessions..."
- Aerial description simplified to "Aerial photography shot on a DJI
  Air 2S." — replacing the previous version that also mentioned FAA Part
  107 licensing and named all three recognition credits (SFGate, Visit
  Montana, Canon USA). Flagged for the user: that recognition mention was
  originally added deliberately (see the Aerial section above, "say so in
  the entry") since it's the strongest differentiator for this specific
  body of work — it isn't lost from the site (Part 107 is still stated
  plainly on `/info`, and all three credits are still in `/info`'s
  Recognition list), just no longer repeated on the Aerial project page
  itself. The user said the simpler version was "good I think," so went
  with it, but flagging the tradeoff since it wasn't a completely settled
  call.
- Two open questions the user asked outright, answered in chat rather than
  in code (no site changes needed unless the user says otherwise):
  - Whether GRID Alternatives (an energy nonprofit) fits under Product &
    Brand: checked the actual photos (`DJI_*-HDR.jpg` in
    `raw/product-brand/`) and they're aerial documentation of completed
    residential solar installations — closer to project documentation
    than classic product photography, but "Product & Brand" already reads
    broadly enough (per-category, any client work) to cover it
    comfortably; recommended leaving it where it is.
  - Real estate drone imagery mixed into Architecture (`real-estate-`
    `architecture/`, e.g. `43255montgomeryave-*.jpg` — clearly a specific
    property listing shoot): recommended leaving the description as-is
    ("other structures that caught my eye" already covers it without
    singling out real estate specifically), since Architecture was
    deliberately recategorized away from being a real-estate-focused
    entry earlier (see the Architecture section above) and calling out
    real estate work in the description would partly undo that.
  - Whether `mailto:` links are still a reasonable contact pattern: yes —
    still the standard, lowest-friction pattern most photography portfolio
    sites use; recommended keeping it as-is unless the user specifically
    wants a copy-to-clipboard or contact-form alternative instead.

---

## Status as of 2026-09-01

The user wants to keep working before going live and connecting the real
domain — not ready to deploy yet. Everything below this file's own session
logs (above) is accomplished and committed on `main`
(`9c87e3e` design-system/layout, `c39072d` content pass); nothing is
pushed to `origin` yet.

**Accomplished, this and the prior session, not previously summarized in
one place:**
- Full mobile layout (sticky header, full-screen menu overlay), video
  support end to end (pipeline, grid tile, lightbox), and a real copy pass
  across every project description.
- Type scale and panel shrunk to a size that reads right on a real
  monitor; a real Tailwind cascade bug that was silently capping the
  homepage grid at 2 columns fixed with a hand-written CSS class.
- Homepage grid has a deliberate, hand-picked display order (independent
  of the panel's category order) with orientation mixing layered on top.
- A full content and copy batch: new bio, tagline, several project
  descriptions rewritten, Selected experience section removed, two real
  data bugs fixed (swapped testimonial attributions, backwards Smarter
  Window image order), a masonry layout bug fixed (MG Walk column
  imbalance), and a new inline-link capability added to project
  descriptions (used once so far, on Equal Eats).

**Open — flagged during the last session, not yet resolved:**
1. **Bio is a first draft.** The user hasn't reacted to the new `/info`
   bio yet (Jonah Hill line, role list, etc.) — read it live and confirm
   or keep iterating before this is considered final copy.
2. **Bay Home's description says "on the ground and from the air"** but
   `raw/bay-home-consignment-2022/` has no aerial/drone images yet (no
   `DJI`-prefixed files). Either add aerial building shots to match the
   copy, or trim the copy back to just "shot the building for marketing
   use" until they exist.
3. **Aerial's description dropped its FAA Part 107 / recognition
   mention** in favor of a one-line "shot on a DJI Air 2S." The user said
   the shorter version was good, but this was flagged as a real tradeoff
   (the recognition mention was originally added deliberately as this
   entry's differentiator) — worth a second look, not just a rubber stamp.
4. **Pro Power Washes no longer appears anywhere on the site.** Its only
   appearance was a linked line in Selected experience; removing that
   section (per the user's request) removed Pro Power Washes along with
   it. Not restored elsewhere — confirm that's actually fine, or find it
   a new home.
5. **Smarter Window's gallery layout wasn't changed.** The user's note
   ("since it's two columns, it should actually go") was read as
   explaining why the wrong image order looked especially bad in two
   columns, not as a request to switch this project to a single column —
   the order itself was fixed (see the session log above), but confirm
   whether a single-column, strictly-top-to-bottom layout is actually
   wanted for this specific step-by-step project.
6. **Two open questions the user asked, answered with a recommendation
   but no action taken:** whether GRID Alternatives fits under Product &
   Brand (recommended: yes, leave it), and what to do about real estate
   drone imagery inside the Architecture entry (recommended: leave the
   description as-is). Revisit only if the user wants to actually act on
   either.

**Not yet started — the actual next milestone:**
- Going live: choosing a host (Vercel is the default fit for a Next.js
  App Router project with no backend beyond static content + local image
  files), and connecting the real domain (jonahkunis.com, presumably —
  not yet confirmed registered/pointed anywhere from inside this repo).
  `npm run build` was run against the current `main` at the end of this
  session as a sanity check — compiles clean, typechecks clean, `/` and
  `/info` prerender as static, `/work/[slug]` is server-rendered on
  demand (expected, since it reads from `content/projects.json` per
  request rather than being statically known at build time). No actual
  deploy has happened yet; none of this has been scoped beyond the user
  saying they want to keep iterating first.
