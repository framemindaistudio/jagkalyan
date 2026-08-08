import Link from "next/link";
import { FOOTER_GROUPS, SITE } from "@/lib/site";
import { Mark } from "@/components/brand/mark";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-void">
      {/* A last horizon glow at the very bottom of the site — the sun the
          whole journey has been moving toward. */}
      <div
        aria-hidden
        className="bloom -bottom-72 left-1/2 h-[36rem] w-[80rem] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(228,174,20,0.30), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[88rem] px-5 py-20 md:px-8 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_2.6fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Mark className="h-11 w-11 text-gold" />
              <span className="flex flex-col leading-none">
                <span className="display text-2xl text-starlight">
                  JagKalyan
                </span>
                <span className="eyebrow mt-1.5 text-[0.7rem] text-gold/70">
                  Holistic Mission
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-starlight-faint">
              {SITE.vision}
            </p>

            <p
              className="display mt-8 text-xl text-gold/80"
              lang="sa"
            >
              {SITE.sanskrit}
            </p>
            <p className="mt-1.5 text-xs italic text-starlight-faint">
              {SITE.sanskritMeaning}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="eyebrow text-gold/60">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-starlight-dim transition-colors duration-300 hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="thread my-14" />

        <p className="display text-center text-lg text-starlight-dim md:text-xl">
          {SITE.closing}
        </p>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-xs text-starlight-faint md:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-center">
            JagKalyan Trust — registered NGO with 12A &amp; 80G certification.
          </p>
          <p>{SITE.domain}</p>
        </div>
      </div>
    </footer>
  );
}
