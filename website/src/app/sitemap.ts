import type { MetadataRoute } from "next";
import { SITE, STUBS } from "@/lib/site";

/** Real pages. Stubs are appended automatically from the registry. */
const LIVE = [
  "/",
  "/mission",
  "/journey",
  "/global-impact",
  "/about",
  "/ecosystem",
  "/academy",
  "/wisdom-park",
  "/get-involved",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...LIVE.map((href) => ({
      url: `${SITE.url}${href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.8,
    })),
    ...STUBS.map((s) => ({
      url: `${SITE.url}${s.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
