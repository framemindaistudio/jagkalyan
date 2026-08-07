"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide eased scrolling.
 *
 * Native wheel scrolling is stepped — each notch jumps a fixed distance —
 * which fights a scroll-driven sequence like the cosmic hero: the camera
 * lurches instead of gliding. Lenis interpolates toward the target scroll
 * position each frame, so the same gesture reads as a slow pan.
 *
 * It drives `window.scrollY` directly (rather than transforming a wrapper),
 * so Motion's `useScroll` and CSS `position: sticky` keep working untouched.
 *
 * Deliberately skipped when the visitor asks for reduced motion — smoothing
 * is exactly the kind of vestibular effect that setting exists to prevent —
 * and on touch devices, where the OS already provides momentum and hijacking
 * it feels worse than leaving it alone.
 */
export function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Exponential ease-out: quick to respond, long and soft to settle.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Leave touch alone — the OS does this better.
      syncTouch: false,
      // Ease in-page anchor jumps too (the nav's /mission#build-self links),
      // which is why globals.css leaves CSS `scroll-behavior` on `auto`.
      anchors: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
