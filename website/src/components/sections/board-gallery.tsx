"use client";

import { PlanViewer, type Plan } from "./plan-viewer";
import { Reveal } from "@/components/ui/primitives";

/**
 * The client's own boards, closing a section.
 *
 * Placed at the END of the section they belong to, never at the top: the
 * page states the substance in text first — which is what reads on a phone
 * and what search engines index — and the original artwork follows as the
 * source of record.
 *
 * Each board reuses PlanViewer, so tapping one opens it pannable at a size
 * where its labels are actually readable. That matters more here than
 * anywhere else on the site: these are dense infographics, and inline at
 * 375px none of their fine print can be read.
 */
export function BoardGallery({
  eyebrow = "From the mission's own material",
  boards,
}: {
  eyebrow?: string;
  boards: Plan[];
}) {
  if (!boards.length) return null;

  return (
    <div className="mt-20">
      <Reveal>
        <p className="eyebrow border-b border-hairline pb-4 text-gold/70">
          {eyebrow}
        </p>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {boards.map((b, i) => (
          <Reveal key={b.src} delay={i * 0.06}>
            <PlanViewer plan={b} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
