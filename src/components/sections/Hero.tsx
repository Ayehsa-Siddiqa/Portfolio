"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-17">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bg.png)' }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-purple-300 text-sm font-medium mb-4 sm:mb-6 backdrop-blur-md">
            Welcome to my portfolio
          </span>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-3 sm:mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">{portfolioData.personalInfo.name}</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-300 mb-6 sm:mb-8">
            {portfolioData.personalInfo.role}
          </h2>
          <p className="max-w-2xl mx-auto text-md sm:text-lg text-gray-400 mb-8 sm:mb-10 leading-relaxed">
            {portfolioData.personalInfo.summary}
          </p>
          
          <div className="flex flex-row flex-wrap items-center justify-center gap-4">
            <Link 
              href="#projects"
              className="px-5 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-md sm:text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1 flex items-center gap-2"
            >
              View My Work <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </Link>
            <a 
              href="/AyeshaSiddiqaResume.pdf" 
              download="Ayesha_Siddiqa_CV.pdf"
              className="px-5 sm:px-8 py-3 sm:py-4  rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm sm:text-lg hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              Download CV <Download className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}
