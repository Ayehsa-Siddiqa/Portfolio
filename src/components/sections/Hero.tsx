"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import HeroPortrait from "@/components/ui/HeroPortrait";
import Magnetic from "@/components/ui/Magnetic";
import ParticleField from "@/components/ui/ParticleField";
import InteractiveName from "@/components/ui/InteractiveName";
import { useIntroDone } from "@/components/layout/Preloader";

const { personalInfo } = portfolioData;

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % personalInfo.roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={personalInfo.roles[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient whitespace-nowrap"
        >
          {personalInfo.roles[index]}
        </motion.span>
      </AnimatePresence>
      <span className="ml-1 w-[3px] bg-violet-400 animate-caret" />
    </span>
  );
}

export default function Hero() {
  // Remount the content when the intro finishes so its entrance plays in view
  const ready = useIntroDone();

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 pb-5 sm:pb-8 lg:pb-12 overflow-hidden">
      <ParticleField />
      <div key={ready ? "ready" : "intro"} className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs sm:text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to roles
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted">
                <MapPin size={14} /> {personalInfo.location}
              </span>
            </div>

            <h1 className="font-heading font-extrabold tracking-tight leading-[0.9] text-[15vw] sm:text-7xl lg:text-8xl mb-6">
              <InteractiveName text={personalInfo.firstName} />
              <InteractiveName text={`${personalInfo.lastName}.`} delay={0.3} />
            </h1>

            <p className="text-xl sm:text-3xl font-heading font-semibold text-gray-200 mb-6">
              <RoleRotator />
            </p>

            <p className="max-w-xl text-base sm:text-lg text-muted leading-relaxed mb-8">
              4+ years building fast, SEO-friendly websites, from AI product websites to ecommerce stores.{" "}
              <span className="text-white">{personalInfo.tagline}</span>
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Magnetic>
              <Link
                href="#projects"
                className="group px-4 sm:px-7 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-full bg-linear-to-r from-violet-600 to-blue-600 text-white font-semibold hover:shadow-xl hover:shadow-violet-600/30 transition-all flex items-center gap-2"
              >
                View My Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              </Magnetic>
              <Magnetic>
              <a
                href={personalInfo.resume}
                download="Ayesha_Siddiqa_Resume.pdf"
                className="px-4 sm:px-7 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-full bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-md"
              >
                Download CV <Download size={18} />
              </a>
              </Magnetic>
              <div className="flex items-center gap-2 ml-1">
                <a href={personalInfo.gitHub} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 sm:p-3 rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-violet-400/50 transition-colors">
                  <Github size={18} />
                </a>
                <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 sm:p-3 rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-blue-400/50 transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="px-2 sm:px-4">
            <HeroPortrait />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
