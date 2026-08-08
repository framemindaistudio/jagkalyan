import { cn } from "@/lib/cn";

/**
 * The JagKalyan mark, rebuilt as vector.
 *
 * Reading of the client's logo: a closed circle (the world / wholeness) formed
 * by a leaf-bearing branch on one side and a smooth arc on the other; at its
 * centre a human figure with arms raised — the individual standing awake
 * inside nature, which is the whole thesis of the mission.
 *
 * Drawn rather than traced so it stays crisp at every size and can be tinted
 * by context (gold on Stage, forest green on Canvas).
 */
export function Mark({
  className,
  title = "JagKalyan",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
      className={cn("h-9 w-9", className)}
    >
      {/* Outer ring: the world, drawn as two arcs that never quite close —
          the mission is ongoing, not finished. */}
      <path
        d="M32 4a28 28 0 0 1 25.6 39.4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M52 55.6A28 28 0 1 1 20.2 8.4"
        stroke="var(--color-verdant)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Leaves on the living side of the ring. */}
      <path
        d="M18.5 24c-4.6-1.4-8.6 1-9.8 5.6 4.6 1.4 8.6-1 9.8-5.6Z"
        fill="var(--color-verdant)"
        opacity="0.9"
      />
      <path
        d="M16.8 35.4c-4.8.2-7.8 3.6-7.6 8.4 4.8-.2 7.8-3.6 7.6-8.4Z"
        fill="var(--color-verdant-bright)"
        opacity="0.75"
      />

      {/* The figure: head, and a body whose arms rise into an open V. */}
      <circle cx="32" cy="22.5" r="4.6" fill="currentColor" />
      <path
        d="M32 29c-1.9 0-3.4 1.3-3.8 3.1l-1.5 6.6a2 2 0 0 0 3.7 1.2L32 44.8l1.6-4.9a2 2 0 0 0 3.7-1.2l-1.5-6.6C35.4 30.3 33.9 29 32 29Z"
        fill="currentColor"
      />
      <path
        d="M27 32.6 21.4 27M37 32.6 42.6 27"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Legs, grounded. */}
      <path
        d="M30.4 43.8 27.6 52M33.6 43.8 36.4 52"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Full lockup: mark plus wordmark. */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Mark className="h-9 w-9 shrink-0 text-gold" />
      <span className="flex flex-col leading-none">
        <span className="display text-[1.35rem] tracking-tight text-starlight">
          JagKalyan
        </span>
        {!compact && (
          <span className="eyebrow mt-1 text-[0.7rem] text-gold/70">
            Holistic Mission
          </span>
        )}
      </span>
    </span>
  );
}
