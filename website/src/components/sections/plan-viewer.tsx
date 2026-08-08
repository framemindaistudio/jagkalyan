"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowsOut, X } from "@phosphor-icons/react";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

/**
 * Viewer for the client's official plan artwork.
 *
 * These are the supplied infographics, shown as-is at the client's explicit
 * request. That creates a mobile problem the rest of the site avoids: a
 * 1536px-wide board of legends and 9pt labels is illegible at 375px, and
 * scaling it to fit turns the text to mush.
 *
 * So the inline image is a preview, and tapping it opens the board at a
 * size where the text is actually readable inside a pannable container —
 * you move around the plan rather than squinting at all of it. There is
 * also a plain link to the original file, which hands off to the browser's
 * own image viewer and its pinch-zoom; that is the guaranteed path on any
 * device, and costs nothing to provide.
 */

export interface Plan {
  src: string;
  alt: string;
  caption?: string;
}

export function PlanViewer({ plan }: { plan: Plan }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <figure>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge: ${plan.alt}`}
        className="group relative block w-full overflow-hidden rounded-card border border-hairline bg-space transition-colors duration-500 hover:border-hairline-strong"
      >
        <Image
          src={plan.src}
          alt={plan.alt}
          width={1536}
          height={1024}
          sizes="(max-width: 1024px) 100vw, 80rem"
          className="h-auto w-full"
        />

        {/* Affordance. Without it, nobody discovers that this is tappable —
            and on a phone the board is unreadable until they do. */}
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-hairline bg-void/80 px-3.5 py-2 text-[0.72rem] text-starlight backdrop-blur-sm">
          <ArrowsOut size={13} weight="bold" />
          Tap to explore
        </span>
      </button>

      {plan.caption && (
        <figcaption className="mt-4 text-center text-xs leading-relaxed text-starlight-faint">
          {plan.caption}
        </figcaption>
      )}

      {/*
        Portaled to <body>, and it must stay that way.

        `position: fixed` resolves against the nearest ancestor that
        establishes a containing block — and `transform` does, which the
        Reveal wrapper around every section applies while animating in.
        Rendered in place, the "fullscreen" overlay was clamped to the
        figure's own box: 335x279 at the figure's position instead of
        covering the viewport. A portal is the only reliable escape, since
        any ancestor anywhere up the tree can reintroduce the problem.
      */}
      {/*
        Guarded because this component prerenders: `document` does not exist
        during the server pass. No hydration risk — with the overlay closed
        both passes render nothing here, and AnimatePresence stays mounted
        on the client so the exit fade still plays.
      */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
          {open && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-void/97 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={plan.alt}
          >
            {/* Pannable surface. The board is held well above viewport width
                so its labels stay legible; `overscroll-contain` keeps a
                flick from scrolling the page behind. */}
            <div className="h-full w-full overflow-auto overscroll-contain p-3 pt-20">
              <Image
                src={plan.src}
                alt={plan.alt}
                width={1536}
                height={1024}
                sizes="1536px"
                className="h-auto w-[1400px] max-w-none rounded-lg sm:w-full sm:max-w-[1536px]"
                priority
              />
            </div>

            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 border-b border-hairline bg-void/85 px-4 py-3 backdrop-blur-md">
              <a
                href={plan.src}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center rounded-full border border-hairline px-4 text-[0.78rem] text-starlight-dim transition-colors hover:border-gold hover:text-gold"
              >
                Open full size
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-starlight active:border-gold active:text-gold"
              >
                <X size={19} />
              </button>
              </div>
            </motion.div>
          )}
          </AnimatePresence>,
          document.body,
        )}
    </figure>
  );
}
