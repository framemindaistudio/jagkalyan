import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * An entity's mark, or a monogram standing in for one.
 *
 * Only some of the ecosystem has artwork — six real logos across eleven
 * entities and associates. A grid where half the cards carry a logo and
 * half carry nothing reads as broken, so the rest get a monogram built
 * from their initials in the same footprint. Every card then looks
 * deliberate, and dropping a real logo in later is a one-line change.
 *
 * The logos are the client's own files with their backgrounds flood-filled
 * to alpha, so they sit on the dark theme without a white plate behind
 * them. Several were authored for print on white and carry dark fine
 * print; they are given a faint light plate to keep that legible without
 * reintroducing a hard rectangle.
 */
export function EntityMark({
  name,
  logo,
  className,
}: {
  name: string;
  logo?: string;
  className?: string;
}) {
  const initials = name
    .replace(/^(JagKalyan|Shree|JK)\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .filter((c) => /[A-Za-z]/.test(c))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (logo) {
    return (
      /*
        Height-driven rather than a fixed square. The marks are a mix of
        roughly square badges and 4:1 wordmarks; forcing the wide ones into
        a 64px square shrank them to about 15px tall and unreadable. Fixing
        the height and letting width follow keeps every mark the same
        optical weight, which is what actually makes a logo row look even.
      */
      <div
        className={cn(
          "relative flex h-16 w-auto min-w-16 max-w-[8.5rem] shrink-0 items-center justify-center rounded-2xl border border-hairline bg-starlight/[0.06] px-2.5 py-2",
          className,
        )}
      >
        <Image
          src={logo}
          alt={`${name} logo`}
          width={220}
          height={64}
          sizes="140px"
          className="h-full w-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-hairline",
        className,
      )}
      style={{
        background:
          "radial-gradient(circle at 34% 28%, rgba(228,174,20,0.16), rgba(7,11,20,0.9))",
      }}
    >
      <span className="display text-xl text-gold/80">{initials}</span>
    </div>
  );
}
