import { CosmicHero } from "@/components/cosmic/cosmic-hero";
import {
  ExploreSection,
  JoinSection,
  VisionSection,
} from "@/components/sections/home-sections";

/**
 * Home is deliberately short: the cinematic sequence, a statement of
 * intent, the doors, and the invitation. Every subject it touches is
 * owned by its own page — nothing is restated here.
 */
export default function HomePage() {
  return (
    <>
      <CosmicHero />
      <VisionSection />
      <ExploreSection />
      <JoinSection />
    </>
  );
}
