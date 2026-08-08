"use client";

import { motion } from "motion/react";
import { EXPANSION } from "@/lib/site";
import { Reveal, Section, SectionHeading } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * The expansion network, drawn as a constellation rather than a map.
 *
 * A real geographic map would need an accurate projection, would be
 * unreadable at phone width, and would invite questions the plan cannot yet
 * answer — exact sites, exact dates. A phased constellation says precisely
 * what is known: one proven hub, then Indian cities, then three regions
 * abroad, connected as one network.
 *
 * Each phase lights up in sequence as it enters view, so the rollout reads
 * as something that unfolds rather than a list of places.
 */
export function ExpansionMap() {
  return (
    <Section id="expansion">
      <SectionHeading
        eyebrow="Global Expansion"
        title="One connected wellness network."
        lead="Not a chain of franchises — a single system that learns in one city and carries what it learns to the next."
      />

      <div className="mt-16 space-y-5">
        {EXPANSION.map((phase, pi) => (
          <Reveal key={phase.phase} delay={pi * 0.08}>
            <article className="panel relative overflow-hidden p-8 md:p-10">
              {/* Connecting thread, drawn left to right as the phase lands. */}
              <motion.div
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{
                  duration: 1.2,
                  delay: 0.15 + pi * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-gold via-verdant to-transparent"
              />

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="font-mono text-xs text-gold">
                  {phase.phase}
                </span>
                <h3 className="display text-2xl text-starlight md:text-3xl">
                  {phase.label}
                </h3>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-starlight-dim">
                {phase.blurb}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2.5">
                {phase.nodes.map((node, ni) => (
                  <motion.li
                    key={node.city}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.5,
                      delay: 0.25 + pi * 0.1 + ni * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={cn(
                      "flex items-center gap-2.5 rounded-full border px-4 py-2.5",
                      node.hub
                        ? "border-gold/50 bg-gold/10"
                        : "border-hairline bg-space-raised/60",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        node.hub ? "bg-gold" : "bg-verdant",
                      )}
                      style={
                        node.hub
                          ? { boxShadow: "0 0 12px 3px rgba(228,174,20,0.6)" }
                          : undefined
                      }
                    />
                    <span
                      className={cn(
                        "text-sm",
                        node.hub ? "text-gold" : "text-starlight-dim",
                      )}
                    >
                      {node.city}
                    </span>
                    {node.note && (
                      <span className="text-[0.62rem] uppercase tracking-[0.12em] text-starlight-faint">
                        {node.note}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-8 text-center text-xs text-starlight-faint">
          Phasing and locations are indicative and subject to partnership,
          approvals and site selection.
        </p>
      </Reveal>
    </Section>
  );
}
