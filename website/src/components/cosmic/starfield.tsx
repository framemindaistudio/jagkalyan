"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // depth 0..1 — drives size, brightness and parallax rate
  r: number;
  twinkle: number;
  phase: number;
  hue: string;
}

/**
 * The starfield the whole site sits on.
 *
 * Canvas rather than DOM nodes: we want 400+ stars at three parallax depths,
 * and that many absolutely-positioned divs janks badly on mid-range phones.
 *
 * Depth (`z`) does three jobs at once — near stars are bigger, brighter, and
 * travel further on scroll. That single variable is what sells the illusion
 * of actual distance rather than a flat texture.
 */
export function Starfield({
  density = 1,
  className,
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stars: Star[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale count to area so a phone doesn't render a desktop's worth.
      const count = Math.round((w * h) / 5200) * density;

      stars = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.35 + z * 1.5,
          twinkle: 0.4 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2,
          // Mostly white, with a scattering of gold and pale green so the
          // field belongs to this brand rather than being generic space.
          hue:
            Math.random() > 0.9
              ? "228, 174, 20"
              : Math.random() > 0.93
                ? "134, 217, 142"
                : "244, 241, 232",
        };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = scrollRef.current;

      for (const s of stars) {
        // Nearer stars drift further as you scroll — the parallax itself.
        const offset = scroll * (0.06 + s.z * 0.34);
        let y = s.y - offset;
        // Wrap so the field never runs out on a long page.
        y = ((y % h) + h) % h;

        const flicker = reduced
          ? 1
          : 0.55 + Math.sin(t * 0.0011 + s.phase) * 0.45 * s.twinkle;
        const alpha = (0.18 + s.z * 0.62) * flicker;

        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue}, ${alpha})`;
        ctx.fill();

        // Only the nearest stars get a bloom — cheap, and keeps the field
        // from turning into fog.
        if (s.z > 0.82) {
          ctx.beginPath();
          ctx.arc(s.x, y, s.r * 3.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.hue}, ${alpha * 0.1})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    build();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", build);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("scroll", onScroll);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}
