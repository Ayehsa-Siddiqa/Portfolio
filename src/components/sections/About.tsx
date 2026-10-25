"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Download, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

const { personalInfo, stats, experience } = portfolioData;

const facts = [
  { icon: MapPin, label: "Location", text: personalInfo.location },
  { icon: Briefcase, label: "Working at", text: experience[0].company },
  { icon: GraduationCap, label: "Education", text: "BS Computer Science" },
];

function CountUp({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setDisplay(v.toFixed(decimals)) });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function About() {
  return (
    <section id="about" className="section-y relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Me" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* Intro */}
          <div className="flex flex-col justify-between gap-8">
            <div>
            <motion.span
              {...fadeUp()}
              className="inline-flex self-start items-center gap-2 mb-4 px-3 py-1 rounded-full bg-lime/10 text-lime text-sm font-medium"
            >
              <span aria-hidden>👋</span> Hello there
            </motion.span>

            <motion.p {...fadeUp(0.05)} className="text-lg sm:text-xl text-gray-200 leading-relaxed">
              I&apos;m Ayesha, a <span className="text-lime font-semibold">full-stack developer</span> from Lahore with a front-end focus. I
              build fast, responsive, SEO-friendly websites, and the APIs and databases behind them.
            </motion.p>
            <motion.p {...fadeUp(0.1)} className="mt-4 text-gray-400 leading-relaxed">
              Over 4+ years I&apos;ve delivered 300+ websites, from AI product websites and ecommerce stores to food ordering and
              travel booking sites, plus WordPress / WooCommerce stores.
            </motion.p>
            </div>

            <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-3">
              <a
                href={personalInfo.resume}
                download="Ayesha_Siddiqa_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-lime transition-colors"
              >
                <Download size={16} /> Download CV
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border border-white/15 text-white text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                Let&apos;s talk <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Stats and quick facts in one simple card */}
          <motion.div
            {...fadeUp()}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-px bg-white/10 flex-1">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col justify-center p-5 sm:p-6 bg-[#0b0a10]">
                  <p className="font-heading font-bold text-3xl sm:text-4xl text-white">
                    <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                  <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 sm:px-6 py-4 border-t border-white/10 text-sm text-gray-300">
              {facts.map((fact) => (
                <li key={fact.label} className="flex items-center gap-2" title={fact.label}>
                  <fact.icon size={15} className="text-lime" />
                  {fact.text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
