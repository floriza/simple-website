import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import PrioritiesSection from "@/components/sections/PrioritiesSection";
import LatestNewsSection from "@/components/sections/LatestNewsSection";
import EventsSection from "@/components/sections/EventsSection";
import SupportCTASection from "@/components/sections/SupportCTASection";
import VisionSection from "@/components/sections/VisionSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

// Uncomment to fetch from Sanity:
// import { getHomePageData } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Home | [Candidate Name] for Student Council President",
  description:
    "Vote [Candidate Name] for Student Council President. Leading with purpose, serving with integrity. Learn about our platform for student welfare, academic excellence, and campus improvement.",
};

export default async function HomePage() {
  // Uncomment to use live CMS data:
  // const data = await getHomePageData();

  return (
    <>
      <HeroSection />
      <VisionSection />
      <PrioritiesSection />
      <LatestNewsSection />
      <EventsSection />
      <TestimonialsSection />
      <SupportCTASection />
    </>
  );
}
