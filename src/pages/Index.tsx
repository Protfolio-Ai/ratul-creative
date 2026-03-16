import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const CVSection = lazy(() => import("@/components/CVSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => (
  <>
    <Navbar />
    <HeroSection />
    {/* Above-the-fold: loads immediately after hero */}
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <AboutSection />
      <ServicesSection />
    </Suspense>
    {/* Below-the-fold: loads independently */}
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <SkillsSection />
      <PortfolioSection />
    </Suspense>
    <Suspense fallback={<div className="min-h-[100px]" />}>
      <ExperienceSection />
      <CVSection />
      <ContactSection />
      <Footer />
    </Suspense>
  </>
);

export default Index;
