"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * JagKalyan Wisdom Park — indicative master plan, rebuilt as layout rather
 * than an image.
 *
 * The client supplied a rendered aerial view. Reproducing that as a picture
 * would have been flat, unreadable on a phone, and impossible to update.
 * Drawn as a CSS grid instead, it stays crisp, reads at every size, is
 * navigable by keyboard and screen reader, and each zone becomes a real
 * element we can link to a project page later.
 *
 * Zone positions mirror the supplied plan: the Mandapam at the heart, the
 * university and data centres north, service and industry flanking, living
 * quarters east and south, transport at the entrance.
 */

interface Zone {
  area: string;
  name: string;
  acres: number;
  tone: "gold" | "verdant" | "azure" | "slate" | "violet";
}

const ZONES: Zone[] = [
  { area: "uni", name: "Skills University", acres: 40, tone: "azure" },
  { area: "data", name: "Data Centres", acres: 25, tone: "slate" },
  { area: "seva", name: "Seva Udyan", acres: 30, tone: "verdant" },
  { area: "mand", name: "Mandapam", acres: 10, tone: "gold" },
  { area: "udyo", name: "Udyog Udyan", acres: 30, tone: "violet" },
  { area: "apar", name: "Apartments", acres: 20, tone: "slate" },
  { area: "amen", name: "Amenities & Recreation", acres: 20, tone: "verdant" },
  { area: "bung", name: "Bunglows", acres: 25, tone: "slate" },
  { area: "park", name: "Parking & Transport Hub", acres: 15, tone: "slate" },
  { area: "serv", name: "Serviced Apartments", acres: 10, tone: "slate" },
];

const TONE: Record<Zone["tone"], { bg: string; border: string; text: string }> = {
  gold: {
    bg: "linear-gradient(150deg, rgba(228,174,20,0.26), rgba(228,174,20,0.09))",
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
  slate: {
    bg: "linear-gradient(150deg, rgba(168,176,194,0.13), rgba(19,27,46,0.30))",
    border: "rgba(168,176,194,0.20)",
    text: "text-starlight-dim",
  },
};

const AREAS = `
  "uni  uni  data data seva seva"
  "uni  uni  mand mand seva seva"
  "udyo udyo mand mand apar apar"
  "udyo udyo amen amen bung bung"
  "park park park serv serv serv"
`;

export function MasterPlan() {
  return (
    <figure>
      <div
        className="relative grid aspect-[4/3] w-full gap-1.5 rounded-card border border-hairline bg-space/60 p-1.5 md:aspect-[16/10] md:gap-2 md:p-2"
        style={{
          gridTemplateAreas: AREAS,
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(5, 1fr)",
        }}
      >
        {ZONES.map((zone, i) => {
          const tone = TONE[zone.tone];
          return (
            <motion.div
              key={zone.area}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                gridArea: zone.area,
                background: tone.bg,
                borderColor: tone.border,
              }}
              className="group flex flex-col justify-between overflow-hidden rounded-lg border p-2.5 transition-transform duration-500 hover:scale-[1.02] md:rounded-xl md:p-4"
            >
              <h3
                className={cn(
                  "text-[clamp(0.58rem,1.35vw,0.95rem)] font-medium leading-tight",
                  tone.text,
                )}
              >
                {zone.name}
              </h3>
              <p className="font-mono text-[clamp(0.55rem,1.15vw,0.8rem)] text-starlight-faint">
                {zone.acres} ac
              </p>
            </motion.div>
          );
        })}
      </div>

      <figcaption className="mt-5 text-center text-xs text-starlight-faint">
        Indicative zoning of JagKalyan Wisdom Park — 200 acres. Not to scale;
        layouts and phasing subject to final planning and approvals.
      </figcaption>
    </figure>
  );
}
