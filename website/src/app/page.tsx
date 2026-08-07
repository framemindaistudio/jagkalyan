import { CosmicHero } from "@/components/cosmic/cosmic-hero";
import {
  AcademySection,
  EcosystemSection,
  FrameworkSection,
  InstitutionsSection,
  JoinSection,
  JourneySection,
  PillarsSection,
  WisdomParkSection,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <CosmicHero />
      <PillarsSection />
      <FrameworkSection />
      <JourneySection />
      <EcosystemSection />
      <InstitutionsSection />
      <AcademySection />
      <WisdomParkSection />
      <JoinSection />
    </>
  );
}
