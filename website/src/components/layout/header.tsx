"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown, CaretRight, List, X } from "@phosphor-icons/react";
import { NAV, SITE } from "@/lib/site";
import { Wordmark } from "@/components/brand/mark";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);

  /* The header starts invisible over the hero so nothing competes with the
     opening shot, then materialises into a glass bar once you commit to
     scrolling. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
    Close everything on navigation. Adjusted during render rather than in an
    effect: setState inside useEffect causes a second render pass, so the
    open menu would visibly paint once on the new route before closing.
    https://react.dev/learn/you-might-not-need-an-effect
  */
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
    setMenu(null);
    setSection(null);
  }

  // Hold the page still behind the sheet, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const primary = NAV.filter((n) => n.primary);

  return (
    /*
      The mobile sheet is a SIBLING of <header>, never a child.

      When scrolled, the header carries `backdrop-blur-xl`. An element with a
      backdrop-filter becomes the containing block for its fixed-position
      descendants — so a `fixed inset-0` sheet nested inside would be clamped
      to the header's 80px-tall box and pushed out of sight by its own top
      offset. The menu would open correctly at the very top of a page and
      silently fail everywhere else. Keep these two as siblings.
    */
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          scrolled || open
            ? "border-b border-hairline bg-void/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
        onMouseLeave={() => setMenu(null)}
      >
        <div className="mx-auto flex h-20 max-w-[88rem] items-center justify-between gap-6 px-5 md:px-8">
          <Link href="/" aria-label={SITE.name} className="shrink-0">
            <Wordmark />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {primary.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              const hasChildren = !!item.children?.length;

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setMenu(hasChildren ? item.href : null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.9rem] transition-colors duration-300",
                      active
                        ? "text-gold"
                        : "text-starlight-dim hover:text-starlight",
                    )}
                  >
                    {item.label}
                    {hasChildren && (
                      <CaretDown
                        size={11}
                        weight="bold"
                        className={cn(
                          "transition-transform duration-300",
                          menu === item.href && "rotate-180",
                        )}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {hasChildren && menu === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="panel absolute left-1/2 top-full w-72 -translate-x-1/2 p-2"
                      >
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm text-starlight-dim transition-colors hover:bg-space-veil/70 hover:text-starlight"
                          >
                            <span>{child.label}</span>
                            {child.status === "soon" && <SoonPill />}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/donate"
              className="hidden rounded-full bg-gold px-5 py-2.5 text-[0.85rem] font-medium text-on-gold transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_28px_-6px_var(--color-gold)] md:inline-flex"
            >
              Support the Mission
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              /* 44px minimum target — below that, thumbs miss. */
              className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline text-starlight transition-colors active:border-gold active:text-gold lg:hidden"
            >
              {open ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet — sibling of the header, see note above. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            /* Below the header's z-50 bar but above everything else, and
               `overscroll-contain` stops a flick at the end of the list from
               scrolling the page underneath. */
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-void/98 pb-16 pt-20 backdrop-blur-2xl lg:hidden"
          >
            <div className="px-5 py-6">
              {NAV.map((item, i) => {
                const expanded = section === item.href;
                const hasChildren = !!item.children?.length;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.35 }}
                    className="border-b border-hairline/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={item.href}
                        className="display flex-1 py-4 text-[1.75rem] leading-tight text-starlight"
                      >
                        {item.label}
                      </Link>

                      {/*
                        Children expand in place rather than sprawling down
                        the page. Separate control from the link so tapping
                        the label still navigates — a combined toggle traps
                        people who wanted the section itself.
                      */}
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => setSection(expanded ? null : item.href)}
                          aria-label={`${expanded ? "Hide" : "Show"} ${item.label} links`}
                          aria-expanded={expanded}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline/60 text-gold"
                        >
                          <CaretRight
                            size={14}
                            weight="bold"
                            className={cn(
                              "transition-transform duration-300",
                              expanded && "rotate-90",
                            )}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {hasChildren && expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-l border-hairline/50 pb-4 pl-4">
                            {item.children!.map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                className="flex items-center justify-between gap-3 py-3 text-[0.95rem] text-starlight-dim"
                              >
                                {c.label}
                                {c.status === "soon" && <SoonPill />}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              <Link
                href="/donate"
                className="mt-8 flex w-full items-center justify-center rounded-full bg-gold px-6 py-4 font-medium text-on-gold"
              >
                Support the Mission
              </Link>

              <p className="mt-8 text-center text-xs text-starlight-faint">
                {SITE.creed}
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function SoonPill() {
  return (
    <span className="shrink-0 rounded-full border border-hairline px-1.5 py-0.5 text-[0.55rem] uppercase tracking-[0.14em] text-gold/60">
      Soon
    </span>
  );
}
