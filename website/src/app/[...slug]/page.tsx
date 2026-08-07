import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/layout/page-hero";
import {
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
  SoonBadge,
} from "@/components/ui/primitives";
import { STUBS, type StubRoute } from "@/lib/site";

/**
 * Coming Soon routes.
 *
 * Every planned section of the site exists as a real, pre-rendered URL from
 * day one — driven off the STUBS registry in lib/site.ts rather than 20-odd
 * near-identical page files. That means the client can share any link
 * immediately, search engines get a complete sitemap, and the navigation
 * never contains a dead end.
 *
 * Next.js resolves static segments before dynamic ones, so real pages like
 * /mission and /journey always win over this catch-all.
 *
 * To promote a stub to a real page: create its folder under src/app and
 * delete its entry from STUBS.
 */

function find(slug: string[]): StubRoute | undefined {
  return STUBS.find((s) => s.href === "/" + slug.join("/"));
}

export function generateStaticParams() {
  return STUBS.map((s) => ({ slug: s.href.replace(/^\//, "").split("/") }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stub = find(slug);
  if (!stub) return {};
  return {
    title: `${stub.title} — Coming Soon`,
    description: stub.blurb,
  };
}

export default async function StubPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const stub = find(slug);
  if (!stub) notFound();

  return (
    <>
      <PageHero
        eyebrow={stub.parent}
        title={stub.title}
        lead={stub.blurb}
      >
        <SoonBadge />
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="In Development"
          title="This module is being built."
          lead="The JagKalyan platform is being released module by module so that each one arrives complete rather than half-finished. This section is next in line."
        />

        {stub.bullets?.length ? (
          <div className="mt-14">
            <Reveal>
              <p className="eyebrow border-b border-hairline pb-4 text-gold/70">
                What this section will hold
              </p>
            </Reveal>
            <ul className="mt-2 grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
              {stub.bullets.map((b, i) => (
                <Reveal key={b} delay={i * 0.03}>
                  <li className="flex items-center gap-3 border-b border-hairline/40 py-4">
                    <span
                      aria-hidden
                      className="h-1 w-1 shrink-0 rounded-full bg-gold/60"
                    />
                    <span className="text-sm text-starlight-dim">{b}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}

        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap items-center gap-3">
            <ButtonLink href="/">Return to the mission</ButtonLink>
            <Link
              href="/get-involved"
              className="inline-flex items-center gap-2 px-2 text-sm text-starlight-dim transition-colors hover:text-gold"
            >
              <ArrowLeft size={14} /> Other ways to take part
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
