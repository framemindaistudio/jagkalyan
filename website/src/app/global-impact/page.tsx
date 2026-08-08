import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { ExpansionMap } from "@/components/sections/expansion-map";
import {
  GLOBAL_IMPACT_STATEMENT,
  IMPACT_FROM,
  IMPACT_PILLARS,
  IMPACT_SUPPORTS,
  IMPACT_TO,
  LEGACY,
  SWADHARMA_EXPRESSIONS,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Global Impact & Legacy",
  description:
    "From insecurity-driven survival to purpose-led prosperity — the JagKalyan holistic vision for global impact, and the legacy it intends to leave.",
};

export default function GlobalImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="JagKalyan Holistic Global Impact"
        title={
          <>
            From insecurity-driven survival
            <br />
            to <span className="text-aurum">purpose-led prosperity.</span>
          </>
        }
        lead={GLOBAL_IMPACT_STATEMENT}
      />

      {/* The crossing */}
      <Section>
        <SectionHeading
          eyebrow="The Crossing"
          title="A bridge, and what holds it up."
          lead="Most people are not short of effort. They are short of alignment — running hard inside a life that was never designed around their purpose. The mission is the bridge across."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* From */}
          <Reveal>
            <article className="panel h-full border-white/5 p-8 md:p-10">
              <p className="eyebrow text-starlight-faint">Transforming from</p>
              <h3 className="display mt-4 text-3xl leading-tight text-starlight-dim">
                {IMPACT_FROM.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {IMPACT_FROM.symptoms.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 text-sm leading-relaxed text-starlight-faint"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-starlight-faint"
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* The bridge */}
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center gap-3 px-2 py-4 lg:py-0">
              <span className="eyebrow whitespace-nowrap text-gold">
                Mission: JagKalyan
              </span>
              <span className="text-[0.65rem] italic text-starlight-faint">
                welfare of all
              </span>
              <div
                aria-hidden
                className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent lg:w-32"
              />
            </div>
          </Reveal>

          {/* To */}
          <Reveal delay={0.15}>
            <article className="panel h-full p-8 md:p-10">
              <p className="eyebrow text-gold/70">Transforming to</p>
              <h3 className="display mt-4 text-3xl leading-tight text-aurum">
                {IMPACT_TO.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {IMPACT_TO.outcomes.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 text-sm leading-relaxed text-starlight-dim"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold"
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Pillars */}
      <Section variant="canvas">
        <SectionHeading
          variant="canvas"
          eyebrow="What Carries the Crossing"
          title="Three pillars."
          lead="Education gives direction, wisdom and technology give capability, and support systems make the change survivable."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {IMPACT_PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <article className="h-full rounded-card border border-canvas-border bg-canvas-raised p-8">
                <span className="display text-3xl text-verdant-deep/25">
                  0{i + 1}
                </span>
                <h3 className="display mt-3 text-2xl leading-tight text-canvas-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-canvas-muted">
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-2.5">
            <span className="eyebrow mr-2 text-verdant-deep/70">
              Support systems
            </span>
            {IMPACT_SUPPORTS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-canvas-border bg-canvas px-4 py-2 text-xs text-canvas-ink"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Swadharma */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="Aligning Ikigai & Swadharma"
          title="People doing what they love, excelling at it, and serving through it."
          lead="Alignment is not an abstraction. It shows up as a person painting, gardening, teaching, creating — and a society that can afford to let them."
        />
        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {SWADHARMA_EXPRESSIONS.map((e) => (
              <span
                key={e}
                className="rounded-full border border-hairline-strong px-6 py-3 text-sm text-starlight"
              >
                {e}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Expansion */}
      <ExpansionMap />

      {/* Legacy */}
      <Section className="text-center">
        <div
          aria-hidden
          className="bloom left-1/2 top-1/2 h-[28rem] w-[48rem] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(closest-side, rgba(228,174,20,0.18), transparent)",
          }}
        />
        <Reveal>
          <p className="eyebrow text-gold/75">{LEGACY.heading}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <blockquote className="display mx-auto mt-8 max-w-4xl text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.25] text-starlight">
            &ldquo;{LEGACY.quote}&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/get-involved">Join the mission</ButtonLink>
            <ButtonLink href="/journey" variant="ghost">
              The founder&apos;s journey
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
