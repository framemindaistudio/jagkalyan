"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * The founder, dissolved into space.
 *
 * The source is a clean 1500×2250 cutout with a real alpha channel, so the
 * work here is entirely about making a photograph belong in a cosmic scene
 * rather than sitting on top of one. Four passes do that:
 *
 *  1. **A radial mask.** He fades out in every direction from a point near
 *     his chest — no edge, no silhouette, no sense of a pasted-on PNG.
 *  2. **A colour grade.** Desaturated and warmed until he reads as gold-lit
 *     rather than full colour, so he sits in the palette instead of
 *     fighting it.
 *  3. **An aura.** A soft gold bloom behind him, so the light appears to
 *     come off him rather than land on him.
 *  4. **A floor.** A gradient to the void colour along the bottom edge, so
 *     he rises out of darkness instead of being cropped by it.
 *
 * Held at low opacity throughout — he is atmosphere behind the headline,
 * never competing with it for the eye.
 *
 * Deliberately no `mix-blend-mode`: on a layered dark scene it blows out
 * the highlights and reacts unpredictably to whatever bloom happens to be
 * behind it. The filter grade gets the same look with none of that risk.
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

  // Drifts a little slower than the page, so he sits *behind* the text
  // in depth rather than just in z-order.
  const y = useTransform(smooth, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(smooth, [0, 0.75], [1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 w-[86%] select-none sm:w-[62%] lg:w-[52%] lg:max-w-[44rem]"
    >
      {/* The aura — light coming off him, not onto him. */}
      <div
        className="absolute bottom-[6%] left-1/2 h-[62%] w-[92%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(228,174,20,0.22), rgba(78,163,85,0.10) 55%, transparent 78%)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative h-full w-full"
      >
        <div
          className="relative h-full w-full"
          style={{
            // Fades in every direction from a point near his chest.
            maskImage:
              "radial-gradient(ellipse 68% 60% at 56% 52%, #000 26%, rgba(0,0,0,0.55) 58%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 68% 60% at 56% 52%, #000 26%, rgba(0,0,0,0.55) 58%, transparent 82%)",
          }}
        >
          <Image
            src="/founder-jagdish.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 62vw, 44rem"
            /*
              Opacity scales with how much room the copy has. On a phone the
              portrait sits full-width directly behind six lines of type, so
              it drops to a faint texture; on a desktop it occupies its own
              half of the hero and can carry real presence.
            */
            className="object-contain object-bottom opacity-[0.22] sm:opacity-[0.34] md:opacity-[0.5]"
            style={{
              filter:
                "grayscale(0.45) sepia(0.22) contrast(1.06) brightness(0.94)",
            }}
          />
        </div>
      </motion.div>

      {/* Floor — he rises out of the dark rather than being cut off by it.
          Deeper on small screens, where the copy runs lower. */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void via-void/70 to-transparent md:h-1/3" />
      {/* Left falloff, so the headline always sits on clean space. */}
      <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-void via-void/50 to-transparent md:w-2/5 md:via-transparent" />
    </div>
  );
}
