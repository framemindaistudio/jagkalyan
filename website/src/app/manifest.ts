import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Web app manifest — makes the site installable to a phone's home screen,
 * where it opens without browser chrome and behaves like a native app.
 *
 * `display: standalone` is what removes the address bar. The theme colour
 * matches the void so the status bar blends into the page rather than
 * sitting on it as a separate strip.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.vision,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#03050a",
    theme_color: "#03050a",
    categories: ["education", "lifestyle", "health"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
