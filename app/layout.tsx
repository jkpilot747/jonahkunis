import type { Metadata } from "next";
import { Instrument_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const SITE_DESCRIPTION =
  "Commercial and personal photography and video by Jonah Kunis, based in the Bay Area.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jonahkunis.com"),
  title: {
    default: "Jonah Kunis — Photography & Video",
    template: "%s | Jonah Kunis",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Jonah Kunis — Photography & Video",
    description: SITE_DESCRIPTION,
    siteName: "Jonah Kunis",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonah Kunis — Photography & Video",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
