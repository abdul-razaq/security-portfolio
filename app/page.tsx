import { Hero } from "@/components/Hero";
import { 
  AboutSection, 
  ExperienceSection, 
  EducationSection, 
  ServicesSection, 
  CTASection 
} from "@/components/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ExperienceSection />
      <EducationSection />
      <CTASection />
    </>
  );
}
