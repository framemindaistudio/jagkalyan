import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
  SoonBadge,
} from "@/components/ui/primitives";
import { MasterPlan } from "@/components/sections/master-plan";
import { PlanViewer } from "@/components/sections/plan-viewer";
import {
  CITY_IMPACT,
  CITY_PRINCIPLES,
  FUNDING_SOURCES,
  IMPACT_AREAS,
  WISDOM_CITY,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "JagKalyan Wisdom City",
  description:
    "500 acres of learning, innovation, service and sustainable living — a self-reliant, profitable and harmonious township for a better world.",
};

export default function WisdomCityPage() {
  return (
    <>
      <PageHero
        eyebrow={WISDOM_CITY.creed}
        title={
          <>
            JagKalyan
            <br />
            <span className="text-aurum">Wisdom City.</span>
          </>
        }
        lead={WISDOM_CITY.promise}
      >
        <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
          <div>
            <p className="display text-5xl leading-none text-gold md:text-6xl">
              {WISDOM_CITY.statedTotal}
            </p>
            <p className="eyebrow mt-2 text-[0.7rem] text-starlight-faint">
              Acres
            </p>
          </div>
          <div>
            <p className="display text-3xl leading-none text-starlight md:text-4xl">
              ₹{WISDOM_CITY.investmentCrore.toLocaleString("en-IN")} cr
            </p>
            <p className="eyebrow mt-2 text-[0.7rem] text-starlight-faint">
              Estimated investment
            </p>
          </div>
          <div>
            <p className="display text-3xl leading-none text-starlight md:text-4xl">
              {WISDOM_CITY.phases}
            </p>
            <p className="eyebrow mt-2 text-[0.7rem] text-starlight-faint">
              Phase-wise development
            </p>
          </div>
          <SoonBadge />
        </div>
      </PageHero>

      {/* Principles */}
      <Section>
        <SectionHeading
          eyebrow="What it is built to be"
          title="Self Build · Family Build · Society Build · Nation Build · Humanity Build"
          lead="A township designed to pay for itself, regenerate what it uses, and be replicable — for India and for the world."
        />
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-2.5">
            {CITY_PRINCIPLES.map((p) => (
              <span
                key={p}
                className="rounded-full border border-hairline-strong px-5 py-2.5 text-sm text-starlight"
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Master plan — the client's official board. */}
      <Section>
        <SectionHeading
          eyebrow="Master Plan"
          title="How the five hundred acres are held."
        />
        <Reveal delay={0.1}>
          <div className="mt-14">
            <PlanViewer
              plan={{
                src: "/plans/wisdom-city-master-plan.webp",
                alt: "JagKalyan Wisdom City master plan — 500 acres, showing the Skills University, Data Centres Park & AI Hub, Seva Park, Udyog Park, Gurukul, Arogyashala Wellness Centre, Sports Complex and Stadium, Eco Living and Senior Living communities, Organic Farming & Food Park, plantations, water conservation and mobility.",
                caption:
                  "JagKalyan Wisdom City master plan. Indicative; layouts, phasing and areas subject to final planning and approvals.",
              }}
            />
          </div>
        </Reveal>

        {/* The same zoning as text — readable on a phone, and the record
            that survives if the artwork is ever revised. */}
        <Reveal delay={0.15}>
          <div className="mt-14">
            <MasterPlan />
          </div>
        </Reveal>
      </Section>

      {/* Impact at a glance */}
      <Section variant="canvas">
        <SectionHeading
          variant="canvas"
          eyebrow="Global Impact at a Glance"
          title="What the city is designed to produce."
          lead="Targets at maturity, across jobs, learning, health, energy, water, carbon and food."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-card bg-canvas-border sm:grid-cols-2 lg:grid-cols-3">
          {CITY_IMPACT.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.04}>
              <div className="h-full bg-canvas-raised p-7">
                <p className="display text-3xl leading-none text-verdant-deep md:text-4xl">
                  {m.value}
                </p>
                <p className="mt-3 text-sm font-medium text-canvas-ink">
                  {m.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-canvas-muted">
                  {m.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-xs italic text-canvas-muted">
            Projected targets at maturity, not current figures.
          </p>
        </Reveal>
      </Section>

      {/* Areas of impact — the client's global-impact board, then the same
          ten areas as readable cards. */}
      <Section>
        <SectionHeading
          eyebrow="Areas of Impact"
          title="Ten ways a city can change a life."
        />

        <Reveal delay={0.1}>
          <div className="mt-14">
            <PlanViewer
              plan={{
                src: "/plans/wisdom-city-global-impact.webp",
                alt: "JagKalyan Wisdom City global impact board — ten areas of impact, the master plan, global impact at a glance figures, the power of integrated impact, key outcomes by 2035, estimated investment of ₹1,350 crores and sources of funds.",
                caption:
                  "JagKalyan Wisdom City — Global Impact. Figures are projected targets at maturity, not current performance.",
              }}
            />
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {IMPACT_AREAS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.04}>
              <article className="panel h-full p-7">
                <h3 className="display text-xl text-starlight">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-starlight-faint">
                  {a.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Investment */}
      <Section variant="canvas">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              variant="canvas"
              eyebrow="Investment"
              title={`₹${WISDOM_CITY.investmentCrore.toLocaleString("en-IN")} crores, across ${WISDOM_CITY.phases}.`}
              lead="A self-reliant, profit-making township — built to fund its own growth rather than depend indefinitely on donation."
            />
            <Reveal delay={0.15}>
              <p className="mt-6 text-xs italic text-canvas-muted">
                {WISDOM_CITY.investmentNote}. Indicative and subject to detailed
                project reports, approvals and financing.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow border-b border-canvas-border pb-4 text-verdant-deep/70">
                Sources of funds
              </p>
            </Reveal>
            <ul className="mt-2">
              {FUNDING_SOURCES.map((s, i) => (
                <Reveal key={s} delay={i * 0.04}>
                  <li className="flex items-center gap-3 border-b border-canvas-border/60 py-3.5 text-sm text-canvas-ink">
                    <span
                      aria-hidden
                      className="h-1 w-1 shrink-0 rounded-full bg-verdant-deep"
                    />
                    {s}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="text-center">
        <SectionHeading
          align="center"
          eyebrow="One Earth · One Family · One Future"
          title={WISDOM_CITY.closing}
        />
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/get-involved">Partner on the city</ButtonLink>
            <ButtonLink href="/global-impact" variant="ghost">
              Global impact &amp; legacy
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
