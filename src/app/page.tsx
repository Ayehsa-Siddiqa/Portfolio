import Hero from "@/components/sections/Hero";
import TechMarquee from "@/components/sections/TechMarquee";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import CtaMarquee from "@/components/sections/CtaMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <CtaMarquee />
      <Contact />
    </>
  );
}
