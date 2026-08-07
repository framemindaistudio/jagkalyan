import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
  SoonBadge,
} from "@/components/ui/primitives";
import { WISDOM_PARK } from "@/lib/site";
import { MasterPlan } from "@/components/sections/master-plan";

export const metadata: Metadata = {
  title: "JagKalyan Wisdom Park",
  description:
    "200 acres of innovation, learning, service and sustainable living — the JagKalyan Holistic Mission made physical.",
};

const PRINCIPLES = [
  { title: "Green & Sustainable", body: "A campus that gives back more than it takes." },
  { title: "Smart Infrastructure", body: "Connectivity, mobility and digital backbone." },
  { title: "Education & Research", body: "Learning and innovation at the centre." },
  { title: "Industry & Enterprise", body: "Data, industry and entrepreneurship." },
  { title: "Service & Wellness", body: "Care and community as built form." },
  { title: "Premium Living", body: "Homes and hospitality for those who build." },
];

export default function WisdomParkPage() {
  return (
    <>
      <PageHero
        eyebrow="JagKalyan Wisdom Park"
        title={
          <>
            Two hundred acres
            <br />
            of <span className="text-aurum">innovation, learning,</span>
            <br />
            service and living.
          </>
        }
        lead="A university, a service garden, an industry park, data centres, a mandapam for culture and gathering, and homes for the people who build it all — on one continuous campus."
      >
        <SoonBadge />
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Master Plan"
          title="How the two hundred acres are held."
          lead="An indicative zoning of the campus. Final layouts, phasing and approvals will be published as the project progresses."
        />
        <Reveal delay={0.1}>
          <div className="mt-16">
            <MasterPlan />
          </div>
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Land Allocation"
          title="Every acre accounted for."
        />

        <div className="mt-14 overflow-hidden rounded-card border border-hairline">
          <table className="w-full text-left">
            <caption className="sr-only">
              JagKalyan Wisdom Park land allocation by zone
            </caption>
            <thead>
              <tr className="border-b border-hairline bg-space-raised">
                <th scope="col" className="eyebrow px-6 py-4 text-gold/70">
                  Zone
                </th>
                <th scope="col" className="eyebrow px-6 py-4 text-gold/70">
                  Purpose
                </th>
                <th
                  scope="col"
                  className="eyebrow px-6 py-4 text-right text-gold/70"
                >
                  Acres
                </th>
              </tr>
            </thead>
            <tbody>
              {WISDOM_PARK.zones.map((z) => (
                <tr
                  key={z.name}
                  className="border-b border-hairline/40 bg-space transition-colors duration-300 last:border-0 hover:bg-space-raised"
                >
                  <th
                    scope="row"
                    className="px-6 py-5 text-left text-sm font-normal text-starlight"
                  >
                    {z.name}
                  </th>
                  <td className="px-6 py-5 text-sm text-starlight-faint">
                    {z.note}
                  </td>
                  <td className="px-6 py-5 text-right font-mono text-sm text-gold">
                    {z.acres}
                  </td>
                </tr>
              ))}
              <tr className="bg-space-raised">
                <th
                  scope="row"
                  className="display px-6 py-6 text-left text-xl text-starlight"
                >
                  Total
                </th>
                <td />
                <td className="display px-6 py-6 text-right text-xl text-gold">
                  {WISDOM_PARK.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section variant="canvas">
        <SectionHeading
          variant="canvas"
          eyebrow="Design Principles"
          title="What the campus is built to be."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-card bg-canvas-border sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="h-full bg-canvas-raised p-8">
                <h3 className="display text-xl text-canvas-ink">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-canvas-muted">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 text-center">
            <ButtonLink
              href="/get-involved"
              className="!bg-verdant-deep !text-canvas hover:!bg-verdant-deep/90"
            >
              Partner on the campus
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
