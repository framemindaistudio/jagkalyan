"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { JOURNEY, type JourneyStop } from "@/lib/site";
import { Starfield } from "@/components/cosmic/starfield";
import { cn } from "@/lib/cn";

/**
 * The Journey, as a route rather than a list.
 *
 * The first version was a bulleted timeline: every stop the same size, all
 * pressed against one edge, nothing to distinguish 1967 from 2026. It read
 * as a CV.
 *
 * This is built as a flight path instead. Four things do that work:
 *
 *  1. **A travelled line.** The route ahead is faint; the part behind you
 *     fills in gold as you scroll. You can see how far you've come, which
 *     is the whole point of a journey.
 *  2. **Waypoints, not bullets.** Each stop occupies most of a screen and
 *     alternates sides, so you pass *between* them rather than reading down
 *     a column. The node lights up as you draw level with it.
 *  3. **Years as objects.** The start year is set enormous behind each stop
 *     — the era you're flying through, not a date field.
 *  4. **Sectors.** The first time the mission enters a new phase — Self,
 *     Nation, Society, Humanity — the route announces it.
 *
 * Chapters genuinely interleave in the source data (he was building
 * institutions and serving the nation in the same years), so sector markers
 * fire on first entry only. Colour-coded nodes carry the rest.
 */

const CHAPTER: Record<
  JourneyStop["chapter"],
  { label: string; color: string; sector: string; blurb: string }
> = {
  self: {
    label: "Building Self",
    color: "var(--color-gold)",
    sector: "Sector I",
    blurb: "Education, discipline and the making of a foundation.",
  },
  nation: {
    label: "Building Nation",
    color: "#7fb8e6",
    sector: "Sector II",
    blurb: "Research, technology and industry in the service of a country.",
  },
  society: {
    label: "Building Society",
    color: "var(--color-verdant)",
    sector: "Sector III",
    blurb: "Institutions built to outlast their founder.",
  },
  humanity: {
    label: "Building Humanity",
    color: "#b08ce0",
    sector: "Sector IV",
    blurb: "The mission turns outward, to everyone.",
  },
};

export function JourneyPath() {
  const listRef = useRef<HTMLOListElement>(null);

  /*
    The travelled line. Measured against the viewport's middle rather than
    its edges, so the fill sits level with whichever waypoint you're beside
    instead of running ahead of you.
  */
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 55%", "end 55%"],
  });
  const travelled = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.0005,
  });

  // Sector markers fire the first time each phase appears.
  const seen = new Set<JourneyStop["chapter"]>();
  const stops = JOURNEY.map((stop) => {
    const isFirst = !seen.has(stop.chapter);
    seen.add(stop.chapter);
    return { stop, isFirst };
  });

  return (
    <section className="relative overflow-hidden bg-void py-24 md:py-32">
      <Starfield density={0.75} />

      <div
        aria-hidden
        className="bloom left-1/2 top-1/4 h-[46rem] w-[46rem] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(228,174,20,0.12), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[82rem] px-5 md:px-8">
        <ol ref={listRef} className="relative">
          {/* The route ahead — faint, unfilled. */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[1.75rem] top-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-hairline to-transparent md:left-1/2"
          />
          {/* The route behind — fills as you travel. */}
          <motion.div
            aria-hidden
            style={{ scaleY: travelled }}
            className="absolute bottom-0 left-[1.75rem] top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-gold via-verdant to-gold md:left-1/2"
          />

          {stops.map(({ stop, isFirst }, i) => (
            <Waypoint
              key={`${stop.name}-${stop.years}`}
              stop={stop}
              index={i}
              total={JOURNEY.length}
              showSector={isFirst}
            />
          ))}
        </ol>

        {/* Arrival */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-8 text-center"
        >
          <span
            className="mx-auto block h-3 w-3 rounded-full bg-gold"
            style={{ boxShadow: "0 0 30px 8px rgba(228,174,20,0.45)" }}
          />
          <p className="eyebrow mt-8 text-gold/70">The journey continues</p>
          <p className="display mt-4 text-3xl text-starlight md:text-5xl">
            From building the self
            <br />
            to <span className="text-aurum">building humanity.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Waypoint({
  stop,
  index,
  total,
  showSector,
}: {
  stop: JourneyStop;
  index: number;
  total: number;
  showSector: boolean;
}) {
  const chapter = CHAPTER[stop.chapter];
  // Alternate sides on desktop so the eye travels rather than scans.
  const onLeft = index % 2 === 0;
  const startYear = stop.years.slice(0, 4);

  return (
    <li
      className={cn(
        // Explicit column tracks: on a phone a node rail plus content; from
        // md a three-track grid with the route running down the middle.
        "relative grid grid-cols-[3.5rem_1fr] items-center",
        "md:grid-cols-[1fr_5rem_1fr]",
        showSector ? "pt-16 md:pt-24" : "pt-0",
      )}
    >
      {showSector && <SectorMarker chapter={chapter} onLeft={onLeft} />}

      {/* Node — centre track from md, left rail on a phone. */}
      <div className="relative flex h-full items-center justify-center md:col-start-2 md:row-start-2">
        <motion.span
          aria-hidden
          initial={{ scale: 0.4, opacity: 0.3 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 block h-3 w-3 rounded-full ring-4 ring-void"
          style={{
            background: chapter.color,
            boxShadow: `0 0 22px 5px ${chapter.color}66`,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative min-h-[38vh] py-10 md:min-h-[46vh] md:py-16",
          "flex flex-col justify-center",
          onLeft
            ? "md:col-start-1 md:row-start-2 md:items-end md:text-right"
            : "md:col-start-3 md:row-start-2 md:items-start md:text-left",
        )}
      >
        {/* The era, set as scenery behind the stop. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-2 select-none font-[family-name:var(--font-display)] text-[7rem] leading-none text-starlight opacity-[0.045] md:text-[11rem]",
            onLeft ? "md:right-0" : "md:left-0",
          )}
        >
          {startYear}
        </span>

        <div className="relative flex items-center gap-3">
          <span className="font-mono text-[0.65rem] text-starlight-faint">
            {String(index + 1).padStart(2, "0")}
            <span className="opacity-40"> / {total}</span>
          </span>
          <span
            className="eyebrow text-[0.55rem]"
            style={{ color: chapter.color }}
          >
            {chapter.label}
          </span>
        </div>

        <p className="relative mt-4 font-mono text-sm tracking-wide text-gold">
          {stop.years}
        </p>

        <h2 className="display relative mt-2 text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.05] text-starlight">
          {stop.name}
        </h2>

        <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-starlight-dim">
          {stop.note}
        </p>
      </motion.div>
    </li>
  );
}

function SectorMarker({
  chapter,
  onLeft,
}: {
  chapter: (typeof CHAPTER)[keyof typeof CHAPTER];
  onLeft: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        // Phone: spans the node rail and content, indented clear of the rail.
        "col-span-2 mb-4 pl-14",
        // md+: drops into the same alternating track as its waypoint, so the
        // sector announces itself on the side you're about to travel down.
        "md:col-span-1 md:row-start-1 md:mb-8 md:pl-0",
        onLeft
          ? "md:col-start-1 md:text-right"
          : "md:col-start-3 md:text-left",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          onLeft ? "md:justify-end" : "md:justify-start",
        )}
      >
        <span
          className="h-px w-8"
          style={{ background: chapter.color, opacity: 0.5 }}
        />
        <span
          className="eyebrow text-[0.55rem]"
          style={{ color: chapter.color }}
        >
          {chapter.sector}
        </span>
      </div>
      <p className="mt-2 text-sm italic leading-relaxed text-starlight-faint">
        {chapter.blurb}
      </p>
    </motion.div>
  );
}
