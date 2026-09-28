import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import MorphingBlobs from "@/components/MorphingBlobs";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ClientWorkSection from "@/components/sections/ClientWorkSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <MorphingBlobs />

      <main className="relative z-10 overflow-x-hidden max-w-full w-full">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ClientWorkSection />
        <ProjectsSection />
        <FooterSection />
      </main>
    </>
  );
}
