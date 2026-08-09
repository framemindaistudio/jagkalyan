import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { BoardGallery } from "@/components/sections/board-gallery";
import { GLOBAL, HOLISTIC, NATURE_CHARTER, PILLARS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Mission",
  description:
    "Build Self, Build Society, Build Nation, Build Humanity — the four movements of the JagKalyan Holistic Mission.",
};

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="The JagKalyan Holistic Mission"
        title={
          <>
            Build Self. Build Society.
            <br />
            Build Nation. <span className="text-aurum">Build Humanity.</span>
          </>
        }
        lead={SITE.vision}
      />

      {/* The four movements */}
      <Section>
        <SectionHeading
          eyebrow="The Four Movements"
          title="A sequence, not a menu."
          lead="Each stage makes the next one possible. This is why the mission always begins with the individual — nothing built on an unbuilt self holds."
        />

        <div className="mt-16 space-y-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <article
                id={p.id}
                className="panel panel-hover grid gap-6 p-8 md:grid-cols-[auto_1fr] md:gap-10 md:p-12"
                style={{ scrollMarginTop: "6rem" }}
              >
                <span className="display text-5xl text-gold/25 md:text-7xl">
                  0{i + 1}
                </span>
                <div>
                  <h2 className="display text-3xl text-starlight md:text-5xl">
                    {p.title}
                  </h2>
                  <p className="eyebrow mt-4 text-gold/60">{p.sub}</p>
                  <p className="mt-5 max-w-2xl leading-relaxed text-starlight-dim">
                    {p.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Holistic framework */}
      <Section id="holistic" variant="canvas">
        <SectionHeading
          variant="canvas"
          eyebrow="Holistic"
          title="Education. Wellness. Welfare. Wealth."
          lead="Treated as one system rather than four departments — because in a real life they have never been separable."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-card bg-canvas-border sm:grid-cols-2 lg:grid-cols-4">
          {HOLISTIC.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <div className="h-full bg-canvas-raised p-8">
                <h3 className="display text-2xl text-canvas-ink">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-canvas-muted">
                  {d.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Global movement */}
      <Section id="global">
        <SectionHeading
          eyebrow="The Global Movement"
          title="Citizens for humanity. Religions for humanity. Nations for humanity."
          lead={SITE.creed}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {GLOBAL.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <div className="h-full bg-space p-8 transition-colors duration-500 hover:bg-space-raised">
                <h3 className="display text-2xl text-starlight">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-starlight-faint">
                  {d.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Nature charter */}
      <Section id="nature" variant="canvas">
        <SectionHeading
          variant="canvas"
          eyebrow="The Nature Charter"
          title="Every breath is a blessing of the elements."
          lead="Plants, water, air, space and earth. The mission's environmental commitment, stated plainly."
        />
        <div className="mt-14 space-y-px overflow-hidden rounded-card bg-canvas-border">
          {NATURE_CHARTER.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.05}>
              <div className="flex flex-wrap items-baseline justify-between gap-4 bg-canvas-raised px-8 py-6">
                <h3 className="display text-xl text-canvas-ink md:text-2xl">
                  {n.title}
                </h3>
                <div className="flex items-baseline gap-4">
                  {n.note && (
                    <p className="text-xs italic text-canvas-muted">{n.note}</p>
                  )}
                  <span className="eyebrow text-verdant-deep/70">
                    {n.element}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="display mt-12 text-center text-2xl text-verdant-deep md:text-3xl">
            Our every breath is a blessing of plants, water, air, space and earth
            — all elements of nature.
          </p>
        </Reveal>
      </Section>

      <Section>
        <BoardGallery
          boards={[
            {
              src: "/boards/mission-ecosystem-poster.webp",
              alt: "JagKalyan Holistic Mission poster — cosmic energy and nature elements, the six mission values, the ecosystem of Mandapam, Matha University, Gurukuls, Seva Park and Udyog Park, the global movement, and the four JagKalyan entities.",
              caption:
                "JagKalyan Holistic Mission — mission, ecosystem, global movement and entities.",
            },
            {
              src: "/boards/mission-cosmic-ecosystem.webp",
              alt: "JagKalyan Holistic Mission — cosmic energy and nature elements, mission values, ecosystem and the global movement for one humanity, one planet and universal well-being.",
              caption: "Cosmic energy and the elements of nature, held in one mission.",
            },
            {
              src: "/boards/mission-one-humanity.webp",
              alt: "JagKalyan Holistic Mission — one humanity, one planet, universal well-being, illustrated as a global gathering.",
              caption: "One Humanity · One Planet · Universal Well-being.",
            },
          ]}
        />
      </Section>

      <Section className="text-center">
        <SectionHeading
          align="center"
          eyebrow="Walk with us"
          title="The mission needs hands, not only agreement."
        />
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/get-involved">Get involved</ButtonLink>
            <ButtonLink href="/journey" variant="ghost">
              The founder&apos;s journey
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
