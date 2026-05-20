"use client";

import { HeroSection } from "./_components/HeroSection";
import { BillTypesSection } from "./_components/BillTypesSection";
import { HowItWorksSection } from "./_components/HowItWorksSection";
import { FeaturesSection } from "./_components/FeaturesSection";
import { BlogTeaserSection } from "./_components/BlogTeaserSection";
import { CTABanner } from "./_components/CTABanner";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BillTypesSection />
      <HowItWorksSection />
      <FeaturesSection />
      <BlogTeaserSection />
      <CTABanner />
    </div>
  );
}
