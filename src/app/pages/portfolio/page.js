import HeroSection from "@/app/components/component_portaf/HeroSection";
import AboutSection from "@/app/components/component_portaf/AboutSection";
import ProjectsSection from "@/app/components/component_portaf/ProjectsSection";
import EmailSection from "@/app/components/component_portaf/EmailSection";
import Footer from "@/app/components/component_portaf/Footer";
import Navbar from "@/app/components/component_portaf/Navbar";

export default function portfolio() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
