import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { JourneyPath } from "@/components/sections/journey-path";
import { FounderPortrait } from "@/components/sections/founder-portrait";
import { FounderProfile } from "@/components/sections/founder-profile";
import { BoardGallery } from "@/components/sections/board-gallery";
import { JOURNEY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Journey",
  description:
    "Dr. Jagdish Kalyandurgmath — from Build Self and Build Family through Build Society and Build Organisations, to Nation Building and Humanity Building missions. 1967 to 2026.",
};

export default function JourneyPage() {
  const first = JOURNEY[0].years.slice(0, 4);
  const last = JOURNEY[JOURNEY.length - 1].years.slice(0, 4);

  return (
    <>
      <PageHero
        tall
        backdrop={<FounderPortrait />}
        eyebrow="Dr. Jagdish Kalyandurgmath"
        title={
          <>
            From building the self
            <br />
            to <span className="text-aurum">building humanity.</span>
          </>
        }
        lead="Build Self · Build Family · Build Society · Build Organisations · Nation Building Missions · Humanity Building Missions."
      >
        {/* Copy is capped short of the portrait so the two never fight. */}
        <div className="flex max-w-xl flex-wrap items-center gap-x-10 gap-y-5">
          <Stat value={`${first}–${last}`} label="The route" />
          <Stat value={String(JOURNEY.length)} label="Waypoints" />
          <Stat value="4" label="Sectors" />
        </div>

        <p className="display mt-10 text-2xl text-gold/90">
          {SITE.founder.creed}
        </p>
        <p className="eyebrow mt-3 text-starlight-faint">
          {SITE.founder.mantra}
        </p>
      </PageHero>

      <JourneyPath />

      <FounderProfile />

      <Section>
        <BoardGallery
          eyebrow="The journey, as the mission draws it"
          boards={[
            {
              src: "/boards/journey-nation-to-humanity.webp",
              alt: "From Nation Building Missions to Humanity Building Missions — the JagKalyan journey of Dr. Jagdish Kalyandurgmath, from space technology and national development through education and compassion.",
              caption:
                "From Nation Building Missions to Humanity Building Missions.",
            },
            {
              src: "/boards/journey-impact-of-mission.webp",
              alt: "Impact of the JagKalyan Holistic Mission — from Build Self to Humanity Building Missions, with the founder's timeline, the ecosystem entities and associates, and the multiplier impact.",
              caption:
                "Impact of the JagKalyan Holistic Mission — Build Self to Build Humanity.",
            },
            {
              src: "/boards/journey-founder-board.webp",
              alt: "JagKalyan Holistic Mission board featuring Dr. Jagdish Kalyandurgmath, the mission pillars and the ecosystem.",
              caption: "Dr. Jagdish Kalyandurgmath and the mission he built.",
            },
          ]}
        />
      </Section>

      {/* Back to Stage for the close — the profile above it is Canvas, and
          two reading-coloured sections in a row lose the rhythm. */}
      <Section className="text-center">
        <SectionHeading
          align="center"
          eyebrow="What the journey became"
          title="Positive energy attracts positive results."
          lead="Stronger individuals. Healthier families. Empowered communities. A developed nation. A harmonious world."
        />
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/ecosystem">Explore the ecosystem</ButtonLink>
            <ButtonLink href="/mission" variant="ghost">
              The mission today
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="display text-2xl text-starlight md:text-3xl">{value}</p>
      <p className="eyebrow mt-1.5 text-[0.7rem] text-gold/60">{label}</p>
    </div>
  );
}
