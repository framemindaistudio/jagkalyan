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
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 w-[82%] select-none sm:w-[58%] lg:w-[50%] lg:max-w-[42rem]"
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
        <div
          className="relative h-full w-full"
          style={{
            maskImage:
              "radial-gradient(ellipse 74% 66% at 54% 46%, #000 34%, rgba(0,0,0,0.6) 64%, transparent 88%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 74% 66% at 54% 46%, #000 34%, rgba(0,0,0,0.6) 64%, transparent 88%)",
          }}
        >
          {/* Inner mask: dissolves the lower body so the photograph never
              meets the section edge as a straight cut. */}
          <div
            className="relative h-full w-full"
            style={{
              maskImage:
                "linear-gradient(to top, transparent 2%, rgba(0,0,0,0.45) 16%, #000 42%)",
              WebkitMaskImage:
                "linear-gradient(to top, transparent 2%, rgba(0,0,0,0.45) 16%, #000 42%)",
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
              className="object-contain object-bottom opacity-[0.34] sm:opacity-[0.5] lg:opacity-[0.62]"
              style={{
                filter:
                  "grayscale(0.32) sepia(0.3) brightness(1.12) contrast(1.14)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Left falloff so the headline always lands on clean space. Painted
          after the blended layer, with normal blending, so it genuinely
          covers rather than lifts. */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-void via-void/45 to-transparent md:w-2/5 md:via-transparent" />
    </div>
  );
}
