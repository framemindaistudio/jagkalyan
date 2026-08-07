"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Scroll reveal. One shared easing and distance for the whole site so
 * sections feel like they belong to the same film.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  children,
  className,
  variant = "stage",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "stage" | "canvas";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden px-5 py-24 md:px-8 md:py-32",
        variant === "canvas" ? "canvas" : "bg-void",
        className,
      )}
      /* scroll-margin so in-page anchors clear the fixed header. */
      style={{ scrollMarginTop: "5rem" }}
    >
      <div className="relative mx-auto max-w-[80rem]">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  variant = "stage",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  variant?: "stage" | "canvas";
  className?: string;
}) {
  const onCanvas = variant === "canvas";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "eyebrow",
              onCanvas ? "text-verdant-deep/70" : "text-gold/75",
            )}
          >
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "display mt-4 text-[clamp(2rem,5.2vw,3.9rem)]",
            onCanvas ? "text-canvas-ink" : "text-starlight",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-6 text-base leading-relaxed md:text-lg",
              onCanvas ? "text-canvas-muted" : "text-starlight-dim",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function SoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-hairline px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-gold/70",
        className,
      )}
    >
      Coming Soon
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300",
        variant === "primary"
          ? "bg-gold text-on-gold hover:bg-gold-bright hover:shadow-[0_0_30px_-6px_var(--color-gold)]"
          : "border border-hairline-strong text-starlight hover:border-gold hover:text-gold",
        className,
      )}
    >
      {children}
    </Link>
  );
}
