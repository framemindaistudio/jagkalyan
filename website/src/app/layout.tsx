import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, DM_Sans } from "next/font/google";
import { SITE } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* Loaded so the client can audition the second pairing they asked about.
   Swap --font-sans in globals.css to var(--font-alt) to switch the whole site. */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.creed}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.vision,
  openGraph: {
    title: SITE.name,
    description: SITE.vision,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#03050a",
  // Let the page paint under the notch and home indicator; globals.css
  // pads the safe areas back in where content would otherwise be clipped.
  viewportFit: "cover",
  // Allow pinch-zoom — disabling it is an accessibility failure, and the
  // layout is responsive enough not to need it.
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
      The font variables must live on <html>, not <body>. globals.css resolves
      --font-sans / --font-display at :root, and a custom property defined on a
      descendant is invisible to its ancestor — putting them on <body> makes
      every font silently fall back to system sans.
    */
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${dmSans.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-on-gold"
        >
          Skip to content
        </a>
        <Analytics />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
