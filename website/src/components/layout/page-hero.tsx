import { Starfield } from "@/components/cosmic/starfield";
import { Reveal } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * The opening block of every inner page. Keeps the cosmic register going
 * after the homepage without re-running the full pinned sequence — a short
 * held shot rather than another set piece.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  backdrop,
  tall = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  /** Decorative layer behind the copy — e.g. the founder portrait. */
  backdrop?: React.ReactNode;
  /** Gives a backdrop room to breathe. */
  tall?: boolean;
}) {
  return (
    <header
      className={cn(
        "grain relative flex overflow-hidden bg-void px-5 md:px-8",
        /*
          With a backdrop, phones stack: copy at the top, artwork in a band
          along the bottom.

          The invariant that keeps them apart: the band is bottom-anchored
          and 40vh tall, and the hero's height is (copy + this padding), so
          the band's top edge sits at copy-bottom + padding − 40vh. Any
          padding greater than 40vh therefore clears the copy at *any* copy
          length or screen width. 48vh leaves 8vh of breathing room — do not
          drop it below 40vh or they will collide again on narrow screens
          where the copy wraps longer.

          From sm the artwork moves beside the copy and the normal
          bottom-aligned hero returns.
        */
        backdrop
          ? "items-start pb-[48vh] pt-32 sm:items-end sm:pb-20 sm:pt-40 md:pb-28 md:pt-48"
          : "items-end pb-20 pt-40 md:pb-28 md:pt-48",
        tall ? "min-h-[86vh]" : "min-h-[68vh]",
      )}
    >
      <Starfield density={0.7} />

      <div
        aria-hidden
        className="bloom -right-40 top-[-20%] h-[40rem] w-[40rem]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(14,74,18,0.55), transparent)",
        }}
      />
      <div
        aria-hidden
        className="bloom -left-52 bottom-[-40%] h-[42rem] w-[42rem]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(228,174,20,0.18), transparent)",
        }}
      />

      {backdrop}

      <div className="relative mx-auto w-full max-w-[80rem]">
        <Reveal>
          <p className="eyebrow text-gold/75">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          {/* With a backdrop present the copy is held narrower and the
              display size capped, so the headline always lands on clean
              space rather than running across the artwork. */}
          <h1
            className={cn(
              "display mt-5 text-starlight",
              backdrop
                ? "max-w-3xl text-[clamp(2.4rem,6vw,4.6rem)]"
                : "max-w-4xl text-[clamp(2.6rem,7.5vw,6rem)]",
            )}
          >
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.12}>
            <p
              className={cn(
                "mt-7 text-base leading-relaxed text-starlight-dim md:text-lg",
                backdrop ? "max-w-xl" : "max-w-2xl",
              )}
            >
              {lead}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.18}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent" />
    </header>
  );
}
