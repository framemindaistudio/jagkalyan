"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";
import { PILLARS, SITE, type Pillar } from "@/lib/site";
import { Earth } from "./earth";
import { Starfield } from "./starfield";
import { cn } from "@/lib/cn";

/**
 * The opening sequence — one pinned canvas, five acts, driven entirely by
 * scroll position.
 *
 *   I.   Invocation   — the Sanskrit blessing and the name, in empty space.
 *   II.  Arrival      — Earth rises out of the dark and comes to you.
 *   III. Swadharma    — the four Build pillars orbit into place around it.
 *   IV.  Withdrawal   — the camera pulls back; Earth becomes one point in
 *                       a wider universe.
 *   V.   Creed        — the promise the whole mission rests on.
 *
 * The section is 520vh tall and its first child is `sticky`, which is what
 * converts vertical scrolling into time. Every act reads one `progress`
 * value (0→1) and maps its own behaviour off it, so the acts cross-dissolve
 * rather than cut.
 *
 * REDUCED MOTION — read this before touching the `style` props below.
 * The acts are stacked absolutely on top of each other and are only ever
 * separated *in time*, by opacity. So they must never all be visible at
 * once. An earlier version dropped the `style` prop entirely when reduced
 * motion was set, which left all five acts at their default opacity of 1,
 * piled on top of each other and unreadable.
 *
 * The styles are therefore now applied unconditionally, and the reduced
 * case is handled purely in CSS (`globals.css`, the `.cinema-*` rules):
 * the section un-pins, the acts return to normal document flow, and each
 * one becomes an ordinary stacked block. `!important` there beats these
 * inline styles, which is exactly the intent.
 */
export function CosmicHero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /*
    Smooth the raw scroll position before anything reads it. Wheel input
    arrives in discrete notches; feeding that straight into the camera makes
    it lurch. A spring gives the whole sequence weight — it keeps drifting
    for a moment after you stop, the way a real camera would.
  */
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });

  return (
    <section
      ref={ref}
      className="cinema relative h-[520vh]"
      aria-label="JagKalyan Holistic Mission — introduction"
    >
      <div className="cinema-stage grain sticky top-0 h-screen overflow-hidden bg-void">
        <Starfield />
        <Nebulae progress={progress} />

        <ActOneInvocation progress={progress} />
        <ActTwoThreeFour progress={progress} />
        <ActFiveCreed progress={progress} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Ambient colour — slow blooms that shift through the sequence, so the
   "sky" is never quite the same colour twice.
   ------------------------------------------------------------------ */
function Nebulae({ progress }: { progress: MotionValue<number> }) {
  const o1 = useTransform(progress, [0, 0.3, 0.7, 1], [0.55, 0.35, 0.2, 0.45]);
  const o2 = useTransform(progress, [0, 0.45, 1], [0.2, 0.5, 0.7]);

  return (
    <div aria-hidden className="absolute inset-0">
      <motion.div
        style={{ opacity: o1 }}
        className="bloom -left-40 top-[-10%] h-[46rem] w-[46rem]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(76,40,140,0.55), transparent)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: o2 }}
        className="bloom -right-52 bottom-[-16%] h-[52rem] w-[52rem]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(14,74,18,0.62), transparent)",
          }}
        />
      </motion.div>

      <div
        className="bloom left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(228,174,20,0.16), transparent)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
   ACT I — Invocation
   ------------------------------------------------------------------ */
function ActOneInvocation({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.09, 0.15], [1, 1, 0]);
  const y = useTransform(progress, [0, 0.15], [0, -90]);
  const blur = useTransform(progress, [0, 0.15], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.div
      style={{ opacity, y, filter: blur }}
      className="cinema-act absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="display text-xl text-gold md:text-2xl"
        lang="sa"
      >
        {SITE.sanskrit}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="display mt-7 text-[clamp(3rem,11vw,9.5rem)] text-starlight"
      >
        JagKalyan
        <span className="mt-1 block text-aurum">Holistic Mission</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.7 }}
        className="eyebrow mt-8 text-starlight-dim"
      >
        {SITE.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="cinema-hide-static absolute bottom-12 flex flex-col items-center gap-3"
      >
        <span className="eyebrow text-starlight-faint">Scroll to begin</span>
        <motion.span
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gold"
        >
          <ArrowDown size={17} weight="light" />
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   ACTS II–IV — Earth arrives, pillars orbit in, camera withdraws.
   One transform group, so the pull-back moves Earth and pillars together.
   ------------------------------------------------------------------ */
function ActTwoThreeFour({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(
    progress,
    [0.1, 0.4, 0.62, 0.9],
    [0.28, 1, 1, 0.46],
  );
  const y = useTransform(
    progress,
    [0.1, 0.4, 0.62, 0.9],
    ["42vh", "0vh", "0vh", "-6vh"],
  );
  const groupOpacity = useTransform(
    progress,
    [0.08, 0.2, 0.88, 0.97],
    [0, 1, 1, 0.25],
  );

  const orbitOpacity = useTransform(
    progress,
    [0.34, 0.46, 0.86, 0.95],
    [0, 1, 1, 0],
  );
  const orbitScale = useTransform(progress, [0.34, 0.5], [0.72, 1]);
  const orbitSpin = useTransform(progress, [0.34, 1], [-24, 12]);

  return (
    <motion.div
      style={{ opacity: groupOpacity }}
      className="cinema-act absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        style={{ scale, y }}
        className="cinema-reset-transform relative flex items-center justify-center"
      >
        {/*
          Phone: four labels around a circle cannot clear the Earth at
          375px, so the pillars drop into a 2×2 grid beneath it.
          Tablet and up: the true orbit, as in the mission diagram.
        */}

        {/* — Phone — */}
        <div className="flex w-[86vw] flex-col items-center md:hidden">
          <Earth className="w-[57vw]" />
          <motion.div
            style={{ opacity: orbitOpacity }}
            className="cinema-reset-opacity mt-9 grid w-full grid-cols-2 gap-x-4 gap-y-7"
          >
            {PILLARS.map((p, i) => (
              <PillarLabel key={p.id} pillar={p} index={i} />
            ))}
          </motion.div>
        </div>

        {/* — Tablet and up — */}
        <div className="relative hidden h-[min(82vw,76vh)] w-[min(82vw,76vh)] md:block">
          <motion.div
            style={{
              opacity: orbitOpacity,
              scale: orbitScale,
              rotate: orbitSpin,
            }}
            className="cinema-reset-opacity absolute inset-0"
            aria-hidden
          >
            <div className="absolute inset-[4%] rounded-full border border-hairline" />
            {/* Sits at exactly the pillars' orbital radius (inset 10% === the
                PillarNode radius of 40), so the four movements read as riding
                one orbit rather than floating loose. */}
            <div className="absolute inset-[10%] rounded-full border border-dashed border-hairline/60" />
          </motion.div>

          {/* Earth, centred. The 3D globe only fills ~78% of its own box —
              the rest is frustum headroom so the atmosphere shell isn't
              cropped — so this is sized larger than the disc you actually
              see. Visible globe lands around 88px radius, against pillars
              orbiting at 274px, which keeps the earlier clearance. */}
          <div className="absolute left-1/2 top-1/2 h-[33%] w-[33%] -translate-x-1/2 -translate-y-1/2">
            <Earth className="h-full w-full" />
          </div>

          <motion.div
            style={{ opacity: orbitOpacity, scale: orbitScale }}
            className="cinema-reset-opacity absolute inset-0"
          >
            {PILLARS.map((p, i) => (
              <PillarNode key={p.id} pillar={p} index={i} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      <SwadharmaCaption progress={progress} />
    </motion.div>
  );
}

const ACCENT: Record<
  Pillar["accent"],
  { ring: string; dot: string; text: string }
> = {
  gold: {
    ring: "rgba(228,174,20,0.42)",
    dot: "var(--color-gold)",
    text: "text-gold",
  },
  verdant: {
    ring: "rgba(78,163,85,0.42)",
    dot: "var(--color-verdant)",
    text: "text-verdant-bright",
  },
  azure: {
    ring: "rgba(96,165,220,0.42)",
    dot: "#7fb8e6",
    text: "text-[#9ecbf0]",
  },
  violet: {
    ring: "rgba(160,120,220,0.42)",
    dot: "#b08ce0",
    text: "text-[#c4a6ef]",
  },
};

/** Orbital placement — tablet and up only. */
function PillarNode({ pillar, index }: { pillar: Pillar; index: number }) {
  // angle 0 = top, clockwise.
  const rad = (pillar.angle * Math.PI) / 180;
  /*
    Percentage-points of the orbit box's width, measured from its centre —
    so 40 puts a node at 40% of the width out, which is the same circle as
    a ring drawn with `inset-[10%]`. Keep these two numbers in step.
  */
  const radius = 40;
  const x = 50 + Math.sin(rad) * radius;
  const y = 50 - Math.cos(rad) * radius;
  const accent = ACCENT[pillar.accent];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.9,
        delay: 0.12 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute w-[min(22vw,13rem)] -translate-x-1/2 -translate-y-1/2 text-center"
    >
      <div
        className="mx-auto mb-3 h-2 w-2 rounded-full"
        style={{
          background: accent.dot,
          boxShadow: `0 0 16px 3px ${accent.ring}`,
        }}
      />
      <h2
        className={cn(
          "display text-[clamp(1.15rem,2.6vw,1.9rem)] leading-tight",
          accent.text,
        )}
      >
        {pillar.title}
      </h2>
      <p className="mt-1.5 text-[0.72rem] leading-relaxed tracking-wide text-starlight-faint">
        {pillar.sub}
      </p>
    </motion.div>
  );
}

/** Grid placement — phone only. */
function PillarLabel({ pillar, index }: { pillar: Pillar; index: number }) {
  const accent = ACCENT[pillar.accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div
        className="mx-auto mb-2 h-1.5 w-1.5 rounded-full"
        style={{
          background: accent.dot,
          boxShadow: `0 0 12px 2px ${accent.ring}`,
        }}
      />
      <h2 className={cn("display text-lg leading-tight", accent.text)}>
        {pillar.title}
      </h2>
      <p className="mt-1 text-[0.72rem] leading-snug text-starlight-faint">
        {pillar.sub}
      </p>
    </motion.div>
  );
}

function SwadharmaCaption({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.48, 0.58, 0.74, 0.82], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.48, 0.58], [22, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="cinema-caption pointer-events-none absolute bottom-[7vh] left-1/2 w-[min(92vw,34rem)] -translate-x-1/2 px-6 text-center"
    >
      <p className="eyebrow text-gold/80">Find your Swadharma</p>
      <p className="mt-3 text-sm leading-relaxed text-starlight-dim">
        Discover your purpose. Align your life. Create impact. Four movements,
        one direction — from the self outward, until it reaches everyone.
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   ACT V — Creed
   ------------------------------------------------------------------ */
function ActFiveCreed({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.86, 0.94, 1], [0, 1, 1]);
  const y = useTransform(progress, [0.86, 0.96], [40, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="cinema-act absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <h2 className="display text-[clamp(2rem,6.5vw,5rem)] leading-[1.05] text-starlight">
        One Humanity
        <br />
        <span className="text-verdant-bright">One Planet</span>
        <br />
        <span className="text-aurum">Universal Well-being</span>
      </h2>

      <p className="mt-9 max-w-xl text-sm leading-relaxed text-starlight-dim md:text-base">
        {SITE.vision}
      </p>

      <div className="pointer-events-auto mt-11 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/mission"
          className="rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-on-gold transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_34px_-6px_var(--color-gold)]"
        >
          Enter the Mission
        </Link>
        <Link
          href="/journey"
          className="rounded-full border border-hairline-strong px-8 py-3.5 text-sm text-starlight transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          The Founder&apos;s Journey
        </Link>
      </div>
    </motion.div>
  );
}
