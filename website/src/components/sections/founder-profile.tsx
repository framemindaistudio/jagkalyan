"use client";

import { LinkedinLogo } from "@phosphor-icons/react";
import { FOUNDER_PROFILE, JAGADISH_AFFILIATIONS } from "@/lib/site";
import { Reveal, Section, SectionHeading } from "@/components/ui/primitives";

/**
 * The founder's standing profile, closing the Journey.
 *
 * This is the content that used to live on a separate Founders page. It
 * belongs here: the route already tells his story stop by stop, and the
 * education, honours and current positions are the same story summarised.
 * A second page repeating it just split the reader's attention.
 */
export function FounderProfile() {
  return (
    <Section variant="canvas" id="profile">
      <SectionHeading
        variant="canvas"
        eyebrow={`${FOUNDER_PROFILE.experience} · ${FOUNDER_PROFILE.name}`}
        title="The whole of it, in one place."
        lead={FOUNDER_PROFILE.titles}
      />

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-canvas-muted md:text-lg">
          {FOUNDER_PROFILE.summary}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_1fr]">
        {/* Current positions */}
        <div>
          <Reveal>
            <p className="eyebrow border-b border-canvas-border pb-4 text-verdant-deep/70">
              Current positions
            </p>
          </Reveal>
          <ul className="mt-1">
            {JAGADISH_AFFILIATIONS.map((a, i) => (
              <Reveal key={a.org + a.role} delay={i * 0.035}>
                <li className="flex flex-col gap-1 border-b border-canvas-border/60 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span>
                    <span className="text-sm font-medium text-canvas-ink">
                      {a.role}
                    </span>
                    <span className="text-sm text-canvas-muted">
                      {" · "}
                      {a.url ? (
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-canvas-border underline-offset-4 transition-colors hover:text-verdant-deep"
                        >
                          {a.org}
                        </a>
                      ) : (
                        a.org
                      )}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[0.72rem] text-verdant-deep/70">
                    {a.years}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="space-y-12">
          {/* Education */}
          <div>
            <Reveal>
              <p className="eyebrow border-b border-canvas-border pb-4 text-verdant-deep/70">
                Education
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <ul className="mt-5 flex flex-wrap gap-2">
                {FOUNDER_PROFILE.education.map((e) => (
                  <li
                    key={e}
                    className="rounded-full border border-canvas-border bg-canvas-raised px-4 py-2 text-xs text-canvas-ink"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Honours */}
          <div>
            <Reveal>
              <p className="eyebrow border-b border-canvas-border pb-4 text-verdant-deep/70">
                Honours &amp; awards
              </p>
            </Reveal>
            <ul className="mt-5 space-y-3">
              {FOUNDER_PROFILE.honours.map((h, i) => (
                <Reveal key={h} delay={i * 0.04}>
                  <li className="flex items-start gap-3 text-sm leading-relaxed text-canvas-muted">
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-verdant-deep"
                    />
                    {h}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
            <a
              href={FOUNDER_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-canvas-border px-5 text-sm text-canvas-ink transition-colors hover:border-verdant-deep hover:text-verdant-deep"
            >
              <LinkedinLogo size={16} weight="fill" />
              LinkedIn
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
