import { DemoOne } from "@/components/ui/demo";
import MinimalistHeroDemo from "@/components/ui/minimalist-hero-demo";
import QuoteSection from "@/components/ui/quote-section";
import ClientsSection from "@/components/ui/clients-section";
import CaseStudiesSection from "@/components/ui/case-studies-section";
import { RevealImageList } from "@/components/ui/reveal-images";
import TestimonialsSection from "@/components/ui/testimonial";
import CtaSection from "@/components/ui/cta-section";

export default function Home() {
  return (
    <>
      <DemoOne />
      <MinimalistHeroDemo />
      <QuoteSection />
      <RevealImageList />
      <ClientsSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
