"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import {
  ACADEMY,
  ASSOCIATES,
  ENTITIES,
  GLOBAL,
  HOLISTIC,
  INSTITUTIONS,
  JOURNEY,
  PILLARS,
  SITE,
  WISDOM_CITY,
} from "@/lib/site";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
  SoonBadge,
} from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------
   The four pillars, expanded into readable cards.
   ------------------------------------------------------------------ */
export function PillarsSection() {
  return (
    <Section id="pillars">
      <SectionHeading
        eyebrow="The Four Movements"
        title={
          <>
            From the self outward,
            <br />
            until it reaches everyone.
          </>
        }
        lead="The mission is a sequence, not a menu. Each stage makes the next one possible — a person who has built themselves can build a family; a society of such families can build a nation; nations built this way can build humanity."
      />

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {PILLARS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.07}>
            <article
              id={p.id}
              className="panel panel-hover group h-full p-8 md:p-10"
              style={{ scrollMarginTop: "6rem" }}
            >
              <div className="flex items-baseline gap-4">
                <span className="display text-4xl text-gold/25">
                  0{i + 1}
                </span>
                <h3 className="display text-3xl text-starlight md:text-4xl">
                  {p.title}
                </h3>
              </div>
              <p className="eyebrow mt-4 text-gold/60">{p.sub}</p>
              <p className="mt-5 leading-relaxed text-starlight-dim">
                {p.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------
   Holistic Four + Global Four.
   ------------------------------------------------------------------ */
export function FrameworkSection() {
  return (
    <Section id="framework" variant="canvas">
      <SectionHeading
        variant="canvas"
        eyebrow="The Holistic Framework"
        title="Four dimensions of a whole life. Four of a whole world."
        lead="Education, wellness, welfare and wealth are treated as one system rather than four departments — because in a real life they have never been separable."
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <FourGrid
          label="Holistic"
          items={HOLISTIC}
          accent="var(--color-verdant-deep)"
        />
        <FourGrid label="Global" items={GLOBAL} accent="var(--color-gold-deep)" />
      </div>

      <Reveal>
        <div className="mt-14 flex flex-wrap items-center gap-3">
          <ButtonLink href="/mission" variant="primary">
            Explore the Mission
          </ButtonLink>
          <Link
            href="/framework"
            className="inline-flex items-center gap-2 rounded-full border border-canvas-border px-7 py-3.5 text-sm text-canvas-ink transition-colors hover:border-verdant-deep hover:text-verdant-deep"
          >
            All twelve dimensions <SoonBadge className="border-canvas-border text-verdant-deep/70" />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}

function FourGrid({
  label,
  items,
  accent,
}: {
  label: string;
  items: { title: string; body: string }[];
  accent: string;
}) {
  return (
    <div>
      <Reveal>
        <p
          className="eyebrow mb-6 border-b border-canvas-border pb-4"
          style={{ color: accent }}
        >
          {label}
        </p>
      </Reveal>
      <div className="grid gap-px overflow-hidden rounded-card bg-canvas-border sm:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div className="h-full bg-canvas-raised p-6 transition-colors duration-500 hover:bg-canvas">
              <h3 className="display text-xl text-canvas-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-canvas-muted">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Journey teaser — a horizontal constellation of the founder's path.
   ------------------------------------------------------------------ */
export function JourneySection() {
  const highlights = JOURNEY.filter((_, i) =>
    [0, 3, 4, 6, 8, 14, 16].includes(i),
  );

  return (
    <Section id="journey">
      <SectionHeading
        eyebrow="The Journey"
        title={
          <>
            Fifty-nine years,
            <br />
            one continuous line.
          </>
        }
        lead={`${SITE.founder.name} — from building the self, to building a family, a society, institutions, a nation, and now a mission for humanity.`}
      />

      <div className="mt-16 -mx-5 overflow-x-auto px-5 pb-6 md:mx-0 md:px-0">
        <ol className="flex min-w-max gap-4">
          {highlights.map((stop, i) => (
            <Reveal key={stop.name} delay={i * 0.06}>
              <li className="panel panel-hover w-60 p-6">
                <p className="eyebrow text-gold/70">{stop.years}</p>
                <h3 className="display mt-3 text-xl leading-tight text-starlight">
                  {stop.name}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-starlight-faint">
                  {stop.note}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal>
        <div className="mt-10">
          <ButtonLink href="/journey" variant="ghost">
            See the full journey, 1967 → 2026
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------
   Ecosystem — entities and associates.
   ------------------------------------------------------------------ */
export function EcosystemSection() {
  return (
    <Section id="ecosystem">
      <SectionHeading
        eyebrow="The Ecosystem"
        title="One mission, many hands."
        lead="Charitable trusts, schools, a holistic LLP, a gurukul, and a circle of associate ventures — each one an instrument of the same purpose."
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <EntityColumn title="JagKalyan Entities" items={ENTITIES} accent="gold" />
        <EntityColumn
          title="JagKalyan Associates"
          items={ASSOCIATES}
          accent="verdant"
        />
      </div>

      <Reveal>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/ecosystem">Explore the ecosystem</ButtonLink>
          <ButtonLink href="/wisdom-park" variant="ghost">
            JagKalyan Wisdom Park
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}

function EntityColumn({
  title,
  items,
  accent,
}: {
  title: string;
  items: { name: string; year?: string; role: string }[];
  accent: "gold" | "verdant";
}) {
  return (
    <div>
      <Reveal>
        <p
          className={cn(
            "eyebrow mb-2 border-b border-hairline pb-4",
            accent === "gold" ? "text-gold/70" : "text-verdant-bright/70",
          )}
        >
          {title}
        </p>
      </Reveal>
      <ul>
        {items.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.05}>
            <li className="group flex items-start justify-between gap-6 border-b border-hairline/50 py-5">
              <div>
                <h3 className="display text-xl text-starlight transition-colors duration-300 group-hover:text-gold">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-starlight-faint">
                  {item.role}
                </p>
              </div>
              {item.year && (
                <span className="shrink-0 pt-1 font-mono text-xs text-starlight-faint">
                  {item.year}
                </span>
              )}
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------
   Institutions — the seven that build on the ground.
   ------------------------------------------------------------------ */
export function InstitutionsSection() {
  return (
    <Section id="institutions" variant="canvas">
      <SectionHeading
        variant="canvas"
        eyebrow="A Self-Sustaining Ecosystem"
        title="Seven institutions. One purpose."
        lead="Education, social impact, service, enterprise, culture, research and governance — designed so that each one funds, feeds and strengthens the others."
      />

      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {INSTITUTIONS.map((inst, i) => (
          <Reveal key={inst.name} delay={i * 0.05}>
            <article className="group h-full rounded-card border border-canvas-border bg-canvas-raised p-7 transition-all duration-500 hover:border-verdant-deep/40 hover:shadow-[0_18px_44px_-24px_rgba(14,74,18,0.5)]">
              <span className="display text-3xl text-verdant-deep/20">
                0{i + 1}
              </span>
              <h3 className="display mt-3 text-2xl leading-tight text-canvas-ink">
                {inst.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-verdant-deep">
                {inst.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-canvas-muted">
                {inst.detail}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------
   Academy.
   ------------------------------------------------------------------ */
export function AcademySection() {
  return (
    <Section id="academy">
      <SectionHeading
        eyebrow="JagKalyan Academy"
        title="Nine schools, one education."
        lead="From coaching and health to purpose, nationhood, healing, geospatial AI and executive leadership — the shalas of the Academy teach the whole person."
      />

      <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {ACADEMY.map((a, i) => (
          <Reveal key={a.name} delay={i * 0.04}>
            <div className="group h-full bg-space p-7 transition-colors duration-500 hover:bg-space-raised">
              <div className="flex items-start justify-between gap-3">
                <h3 className="display text-xl text-starlight transition-colors group-hover:text-gold">
                  {a.name}
                </h3>
                <SoonBadge />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-starlight-faint">
                {a.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12">
          <ButtonLink href="/academy" variant="ghost">
            About the Academy
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------
   Wisdom Park — 200 acres, shown as a proportional bar.
   ------------------------------------------------------------------ */
export function WisdomParkSection() {
  return (
    <Section id="wisdom-park">
      <SectionHeading
        eyebrow="JagKalyan Wisdom City"
        title="Five hundred acres of the mission, made physical."
        lead="Learn · Innovate · Serve · Sustain. A skills university, a gurukul, a wellness centre, data centres and an AI hub, industry, sport, organic farmland and homes — a self-reliant township for a better world."
      />

      <div className="mt-16 space-y-3">
        {WISDOM_CITY.zones.slice(0, 8).map((zone, i) => (
          <Reveal key={zone.name} delay={i * 0.04}>
            <div className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-hairline/50 py-4 md:grid-cols-[16rem_1fr_auto]">
              <h3 className="text-sm text-starlight transition-colors group-hover:text-gold md:text-base">
                {zone.name}
              </h3>

              <div className="col-span-2 order-3 md:order-none md:col-span-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-space-veil">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(zone.acres / 100) * 100}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.1,
                      delay: 0.1 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-verdant-deep via-verdant to-gold"
                  />
                </div>
                <p className="mt-2 text-xs text-starlight-faint">{zone.note}</p>
              </div>

              <span className="font-mono text-sm text-gold">
                {zone.acres}
                <span className="ml-1 text-[0.72rem] text-starlight-faint">
                  ac
                </span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="display text-3xl text-starlight">
            {WISDOM_CITY.statedTotal}
            <span className="ml-2 text-lg text-starlight-faint">
              acres in total
            </span>
          </p>
          <ButtonLink href="/wisdom-park">See the master plan</ButtonLink>
        </div>
      </Reveal>
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
          className="mt-16 inline-flex items-center gap-2 text-sm text-starlight-dim transition-colors hover:text-gold"
        >
          {SITE.founder.creed}
          <ArrowUpRight size={15} />
        </Link>
      </Reveal>
    </Section>
  );
}
