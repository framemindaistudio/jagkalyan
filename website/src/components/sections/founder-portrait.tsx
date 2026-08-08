"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * The founder, dissolved into space.
 *
 * The first attempt dimmed the photograph with opacity and a dark grade.
 * That was backwards: he wears a near-black suit, so lowering opacity on a
 * black background just produced a murky rectangle — a cutout sitting *on*
 * space rather than existing in it.
 *
 * This version uses `mix-blend-mode: screen`, which is the right tool for
 * precisely this image. Screen keeps the brighter of source and backdrop,
 * so against a near-black scene:
 *
 *   - the black suit falls away to nothing, because black is the identity
 *     value for screen — the void shows straight through it
 *   - his face, hair, collar and hands survive at full luminance
 *
 * The dissolve is therefore done by the photograph's own tonality rather
 * than by a mask fighting it. He becomes a figure of light with no edge to
 * betray the cutout, which is the effect a mask alone could never produce.
 *
 * Two constraints this imposes, both load-bearing:
 *
 *  1. `mix-blend-mode` blends only within its stacking context, and BOTH
 *     `transform` and `opacity` create one. So the blend mode lives on the
 *     same element as the parallax transform — the outermost layer — and
 *     never on a descendant of it. Move it inward and it silently blends
 *     against transparency instead of the starfield, and the effect dies.
 *  2. Masks are applied on two nested elements, one gradient each, rather
 *     than composited on one. `mask-composite` still needs prefixed
 *     spellings across browsers; nesting needs none.
 */
export function FounderPortrait() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  });

  // Drifts slower than the page, so he sits behind the copy in depth
  // rather than only in z-order.
  const y = useTransform(smooth, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(smooth, [0, 0.8], [1, 0]);

  return (
    /*
      Two placements.

      Phone: a band along the BOTTOM, full width, with the copy given
      matching bottom padding above it. He previously sat behind the
      headline, and because screen blending preserves highlights his lit
      face survived even at low opacity — the text ran straight across it.
      Giving him his own strip makes overlap structurally impossible
      rather than something tuned around.

      Tablet and up: the tall figure on the right, beside the copy.
    */
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] select-none sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-[58%] lg:w-[50%] lg:max-w-[42rem]"
    >
      {/* Aura — light coming off him, not landing on him. Sits beneath the
          blended layer so screen has something warm to lift. */}
      <div
        className="absolute bottom-[10%] left-1/2 h-[58%] w-[86%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(228,174,20,0.20), rgba(78,163,85,0.09) 55%, transparent 78%)",
        }}
      />

      <motion.div
        style={{
          y,
          opacity,
          // Must stay on this element — see note 1 above.
          mixBlendMode: "screen",
        }}
        className="relative h-full w-full"
      >
        {/* Outer mask: falloff in every direction. */}
        {/*
          Masking is deliberately LIGHT. The earlier values held solid only
          to 34% and were fully transparent by 88%, which erased his head
          and shoulders along with the background — his face was the first
          thing to go, which is the opposite of the point. The core now
          stays opaque out to 58% and only reaches transparent at the very
          edge, so the fade hides the crop, not the man.
        */}
        <div
          className="relative h-full w-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 92% 86% at 52% 42%, #000 58%, rgba(0,0,0,0.88) 78%, transparent 99%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 92% 86% at 52% 42%, #000 58%, rgba(0,0,0,0.88) 78%, transparent 99%)",
          }}
        >
          {/* Bottom fade only — just enough that the photograph never meets
              the section edge as a straight cut. */}
          <div
            className="relative h-full w-full"
            style={{
              maskImage:
                "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.82) 9%, #000 24%)",
              WebkitMaskImage:
                "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.82) 9%, #000 24%)",
            }}
          >
            <Image
              src="/founder-jagdish.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 42rem"
              /*
                Screen keeps highlights, so this can now be graded UP rather
                than down — the earlier version darkened an already dark
                photograph and lost his face entirely. Warmed towards gold
                so he belongs to the palette.
              */
              className="object-contain object-bottom opacity-[0.72] sm:opacity-[0.78] lg:opacity-[0.85]"
              style={{
                // Less desaturation so skin keeps some life, and brighter so
                // the face reads as the focal point it should be. The old
                // 0.34 opacity was solving a collision with the headline
                // that no longer exists now he has his own band.
                filter:
                  "grayscale(0.16) sepia(0.18) brightness(1.3) contrast(1.08)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/*
        Falloff into the copy. On a phone he rises from the bottom, so the
        fade runs upward; from sm he stands beside the text, so it runs
        left. Painted after the blended layer with normal blending, so it
        genuinely covers rather than lifts.
      */}
      {/* Shallow, and only to the void's own colour at partial strength —
          a full-strength third of the band was landing squarely on his
          head. */}
      <div className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-void/80 to-transparent sm:hidden" />
      <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-void via-void/45 to-transparent sm:block md:w-2/5 md:via-transparent" />
    </div>
  );
}
