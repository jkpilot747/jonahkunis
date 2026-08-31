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
};

export default nextConfig;
