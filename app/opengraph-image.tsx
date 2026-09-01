import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fetches Instrument Sans Bold as a TTF so the OG card matches the site's
// wordmark exactly, rather than falling back to a generic sans. Google's
// CSS2 endpoint serves WOFF2 to a modern browser UA, but ImageResponse
// (via Satori) only accepts ttf/otf/woff — a legacy UA string gets a ttf
// URL back instead. Never throws: any failure here just means the image
// renders with satori's default sans-serif, not a broken page.
async function loadWordmarkFont() {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@700",
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } },
    ).then((res) => res.text());
    const match = css.match(/src: url\(([^)]+)\) format\('truetype'\)/);
    if (!match) return null;
    const fontData = await fetch(match[1]).then((res) => res.arrayBuffer());
    return { name: "Instrument Sans", data: fontData, weight: 700 as const, style: "normal" as const };
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = await loadWordmarkFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#FFFFFF",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontFamily: font ? "Instrument Sans" : undefined,
            fontWeight: 700,
            fontSize: 96,
            color: "#111111",
            letterSpacing: "-0.03em",
          }}
        >
          Jonah Kunis
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: "monospace",
            fontSize: 32,
            color: "#8A8A85",
          }}
        >
          Commercial and personal photography and video
        </div>
      </div>
    ),
    { ...size, fonts: font ? [font] : undefined },
  );
}
