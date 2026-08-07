import { Starfield } from "@/components/cosmic/starfield";
import { Reveal } from "@/components/ui/primitives";

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
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="grain relative flex min-h-[68vh] items-end overflow-hidden bg-void px-5 pb-20 pt-40 md:px-8 md:pb-28 md:pt-48">
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

      <div className="relative mx-auto w-full max-w-[80rem]">
        <Reveal>
          <p className="eyebrow text-gold/75">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="display mt-5 max-w-4xl text-[clamp(2.6rem,7.5vw,6rem)] text-starlight">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-starlight-dim md:text-lg">
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
