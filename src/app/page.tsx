"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { LandingFooter } from "@/components/landing/footer";
import { SectionDivider } from "@/components/landing/section-divider";

export default function LandingPage() {
  const [activePersona, setActivePersona] = useState<"business" | "creator">("business");

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-[#0a0f14] text-stone-900 dark:text-slate-100">
      <Navbar />

      {/* 1. Hero */}
      <HeroSection />

      {/* Divider: Hero → Features */}
      <SectionDivider color="teal" pulseDuration={4.5} duration={6} direction="ltr" />

      {/* 2. Service Categories */}
      <FeaturesSection />

      {/* Divider: Features → How It Works */}
      <SectionDivider color="cyan" pulseDuration={4} duration={5} direction="ltr" />

      {/* 3. How It Works */}
      <HowItWorksSection activePersona={activePersona} setActivePersona={setActivePersona} />

      {/* Divider: How It Works → Pricing */}
      <SectionDivider color="purple" pulseDuration={3.5} duration={4.5} direction="rtl" />

      {/* 4. Pricing */}
      <PricingSection />

      {/* Divider: Pricing → CTA */}
      <SectionDivider color="blue" pulseDuration={4} duration={5.5} direction="ltr" />

      {/* 5. Final CTA */}
      <CtaSection />

      {/* Footer */}
      <LandingFooter />
    </main>
  );
}
