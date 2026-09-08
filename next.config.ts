import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Lets phones on the same Wi-Fi load dev assets when testing against the
  // `next dev` network URL (e.g. http://192.168.0.25:3000) — without this,
  // Next 16 silently blocks every JS chunk as a cross-origin dev request,
  // so the page loads but nothing is interactive (no clicks, no hydration).
  allowedDevOrigins: ["192.168.0.25"],
  // Next 16 defaults images.qualities to [75] only, which silently coerces
  // any <Image quality> prop down to 75 — a second lossy re-encode on top
  // of scripts/images.mjs's own JPEG output (already quality 80). 90 here
  // matches the quality prop set on every <Image> in app/.
  images: {
    qualities: [75, 90],
  },
  // The old Wix site (jonahkunis.com, before the Sep 2026 migration to this
  // Next.js site) is still indexed by Google under these paths — confirmed
  // via a live `site:jonahkunis.com` search, since Wayback Machine's own
  // archive of the domain is a stale 2021-2022 snapshot with a different
  // URL structure. Without these, every one of those indexed links (and
  // Google's own sitelinks under the main result) 404s. Permanent so
  // search engines eventually update their index to the new URLs directly.
  async redirects() {
    return [
      { source: "/about", destination: "/info", permanent: true },
      { source: "/contact", destination: "/info", permanent: true },
      { source: "/clientwork", destination: "/work/events-fundraisers", permanent: true },
      { source: "/gradphotos", destination: "/work/graduation", permanent: true },
      { source: "/pricing", destination: "/work/graduation", permanent: true },
      { source: "/portraits", destination: "/work/portraits-headshots", permanent: true },
      { source: "/aerial", destination: "/work/aerial", permanent: true },
      { source: "/abroad", destination: "/work/landscape-travel", permanent: true },
    ];
  },
};

export default nextConfig;
