"use client";

import { cn } from "@/lib/cn";

/**
 * The Earth.
 *
 * Built entirely from gradients and blurred shapes rather than a texture map
 * or a WebGL globe. Three reasons: it ships tonight, it costs nothing on
 * mobile, and a stylised Earth sits better inside a "godly / cosmic" brand
 * than a photographic one would — this is the Earth as a symbol, not a
 * satellite photo.
 *
 * Layer order (back to front) matters and is the whole trick:
 *   1. atmospheric halo   — the planet's light escaping
 *   2. sphere body        — ocean gradient, lit from the upper-left
 *   3. landmass drift     — slow-rotating blurred green forms
 *   4. terminator shadow  — the night side, which gives it roundness
 *   5. rim light          — a thin gold crescent; the single detail that
 *                           makes it read as lit by a sun rather than flat
 */
export function EarthCss({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square", className)} aria-hidden>
      {/* 1. Atmosphere */}
      <div
        className="absolute -inset-[18%] rounded-full blur-3xl animate-breathe"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(78,163,85,0.30) 0%, rgba(56,132,204,0.22) 42%, transparent 70%)",
        }}
      />
      <div
        className="absolute -inset-[4%] rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(circle at 38% 32%, rgba(150,220,255,0.30), transparent 62%)",
        }}
      />

      {/* 2. Sphere */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 34% 28%, #2f6ea8 0%, #1b4470 34%, #0d2440 66%, #050f1e 100%)",
          boxShadow:
            "inset -22px -22px 60px rgba(0,0,0,0.75), inset 12px 12px 44px rgba(120,190,255,0.16)",
        }}
      >
        {/* 3. Landmasses — one slowly rotating layer of soft green forms.
               Deliberately not map-accurate; it reads as continents in
               motion, which is what the scene needs. */}
        <div className="absolute inset-[-25%] animate-drift">
          <Landmass className="left-[34%] top-[26%] h-[26%] w-[30%] rotate-[18deg]" />
          <Landmass className="left-[54%] top-[44%] h-[30%] w-[22%] -rotate-[12deg]" />
          <Landmass className="left-[26%] top-[54%] h-[22%] w-[26%] rotate-[38deg]" />
          <Landmass className="left-[62%] top-[22%] h-[16%] w-[18%] -rotate-[26deg]" />
          <Landmass className="left-[18%] top-[38%] h-[14%] w-[14%]" />
        </div>

        {/* Cloud veil, drifting the other way for a sense of two systems. */}
        <div className="absolute inset-[-20%] animate-drift-reverse opacity-[0.22]">
          <div className="absolute left-[30%] top-[34%] h-[16%] w-[42%] rounded-full bg-white blur-2xl" />
          <div className="absolute left-[48%] top-[58%] h-[12%] w-[34%] rounded-full bg-white blur-2xl" />
          <div className="absolute left-[22%] top-[66%] h-[10%] w-[28%] rounded-full bg-white blur-xl" />
        </div>

        {/* 4. Terminator — the night side. */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 24%, transparent 32%, rgba(2,4,10,0.42) 62%, rgba(2,4,10,0.88) 100%)",
          }}
        />
      </div>

      {/* 5. Rim light */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 210deg at 50% 50%, transparent 0deg, rgba(228,174,20,0.55) 44deg, rgba(247,207,90,0.75) 66deg, rgba(228,174,20,0.40) 88deg, transparent 132deg)",
          mask: "radial-gradient(circle, transparent 0%, transparent 93%, #000 95%, #000 100%)",
          WebkitMask:
            "radial-gradient(circle, transparent 0%, transparent 93%, #000 95%, #000 100%)",
        }}
      />
    </div>
  );
}

function Landmass({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute rounded-[46%] blur-[6px]", className)}
      style={{
        background:
          "linear-gradient(140deg, rgba(110,190,116,0.92), rgba(46,120,60,0.86) 55%, rgba(28,80,42,0.78))",
      }}
    />
  );
}
