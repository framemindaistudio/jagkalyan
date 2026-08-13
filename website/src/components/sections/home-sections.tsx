"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { FOUNDER_PROFILE, SITE } from "@/lib/site";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
  SoonBadge,
} from "@/components/ui/primitives";

/**
 * The homepage is a GATEWAY, not a summary.
 *
 * It used to restate the pillars, the holistic framework, the journey, the
 * entities, the institutions, the academy and the Wisdom City zoning — so
 * anyone who scrolled it and then opened a real page met the same content
 * twice, and the site read as if it were repeating itself.
 *
 * What it keeps is what exists nowhere else: the cinematic sequence, one
 * short statement of intent, and a set of doors. Each door is written in
 * its own words rather than copied from the page it points at, so adding
 * detail there can never create a duplicate here.
 */

/* ------------------------------------------------------------------
   A single statement of intent.
   ------------------------------------------------------------------ */
export function VisionSection() {
  return (
    <Section className="text-center">
      <div
        aria-hidden
        className="bloom left-1/2 top-1/2 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(228,174,20,0.14), transparent)",
        }}
      />
      <Reveal>
        <p className="eyebrow text-gold/75">Our Vision</p>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="display mx-auto mt-8 max-w-4xl text-[clamp(1.5rem,4vw,2.9rem)] leading-[1.25] text-starlight">
          {SITE.vision}
        </p>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="eyebrow mt-10 text-starlight-faint">{SITE.creed}</p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------
   The doors.
   ------------------------------------------------------------------ */

interface Door {
  href: string;
  label: string;
  line: string;
  meta: string;
  soon?: boolean;
}

const DOORS: Door[] = [
  {
    href: "/mission",
    label: "The Mission",
    line: "Four movements that begin with one person and end with everyone.",
    meta: "Build Self → Build Humanity",
  },
  {
    href: "/journey",
    label: "The Journey",
    line: "A route through the life that built all of this, stop by stop.",
    meta: `${FOUNDER_PROFILE.route} · 17 waypoints`,
  },
  {
    href: "/ecosystem",
    label: "Ecosystem",
    line: "The trusts, schools and ventures that carry the work on the ground.",
    meta: "Entities & associates",
  },
  {
    href: "/wisdom-park",
    label: "Wisdom City",
    line: "Where the mission stops being an idea and becomes a place.",
    meta: "500 acres",
    soon: true,
  },
  {
    href: "/global-impact",
    label: "Global Impact & Legacy",
    line: "The crossing from insecurity-driven survival to purpose-led prosperity.",
    meta: "Vision & legacy",
  },
  {
    href: "/academy",
    label: "Academy",
    line: "Nine schools for the parts of a person a curriculum usually misses.",
    meta: "Nine shalas",
    soon: true,
  },
];

export function ExploreSection() {
  return (
    <Section id="explore">
      <SectionHeading
        eyebrow="Where to begin"
        title="Six ways into the mission."
        lead="Each is a whole subject in itself. Start wherever the question you arrived with lives."
      />

      <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-2">
        {DOORS.map((d, i) => (
          <Reveal key={d.href} delay={i * 0.05}>
            <Link
              href={d.href}
              className="group flex h-full flex-col justify-between gap-8 bg-space p-8 transition-colors duration-500 hover:bg-space-raised md:p-10"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[0.72rem] text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {d.soon && <SoonBadge />}
                </div>

                <h3 className="display mt-5 text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight text-starlight transition-colors duration-300 group-hover:text-gold">
                  {d.label}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-starlight-dim">
                  {d.line}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-hairline/50 pt-5">
                <span className="eyebrow text-[0.7rem] text-starlight-faint">
                  {d.meta}
                </span>
                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------
   Closing call to action.
   ------------------------------------------------------------------ */
export function JoinSection() {
  return (
    <Section id="join" className="text-center">
      <div
        aria-hidden
        className="bloom left-1/2 top-1/2 h-[30rem] w-[52rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(228,174,20,0.20), transparent)",
        }}
      />

      <SectionHeading
        align="center"
        eyebrow="Join the Mission"
        title="Every hand makes it lighter."
        lead="Members, students, volunteers, mentors, faculty, researchers, donors, investors and CSR partners — each registered participant receives a JagKalyan Unique ID and a place in the movement."
      />

      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/get-involved">Get involved</ButtonLink>
          <ButtonLink href="/donate" variant="ghost">
            Support the mission
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="mt-10 text-xs text-starlight-faint">
          Contributions to JagKalyan Trust are eligible under 12A &amp; 80G.
          Registration and giving open shortly.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <Link
          href="/journey"
          className="mt-16 inline-flex min-h-11 items-center gap-2 text-sm text-starlight-dim transition-colors hover:text-gold"
        >
          {SITE.founder.creed}
          <ArrowUpRight size={15} />
        </Link>
      </Reveal>
    </Section>
  );
}
