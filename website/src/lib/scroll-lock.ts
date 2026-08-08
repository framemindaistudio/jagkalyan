import type Lenis from "lenis";

/**
 * Scroll locking that actually holds when Lenis is running.
 *
 * `document.body.style.overflow = "hidden"` is the usual trick, and it does
 * nothing here: Lenis drives `window.scrollY` on its own rAF loop and never
 * consults body overflow, so the page carries on scrolling behind an open
 * modal. Lenis has to be told to stop.
 *
 * The overflow lock is still applied as well, because Lenis is deliberately
 * absent for reduced-motion visitors — in that case it is the only thing
 * doing the work.
 */

let instance: Lenis | null = null;
let depth = 0;

/** Called by SmoothScroll once Lenis exists (and with null on teardown). */
export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function lockScroll() {
  depth += 1;
  if (depth > 1) return;
  instance?.stop();
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  depth = Math.max(0, depth - 1);
  if (depth > 0) return;
  instance?.start();
  document.body.style.overflow = "";
}
