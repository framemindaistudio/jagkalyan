"use client";

import { motion } from "motion/react";
import { WISDOM_CITY } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * JagKalyan Wisdom City — indicative master plan, rebuilt as layout rather
 * than an image.
 *
 * The client supplied a rendered aerial view. Reproducing that as a picture
 * would be flat, unreadable on a phone, and impossible to update. Drawn as
 * a grid it stays crisp, reads at every size, is navigable by keyboard and
 * screen reader, and each zone becomes a real element we can later link to
 * a project page.
 *
 * Zone positions echo the supplied plan: the Gurukul and Arogyashala at the
 * heart, university and data centres north, industry west, service and
 * living east, sport south-east, farmland and plantations south-west, and
 * the entrance road along the bottom.
 *
 * On phones the grid collapses to a single readable column — a fifteen-zone
 * plan at 375px is a diagram nobody can use.
 */

type Tone = "gold" | "verdant" | "azure" | "violet" | "slate" | "earth";

const AREA: Record<string, { area: string; tone: Tone }> = {
  "Skills University": { area: "uni", tone: "violet" },
  "Data Centres Park & AI Hub": { area: "data", tone: "azure" },
  "Seva Park": { area: "seva", tone: "verdant" },
  "Udyog Park": { area: "udyog", tone: "earth" },
  Gurukul: { area: "guru", tone: "gold" },
  "Arogyashala Wellness Centre": { area: "arogya", tone: "verdant" },
  "Ikigai Centre": { area: "ikigai", tone: "violet" },
  "Sports Complex": { area: "complex", tone: "azure" },
  "Sports Stadium": { area: "stadium", tone: "slate" },
  "Eco Living / Family Community": { area: "eco", tone: "verdant" },
  "Living Community / Senior Living": { area: "living", tone: "slate" },
  "Organic Farming & Food Park": { area: "farm", tone: "verdant" },
  "Diverse Plantations": { area: "plant", tone: "verdant" },
  "Water Conservation & Biodiversity": { area: "water", tone: "azure" },
  "Roads, Utilities & Mobility": { area: "roads", tone: "slate" },
};

const TONE: Record<Tone, { bg: string; border: string; text: string }> = {
  gold: {
    bg: "linear-gradient(150deg, rgba(228,174,20,0.26), rgba(228,174,20,0.08))",
    border: "rgba(228,174,20,0.45)",
    text: "text-gold",
  },
  verdant: {
    bg: "linear-gradient(150deg, rgba(78,163,85,0.24), rgba(14,74,18,0.10))",
    border: "rgba(78,163,85,0.38)",
    text: "text-verdant-bright",
  },
  azure: {
    bg: "linear-gradient(150deg, rgba(96,165,220,0.22), rgba(30,70,120,0.10))",
    border: "rgba(127,184,230,0.36)",
    text: "text-[#9ecbf0]",
  },
  violet: {
    bg: "linear-gradient(150deg, rgba(160,120,220,0.22), rgba(70,45,120,0.10))",
    border: "rgba(176,140,224,0.36)",
    text: "text-[#c4a6ef]",
  },
  earth: {
    bg: "linear-gradient(150deg, rgba(190,140,80,0.20), rgba(90,60,30,0.10))",
    border: "rgba(200,150,90,0.32)",
    text: "text-[#e0b880]",
  },
  slate: {
    bg: "linear-gradient(150deg, rgba(168,176,194,0.13), rgba(19,27,46,0.30))",
    border: "rgba(168,176,194,0.20)",
    text: "text-starlight-dim",
  },
};

const AREAS = `
  "uni    uni    data   data   seva   seva"
  "udyog  udyog  guru   guru   eco    eco"
  "udyog  udyog  arogya ikigai living living"
  "farm   farm   water  water  complex complex"
  "plant  plant  roads  roads  stadium stadium"
`;

export function MasterPlan() {
  return (
    <figure>
      {/* Plan view — tablet and up. Fifteen zones cannot be read at 375px. */}
      <div
        className="relative hidden aspect-[16/11] w-full gap-2 rounded-card border border-hairline bg-space/60 p-2 sm:grid"
        style={{
          gridTemplateAreas: AREAS,
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(5, 1fr)",
        }}
      >
        {WISDOM_CITY.zones.map((zone, i) => {
          const meta = AREA[zone.name];
          if (!meta) return null;
          const tone = TONE[meta.tone];
          return (
            <motion.div
              key={zone.name}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                gridArea: meta.area,
                background: tone.bg,
                borderColor: tone.border,
              }}
              className="flex flex-col justify-between overflow-hidden rounded-xl border p-3 transition-transform duration-500 hover:scale-[1.02] lg:p-4"
            >
              <h3
                className={cn(
                  "text-[clamp(0.6rem,1.1vw,0.9rem)] font-medium leading-tight",
                  tone.text,
                )}
              >
                {zone.name}
              </h3>
              <p className="font-mono text-[clamp(0.55rem,0.95vw,0.78rem)] text-starlight-faint">
                {zone.acres} ac
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Phone — the same zones as a legible ranked list. */}
      <ul className="space-y-2 sm:hidden">
        {WISDOM_CITY.zones.map((zone, i) => {
          const meta = AREA[zone.name];
          const tone = TONE[meta?.tone ?? "slate"];
          return (
            <motion.li
              key={zone.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.03 }}
              style={{ background: tone.bg, borderColor: tone.border }}
              className="flex items-center justify-between gap-4 rounded-xl border px-4 py-3.5"
            >
              <span className={cn("text-sm leading-snug", tone.text)}>
                {zone.name}
              </span>
              <span className="shrink-0 font-mono text-xs text-starlight-faint">
                {zone.acres} ac
              </span>
            </motion.li>
          );
        })}
      </ul>

      <figcaption className="mt-5 text-center text-xs leading-relaxed text-starlight-faint">
        Indicative zoning of {WISDOM_CITY.name}. Not to scale; layouts,
        phasing and areas subject to final planning and approvals.
      </figcaption>
    </figure>
  );
}
