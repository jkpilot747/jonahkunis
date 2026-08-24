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
more listings next spring, they go into the existing Real Estate entry, not into
three new index lines.

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

### 5. Real Estate & Architecture
`category: commercial`

Ground and aerial. Your Part 107 license is the differentiator and belongs in
this entry's description, not buried on the Info page.

Final description (in `content/projects.json`): *Real estate and architectural
photography, shot from the ground and the air. FAA Part 107 licensed, so
listings get aerial coverage most photographers can't offer.* No named clients
in the copy — kept it to the Part 107 line only.

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

### 8. Portraits & Grad
`category: commercial`

Your actual revenue engine, and the one entry that carries a commercial ask.

Final description (in `content/projects.json`): *Portrait and senior/grad
photography sessions, shot in natural light on location or at home.* The
booking section below (packages, testimonials, FAQ) is still unbuilt — this
is just the entry's intro copy.

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

Confirmed and closed: booking lives on the Portraits & Grad page only; personal
work is substantial and splits into Aerial and Landscape & Travel; Pro Power
Washes is not a Projects entry (see above); Product & Brand stays in Commercial
as planned. The paid-work scope going forward is three Projects entries (Equal
Eats, Smarter Window, Bay Home Consignment) plus four Commercial entries (Real
Estate & Architecture, Events & Fundraisers, Product & Brand, Portraits &
Grad).

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
`client` / `year`; the four Commercial entries and Landscape & Travel don't —
per this plan's own organization (Commercial is per-category, not
per-engagement), a single client/year doesn't fit those, so client names live
in the description prose instead and `client`/`year` stay empty. Equal Eats,
Smarter Window, Bay Home Consignment, and Aerial have real photos processed
into `public/work/` and are the only entries currently visible on the site,
since entries with no images are hidden from the index and grid by design,
not by accident. The social dock reads its three icons from
`public/icons/{instagram,linkedin,email}.svg` (swap the files to change the
icons — no code changes needed) and opens all three links in a new tab. The
project page also supports grouped sub-sections now (`images[].group` +
top-level `groups` map, see "Grouped entries" in `docs/design-brief.md`) for
entries like Events & Fundraisers that span multiple unrelated shoots —
raw folders exist for it but photos and group assignments aren't in yet.

**Half-finished.**
- The four Commercial entries and Landscape & Travel have no `raw/<slug>/`
  folder yet, so they stay invisible on the live site until photos are added
  and `npm run images` runs again.
- The panel is 640px wide with a bumped type scale in the actual code, agreed
  on by eye in the browser over several iterations, but `docs/design-brief.md`
  still documents the original 300px width and the original, smaller type
  scale. Nobody's gone back to reconcile the numbers.
- Portraits & Grad's booking section (packages, pricing, two testimonials,
  FAQ, Google Form link) still needs building — the entry currently only has
  its intro description.

**Next three things.**
1. Populate `raw/<slug>/` for the four Commercial entries and Landscape &
   Travel, the same way it was done for the three Projects entries. Run
   `npm run images` after each batch.
2. Build Portraits & Grad's booking section.
3. Reconcile `docs/design-brief.md`'s panel width/type-scale numbers with
   what's actually in the code.
