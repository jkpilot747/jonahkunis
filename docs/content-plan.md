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

Final description (in `content/projects.json`): *Event coverage for nonprofit
galas, fundraisers, walks, and private celebrations, including Hillel, the MG
Walk NorCal, a gala fundraiser for Shalom School, NCJW (National Council of
Jewish Women), and bat mitzvahs for private clients.*

Event work is the hardest to make look good in a grid, since it is often many
similar frames. Cut ruthlessly. Ten strong frames beat forty adequate ones.

This entry spans multiple unrelated shoots (a gala is not a bat mitzvah), so
its grid should break into labeled sections per event rather than read as one
undifferentiated pile of photos. See "Grouped entries" in
`docs/design-brief.md`'s Content model section — tag each image's `group` and
add a short description per group to `content/projects.json` once the photos
are in `raw/events-fundraisers/`.

### 7. Product & Brand
`category: commercial`

Distinct from the Equal Eats project entry, which tells a story. This one is
purely a range demonstration across clients.

Final description (in `content/projects.json`): *Product and brand
photography across a range of clients, including GRID Alternatives and
private vineyard clients.* GRID Alternatives lives here, not under a separate
entry. The other named client stays anonymous as "private vineyard clients"
rather than naming the vineyard.

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

- **Smarter Window.** Whether any of the material is shareable yet. Pre-launch
  hardware usually is not. Ask the founder before building the entry.
- **The Chamisal shoot.** Which entry it belongs to.
- **Per-entry image counts.** Product is confirmed as thin (a few frames). Decide
  whether that is enough to carry an entry on its own or whether Product folds
  into the Equal Eats project until there is more.

Confirmed and closed: booking lives on the Graduation page only; personal
work is substantial and splits into Aerial and Landscape & Travel; Pro Power
Washes is not a Projects entry (see above); Product & Brand stays in Commercial
as planned. The paid-work scope going forward is three Projects entries (Equal
Eats, Smarter Window, Bay Home Consignment) plus five Commercial entries (Real
Estate & Architecture, Events & Fundraisers, Product & Brand, Graduation,
Portraits & Headshots — split from the original combined "Portraits & Grad,"
see #8/#8a above).

---

## Where I left off

**Done.** Tokens, shell (panel + grid), index/filter wiring, the `/work/[slug]`
project page with a real lightbox, `/info`, and the social dock are all built
and working. `scripts/images.mjs` is written, tested, and wired up as
`npm run images`. All nine entries from this plan are in `content/projects.json`
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

**Half-finished.**
- Events & Fundraisers, Product & Brand, and Portraits & Headshots have no
  `raw/<slug>/` folder yet (Portraits & Headshots has no folder at all), so
  they stay invisible on the live site until photos are added and
  `npm run images` runs again. Landscape & Travel and Architecture (formerly
  "Real Estate & Architecture," see #11 above) are both populated and live now.

**Next thing.**
1. Populate `raw/<slug>/` for the three remaining empty entries (Events &
   Fundraisers, Product & Brand, Portraits & Headshots), the same way it was
   done for the rest. Run `npm run images` after each batch — that's the only
   thing standing between these three entries and showing up on the live site.
