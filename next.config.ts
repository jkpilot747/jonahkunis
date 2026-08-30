import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Next 16 defaults images.qualities to [75] only, which silently coerces
  // any <Image quality> prop down to 75 — a second lossy re-encode on top
  // of scripts/images.mjs's own JPEG output (already quality 80). 90 here
  // matches the quality prop set on every <Image> in app/.
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
