import HeroSection from "@/app/views/components/component_portaf/HeroSection";
import AboutSection from "@/app/views/components/component_portaf/AboutSection";
import ProjectsSection from "@/app/views/components/component_portaf/ProjectsSection";
import EmailSection from "@/app/views/components/component_portaf/EmailSection";
import Footer from "@/app/views/components/component_portaf/Footer";
import Navbar from "@/app/views/components/component_portaf/Navbar";

export default function portfolio() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] text-sm sm:text-base">
      <Navbar />
      <div className="container mt-8 mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
