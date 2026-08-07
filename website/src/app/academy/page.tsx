import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
  SoonBadge,
} from "@/components/ui/primitives";
import { ACADEMY } from "@/lib/site";

export const metadata: Metadata = {
  title: "JagKalyan Academy",
  description:
    "Nine shalas of holistic learning — JK Coach, Swasthashala, Swadharmashala, Swadeshshala, Arogyashala, GeoAI, AI, Automotion and CXO Academies.",
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow="JagKalyan Academy"
        title={
          <>
            Nine schools,
            <br />
            <span className="text-aurum">one education.</span>
          </>
        }
        lead="A shala for each part of a whole person — health, purpose, service to the nation, healing, and the technologies that will shape the next century."
      />

      <Section>
        <SectionHeading
          eyebrow="The Shalas"
          title="What the Academy teaches."
          lead="Each school opens in its own time. Programmes, curricula, faculty and enrolment will be published here as they are ready."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ACADEMY.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.05}>
              <article className="panel panel-hover flex h-full flex-col p-8">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="display text-2xl leading-tight text-starlight">
                    {a.name}
                  </h2>
                  <SoonBadge />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-starlight-faint">
                  {a.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section variant="canvas" className="text-center">
        <SectionHeading
          variant="canvas"
          align="center"
          eyebrow="Enrolment"
          title="Registration opens soon."
          lead="Students, faculty, mentors and researchers will each receive a JagKalyan Unique ID on registration, carrying their record across every school of the Academy."
        />
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href="/get-involved/register"
              className="!bg-verdant-deep !text-canvas hover:!bg-verdant-deep/90"
            >
              Register your interest
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
