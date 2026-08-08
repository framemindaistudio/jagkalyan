import type { Metadata } from "next";
import Image from "next/image";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/layout/page-hero";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { FOUNDERS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Founders",
  description:
    "Prof. Jagadish Kalyandurgmath and Prof. Kavita Kalyandurgmath — the founders of the JagKalyan Holistic Mission.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Mission"
        title={
          <>
            The people who
            <br />
            <span className="text-aurum">carry it.</span>
          </>
        }
        lead="Seventy years of combined work in space research, enterprise technology, education and analytics — turned toward one question: what would it take for everyone to live well?"
      />

      <Section>
        <SectionHeading
          eyebrow="Founders"
          title="Two careers, one mission."
        />

        <div className="mt-16 space-y-6">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.08}>
              <article className="panel overflow-hidden p-8 md:p-12">
                <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
                  {/* Portrait, or a monogram when we have no photograph. */}
                  <div className="shrink-0">
                    {f.photo ? (
                      <div className="relative h-32 w-32 overflow-hidden rounded-full border border-hairline bg-space-raised">
                        <Image
                          src={f.photo}
                          alt={f.name}
                          fill
                          sizes="128px"
                          className="object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex h-32 w-32 items-center justify-center rounded-full border border-hairline"
                        style={{
                          background:
                            "radial-gradient(circle at 35% 30%, rgba(228,174,20,0.18), rgba(7,11,20,0.9))",
                        }}
                      >
                        <span className="display text-4xl text-gold">
                          {f.name
                            .replace(/^Prof\.\s*/, "")
                            .split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="display text-3xl leading-tight text-starlight md:text-4xl">
                      {f.name}
                    </h2>
                    <p className="eyebrow mt-3 text-gold/70">{f.role}</p>
                    <p className="mt-5 max-w-2xl leading-relaxed text-starlight-dim">
                      {f.summary}
                    </p>

                    <ul className="mt-8 space-y-3.5">
                      {f.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3.5">
                          <span
                            aria-hidden
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70"
                          />
                          <span className="text-sm leading-relaxed text-starlight-dim">
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 border-t border-hairline/50 pt-6">
                      <p className="eyebrow text-starlight-faint">Education</p>
                      <p className="mt-2.5 text-sm leading-relaxed text-starlight-faint">
                        {f.education}
                      </p>
                    </div>

                    {f.affiliations && (
                      <div className="mt-8 border-t border-hairline/50 pt-6">
                        <p className="eyebrow text-starlight-faint">
                          Current positions
                        </p>
                        <ul className="mt-4 space-y-3.5">
                          {f.affiliations.map((a) => (
                            <li
                              key={a.org + a.role}
                              className="flex flex-col gap-1 border-l border-hairline/60 pl-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                            >
                              <span>
                                <span className="text-sm text-starlight">
                                  {a.role}
                                </span>
                                <span className="text-sm text-starlight-faint">
                                  {" · "}
                                  {a.url ? (
                                    <a
                                      href={a.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="transition-colors hover:text-gold"
                                    >
                                      {a.org}
                                    </a>
                                  ) : (
                                    a.org
                                  )}
                                </span>
                              </span>
                              <span className="shrink-0 font-mono text-[0.7rem] text-gold/70">
                                {a.years}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {f.linkedin && (
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm text-starlight-dim transition-colors hover:border-gold hover:text-gold"
                      >
                        <LinkedinLogo size={16} weight="fill" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section variant="canvas" className="text-center">
        <SectionHeading
          variant="canvas"
          align="center"
          eyebrow="Our Vision"
          title={SITE.vision}
        />
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href="/global-impact"
              className="!bg-verdant-deep !text-canvas hover:!bg-verdant-deep/90"
            >
              Global impact &amp; legacy
            </ButtonLink>
            <ButtonLink
              href="/journey"
              variant="ghost"
              className="!border-canvas-border !text-canvas-ink hover:!border-verdant-deep hover:!text-verdant-deep"
            >
              The journey
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
