import { Starfield } from "@/components/cosmic/starfield";
import { ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-void px-6 text-center">
      <Starfield density={0.8} />
      <div
        aria-hidden
        className="bloom left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(228,174,20,0.18), transparent)",
        }}
      />

      <div className="relative">
        <p className="display text-[clamp(5rem,18vw,12rem)] leading-none text-aurum">
          404
        </p>
        <h1 className="display mt-4 text-3xl text-starlight md:text-4xl">
          This path is not yet lit.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-starlight-dim">
          The page you are looking for does not exist, or is part of a module
          still being built.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/mission" variant="ghost">
            Explore the mission
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
