import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Google Analytics 4.
 *
 * `afterInteractive` rather than `beforeInteractive`: analytics must never
 * sit on the critical path of a page whose whole first impression is a
 * cinematic sequence. It loads once the page is usable.
 *
 * Rendered only in production. In development every save, every refresh and
 * every localhost hit would land in the same property and quietly corrupt
 * the client's numbers — the kind of thing nobody notices until a report
 * looks wrong months later.
 *
 * The measurement ID is not a secret. It ships in the page source of every
 * site that uses GA, so it lives in site.ts as ordinary config rather than
 * an environment variable that would have to be set again on every host.
 *
 * SPA navigation is covered by GA4's Enhanced Measurement, which listens to
 * browser history events — App Router routes change via pushState, so
 * subsequent page views are recorded without a manual pageview call here.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production" || !SITE.analyticsId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${SITE.analyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${SITE.analyticsId}');
        `}
      </Script>
    </>
  );
}
