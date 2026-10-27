import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import HomeProjectsPreview from "@/components/HomeProjectsPreview";
import Experience from "@/components/Experience";
import CaseStudy from "@/components/CaseStudy";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <HomeProjectsPreview />
      <Experience />
      <CaseStudy />
      <FAQ />
      <Contact />
    </>
  );
}
