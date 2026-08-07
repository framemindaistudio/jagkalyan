import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { JOURNEY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Journey",
  description:
    "Dr. Jagdish Kalyandurgmath — from Build Self and Build Family through Build Society and Build Organisations, to Nation Building and Humanity Building missions. 1967 to 2026.",
};

const CHAPTER_LABEL: Record<string, string> = {
  self: "Building Self",
  society: "Building Society",
  nation: "Building Nation",
  humanity: "Building Humanity",
};

const CHAPTER_COLOR: Record<string, string> = {
  self: "var(--color-gold)",
  society: "var(--color-verdant)",
  nation: "#7fb8e6",
  humanity: "#b08ce0",
};

export default function JourneyPage() {
  return (
    <>
      <PageHero
        eyebrow="Dr. Jagdish Kalyandurgmath"
        title={
          <>
            From building the self
            <br />
            to <span className="text-aurum">building humanity.</span>
          </>
        }
        lead="Build Self · Build Family · Build Society · Build Organisations · Nation Building Missions · Humanity Building Missions. Fifty-nine years, one continuous line."
      >
        <p className="display text-2xl text-gold/90">
          {SITE.founder.creed}
        </p>
        <p className="eyebrow mt-3 text-starlight-faint">
          {SITE.founder.mantra}
        </p>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="1967 → 2026"
          title="The journey, stop by stop."
          lead="Education and engineering, then research at ISRO, geospatial technology, corporate leadership — and from 2003 onward, an unbroken sequence of institutions built for other people."
        />

        <ol className="relative mt-20 border-l border-hairline pl-8 md:pl-12">
          {JOURNEY.map((stop, i) => (
            <Reveal key={`${stop.name}-${stop.years}`} delay={i * 0.03}>
              <li className="group relative pb-12 last:pb-0">
                {/* Node on the line */}
                <span
                  className="absolute -left-[calc(2rem+5px)] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-void transition-transform duration-500 group-hover:scale-150 md:-left-[calc(3rem+5px)]"
                  style={{
                    background: CHAPTER_COLOR[stop.chapter],
                    boxShadow: `0 0 14px 2px ${CHAPTER_COLOR[stop.chapter]}55`,
                  }}
                  aria-hidden
                />

                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-sm text-gold">
                    {stop.years}
                  </span>
                  <span
                    className="eyebrow text-[0.55rem]"
                    style={{ color: CHAPTER_COLOR[stop.chapter] }}
                  >
                    {CHAPTER_LABEL[stop.chapter]}
                  </span>
                </div>

                <h2 className="display mt-2 text-2xl text-starlight transition-colors duration-300 group-hover:text-gold md:text-3xl">
                  {stop.name}
                </h2>
                <p className="mt-1.5 text-sm text-starlight-faint">
                  {stop.note}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section variant="canvas">
        <SectionHeading
          variant="canvas"
          align="center"
          eyebrow="What the journey became"
          title="Positive energy attracts positive results."
          lead="Stronger individuals. Healthier families. Empowered communities. A developed nation. A harmonious world."
        />
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href="/ecosystem"
              className="!bg-verdant-deep !text-canvas hover:!bg-verdant-deep/90"
            >
              Explore the ecosystem
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
