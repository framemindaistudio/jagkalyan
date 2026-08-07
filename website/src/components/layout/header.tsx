"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { NAV, SITE } from "@/lib/site";
import { Wordmark } from "@/components/brand/mark";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

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
    Close everything on navigation.

    Done by adjusting state during render rather than in an effect: setting
    state synchronously inside useEffect causes a second render pass, so the
    open menu would visibly paint once on the new route before closing.
    Comparing against the previous pathname resolves it in the same pass.
    https://react.dev/learn/you-might-not-need-an-effect
  */
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
    setMenu(null);
  }

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const primary = NAV.filter((n) => n.primary);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        scrolled
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
                          {child.status === "soon" && <SoonDot />}
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-starlight transition-colors hover:border-hairline-strong lg:hidden"
          >
            {open ? <X size={19} /> : <List size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 overflow-y-auto border-t border-hairline bg-void/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="space-y-1 px-5 py-8">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="display block py-3 text-3xl text-starlight"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mb-3 ml-1 flex flex-wrap gap-x-4 gap-y-1.5 border-l border-hairline pl-4">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="flex items-center gap-1.5 py-1 text-sm text-starlight-faint"
                        >
                          {c.label}
                          {c.status === "soon" && <SoonDot />}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <Link
                href="/donate"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-gold px-6 py-3.5 font-medium text-on-gold"
              >
                Support the Mission
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function SoonDot() {
  return (
    <span className="rounded-full border border-hairline px-1.5 py-0.5 text-[0.55rem] uppercase tracking-[0.14em] text-gold/60">
      Soon
    </span>
  );
}
