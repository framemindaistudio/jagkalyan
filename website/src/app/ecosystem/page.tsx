import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { EntityMark } from "@/components/brand/entity-mark";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { ASSOCIATES, ENTITIES, INSTITUTIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "JagKalyan Entities and Associates — trusts, schools, institutes and ventures working as one self-sustaining ecosystem.",
};

export default function EcosystemPage() {
  return (
    <>
      <PageHero
        eyebrow="The JagKalyan Ecosystem"
        title={
          <>
            One mission,
            <br />
            <span className="text-aurum">many hands.</span>
          </>
        }
        lead="Integrated · Inclusive · Innovative · Sustainable · Scalable — for the welfare of all beings and the planet."
      />

      {/* Entities */}
      <Section id="entities">
        <SectionHeading
          eyebrow="A. JagKalyan Entities"
          title="The institutions we hold."
          lead="Charitable trusts, schools, an institute, a holistic LLP and the gurukul — the legal and moral core of the mission."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ENTITIES.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.05}>
              <article className="panel panel-hover h-full p-8">
                <div className="flex items-start justify-between gap-4">
                  <EntityMark name={e.name} logo={e.logo} />
                  {e.year && (
                    <span className="font-mono text-xs text-gold">{e.year}</span>
                  )}
                </div>
                <h2 className="display mt-5 text-2xl leading-tight text-starlight">
                  {e.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-starlight-faint">
                  {e.role}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Associates */}
      <Section id="associates">
        <SectionHeading
          eyebrow="B. JagKalyan Associates"
          title="The ventures that walk with us."
          lead="Independent enterprises aligned to the mission — in fintech, commerce, spiritual wellness, space education and sustainable development."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ASSOCIATES.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.05}>
              <article className="panel panel-hover h-full p-8">
                <div className="flex items-start justify-between gap-4">
                  <EntityMark name={e.name} logo={e.logo} />
                  {e.year && (
                    <span className="font-mono text-xs text-verdant-bright">
                      {e.year}
                    </span>
                  )}
                </div>
                <h2 className="display mt-5 text-2xl leading-tight text-starlight">
                  {e.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-starlight-faint">
                  {e.role}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Institutions */}
      <Section id="institutions" variant="canvas">
        <SectionHeading
          variant="canvas"
          eyebrow="A Self-Sustaining Ecosystem"
          title="Seven institutions, designed to hold each other up."
          lead="Education funds service; enterprise funds education; governance protects all of it. Nothing here depends on a single source of support."
        />
        <div className="mt-16 space-y-4">
          {INSTITUTIONS.map((inst, i) => (
            <Reveal key={inst.name} delay={i * 0.04}>
              <article className="grid gap-5 rounded-card border border-canvas-border bg-canvas-raised p-8 transition-all duration-500 hover:border-verdant-deep/40 md:grid-cols-[auto_1fr_1.3fr] md:gap-10 md:p-10">
                {inst.logo ? (
                  /* On Canvas these need no plate — they were authored for
                     exactly this kind of light background. */
                  <Image
                    src={inst.logo}
                    alt={`${inst.name} logo`}
                    width={64}
                    height={64}
                    sizes="64px"
                    className="h-16 w-16 shrink-0 object-contain"
                  />
                ) : (
                  <span className="display text-4xl text-verdant-deep/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <div>
                  <h2 className="display text-2xl leading-tight text-canvas-ink">
                    {inst.name}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-verdant-deep">
                    {inst.role}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-canvas-muted">
                  {inst.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 text-center">
            <ButtonLink
              href="/wisdom-park"
              className="!bg-verdant-deep !text-canvas hover:!bg-verdant-deep/90"
            >
              See where it all comes together
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
