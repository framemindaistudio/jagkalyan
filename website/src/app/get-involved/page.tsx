import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import {
  Reveal,
  Section,
  SectionHeading,
  SoonBadge,
} from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Register, volunteer, become a member, donate or partner with the JagKalyan Holistic Mission. Every participant receives a JagKalyan Unique ID.",
};

const WAYS = [
  {
    title: "Register",
    href: "/get-involved/register",
    body: "Join the mission as a member, student, volunteer, mentor, faculty, researcher, donor, investor or CSR partner. Every registration is issued a JagKalyan Unique ID.",
  },
  {
    title: "Volunteer",
    href: "/get-involved/volunteer",
    body: "Give time and skill to education, service, health camps, plantation drives and community programmes.",
  },
  {
    title: "Membership",
    href: "/get-involved/membership",
    body: "Become a lifelong member of the JagKalyan family and take part in chapters, gatherings and the annual mission assembly.",
  },
  {
    title: "Donate",
    href: "/donate",
    body: "Support JagKalyan Trust, Shree Nandi Foundation and JagKalyan Seva Udyan. Contributions are eligible under 12A & 80G.",
  },
  {
    title: "Corporate CSR",
    href: "/donate/csr",
    body: "Fund programmes in education, wellness, welfare, livelihood and environment, with full reporting and impact measurement.",
  },
  {
    title: "Grants & Endowment",
    href: "/donate/grants",
    body: "Institutional grants, sponsorships and long-term endowment giving for the university, the gurukul and the Wisdom Park.",
  },
];

const ROLES = [
  "Visitor",
  "Student",
  "Member",
  "Volunteer",
  "Mentor",
  "Faculty",
  "Researcher",
  "Donor",
  "Investor",
  "CSR Partner",
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Join the Mission"
        title={
          <>
            Every hand
            <br />
            <span className="text-aurum">makes it lighter.</span>
          </>
        }
        lead="The mission is not an institution people watch. It is one they join — as students, servants, builders, funders and friends."
      />

      <Section>
        <SectionHeading
          eyebrow="Ways to Take Part"
          title="Choose how you walk with us."
          lead="Each pathway opens shortly. Until then, everything here is visible so you can decide where you belong."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WAYS.map((w, i) => (
            <Reveal key={w.href} delay={i * 0.05}>
              <Link
                href={w.href}
                className="panel panel-hover flex h-full flex-col p-8"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="display text-2xl leading-tight text-starlight">
                    {w.title}
                  </h2>
                  <SoonBadge />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-starlight-faint">
                  {w.body}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Unique ID */}
      <Section variant="canvas">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              variant="canvas"
              eyebrow="JagKalyan Unique ID"
              title="One identity across the whole ecosystem."
              lead="Every registered participant — whatever their role — receives a JagKalyan Unique ID. It carries their record across the Academy, the trusts, events, volunteering and giving, so the mission knows and remembers everyone who serves it."
            />

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-canvas-border bg-canvas-raised px-4 py-2 text-xs text-canvas-muted"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            {/* Illustrative ID card. Sample format, not a real record. */}
            <div className="relative overflow-hidden rounded-card border border-verdant-deep/25 bg-gradient-to-br from-verdant-deep to-[#06280a] p-9 text-canvas shadow-[0_28px_60px_-30px_rgba(14,74,18,0.8)]">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-25 blur-2xl"
                style={{
                  background:
                    "radial-gradient(closest-side, var(--color-gold), transparent)",
                }}
              />
              <p className="eyebrow text-canvas/55">JagKalyan Unique ID</p>
              <p className="display mt-6 text-4xl tracking-wide text-gold md:text-5xl">
                JKH_I16
              </p>
              <hr className="my-7 border-canvas/15" />
              <dl className="grid grid-cols-2 gap-y-4 text-xs">
                <div>
                  <dt className="text-canvas/50">Role</dt>
                  <dd className="mt-1 text-canvas/90">Member</dd>
                </div>
                <div>
                  <dt className="text-canvas/50">Status</dt>
                  <dd className="mt-1 text-canvas/90">Active</dd>
                </div>
                <div>
                  <dt className="text-canvas/50">Since</dt>
                  <dd className="mt-1 text-canvas/90">2026</dd>
                </div>
                <div>
                  <dt className="text-canvas/50">Ecosystem</dt>
                  <dd className="mt-1 text-canvas/90">All entities</dd>
                </div>
              </dl>
              <p className="mt-8 text-[0.6rem] uppercase tracking-[0.18em] text-canvas/35">
                Sample format · Illustrative only
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
